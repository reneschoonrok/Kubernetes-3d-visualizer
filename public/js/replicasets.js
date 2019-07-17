function loadreplicasets() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8001/apis/apps/v1/namespaces/"+mynamespace+"/replicasets/", true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var response = JSON.parse(xhttp.responseText);
    //console.log(response);
    var response1 = jsonPath(response , "$.items[*].metadata.name");
    var response2 = jsonPath(response , "$.items[*].spec.replicas");
    var response3 = jsonPath(response , "$.items[*].status.readyReplicas");
    var response4 = jsonPath(response , " ");
    var response5 = jsonPath(response , " ");
    var response6 = jsonPath(response , " ");
    var response7 = jsonPath(response , " ");
    var response8 = jsonPath(response , " ");
    //console.log(response7);

    var arrayLength = response1.length;
    var j = 0;
    for (var i = 0; i < arrayLength; i++) {
        replicaset[j] = response1[i];
        replicaset[j+1] = "-Replica's: " + response3[i];
        replicaset[j+2] = "rgba(56, 124, 52,0.2)"; //background of replicasets

        if (i < 6) {
          replicaset[j+3] = 5 + (i*3);
          replicaset[j+4] = 3 ; //rij links rechts
        } else if (i < 12) {
          replicaset[j+3] = 5 + ((i-6)*3);
          replicaset[j+4] = 4 ; //rij links rechts
        } else {
          replicaset[j+3] = 5 + ((i-12)*3);
          replicaset[j+4] = 5 ; //rij links rechts
        }


        replicaset[j+5] = "-Ready: " + response4[i];
        replicaset[j+6] = "-Image: " + response5[i];
        //replicaset[j+7] = "-Started at: " + response6[i];
        replicaset[j+7] = " ";
        replicaset[j+8] = response7[i];
        j = j + 9;
    }
    //console.log(replicaset);
  }
};


    for ( var i = 0; i < replicaset.length; i += 9 ) {

        var element = document.createElement( 'div' );
        element.className = 'element';
        element.style.backgroundColor = replicaset[ i + 2 ];

        element.addEventListener( 'click', function (event) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", 'http://localhost:8001/apis/apps/v1/namespaces/'+mynamespace+'/replicasets/'+ event.currentTarget.childNodes[1].textContent, true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(xhttp.responseText);
                    //console.log(response);
                    info[0] = "http://localhost:8001/apis/apps/v1/namespaces/"+mynamespace+"/replicasets/" + jsonPath(response , "$.metadata.name");
                    detail1.innerHTML = jsonPath(response , "$.metadata.name");
                    detail2.innerHTML = 'Replicas          : ' + jsonPath(response , "$.spec.replicas");
                    detail3.innerHTML = 'Readystatus       : ' + jsonPath(response , "$.status.readyReplicas");
                    detail4.innerHTML = 'Version            : ' + jsonPath(response , "$.metadata.labels.version");
                    var response5 = '';
                    detail5.innerHTML = jsonPath(response , "$.spec.replicas");
                    //var response2 = jsonPath(response , "$.status.phase");
                    detail6.innerHTML = '';
                    detail7.innerHTML = '';
                    //detail8.innerHTML = 'Add replica';
                    //detail9.innerHTML = 'Reduce replica';
                    detail12.innerHTML = jsonPath(response , "$.metadata.selfLink");
                    //detail10.innerHTML = 'Open spec';
                    detail11.innerHTML = ''; //don't delete replicasets from here
                    detail13.innerHTML = ' ';
                    detail14.innerHTML = ' ';
                }
            }
        }, false );

        var number = document.createElement( 'div' );
        number.textContent = replicaset[ i + 5 ];
        if ( number.textContent == "-Ready: false") { number.className = 'numberbad';};
        if ( number.textContent == "-Ready: ") { number.className = 'numbergood';};
        if ( number.textContent == "-Ready: true") { number.className = 'numberbest';}
        element.appendChild( number );


        var symbol = document.createElement( 'div' );
        symbol.className = 'symbol';
        symbol.textContent = replicaset[ i ];
        element.appendChild( symbol );

        var details = document.createElement( 'div' );
        details.className = 'restarts';
        var podname = document.createElement('podname'); // is a node
        //podname.className = 'restarts';
        //podname.align = replicaset[ i + 1 ];
        //podname.detail1 = replicaset[ i + 1 ];
        details.appendChild(podname)

        var mypodrow = document.createElement('mypodrow'); // is a node
        mypodrow.align = replicaset[ i + 3 ];
        details.appendChild(mypodrow)

        var mypodcolumn = document.createElement('mypodcolumn'); // is a node
        mypodcolumn.align = replicaset[ i + 4 ];
        details.appendChild(mypodcolumn)

        var imageid = document.createElement('imageid'); // is a node
        imageid.align = replicaset[ i + 6 ];
        details.appendChild(imageid)

        var startedat = document.createElement('startedat'); // is a node
        startedat.align = replicaset[ i + 7 ];
        details.appendChild(startedat)

        var xpos = document.createElement('xpos'); // is a node
        xpos.align = ( replicaset[ i + 3 ] * 140 ) - 1230;
        details.appendChild(xpos)

        var podreplicaname = document.createElement('podreplicaname'); // is a node
        podreplicaname.align = replicaset[ i + 8 ];
        details.appendChild(podreplicaname)

        details.className = 'details';
        details.innerHTML = replicaset[ i + 1 ];
        details.align = replicaset[ i + 6 ];
        details.title = replicaset[ i + 7 ];
        details.id = replicaset[ i + 8 ];
        details.tabIndex = ( replicaset[ i + 3 ] * 140 ) - 1230;
        element.appendChild( details );

        var deletebtn = document.createElement( 'div' );
        deletebtn.textContent = "Select";
        deletebtn.className = 'delete';
        element.appendChild( deletebtn );

        var podstatus = document.createElement( 'div' );
        podstatus.textContent = replicaset[ i + 7 ];
        podstatus.className = 'podbad';
        if ( podstatus.textContent == "-Podstatus: Running") { podstatus.className = 'podgood';};
        element.appendChild( podstatus );

        var object = new THREE.CSS3DObject( element );
        object.position.x = ( replicaset[ i + 3 ] * 140 ) - 1330;
        object.position.y = - ( replicaset[ i + 4 ] * 180 ) + 270;

        object.type = 'replicaset';

        scene.add( object );

        objects.push( object );


    }

}