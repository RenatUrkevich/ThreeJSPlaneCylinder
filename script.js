class Point {
    constructor(obj, id, name, selected) {
        this.obj = obj;
        this.name = name;
        this.selected = selected;
        this.id = id;
    }
}

var ActiveObject = null;
var GlobalIndex = 0;
var Objects = [];

function LineMaterialByColor(hexColor, opacity = 1.0) {
    return new THREE.LineBasicMaterial({
        color: `${hexColor}`,
        linewidth: 2,
        opacity: opacity,
        transparent: true,

    })
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
scene.background = new THREE.Color('#3D3D3D');

const geometry = new THREE.BoxGeometry(1, 1, 0.01);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const controls = new THREE.OrbitControls(camera, renderer.domElement);


const points = [];

let scale = 1;
let coordinateSize = 50;


//#region grid
for (let index = 0; index < coordinateSize; index += scale) {
    points.push(new THREE.Vector3(index, 0, 0));
    points.push(new THREE.Vector3(index, 0, coordinateSize));
    points.push(new THREE.Vector3(index, 0, 0));

}

points.push(new THREE.Vector3(0, 0, 0));

for (let index = 0; index < coordinateSize; index += scale) {
    points.push(new THREE.Vector3(0, 0, index));
    points.push(new THREE.Vector3(coordinateSize, 0, index));
    points.push(new THREE.Vector3(0, 0, index));

}
points.push(new THREE.Vector3(0, 0, 0));

for (let index = 0; index > -1 * coordinateSize; index -= scale) {
    points.push(new THREE.Vector3(index, 0, 0));
    points.push(new THREE.Vector3(index, 0, -coordinateSize));
    points.push(new THREE.Vector3(index, 0, 0));

}

points.push(new THREE.Vector3(0, 0, 0));

for (let index = 0; index > -1 * coordinateSize; index -= scale) {
    points.push(new THREE.Vector3(0, 0, index));
    points.push(new THREE.Vector3(-coordinateSize, 0, index));
    points.push(new THREE.Vector3(0, 0, index));

}
points.push(new THREE.Vector3(0, 0, 0));


for (let index = 0; index > -1 * coordinateSize; index -= scale) {
    points.push(new THREE.Vector3(index, 0, 0));
    points.push(new THREE.Vector3(index, 0, coordinateSize));
    points.push(new THREE.Vector3(index, 0, 0));

}

points.push(new THREE.Vector3(0, 0, 0));

for (let index = 0; index < coordinateSize; index += scale) {
    points.push(new THREE.Vector3(0, 0, index));
    points.push(new THREE.Vector3(-coordinateSize, 0, index));
    points.push(new THREE.Vector3(0, 0, index));

}
points.push(new THREE.Vector3(0, 0, 0));


for (let index = 0; index < coordinateSize; index += scale) {
    points.push(new THREE.Vector3(index, 0, 0));
    points.push(new THREE.Vector3(index, 0, -coordinateSize));
    points.push(new THREE.Vector3(index, 0, 0));

}

points.push(new THREE.Vector3(0, 0, 0));

for (let index = 0; index > -1 * coordinateSize; index -= scale) {
    points.push(new THREE.Vector3(0, 0, index));
    points.push(new THREE.Vector3(coordinateSize, 0, index));
    points.push(new THREE.Vector3(0, 0, index));

}
points.push(new THREE.Vector3(0, 0, 0));
//#endregion

//#region axis
const axisX = [];
const axisZ = [];
const axisY = [];

axisX.push(new THREE.Vector3(-coordinateSize, 0.001, 0));
axisX.push(new THREE.Vector3(coordinateSize, 0.001, 0));

axisZ.push(new THREE.Vector3(0, 0.001, -coordinateSize));
axisZ.push(new THREE.Vector3(0, 0.001, coordinateSize));

axisY.push(new THREE.Vector3(0, 0, 0.001));
axisY.push(new THREE.Vector3(0, coordinateSize, 0.001));
//#endregion


const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xa5abb5,
    linewidth: 1,
});



//buffers
const geometryLine = new THREE.BufferGeometry().setFromPoints(points);
const geometryAxisX = new THREE.BufferGeometry().setFromPoints(axisX);
const geometryAxisZ = new THREE.BufferGeometry().setFromPoints(axisZ);
const geometryAxisY = new THREE.BufferGeometry().setFromPoints(axisY);


