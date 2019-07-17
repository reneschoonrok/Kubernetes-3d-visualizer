function init() {

    document.getElementById('customnamespace').value = 'custom';
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 4000;

    scene = new THREE.Scene();
    sceneGl = new THREE.Scene(); //glscene

    image.addEventListener('load', function(event) {


			  }, false);

    var boxGeom = new THREE.CubeGeometry(200, 200, 0.1);//glscene
    //var boxNNGeom = new THREE.CubeGeometry(200, 200, 0.02);//glscene
    var boxGeomdocker = new THREE.CubeGeometry(256, 256, 5.0);//glscene
    var texture = new THREE.TextureLoader().load( './img/logoleeg3.png' );//glscene

	var material = new THREE.MeshBasicMaterial( { map: texture, opacity: 0.7} );//glscene
	material.transparent = true;

	var logoTexture = new THREE.ImageUtils.loadTexture( './img/Kubernetes2.png' );
	logonodetexture = new TextureAnimator( logoTexture, 1, 1, 1, 1000 ); // texture, #horiz, #vert, #total, duration.
	var logoMaterial = new THREE.MeshBasicMaterial( { map: logoTexture, side:THREE.DoubleSide } );
	logoMaterial.transparent = true;

    //var NNTexture = new THREE.ImageUtils.loadTexture( './img/NN.png' );
   // NNnodetexture = new TextureAnimator( NNTexture, 1, 1, 1, 1000 ); // texture, #horiz, #vert, #total, duration.
   // var NNMaterial = new THREE.MeshBasicMaterial( { map: NNTexture, side:THREE.DoubleSide } );
    //NNMaterial.transparent = true;


	var dockerTexture = new THREE.ImageUtils.loadTexture( './img/Dockerlogo7.png' );
    	dockernodetexture = new TextureAnimator( dockerTexture, 8, 1, 8, 200 ); // texture, #horiz, #vert, #total, duration.
    	var dockerMaterial = new THREE.MeshBasicMaterial( { map: dockerTexture, side:THREE.DoubleSide } );
    	dockerMaterial.transparent = false;


	cube = new THREE.Mesh( boxGeom, logoMaterial );//glscene

    cube.position.copy(new THREE.Vector3(-1030, 1000, 0));//glscene

    //NNcube = new THREE.Mesh( boxNNGeom, NNMaterial );//glscene

    //NNcube.position.copy(new THREE.Vector3(830, 1000, 0));//glscene

	cubedocker = new THREE.Mesh( boxGeomdocker, dockerMaterial );//glscene

    cubedocker.position.copy(new THREE.Vector3(500, 970, 0));//glscene


    var boxGeomlogo2 = new THREE.CubeGeometry(1200, 200, 0.1);//glscene
    var texturelogo2 = new THREE.TextureLoader().load( './img/kubernetesword1.png' );//glscene

	var materiallogo2 = new THREE.MeshBasicMaterial( { map: texturelogo2, opacity: 0.7} );//glscene
	materiallogo2.transparent = false;



	cube44 = new THREE.Mesh( boxGeomlogo2, materiallogo2 );//glscene

    cube44.position.copy(new THREE.Vector3(-260, 1000, 0));//glscene
    cube44.type='logo';
    cube.type='logo';
    //NNcube.type='logo';
    cubedocker.type='logo';
    sceneGl.add(cube44);//glscene
    sceneGl.add(cube);//glscene
    //sceneGl.add(NNcube);//glscene
    sceneGl.add(cubedocker);//glscene

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
    controls.rotateSpeed = 0.8;
    controls.minDistance = 100;
    controls.maxDistance = 6000;
    controls.addEventListener( 'change', render );

	//create3dPage( 100, 100, new THREE.Vector3(550, 500, 0),  new THREE.Vector3(0, 45 * Math.PI / 180, 0), 'https://threejs.org/examples/#webgl_materials_envmaps_exr');

    var button = document.getElementById( 'refresh' );
    button.addEventListener( 'click', function () {

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
                    xhttp.open('GET', '/deletepod?mynamespace='+mynamespace+'&podname='+info[0]+'&myauthtoken='+myauthtoken, true);
                   xhttp.send();
                }
    }, false );

    var buttonadd = document.getElementById( 'detail13' );
    buttonadd.addEventListener( 'click', function () {
             if (buttonadd.innerHTML=='Open url'){
                    open( info[1], "_blank");
             }

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
    loadresourcetypes();
    loadnamespaces();
    loadnodes();
    window.addEventListener( 'resize', onWindowResize, false );
}


