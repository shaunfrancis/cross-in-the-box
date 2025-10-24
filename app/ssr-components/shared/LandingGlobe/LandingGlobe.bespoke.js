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
        color: 0xff85d1,
        href: "/uk",
    },
    {
        code: "FR",
        color: 0xffb552,
        href: "/france",
    },
    {
        code: "HU",
        color: 0xFF0000,
        href: "/hungary",
    },
    {
        code: "VA",
        color: 0xffd700,
        href: "/vatican-city",
    },
    {
        code: "CA",
        color: 0x05beff,
        href: "/canada",
    },
    {
        code: "US",
        color: 0x81d6a6,
        href: "/usa",
    },
];
let highlightedCountries = new WeakMap();

window.addEventListener('DOMContentLoaded', async () => {
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
    document.getElementById('LandingGlobe').appendChild(renderer.domElement);
    document.getElementById('LandingGlobe').style.minHeight = height + "px";

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
            flatShading: true
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

    // raycasting
    const raycaster = new Raycaster();
    const pointer = new Vector2();
    window.addEventListener('pointermove', (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    });

    // animate
    renderer.setAnimationLoop(animate);
    function animate() {
        group.rotation.x += 0.00002;
        group.rotation.y += 0.0002;

        raycaster.setFromCamera(pointer, camera);

        const intersects = raycaster.intersectObjects(group.children).filter( intersect => highlightedCountries.get(intersect.object) );
        if(intersects.length > 0) renderer.domElement.classList.add('pointer');
        else renderer.domElement.classList.remove('pointer');
        
        intersects.forEach( intersect => {
            const countryData = highlightedCountries.get(intersect.object);
            // intersect.object.material.color.set( countryData.color );
        });

        renderer.render(scene, camera);
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
        mesh.material = new MeshStandardMaterial({ color: color });
        group.add(mesh);

        if(highlightCountryData) highlightedCountries.set(mesh, highlightCountryData);
    } );

});