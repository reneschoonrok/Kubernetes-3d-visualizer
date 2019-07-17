function loadinfo() {

  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', '/pods?mynamespace='+mynamespace, true);
  //xhttp.open("GET", "http://localhost:8001/api/v1/namespaces/"+mynamespace+"/pods/", true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var response = JSON.parse(xhttp.responseText);
    //console.log(response);
    var response1 = jsonPath(response , "$..spec.containers[0].name");
    var response2 = jsonPath(response , "$..status.phase");
    var response3 = jsonPath(response , "$..status.containerStatuses[0].restartCount");
    var response4 = jsonPath(response , "$..status.containerStatuses[0].ready");
    var response5 = jsonPath(response , "$..spec.containers[0].image");
    var response6 = jsonPath(response , "$..status.startTime");
    var response7 = jsonPath(response , "$..metadata.name");
    var response8 = jsonPath(response , "$..status.phase");
    //console.log(response7);

    var arrayLength = response1.length;
    var j = 0;
    for (var i = 0; i < arrayLength; i++) {
        podinfo[j] = response1[i];
        podinfo[j+1] = "-Restarts: " + response3[i];
        podinfo[j+2] = "rgba(147, 232, 44,0.10)"; //pod background color

        if (i < 6) {
          podinfo[j+3] = 5 + (i*3);
          podinfo[j+4] = 3 ; //rij links rechts
        } else{
          podinfo[j+3] = 5 + ((i-6)*3);
          podinfo[j+4] = 4 ; //rij links rechts
        }

        podinfo[j+5] = "-Ready: " + response4[i];
        podinfo[j+6] = "-Image: " + response5.length;
        //podinfo[j+7] = "-Started at: " + response6[i];
        podinfo[j+7] = "-Podstatus: " + response8[i];
        podinfo[j+8] = response7[i];
        j = j + 9;
    }
    //console.log(podinfo);
  }
};
  //clear the scene before filling it again
  var endcounter = scene.children.length-1;
      for (var i = endcounter; i >= 0; i--){
         if (scene.children[i].type== 'pod'){
           scene.remove(scene.children[i]);
         }
   }

   for (var i = sceneGl.children.length-1; i > -1; i -= 1){
      if (sceneGl.children[i].type== 'Glpod'){
         sceneGl.remove(sceneGl.children[i]);
      }

   }


    for ( var i = 0; i < podinfo.length; i += 9 ) {

        var element = document.createElement( 'div' );
        element.className = 'podelement';
        element.style.backgroundColor = podinfo[ i + 2 ];

        element.addEventListener( 'click', function (event) {
             var xhttp = new XMLHttpRequest();
                        xhttp.open('GET', '/poddetail?mynamespace='+mynamespace+'&mypoddetail='+event.currentTarget.childNodes[2].id, true);
                        //xhttp.open("GET", "http://localhost:8001/api/v1/namespaces/"+mynamespace+"/pods/"+event.currentTarget.childNodes[2].id, true);
                        xhttp.send();
                        xhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                var response = JSON.parse(xhttp.responseText);
                                //console.log(response);
                                info[0] = jsonPath(response , "$..metadata.name");

                                var response5 = jsonPath(response , "$.spec.containers[*].image");

                                areatext1.value= '';
                                areatext1.value+='Podname         : ' + jsonPath(response , "$..metadata.name")+ "\r\n";
                                areatext1.value+='Pod IP          : ' + jsonPath(response , "$..status.podIP")+ "\r\n";
                                areatext1.value+='Podstatus       : ' + jsonPath(response , "$..status.phase")+ "\r\n";
                                areatext1.value+='Pod starttime   : ' + jsonPath(response , "$..status.startTime")+ "\r\n";
                                areatext1.value+='Images          : ' + jsonPath(response , "$..spec.containers[*].image")+ "\r\n";
                                areatext1.value+='Containers #    : ' + response5.length+ "\r\n";
                                areatext1.value+='Cont.restarts   : ' +  jsonPath(response ,"$..status.containerStatuses[*].restartCount")+ "\r\n";
                                areatext1.value+='Containers ready: ' + jsonPath(response , "$..status.containerStatuses[*].ready")+ "\r\n";
                                areatext1.value+='Container ports : ' + jsonPath(response , "$..spec.containers[*].ports[0].containerPort")+ "\r\n";
                                areatext1.value+='cpu requests    : ' + jsonPath(response , "$..spec.containers[*].resources.requests.cpu")+ "\r\n";
                                areatext1.value+='memory requests : ' + jsonPath(response , "$..spec.containers[*].resources.requests.memory")+ "\r\n";
                                areatext1.value+='cpu limits      : ' + jsonPath(response , "$..spec.containers[*].resources.limits.cpu")+ "\r\n";
                                areatext1.value+='memory limits   : ' + jsonPath(response , "$..spec.containers[*].resources.limits.memory")+ "\r\n";


                                //detail9.innerHTML = 'Pod starttime     : ' + jsonPath(response , "$.status.startTime");
                                //detail12.innerHTML = jsonPath(response , "$.metadata.selfLink");
                                //detail10.innerHTML = 'Open spec';
                                detail11.innerHTML = 'Delete pod';
                                detail13.innerHTML = '';
                                detail14.innerHTML = '';
                            }
                        }

        }, false );

        element.addEventListener( 'contextmenu', function (event) {
                     var xhttp = new XMLHttpRequest();
                                xhttp.open('GET', '/podlogs?mynamespace='+mynamespace+'&mypoddetail='+event.currentTarget.childNodes[2].id+'&myauthtoken='+myauthtoken, true);
                                //xhttp.open("GET", "http://localhost:8001/api/v1/namespaces/"+mynamespace+"/pods/"+event.target.children[2].id+"/log?tailLines=20", true);
                                xhttp.send();
                                xhttp.onreadystatechange = function() {
                                    if (this.readyState == 4 && this.status == 200) {
                                        var response = JSON.parse(xhttp.responseText);
                                        var responsestr = response.body.split("\n");
                                        for (var i = 0; i < responsestr.length; i++) {
                                            areatext.value +=responsestr[i];
                                            areatext.value +="\r\n";
                                        }

                                        //areatext.value += response
                                        areatext.scrollTop = areatext.scrollHeight;


                                    }
                                }

                }, false );

        var number = document.createElement( 'div' );
        number.textContent = podinfo[ i + 5 ];
        if ( number.textContent == "-Ready: false") { number.className = 'numberbad';};
        if ( number.textContent == "-Ready: ") { number.className = 'numbergood';};
        if ( number.textContent == "-Ready: true") { number.className = 'numberbest';}
        element.appendChild( number );

        var symbol = document.createElement( 'div' );
        symbol.className = 'symbol';
        symbol.textContent = podinfo[ i ];
        element.appendChild( symbol );

        var details = document.createElement( 'div' );
        details.className = 'restarts';
        var podname = document.createElement('podname'); // is a node
        //podname.className = 'restarts';
        //podname.align = podinfo[ i + 1 ];
        //podname.detail1 = podinfo[ i + 1 ];
        details.appendChild(podname)

        var mypodrow = document.createElement('mypodrow'); // is a node
        mypodrow.align = podinfo[ i + 3 ];
        details.appendChild(mypodrow)

        var mypodcolumn = document.createElement('mypodcolumn'); // is a node
        mypodcolumn.align = podinfo[ i + 4 ];
        details.appendChild(mypodcolumn)

        var imageid = document.createElement('imageid'); // is a node
        imageid.align = podinfo[ i + 6 ];
        details.appendChild(imageid)

        var startedat = document.createElement('startedat'); // is a node
        startedat.align = podinfo[ i + 7 ];
        details.appendChild(startedat)

        var xpos = document.createElement('xpos'); // is a node
        xpos.align = ( podinfo[ i + 3 ] * 140 ) - 1230;
        details.appendChild(xpos)

        var podreplicaname = document.createElement('podreplicaname'); // is a node
        podreplicaname.align = podinfo[ i + 8 ];
        details.appendChild(podreplicaname)

        details.className = 'details';
        details.innerHTML = podinfo[ i + 1 ];
        details.align = podinfo[ i + 6 ];
        details.title = podinfo[ i + 7 ];
        details.id = podinfo[ i + 8 ];
        details.tabIndex = ( podinfo[ i + 3 ] * 140 ) - 1230;
        element.appendChild( details );

        var deletebtn = document.createElement( 'div' );
        deletebtn.textContent = "Select";
        deletebtn.className = 'delete';
        element.appendChild( deletebtn );

        var podstatus = document.createElement( 'div' );
        podstatus.textContent = podinfo[ i + 7 ];

        if ( podstatus.textContent == "-Podstatus: Running") {
           podstatus.className = 'podgood';
           cubecontainer = new THREE.Mesh( boxGeom1, materialready );//glscene
        } else {
           podstatus.className = 'podbad';
           cubecontainer = new THREE.Mesh( boxGeom1, materialnotready );//glscene

        };
        element.appendChild( podstatus );
        var object = new THREE.CSS3DObject( element );
        object.position.x = ( podinfo[ i + 3 ] * 140 ) - 1360;
        object.position.y = - ( podinfo[ i + 4 ] * 130 ) + 1030;
        object.type = 'pod';
        cubecontainer.position.copy(new THREE.Vector3(object.position.x+160,object.position.y-40, 0));//glscene
        cubecontainer.type='Glpod'
        sceneGl.add(cubecontainer);//glscene
        scene.add( object );
        objects.push( object );
    }

}