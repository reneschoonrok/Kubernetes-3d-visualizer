function loadinfo() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8001/api/v1/namespaces/"+mynamespace+"/pods/", true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var response = JSON.parse(xhttp.responseText);
    //console.log(response);
    var response1 = jsonPath(response , "$..spec.containers[0].name");
    var response2 = jsonPath(response , "$..status.phase");
    var response3 = jsonPath(response , "$..status.containerStatuses[0].restartCount");
    var response4 = jsonPath(response , "$..status.containerStatuses[0].ready");
    var response5 = jsonPath(response , "$..spec.containers[*].image");
    var response6 = jsonPath(response , "$..status.startTime");
    var response7 = jsonPath(response , "$..metadata.name");
    var response8 = jsonPath(response , "$..status.phase");
    console.log(response7);

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
        //} else if (i < 12) {
          podinfo[j+3] = 5 + ((i-6)*3);
          podinfo[j+4] = 4 ; //rij links rechts
        //} else {
        //  podinfo[j+3] = 5 + ((i-12)*3);
        //  podinfo[j+4] = 5 ; //rij links rechts
        }


        podinfo[j+5] = "-Ready: " + response4[i];
        podinfo[j+6] = "-Image: " + response5[i];
        //podinfo[j+7] = "-Started at: " + response6[i];
        podinfo[j+7] = "-Podstatus: " + response8[i];
        podinfo[j+8] = response7[i];
        j = j + 9;
    }
    console.log(podinfo);
  }
};


    for ( var i = 0; i < resourcetypes.length; i += 6 ) {

        var resourcetype = document.createElement( 'div' );
        resourcetype.className = 'element';
        resourcetype.style.backgroundColor = resourcetypes[ i + 2 ];


        var number = document.createElement( 'div' );
        number.className = 'number';
        number.textContent = resourcetypes[ i + 5 ];
        resourcetype.appendChild( number );

        var symbol = document.createElement( 'div' );
        symbol.className = 'symbol';
        symbol.textContent = resourcetypes[ i ];
        resourcetype.appendChild( symbol );

        var details = document.createElement( 'div' );
        details.className = 'details';
        resourcetype.appendChild( details );

        var object = new THREE.CSS3DObject( resourcetype );
        object.position.x = object.position.x = ( resourcetypes[ i + 3 ] * 140 ) - 1210;
        object.position.y = - ( resourcetypes[ i + 4 ] * 180 ) + 990;
        scene.add( object );
        objects.push( object );
    }

    for ( var i = 0; i < namespaces.length; i += 6 ) {

        var namespace = document.createElement( 'div' );
        namespace.addEventListener( 'click', function (event) {
            mynamespace = event.currentTarget.childNodes[1].textContent;
            podinfo.splice(0, podinfo.length)}, false
        );

        namespace.className = 'element';
        namespace.style.backgroundColor = namespaces[ i + 2 ];

        var number = document.createElement( 'div' );
        number.className = 'number';
        number.textContent = namespaces[ i + 5 ];
        namespace.appendChild( number );

        var symbol = document.createElement( 'div' );
        symbol.className = 'symbol';
        symbol.textContent = namespaces[ i ];
        namespace.appendChild( symbol );

        var details = document.createElement( 'div' );
        details.className = 'details';
        namespace.appendChild( details );

        var object = new THREE.CSS3DObject( namespace );
        object.position.x = object.position.x = ( namespaces[ i + 3 ] * 140 ) - 1330;
        object.position.y = - ( namespaces[ i + 4 ] * 180 ) + 990;
        scene.add( object );
        objects.push( object );
    }


    for ( var i = 0; i < podinfo.length; i += 9 ) {

        var element = document.createElement( 'div' );
        element.className = 'element';
        element.style.backgroundColor = podinfo[ i + 2 ];

        element.addEventListener( 'click', function (event) {
             var xhttp = new XMLHttpRequest();
                        xhttp.open("GET", "http://localhost:8001/api/v1/namespaces/"+mynamespace+"/pods/"+event.currentTarget.childNodes[2].id, true);
                        xhttp.send();
                        xhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                var response = JSON.parse(xhttp.responseText);
                                //console.log(response);
                                detail0.innerHTML = "http://localhost:8001/api/v1/namespaces/"+mynamespace+"/pods/" + jsonPath(response , "$.metadata.name");
                                detail1.innerHTML = 'Podname           : ' + jsonPath(response , "$.metadata.name");
                                detail2.innerHTML = 'Pod IP            : ' + jsonPath(response , "$.status.podIP");
                                detail3.innerHTML = 'Podstatus         : ' + jsonPath(response , "$.status.phase");
                                detail4.innerHTML = 'Images            : ' + jsonPath(response , "$.spec.containers[*].image");
                                var response5 = jsonPath(response , "$.spec.containers[*].image");
                                detail5.innerHTML = 'Containers in pod : ' + response5.length;
                                //var response2 = jsonPath(response , "$.status.phase");
                                detail6.innerHTML = 'Container restarts: ' +  jsonPath(response ,"$.status.containerStatuses[*].restartCount");
                                detail7.innerHTML = 'Containers ready  : ' + jsonPath(response , "$.status.containerStatuses[*].ready");
                                detail8.innerHTML = 'Container ports   : ' + jsonPath(response , "$.spec.containers[*].ports[0].containerPort");
                                detail9.innerHTML = 'Pod starttime     : ' + jsonPath(response , "$.status.startTime");
                                detail12.innerHTML = jsonPath(response , "$.metadata.selfLink");
                                detail10.innerHTML = 'Open spec';
                                detail11.innerHTML = 'Delete pod';
                                detail13.innerHTML = '';
                                detail14.innerHTML = '';
                            }
                        }

        }, false );

        element.addEventListener( 'contextmenu', function (event) {
                     var xhttp = new XMLHttpRequest();
                                xhttp.open("GET", "http://localhost:8001/api/v1/namespaces/"+mynamespace+"/pods/"+event.target.children[2].id+"/log?tailLines=10", true);
                                xhttp.send();
                                xhttp.onreadystatechange = function() {
                                    if (this.readyState == 4 && this.status == 200) {
                                        var response = xhttp.responseText;
                                        // split by new line
                                        var lines = [];
                                        lines = response.split(/\n/);

                                        detail_log1.innerHTML = 'Last 10 loglines:';
                                        detail_log2.innerHTML = lines[0];
                                        detail_log3.innerHTML = lines[1];
                                        detail_log4.innerHTML = lines[2];
                                        detail_log5.innerHTML = lines[3];
                                        detail_log6.innerHTML = lines[4];
                                        detail_log7.innerHTML = lines[5];
                                        detail_log8.innerHTML = lines[6];
                                        detail_log9.innerHTML = lines[7];
                                        detail_log10.innerHTML = lines[8];
                                        detail_log11.innerHTML = lines[9];

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
        podstatus.className = 'podbad';
        if ( podstatus.textContent == "-Podstatus: Running") { podstatus.className = 'podgood';};
        element.appendChild( podstatus );

        var object = new THREE.CSS3DObject( element );
        object.position.x = ( podinfo[ i + 3 ] * 140 ) - 1330;
        object.position.y = - ( podinfo[ i + 4 ] * 180 ) + 990;

        scene.add( object );

        objects.push( object );



    }

}