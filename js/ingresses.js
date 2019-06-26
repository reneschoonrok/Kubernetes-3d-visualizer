function loadingresses() { //http://localhost:8001/apis/extensions/v1beta1/namespaces/dev/ingresses/
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8001/apis/extensions/v1beta1/namespaces/"+mynamespace+"/ingresses/", true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var response = JSON.parse(xhttp.responseText);
    //console.log(response);
    var response1 = jsonPath(response , "$.items[*].metadata.name");
    var response2 = jsonPath(response , "$.items[*].spec.rules[0].host");
    ingressurls = jsonPath(response , "$.items[*].spec.rules[0].host");
    var response3 = jsonPath(response , " ");
    var response4 = jsonPath(response , " ");
    var response5 = jsonPath(response , " ");
    var response6 = jsonPath(response , " ");
    var response7 = jsonPath(response , " ");
    var response8 = jsonPath(response , " ");
    //console.log(response7);

    var arrayLength = response1.length;
    var j = 0;
    for (var i = 0; i < arrayLength; i++) {
        ingressinfo[j] = response1[i];
        ingressinfo[j+1] = "-Url: " + response2[i];
        ingressinfo[j+2] = "rgba(237, 149, 61,0.2)"; //background of ingressinfos


        ingressinfo[j+3] = 5 + (i*3);
        ingressinfo[j+4] = 5 ; //rij links rechts


        ingressinfo[j+5] = " " ;
        ingressinfo[j+6] = "-Image: " + response5[i];
        //ingressinfo[j+7] = "-Started at: " + response6[i];
        ingressinfo[j+7] = " ";
        ingressinfo[j+8] = response7[i];
        j = j + 9;
    }
    //console.log(ingressinfo);
  }
};
   //clear the scene before filling it again
   var endcounter = scene.children.length-1;
      for (var i = endcounter; i >= 0; i--){
         if (scene.children[i].type== 'ingress'){
           scene.remove(scene.children[i]);
         }
   }

   for (var i = sceneGl.children.length-1; i > -1; i -= 1){
      if (sceneGl.children[i].type== 'Glingress'){
         sceneGl.remove(sceneGl.children[i]);
      }

   }

    for ( var i = 0; i < ingressinfo.length; i += 9 ) {

        var element = document.createElement( 'div' );
        element.className = 'element';
        element.style.backgroundColor = ingressinfo[ i + 2 ];

        element.addEventListener( 'click', function (event) {
           xhttp.open("GET", "http://localhost:8001/apis/extensions/v1beta1/namespaces/"+mynamespace+"/ingresses/"+event.currentTarget.childNodes[1].innerHTML, true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(xhttp.responseText);
                    //console.log(response);
                    info[0] = "http://localhost:8001/apis/extensions/v1beta1/namespaces/"+mynamespace+"/ingresses/" + jsonPath(response , "$.metadata.name");
                    if (httpsingress.checked){
                       info[1] = "https://"+jsonPath(response , '$.spec.rules[0].host');
                    } else {
                       info[1] = "http://"+jsonPath(response , '$.spec.rules[0].host');
                    };

                    var response5 = jsonPath(response , "$.spec.containers[*].image");

                    areatext1.value= '';
                    areatext1.value+='Ingressname     : ' + jsonPath(response , "$.metadata.name")+ "\r\n";
                    areatext1.value+='Url             : ' + jsonPath(response , '$.spec.rules[0].host')+ "\r\n";
                    //areatext1.value+='Scheme          : ' + jsonPath(response , "$.metadata.annotations[2]")+ "\r\n";
                    //areatext1.value+='Target-type     : ' + jsonPath(response , "$.metadata.annotations[3]")+ "\r\n";
                    //areatext1.value+='ingress class   : ' + jsonPath(response , "$.metadata.annotations[4]")+ "\r\n";


                    //detail9.innerHTML = 'Pod starttime     : ' + jsonPath(response , "$.status.startTime");
                    //detail12.innerHTML = jsonPath(response , "$.metadata.selfLink");
                    detail10.innerHTML = 'Open spec';
                    detail11.innerHTML = '';
                    detail13.innerHTML = 'Open url';
                    detail14.innerHTML = '';
                 }
             }
        }, false );

        element.addEventListener( 'contextmenu', function (event) {
                    open( info[1], "_blank");
        }, false );

        var number = document.createElement( 'div' );
        number.textContent = ingressinfo[ i + 5 ];
        if ( number.textContent == "-Ready: false") { number.className = 'numberbad';};
        if ( number.textContent == "-Ready: ") { number.className = 'numbergood';};
        if ( number.textContent == "-Ready: true") { number.className = 'numberbest';}
        element.appendChild( number );


        var symbol = document.createElement( 'div' );
        symbol.className = 'symbol';
        symbol.textContent = ingressinfo[ i ];
        element.appendChild( symbol );

        var details = document.createElement( 'div' );
        details.className = 'restarts';
        var ingressname = document.createElement('ingressname'); // is a node

        details.appendChild(ingressname)

        var myingressrow = document.createElement('myingressrow'); // is a node
        myingressrow.align = ingressinfo[ i + 3 ];
        details.appendChild(myingressrow)

        var myingresscolumn = document.createElement('myingresscolumn'); // is a node
        myingresscolumn.align = ingressinfo[ i + 4 ];
        details.appendChild(myingresscolumn)

        var imageid = document.createElement('imageid'); // is a node
        imageid.align = ingressinfo[ i + 6 ];
        details.appendChild(imageid)

        var startedat = document.createElement('startedat'); // is a node
        startedat.align = ingressinfo[ i + 7 ];
        details.appendChild(startedat)

        var xpos = document.createElement('xpos'); // is a node
        xpos.align = ( ingressinfo[ i + 3 ] * 140 ) - 1230;
        details.appendChild(xpos)

        var ingressreplicaname = document.createElement('ingressreplicaname'); // is a node
        ingressreplicaname.align = ingressinfo[ i + 8 ];
        details.appendChild(ingressreplicaname)

        details.className = 'ingressdetails';
        details.innerHTML = ingressinfo[ i + 1 ];
        details.align = ingressinfo[ i + 6 ];
        details.title = ingressinfo[ i + 7 ];
        details.id = ingressinfo[ i + 8 ];
        details.tabIndex = ( ingressinfo[ i + 3 ] * 140 ) - 1230;
        element.appendChild( details );

        var deletebtn = document.createElement( 'div' );
        deletebtn.textContent = "Select";
        deletebtn.className = 'delete';
        element.appendChild( deletebtn );

        var ingressstatus = document.createElement( 'div' );
        ingressstatus.textContent = ingressinfo[ i + 7 ];
        ingressstatus.className = 'ingressbad';
        if ( ingressstatus.textContent == "-ingressstatus: Running") { ingressstatus.className = 'ingressgood';};
        element.appendChild( ingressstatus );

        var object = new THREE.CSS3DObject( element );
        object.position.x = ( ingressinfo[ i + 3 ] * 140 ) - 1360;
        object.position.y = - ( ingressinfo[ i + 4 ] * 180 ) + 1080;
        object.type= 'ingress'

        scene.add( object );

        objects.push( object );

        var runner = new THREE.Mesh(runnerGeometry, runnerMaterial);
        runner.position.set(object.position.x+140,object.position.y-35,0);
        runner.type='Glingress';
        sceneGl.add(runner);



    }

}