//elements
const grid = new THREE.Line(geometryLine, LineMaterialByColor('#a5abb5', .1));
const axisXLine = new THREE.Line(geometryAxisX, LineMaterialByColor('#13a818'));
const axisZLine = new THREE.Line(geometryAxisZ, LineMaterialByColor('#9e0b00'));
const axisYLine = new THREE.Line(geometryAxisY, LineMaterialByColor('#9e3b00'));

scene.add(grid);
scene.add(axisXLine);
scene.add(axisZLine);
scene.add(axisYLine);

camera.position.set(5, 5, 5);
controls.update();
var renderWindow = document.getElementsByClassName('renderWindow')[0];
renderWindow.appendChild(renderer.domElement);
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
animate();






function openModalWindow() {

}
var cylinderWindowHandler = {
    open: function () {
        var renderWindow = document.getElementsByClassName('cylinder')[0];
        renderWindow.style.display = "flex";
        
    },

    close: function () {
        var renderWindow = document.getElementsByClassName('cylinder')[0];
        renderWindow.style.display = "none";
    },

   // addRadius:function(){
     //   return  document.getElementById('cylinder_radius_value').value;
    //},s

    draw:function(){    
        var t =[]
        var radius = document.getElementById('cylinder_radius_value').value
        Objects.forEach(element => {
            if (element.selected == true && element.type == "point") {
               t.push(element.obj.geometry.vertices[0]);
            }
        });
        //var horda = Math.sqrt(Math.pow(t[1].x-t[0].x)+Math.pow(t[1].y-t[0].y)+Math.pow(t[1].z-t[0].z))
        var ab = t[0].x+(t[1].x-t[0].x)/2
        //var bz = t[0].y+(t[1].y-t[0].y)/2
        var hz = t[0].z+(t[1].z-t[0].z)/2
        var h = Math.sqrt((t[0].x-t[1].x)*(t[0].x-t[1].x)+(t[0].y-t[1].y)*(t[0].y-t[1].y)+(t[0].z-t[1].z)*(t[0].z-t[1].z))
        const geometry = new THREE.CylinderGeometry( radius, radius, h, 32 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        const cylinder = new THREE.Mesh( geometry, material );
        cylinder.position.set(ab,h*2, hz);
        scene.add(cylinder)
        Objects.push({ id: ++GlobalIndex, obj: cylinder, type: "cylinder", selected: false });

        addObjectToUIList({
            name: "Cylinder" + GlobalIndex,
            id: GlobalIndex,
        });
        unSelectAll();
        

    },  



}

var modalWindowHandler = {
    open: function () {
        var renderWindow = document.getElementsByClassName('modalWindow')[0];
        renderWindow.style.display = "flex";
        document.getElementById('modal-point-input-name').value = `NewPoint${GlobalIndex + 1}`
        setTimeout(() => {
            document.getElementById('modal-point-input').focus();
        }, 0);
    },
    close: function () {
        var renderWindow = document.getElementsByClassName('modalWindow')[0];
        renderWindow.style.display = "none";
    },
    keyUp: function inputKeyUp(e) {
        e.which = e.which || e.keyCode;
        console.log("Key up");
        if (e.which == 13) {
            this.addClick();
            e.target.value = "";
        }
        else if (e.which == 27) {
            e.target.value = "";
            this.close();
        }
    },
    addClick: function () {

        var coordinate = document.getElementById('modal-point-input').value;
        var values = coordinate.split(" ");
        let geom = new THREE.Geometry();
        geom.vertices.push(new THREE.Vector3(parseInt(values[0]), parseInt(values[1]), parseInt(values[2])));
        let materialDot = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: {
                size: { value: 5 },
                scale: { value: 1 },
                color: { value: new THREE.Color('blue') }
            },
            vertexShader: THREE.ShaderLib.points.vertexShader,
            fragmentShader: `
                            uniform vec3 color;
                            void main() {
                                vec2 xy = gl_PointCoord.xy - vec2(0.5);
                                float ll = length(xy);
                                gl_FragColor = vec4(color, step(ll, 0.5));
                            }
                            `
        });
        let dot = new THREE.Points(geom, materialDot);

        Objects.push({ id: ++GlobalIndex, obj: dot, type: "point", selected: false });

        scene.add(dot);
        var pointName = document.getElementById('modal-point-input-name');

        addObjectToUIList({
            name: pointName.value,
            id: GlobalIndex
        });
        pointName.value = `NewPoint${GlobalIndex + 1}`;
    }
}


