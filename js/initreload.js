
function reload() {
    targets = { podinfo: [],  nodes: [], resourcetypes: [],  namespaces: [] };
    objects = [];
    while(scene.children.length > 0){
        scene.remove(scene.children[0]);
    }

    while(sceneGl.children.length > 1){
         sceneGl.remove(sceneGl.children[1]);
    }
    for (var member in resourcetypes) delete objects[resourcetypes];
    for (var member in nodes) delete objects[nodes];
    for (var member in targets.nodes) delete objects[targets.nodes];

    for (var member in targets.resourcetypes) delete objects[targets.resourcetypes];
    for (var member in targets.replicaset) delete objects[targets.replicaset];
    for (var member in targets.deployment) delete objects[targets.deployment];
    objects.clear;
    scene.clear;
    targets.clear;
    sceneGl.clear;
}


function init() {

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 4000;

    scene = new THREE.Scene();
    sceneGl = new THREE.Scene(); //glscene
    var speclink = '';


 image.addEventListener('load', function(event) {

			      objectlogo.position.x = 100,
			        objectlogo.position.y = 1220,
			        objectlogo.position.z = -500;
			        objectlogo.rotation.x +=0.01;
			      scene.add(objectlogo);
			      objects.push(objectlogo);

			  }, false);

    var boxGeom = new THREE.CubeGeometry(300, 300, 300);//glscene
    var texture = new THREE.TextureLoader().load( './img/Kubernetes.png' );//glscene


    //var boxGeom1 = new THREE.CubeGeometry(55,20, 20);//glscene
    //var texture1 = new THREE.TextureLoader().load( './img/container1.png' );//glscene

	var material = new THREE.MeshBasicMaterial( { map: texture, opacity: 0.7} );//glscene
	material.transparent = false;
	//var material1 = new THREE.MeshBasicMaterial( { map: texture1, opacity: 0.7} );//glscene
    //material1.transparent = false;

	cube = new THREE.Mesh( boxGeom, material );//glscene
    cube.position.copy(new THREE.Vector3(-1060, 1180, 50));//glscene

	//cube1 = new THREE.Mesh( boxGeom1, material1 );//glscene
    //cube1.position.copy(new THREE.Vector3(-660, 400, 0));//glscene

    sceneGl.add(cube);//glscene
    //sceneGl.add(cube1);//glscene
    //sceneGl.add(cube2);//glscene
    //sceneGl.add(cube3);//glscene
    rendererGl = new THREE.WebGLRenderer({alpha:true});//glscene
    rendererGl.setClearColor(0x00ff00, 0.0);//glscene

    rendererGl.setSize(window.innerWidth, window.innerHeight);//glscene
    rendererGl.domElement.style.position = 'absolute';//glscene
    rendererGl.domElement.style.zIndex = 0;//glscene
    rendererGl.domElement.style.top = 0;//glscene

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.domElement.style.top = 0;//glscene
    renderer.domElement.style.zIndex = 1;
    document.getElementById( 'container' ).appendChild( rendererGl.domElement );
    document.getElementById( 'container' ).appendChild( renderer.domElement );


    controls = new THREE.TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener( 'change', render );

	//create3dPage( 100, 100, new THREE.Vector3(550, 500, 0),  new THREE.Vector3(0, 45 * Math.PI / 180, 0), 'https://threejs.org/examples/#webgl_materials_envmaps_exr');

    var button = document.getElementById( 'refresh' );
    button.addEventListener( 'click', function () {
        reload();
        //loadnodes();
        loadinfo();
        loadreplicasets
        loaddeployments

    }, false );

    var button = document.getElementById( 'detail10' );
    button.addEventListener( 'click', function () {
        open( info[0], "_blank");
    }, false );

    var button = document.getElementById( 'detail11' );
    button.addEventListener( 'click', function () {
                if (detail11.innerHTML=='Delete pod')
                {
                   var deleteobject = info[0];
                   var xhttp = new XMLHttpRequest();
                   xhttp.open("DELETE", deleteobject, true);
                   xhttp.send();
                }
    }, false );

    var buttonadd = document.getElementById( 'detail13' );
    buttonadd.addEventListener( 'click', function () {

             if (buttonadd.innerHTML=='Add one replica'){

                       var xhttp = new XMLHttpRequest();
                         xhttp.open("GET", "http://localhost:8001/apis/extensions/v1beta1/namespaces/"+mynamespace+"/deployments/"+ info[3], true);
                         xhttp.send();
                         xhttp.onreadystatechange = function() {
                         if (this.readyState == 4 && this.status == 200) {
                           var newdeployments = parseInt(info[2] , 10)+ 1;
                           var response1 = xhttp.responseText;
                           var res = xhttp.responseText.replace('"replicas": '+ info[2] , '"replicas": '+ newdeployments);
                           var xhttp2 = new XMLHttpRequest();
                                             xhttp2.open("PUT", "http://localhost:8001/apis/extensions/v1beta1/namespaces/"+mynamespace+"/deployments/"+ info[3], true);
                                             xhttp2.setRequestHeader("Content-Type", "application/json");
                                             xhttp2.send(res);
                                             if (this.readyState == 4 && this.status == 200) {
                                             test=1;
                                             }
                           var test = 1;
                       }
                       }
              }

    }, false );


        var buttonreduce = document.getElementById( 'detail14' );
        buttonreduce.addEventListener( 'click', function () {

                 if (buttonreduce.innerHTML=='Reduce one replica'){

                           var xhttp = new XMLHttpRequest();
                             xhttp.open("GET", "http://localhost:8001/apis/extensions/v1beta1/namespaces/"+mynamespace+"/deployments/"+ info[3], true);
                             xhttp.send();
                             xhttp.onreadystatechange = function() {
                             if (this.readyState == 4 && this.status == 200) {
                               var newdeployments = parseInt(info[2] , 10)- 1;
                               var response1 = xhttp.responseText;
                               var res = xhttp.responseText.replace('"replicas": '+ info[2], '"replicas": '+ newdeployments);
                               var xhttp2 = new XMLHttpRequest();
                                                 xhttp2.open("PUT", "http://localhost:8001/apis/extensions/v1beta1/namespaces/"+mynamespace+"/deployments/"+ info[3], true);
                                                 xhttp2.setRequestHeader("Content-Type", "application/json");
                                                 xhttp2.send(res);
                                                 if (this.readyState == 4 && this.status == 200) {
                                                 test=1;
                                                 }
                               var test = 1;
                           }
                           }
                  }

        }, false );

    window.addEventListener( 'resize', onWindowResize, false );
}