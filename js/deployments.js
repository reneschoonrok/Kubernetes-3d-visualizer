function loaddeployments() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8001/apis/apps/v1/namespaces/"+mynamespace+"/deployments/", true);
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
   // console.log(response7);

    var arrayLength = response1.length;
    var j = 0;
    for (var i = 0; i < arrayLength; i++) {
        deployment[j] = response1[i];
        deployment[j+1] = "-Replica's: " + response3[i];
        deployment[j+2] = "rgba(56, 124, 52,0.2)"; //background of deployments

        if (i < 6) {
          deployment[j+3] = 5 + (i*3);
          deployment[j+4] = 3 ; //rij links rechts
        } else if (i < 12) {
          deployment[j+3] = 5 + ((i-6)*3);
          deployment[j+4] = 4 ; //rij links rechts
        } else {
          deployment[j+3] = 5 + ((i-12)*3);
          deployment[j+4] = 5 ; //rij links rechts
        }


        deployment[j+5] = "-Ready: " + response4[i];
        deployment[j+6] = "-Image: " + response5[i];
        //deployment[j+7] = "-Started at: " + response6[i];
        deployment[j+7] = " ";
        deployment[j+8] = response7[i];
        j = j + 9;
    }
    //console.log(deployment);
  }
};


    for ( var i = 0; i < deployment.length; i += 9 ) {

        var element = document.createElement( 'div' );
        element.className = 'element';
        element.style.backgroundColor = deployment[ i + 2 ];

        element.addEventListener( 'click', function (event) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", 'http://localhost:8001/apis/apps/v1/namespaces/'+mynamespace+'/deployments/'+ event.currentTarget.childNodes[1].textContent, true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(xhttp.responseText);
                    //console.log(response);
                    info[0] = "http://localhost:8001/apis/apps/v1/namespaces/"+mynamespace+"/deployments/" + jsonPath(response , "$.metadata.name");
                    info[1]= jsonPath(response , "$.metadata.selfLink");
                    info[2]= jsonPath(response , "$.spec.replicas");
                    info[3]= jsonPath(response , "$.metadata.name");

                    areatext1.value= '';
                    areatext1.value+='Replica name: ' + jsonPath(response , "$.metadata.name")+ "\r\n";
                    areatext1.value+='Replica #   : ' + jsonPath(response , "$.spec.replicas")+ "\r\n";
                    areatext1.value+='Readystatus : ' + jsonPath(response , "$.status.readyReplicas")+ "\r\n";
                    areatext1.value+='Version     : ' + jsonPath(response , "$.metadata.labels.version")+ "\r\n";

                    detail10.innerHTML = 'Open spec';
                    detail11.innerHTML = ''; //dont delete deployments from here
                    detail13.innerHTML = 'Add one replica';
                    detail14.innerHTML = 'Reduce one replica';
                }
            }
        }, false );

        var number = document.createElement( 'div' );
        number.textContent = deployment[ i + 5 ];
        if ( number.textContent == "-Ready: false") { number.className = 'numberbad';};
        if ( number.textContent == "-Ready: ") { number.className = 'numbergood';};
        if ( number.textContent == "-Ready: true") { number.className = 'numberbest';}
        element.appendChild( number );


        var symbol = document.createElement( 'div' );
        symbol.className = 'symbol';
        symbol.textContent = deployment[ i ];
        element.appendChild( symbol );

        var details = document.createElement( 'div' );
        details.className = 'restarts';
        var podname = document.createElement('podname'); // is a node

        details.appendChild(podname)

        var mypodrow = document.createElement('mypodrow'); // is a node
        mypodrow.align = deployment[ i + 3 ];
        details.appendChild(mypodrow)

        var mypodcolumn = document.createElement('mypodcolumn'); // is a node
        mypodcolumn.align = deployment[ i + 4 ];
        details.appendChild(mypodcolumn)

        var imageid = document.createElement('imageid'); // is a node
        imageid.align = deployment[ i + 6 ];
        details.appendChild(imageid)

        var startedat = document.createElement('startedat'); // is a node
        startedat.align = deployment[ i + 7 ];
        details.appendChild(startedat)

        var xpos = document.createElement('xpos'); // is a node
        xpos.align = ( deployment[ i + 3 ] * 140 ) - 1230;
        details.appendChild(xpos)

        var podreplicaname = document.createElement('podreplicaname'); // is a node
        podreplicaname.align = deployment[ i + 8 ];
        details.appendChild(podreplicaname)

        details.className = 'details';
        details.innerHTML = deployment[ i + 1 ];
        details.align = deployment[ i + 6 ];
        details.title = deployment[ i + 7 ];
        details.id = deployment[ i + 8 ];
        details.tabIndex = ( deployment[ i + 3 ] * 140 ) - 1230;
        element.appendChild( details );

        var deletebtn = document.createElement( 'div' );
        deletebtn.textContent = "Select";
        deletebtn.className = 'delete';
        element.appendChild( deletebtn );

        var podstatus = document.createElement( 'div' );
        podstatus.textContent = deployment[ i + 7 ];
        podstatus.className = 'podbad';
        if ( podstatus.textContent == "-Podstatus: Running") { podstatus.className = 'podgood';};
        element.appendChild( podstatus );

        var object = new THREE.CSS3DObject( element );
        object.position.x = ( deployment[ i + 3 ] * 140 ) - 1330;
        object.position.y = - ( deployment[ i + 4 ] * 180 ) + 630;

        scene.add( object );

        objects.push( object );



    }

}