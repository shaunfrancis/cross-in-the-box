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
    Raycaster,
} from 'three';
import { GeoJSONLoader } from 'three-geojson/src/GeoJSONLoader';
import { WGS84_ELLIPSOID } from '3d-tiles-renderer';

const highlightData = [
    {
        code: "GB",
        name: "United Kingdom",
        color: 0xff85d1,
        href: "/uk",
    },
    {
        code: "FR",
        name: "France",
        color: 0xffb552,
        href: "/france",
    },
    {
        code: "HU",
        name: "Hungary",
        color: 0xFF0000,
        href: "/hungary",
    },
    {
        code: "VA",
        name: "Vatican City",
        color: 0xffd700,
        href: "/vatican-city",
    },
    {
        code: "CA",
        name: "Canada",
        color: 0x05beff,
        href: "/canada",
    },
    {
        code: "US",
        name: "United States",
        color: 0x81d6a6,
        href: "/usa",
    },
];
let highlightedCountries = new WeakMap();

window.addEventListener('DOMContentLoaded', async () => {
    const root = document.getElementById('LandingGlobe');

    // create dimensions
    // globe will extend horizontally from centre point to between 50% (>= 1024px) and 100% (<= 512px) of the viewport width
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

    // renderer
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 0);
    root.appendChild(renderer.domElement);
    root.style.minHeight = height - 80 + "px";

    // camera
    const camera = new OrthographicCamera(cameraPoints.left, cameraPoints.right, cameraPoints.top, cameraPoints.bottom);
    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);

    // scene
    const scene = new Scene();
    const group = new Group();
    scene.add(group);

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
            opacity: 1,
            flatShading: true,
            roughness: 0.75,
            metalness: 0.25
        } ),
    );
    sphere.scale.copy(WGS84_ELLIPSOID.radius);
    sphere.renderOrder = 1;
    group.add(sphere);

    // scale and center
    const box = new Box3();
    box.setFromObject(group);
    box.getCenter(group.position).multiplyScalar(-1);

    const size = new Vector3();
    box.getSize(size);
    group.scale.setScalar(1.5 / Math.max(...size));
    group.position.multiplyScalar(group.scale.x);

    // raycasting and mouse tracking
    const raycaster = new Raycaster();
    const pointer = new Vector2();
    let cursorPosition = [0,0];
    window.addEventListener('pointermove', (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        cursorPosition = [event.clientX, event.clientY];
    });

    // animate
    renderer.setAnimationLoop(animate);
    function animate() {
        group.rotation.x += 0.00002;
        group.rotation.y += 0.0002;

        handleHovers();

        renderer.render(scene, camera);
    }

    // handle hovers
    const popup = root.querySelector('.hover-popup');
    let currentlyHoveredCountry = null;
    window.addEventListener('click', () => {
        if(currentlyHoveredCountry) window.location.href = currentlyHoveredCountry.href;
    });

    function handleHovers(){
        raycaster.setFromCamera(pointer, camera);

        const intersects = raycaster.intersectObjects(group.children).filter( intersect => highlightedCountries.get(intersect.object) );
        if(intersects.length == 0){
            renderer.domElement.classList.remove('pointer');
            popup.classList.add('hidden');
            currentlyHoveredCountry = null;
        }
        else{
            renderer.domElement.classList.add('pointer');
        
            const intersect = intersects[0];
            const countryData = highlightedCountries.get(intersect.object);

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
            // intersect.object.material.metalness = 1;
            popup.innerHTML = "<h2>" + countryData.name + "</h2>";
            popup.classList.remove('hidden');
        }
    }

    // drag to rotate
    let prevX, prevY;
    const endRotateGlobe = () => {
        window.removeEventListener('mousemove', rotateGlobe);
        window.removeEventListener('mouseup', endRotateGlobe);
    }
    const rotateGlobe = (event) => {
        const deltaX = event.clientX - prevX;
        const deltaY = event.clientY - prevY;
        prevX = event.clientX;
        prevY = event.clientY;
        group.rotation.y += deltaX / 1000;
        group.rotation.x += deltaY / 1000;
    };
    renderer.domElement.addEventListener('mousedown', (event) => {
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
        mesh.material = new MeshStandardMaterial({ color: color, roughness:0.5 });
        group.add(mesh);

        if(highlightCountryData) highlightedCountries.set(mesh, highlightCountryData);
    } );
    root.classList.remove('loading');

});