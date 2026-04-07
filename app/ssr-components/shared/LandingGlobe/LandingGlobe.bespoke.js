import {
	OrthographicCamera,
	Scene,
	WebGLRenderer,
	Group,
	Box3,
    Vector2,
	Vector3,
	Mesh,
	SphereGeometry,
	MeshStandardMaterial,
	DirectionalLight,
	AmbientLight,
    Raycaster
} from 'three';
import { GeoJSONLoader } from 'three-geojson/src/GeoJSONLoader';
import { WGS84_ELLIPSOID } from '3d-tiles-renderer';

const highlightData = [
    { code: "GB", name: "United Kingdom", color: 0xff85d1, href: "/uk", flag: "/public/images/uk-flag.svg", target:[1.17,-0.67] },
    { code: "FR", name: "France", color: 0xffb552, href: "/france", flag: "/public/images/france-flag.svg", target:[0.97,-0.84] },
    { code: "HU", name: "Hungary", color: 0xFF0000, href: "/hungary", flag: "/public/images/hungary-flag.svg", target:[0.94,-1.34] },
    { code: "VA", name: "Vatican City", color: 0xffd700, href: "/vatican-city", flag: "/public/images/vatican-flag.svg", target:[0.85,-1.16] },
    { code: "CA", name: "Canada", color: 0x05beff, href: "/canada", flag: "/public/images/canada-flag.svg", target:[1.17,0.97] },
    { code: "US", name: "United States", color: 0x81d6a6, href: "/usa", flag: "/public/images/usa-flag.svg", target:[0.85,0.85] },
];
let highlightedCountries = new WeakMap();

