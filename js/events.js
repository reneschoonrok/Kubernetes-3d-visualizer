function loadevents() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8001/api/v1/namespaces/"+mynamespace+"/events/", true);

  //http://localhost:8001/api/v1/namespaces/default/events?limit=5

  xhttp.send();
  xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var response = JSON.parse(xhttp.responseText);
    //console.log(response);
    var response2 = jsonPath(response , "$.items[*].metadata.name");
    var response1 = jsonPath(response , "$.items[*].lastTimestamp");
    var response3 = jsonPath(response , "$.items[*].message");
    var response4 = jsonPath(response , "$.items[*].reason");
    var response5 = jsonPath(response , " ");
    var response6 = jsonPath(response , " ");
    var response7 = jsonPath(response , " ");
    var response8 = jsonPath(response , " ");
    //console.log(response7);

    var arrayLength = response1.length;
    var j = 0;
    for (var i = 0; i < arrayLength; i++) {
        eventinfo[j] = response1[i];
        eventinfo[j+1] = "-Message: " + response3[i];
        eventinfo[j+2] = "rgba(67, 114,183,0.2)"; //background of replicasets
        eventinfo[j+5] = response2[i];
        eventinfo[j+6] = "-Image: " + response5[i];
        //replicaset[j+7] = "-Started at: " + response6[i];
        eventinfo[j+7] = response4[i];
        eventinfo[j+8] = response7[i];
        j = j + 9;
    }
    //console.log(replicaset);
  }
};

   //clear the scene before filling it again
   var endcounter = scene.children.length-1;
      for (var i = endcounter; i >= 0; i--){
         if (scene.children[i].type== 'event'){
           scene.remove(scene.children[i]);
         }
   }

    var currentTime = new Date();
    //currentTime = currentTime.getTime() -  currentTime.getTime() / 1000;
    currentTime = (currentTime.getTime()-56000);
    var teller = 0;
    for ( var i = 0; i < eventinfo.length; i += 9 ) {


        if (currentTime > new Date(eventinfo[i])) {
           //console.log("skipping")
        } else {
           //console.log("not skipping")
           var element = document.createElement( 'div' );
           element.className = 'eventelement';
           element.style.backgroundColor = eventinfo[ i + 2 ];
           eventinfo[i+3] = 5 + (teller*3);
           eventinfo[i+4] = 2 ;
           teller +=1;
           //eventinfo[j+3] = 5 + (i*3);


           element.addEventListener( 'click', function (event) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", 'http://localhost:8001/api/v1/namespaces/'+mynamespace+'/events/'+ event.currentTarget.childNodes[0].textContent, true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(xhttp.responseText);
                    //console.log(response);
                    info[0] = "http://localhost:8001/api/v1/namespaces/"+mynamespace+"/events/" + jsonPath(response , "$.metadata.name");
                    detail12.innerHTML = jsonPath(response , "$.metadata.selfLink");
                    detail10.innerHTML = 'Open spec';
                    detail11.innerHTML = ''; //don't delete replicasets from here
                    detail13.innerHTML = ' ';
                    detail14.innerHTML = ' ';
                }
            }
        }, false );

        //var number = document.createElement( 'div' );
        //number.textContent = eventinfo[ i + 5 ];
        //if ( number.textContent == "-Ready: false") { number.className = 'numberbad';};
        //if ( number.textContent == "-Ready: ") { number.className = 'numbergood';};
        //if ( number.textContent == "-Ready: true") { number.className = 'numberbest';}
        //element.appendChild( number );


        var symbol = document.createElement( 'div' );
        symbol.className = 'symbol';
        symbol.textContent = eventinfo[ i + 5 ];
        element.appendChild( symbol );

        var details = document.createElement( 'div' );
        details.className = 'restarts';
        var podname = document.createElement('podname'); // is a node
        //podname.className = 'restarts';
        //podname.align = replicaset[ i + 1 ];
        //podname.detail1 = replicaset[ i + 1 ];
        details.appendChild(podname)

        var mypodrow = document.createElement('mypodrow'); // is a node
        mypodrow.align = eventinfo[ i + 3 ];
        details.appendChild(mypodrow)

        var mypodcolumn = document.createElement('mypodcolumn'); // is a node
        mypodcolumn.align = eventinfo[ i + 4 ];
        details.appendChild(mypodcolumn)

        var imageid = document.createElement('imageid'); // is a node
        imageid.align = eventinfo[ i + 6 ];
        details.appendChild(imageid)

        var startedat = document.createElement('startedat'); // is a node
        startedat.align = eventinfo[ i + 7 ];
        details.appendChild(startedat)

        var xpos = document.createElement('xpos'); // is a node
        xpos.align = ( eventinfo[ i + 3 ] * 140 ) - 1230;
        details.appendChild(xpos)

        var eventname = document.createElement('eventname'); // is a node
        eventname.align = eventinfo[ i + 8 ];
        details.appendChild(eventname)

        details.className = 'evt2details';
        details.innerHTML = eventinfo[ i + 1 ];
        details.align = eventinfo[ i + 6 ];
        details.title = eventinfo[ i + 7 ];
        details.id = eventinfo[ i + 8 ];
        details.tabIndex = ( eventinfo[ i + 3 ] * 140 ) - 1230;
        element.appendChild( details );

        var deletebtn = document.createElement( 'div' );
        deletebtn.textContent = "Select";
        deletebtn.className = 'delete';
        element.appendChild( deletebtn );

        var podstatus = document.createElement( 'div' );
        podstatus.textContent = eventinfo[ i + 7 ];
        podstatus.className = 'evtdetails';
       // if ( podstatus.textContent == "-Podstatus: Running") { podstatus.className = 'podgood';};
        element.appendChild( podstatus );

        var podstatus = document.createElement( 'div' );
        podstatus.textContent = eventinfo[ i ];
        podstatus.className = 'eventdetails2';
        // if ( podstatus.textContent == "-Podstatus: Running") { podstatus.className = 'podgood';};
        element.appendChild( podstatus );

        var object = new THREE.CSS3DObject( element );
        object.position.x = ( eventinfo[ i + 3 ] * 140 ) - 1360;
        object.position.y = - ( eventinfo[ i + 4 ] * 180 ) + 670;

        object.type = 'event';
        scene.add( object );

        objects.push( object );
        if (eventinfo[ i + 7 ] =='Killing') {
          var objecticon = new THREE.CSS3DSprite(image2.cloneNode());
          objecticon.position.set(object.position.x+165,object.position.y-35,0);
          objecticon.type = 'event';
          scene.add(objecticon);
        }

        if (eventinfo[ i + 7 ] =='Pulled') {
          var objecticon = new THREE.CSS3DSprite(image4.cloneNode());
          objecticon.position.set(object.position.x+165,object.position.y-35,0);
          objecticon.type = 'event';
          scene.add(objecticon);
        }

        if (eventinfo[ i + 7 ] =='Pulling') {
          var objecticon = new THREE.CSS3DSprite(image4.cloneNode());
          objecticon.position.set(object.position.x+165,object.position.y-35,0);
          objecticon.type = 'event';
          scene.add(objecticon);
        }

        if (eventinfo[ i + 7 ] =='Created') {
          var objecticon = new THREE.CSS3DSprite(image5.cloneNode());
          objecticon.position.set(object.position.x+165,object.position.y-35,0);
          objecticon.type = 'event';
          scene.add(objecticon);
        }

        if (eventinfo[ i + 7 ] =='Started') {
          var objecticon = new THREE.CSS3DSprite(image5.cloneNode());
          objecticon.position.set(object.position.x+165,object.position.y-35,0);
          objecticon.type = 'event';
          scene.add(objecticon);
        }


        if (eventinfo[ i + 7 ] =='Failed') {
          var objecticon = new THREE.CSS3DSprite(image3.cloneNode());
          objecticon.position.set(object.position.x+165,object.position.y-35,0);
          objecticon.type = 'event';
          scene.add(objecticon);
        }

        if (eventinfo[ i + 7 ] =='Unhealthy') {
          var objecticon = new THREE.CSS3DSprite(image3.cloneNode());
          objecticon.position.set(object.position.x+165,object.position.y-35,0);
          objecticon.type = 'event';
          scene.add(objecticon);
        }

        if (eventinfo[ i + 7 ] =='Scheduled') {
          var objecticon = new THREE.CSS3DSprite(image6.cloneNode());
          objecticon.position.set(object.position.x+165,object.position.y-35,0);
          objecticon.type = 'event';
          scene.add(objecticon);
        }

        if (eventinfo[ i + 7 ] =='SuccessfulCreate') {
          var objecticon = new THREE.CSS3DSprite(image7.cloneNode());
          objecticon.position.set(object.position.x+165,object.position.y-35,0);
          objecticon.type = 'event';
          scene.add(objecticon);
        }



    }
    }

}