var planeHandler = {
    click: function () {
        var geometryPlane = new THREE.Geometry();

        Objects.forEach(element => {
            if (element.selected == true && element.type == "point") {
                geometryPlane.vertices.push(element.obj.geometry.vertices[0]);
            }
        });

        geometryPlane.faces.push(new THREE.Face3(0, 1, 2));
        if (geometryPlane.vertices.length > 3) {
            for (let index = 1; index + 2 < geometryPlane.vertices.length; index++) {
                geometryPlane.faces.push(new THREE.Face3(index, index + 1, index + 2));
            }
        }
        geometryPlane.dynamic = true;

        var rColor = new THREE.Color(0xffffff);
        rColor.setHex(Math.random() * 0xffffff);

        var shapeMesh = new THREE.Mesh(geometryPlane, new THREE.MeshBasicMaterial({ color: rColor, side: THREE.DoubleSide }));
        scene.add(shapeMesh);
        Objects.push({ id: ++GlobalIndex, obj: shapeMesh, type: "plane", selected: false });

        addObjectToUIList({
            name: "Plane" + GlobalIndex,
            id: GlobalIndex,
        });

        unSelectAll();
    },
    change: function () {
        Objects[0].obj.rotation.x += 0.05;
    }
}

function addObjectToUIList(object) {
    var UIList = document.getElementsByClassName("object-list")[0];
    var newItem = document.createElement('li');
    newItem.innerText = object.name;
    newItem.dataset.id = object.id;
    newItem.dataset.selected = false;
    newItem.onclick = (e) => {
        console.log(e.target.dataset.id);
        var pointIndex = Objects.findIndex((el) => {
            return el.id == e.target.dataset.id && el.type == "point";
        });
        if (pointIndex != -1) {
            if (Objects[pointIndex].selected == true) {
                e.target.style.color = "black";
                Objects[pointIndex].selected = false;
                e.target.dataset.selected = false;
            }
            else {
                e.target.style.color = "azure";
                e.target.dataset.selected = true;
                Objects[pointIndex].selected = true;
            }
            return;
        }

        var planeIndex = Objects.findIndex((el) => {
            return el.id == e.target.dataset.id && el.type == "plane";
        });
        if (planeIndex != -1) {
            if (Objects[planeIndex].selected == true) {
                e.target.style.color = "black";
                Objects[planeIndex].selected = false;
                e.target.dataset.selected = false;
            }
            else {
                e.target.style.color = "azure";
                e.target.dataset.selected = true;
                Objects[planeIndex].selected = true;
            }
            return;
        }
        
        var cylinderIndex = Objects.findIndex((el) => {
            return el.id == e.target.dataset.id && el.type == "cylinder";
        });
        if (cylinderIndex != -1) {
            if (Objects[cylinderIndex].selected == true) {
                e.target.style.color = "black";
                Objects[cylinderIndex].selected = false;
                e.target.dataset.selected = false;
            }
            else {
                e.target.style.color = "azure";
                e.target.dataset.selected = true;
                Objects[cylinderIndex].selected = true;
            }
            return;
        }
    };
    UIList.appendChild(newItem);
}

function unSelectAll() {
    var listItems = document.getElementsByClassName("object-list")[0].childNodes;
    setTimeout(() => {
        for (i = 1; i < listItems.length; i++) listItems[i].style.color = "black";
        Objects.forEach((element) => {
            element.selected = false;
        });
    }, 0);

}

var ObjectHandler = {
    delete: function () {
        var listItems = document.getElementsByClassName("object-list","cylinder")[0].childNodes;
        for (i = 1; i < listItems.length; i++) {
        }
        for (i = 1; i < listItems.length; i++) {
            console.log(listItems[i].dataset);
            if (listItems[i].dataset.selected == "true") {
                Objects.forEach((element) => {
                    if (element.id == listItems[i].dataset.id && element.selected == true) {
                        scene.remove(element.obj);
                        document.getElementsByClassName("object-list","cylinder")[0].removeChild(listItems[i]);
                    }
                });

            }
        }
        unSelectAll();
    }
}