window.addEventListener('DOMContentLoaded', async () => {
    const root = document.getElementById('LandingGlobe');

    // create dimensions
    // globe will extend horizontally from centre point to between 50% (>= 1024px) and 100% (<= 512px) of the viewport width
    let camera = null;
    window.addEventListener('resize', createDimensions);
    function createDimensions(){
        const cameraPoints = {
            left: 0,
            right: Math.min(1.5, Math.max(0.75, window.innerWidth/1024 * 1.5 )),
            top: Math.min(0.75, 0.75 * window.innerHeight / window.innerWidth),
            bottom: -0.75
        };
        const cameraDimensions = {
            width: cameraPoints.right - cameraPoints.left,
            height: cameraPoints.top - cameraPoints.bottom
        };
        const width = window.innerWidth;
        const height = width * cameraDimensions.height / cameraDimensions.width;
        
        if(camera){
            camera.left = cameraPoints.left;
            camera.right = cameraPoints.right;
            camera.top = cameraPoints.top;
            camera.bottom = cameraPoints.bottom;
            camera.updateProjectionMatrix();
        }

        renderer.setSize(width, height);
        root.style.minHeight = height - 80 + "px";

        return cameraPoints;
    }

    // renderer
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0);
    root.appendChild(renderer.domElement);

    // camera
    const cameraPoints = createDimensions();
    camera = new OrthographicCamera(cameraPoints.left, cameraPoints.right, cameraPoints.top, cameraPoints.bottom);
    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);

    // scene
    const scene = new Scene();
    
    // parent group which contains everything and will spin
    const spinGroup = new Group();
    // child group which contains sphere and map and needs an initial orientation to correct sphere
    const orientGroup = new Group();
    orientGroup.rotation.x = -Math.PI/2;

    spinGroup.add(orientGroup);
    scene.add(spinGroup);

    // lighting
    const sun = new DirectionalLight(0xfcf9f2, 3);
    sun.position.set(20, -20, 5);
    scene.add(sun);

    const light = new AmbientLight(0xd4eaff, 0.5);
    scene.add(light);

    // add sphere for globe
    const sphere = new Mesh(
        new SphereGeometry( 1, 128, 64 ),
        new MeshStandardMaterial( {
            color: 0xffffff,
            flatShading: true,
            roughness: 0.75,
            metalness: 0.25
        } ),
    );
    const radius = WGS84_ELLIPSOID.radius;
    sphere.scale.set(radius.x, radius.z, radius.y); // swap Y/Z axes to match ellipsoid
    sphere.renderOrder = 1;
    highlightedCountries.set(sphere, { code: "SPHERE" });
    orientGroup.add(sphere);
    sphere.rotation.x = -Math.PI / 2;

    // scale and center
    const box = new Box3();
    box.setFromObject(orientGroup);
    box.getCenter(orientGroup.position).multiplyScalar(-1);

    const size = new Vector3();
    box.getSize(size);
    orientGroup.scale.setScalar(1.5 / Math.max(...size));
    orientGroup.position.multiplyScalar(orientGroup.scale.x);

    // raycasting and mouse tracking
    const raycaster = new Raycaster();
    const pointer = new Vector2();
    let cursorPosition = [0,0];
    window.addEventListener('mousemove', (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        cursorPosition = [event.clientX, event.clientY];
    });

    // animate
    let vx = 0, vy = -0.0002, steps = 100, newSpinTarget = null, currentSpinTarget = {};
    renderer.setAnimationLoop(ambientSpin);
    function ambientSpin(){
        if(newSpinTarget){
            const target = newSpinTarget.target;
            const distance = [-spinGroup.rotation.x + target[0], -spinGroup.rotation.y + target[1]];
            currentSpinTarget.v = [distance[0]/steps, distance[1]/steps];
            currentSpinTarget.target = target;
            currentSpinTarget.step = 0;
            currentSpinTarget.data = newSpinTarget;
            newSpinTarget = null;
        }

        handleHovers();
        if(currentSpinTarget.target){
            if(currentSpinTarget.step >= 100){
                vx = 0;
                vy = 0;
            }
            else{
                vx = currentSpinTarget.v[0];
                vy = currentSpinTarget.v[1];
                currentSpinTarget.step += 1;
            }
            selectCountry(currentSpinTarget.data);
        }

        spinGroup.rotation.x += vx;
        spinGroup.rotation.y += vy;
        renderer.render(scene, camera);
    }

    // handle hovers
    const popup = root.querySelector('.hover-popup');
    let currentlyHoveredCountry = null;
    let mousedownTime = 0;
    let didMove = false;
    const checkForMovement = () => { didMove = true };
    window.addEventListener('mousedown', () => {
        mousedownTime = Date.now();
        window.addEventListener('mousemove', checkForMovement);
    });
    window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', checkForMovement);
        if(Date.now() - mousedownTime > 150 && didMove){
            didMove = false;
            return;
        }
        if(currentlyHoveredCountry) window.location.href = currentlyHoveredCountry.href;
    });

    function handleHovers(){
        raycaster.setFromCamera(pointer, camera);

        const intersects = raycaster.intersectObjects(orientGroup.children).filter( intersect => highlightedCountries.get(intersect.object) );
        let countryData = null;
        if(intersects.length > 0) countryData = highlightedCountries.get(intersects[0].object);

        if(intersects.length == 0 || countryData.code === "SPHERE"){
            vx = 0, vy = -0.0002; // resume ambient spin
            renderer.domElement.classList.remove('pointer');
            popup.classList.add('hidden');
            currentlyHoveredCountry = null;
            deselectAll();
        }
        else{
            renderer.domElement.classList.add('pointer');

            const coordinates = cursorPosition;
            const width = popup.offsetWidth;
            const height = popup.offsetHeight;

            const offsets = [0,0];
            if(coordinates[0] + 20 + width > window.innerWidth) offsets[0] = -(width + 40);
            if(coordinates[1] + 20 + height > window.innerHeight) offsets[1] = window.innerHeight - height - 20 - coordinates[1];

            popup.style.left = coordinates[0] + offsets[0] + 20 + "px";
            popup.style.top = coordinates[1] + offsets[1] + 20 + "px";

            if(countryData === currentlyHoveredCountry) return;
            currentlyHoveredCountry = countryData;
            popup.innerHTML = `<h2 class="LandingGlobe__flag-title">
                <img src="${countryData.flag}" alt="" />
                <span>${countryData.name}</span>
            </h2>`;
            popup.classList.remove('hidden');

            vx = 0, vy = 0; // stop ambient spin
            selectCountry(countryData);
        }
    }

    function selectCountry(data){
        if(!data.highlighted){
            data.highlighted = true;
            data.mesh.material.metalness = 0.3;
        }
        deselectAll(data);
    }

    function deselectAll(exceptThis = null){
        highlightData.filter(country => country.highlighted && country != exceptThis).forEach(country => {
            country.highlighted = false;
            country.mesh.material.metalness = 0;
        });
    }

    // drag to rotate
    let prevX, prevY;
    const minX = -Math.PI / 2 + 0.4;
    const maxX = Math.PI / 2 - 0.4;
    spinGroup.rotation.x = maxX;
    const endRotateGlobe = () => {
        document.body.classList.remove('is-panning');
        window.removeEventListener('mousemove', rotateGlobe);
        window.removeEventListener('mouseup', endRotateGlobe);
    }
    const rotateGlobe = (event) => {
        const deltaX = event.clientX - prevX, deltaY = event.clientY - prevY;
        prevX = event.clientX;
        prevY = event.clientY;
        spinGroup.rotation.y += deltaX / 1000;
        spinGroup.rotation.x = Math.max(minX, Math.min(maxX, spinGroup.rotation.x + deltaY / 1000));
    };
    renderer.domElement.addEventListener('mousedown', (event) => {
        document.body.classList.add('is-panning');
        prevX = event.clientX;
        prevY = event.clientY;
        window.addEventListener('mousemove', rotateGlobe);
        window.addEventListener('mouseup', endRotateGlobe);
    });


    // await country geojson
    const response = await new GeoJSONLoader().loadAsync('/public/geojson/globe.geojson');

    // add countries
    response.polygons.forEach( geometry => {
        let thickness = 20000;
        let color = 0xAAAAAA;

        const highlightCountryData = highlightData.find( country => country.code === geometry.feature.properties.ISO_A2_EH );
        if(highlightCountryData){
            thickness = 100000;
            color = highlightCountryData.color;
        }
        else if(geometry.feature.properties.ISO_A2_EH === "AQ") thickness = 50000; // increase Antarctica extrusion to disguise holes

        const mesh = geometry.getMeshObject( {
            ellipsoid: WGS84_ELLIPSOID,
            resolution: 2.5,
            thickness,
        } );
        mesh.material = new MeshStandardMaterial({ color:color, roughness:0.5 });
        orientGroup.add(mesh);

        if(highlightCountryData){
            highlightCountryData.mesh = mesh;
            highlightedCountries.set(mesh, highlightCountryData);
        }
    } );
    root.classList.remove('loading');

    // add 'snap to country' behaviour on hover of articles
    document.querySelectorAll('#LandingGlobe article[data-href]').forEach( article => {
        const country = highlightData.find( c => c.href === article.dataset.href );
        if(!country) return;
        article.addEventListener('mouseenter', () => { newSpinTarget = country });
        article.addEventListener('mouseleave', () => { delete currentSpinTarget.target });
    });

});