function loadnodes() {
   var xhttp = new XMLHttpRequest();
   xhttp.open("GET", "http://localhost:8001/api/v1/nodes/", true);
   xhttp.send();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

      var response = JSON.parse(xhttp.responseText);

      var response7 = jsonPath(response , "$..metadata.name");
      //console.log(response7);

      var arrayLength = response7.length;
      var j = 0;
      for (var i = 0; i < arrayLength; i++) {
         nodeinfo[j] = response7[i];
         nodeinfo[j+1] =response7[i];
         nodeinfo[j+2] = "rgba(36, 61, 114,0.1)"; //nodes background color

         nodeinfo[j+3] = 5 + (i*3);
         nodeinfo[j+4] = 3 ; //rij links rechts

         j = j + 9;
      }
   }
};

   for ( var i = 0; i < nodeinfo.length; i += 9 ) {
      var element = document.createElement( 'div' );
      element.className = 'element';
      element.style.backgroundColor = nodeinfo[ i + 2 ];

      var number = document.createElement( 'div' );
      number.className = 'number';
      number.textContent = nodeinfo[ i + 5 ];
      element.appendChild( number );

      var symbol = document.createElement( 'div' );
      symbol.className = 'symbol';
      symbol.textContent = nodeinfo[ i ];
      element.appendChild( symbol );

      var details = document.createElement( 'div' );
      details.className = 'details';
      details.id = nodeinfo[ i ];

      element.appendChild( details );

      var object = new THREE.CSS3DObject( element );
      object.position.x = object.position.x = ( nodeinfo[ i + 3 ] * 140 ) - 1330;
      object.position.y = - ( nodeinfo[ i + 4 ] * 180 ) + 1350;
      scene.add( object );
      objects.push( object );

              var runner2 = new THREE.Mesh(runner2Geometry, runner2Material);
              runner2.position.set(object.position.x+165,object.position.y-45,0);
              sceneGl.add(runner2);


      //nodetype.addEventListener( 'mouseover', function () {
      //      var xhttp = new XMLHttpRequest();
      //      xhttp.open("GET", "http://localhost:8001/api/v1/nodes/" + event.currentTarget.childNodes[2].id, true);
      //      xhttp.send();
      //      xhttp.onreadystatechange = function() {
      //          if (this.readyState == 4 && this.status == 200) {
      //              var response = JSON.parse(xhttp.responseText);
                    //console.log(response);
                    //detail1.innerHTML = 'Nodename          : ' + jsonPath(response , "$.metadata.name");
                    //detail2.innerHTML = 'Allocatable CPU   : ' + jsonPath(response , "$.status.allocatable.cpu");
                    //detail3.innerHTML = 'Allocatable Mem   : ' + jsonPath(response , "$.status..allocatable.memory");
                    //detail4.innerHTML = 'Allocatable Pods  : ' + jsonPath(response , "$.status.allocatable.pods");
                    //detail5.innerHTML = 'Kubelet status    : ' + jsonPath(response , "$.status.conditions[3].message");
                    //detail6.innerHTML = '' ;
                    //detail7.innerHTML = '' ;
                    //detail8.innerHTML = '' ;
                    //detail9.innerHTML = '' ;
                    //detail12.innerHTML = jsonPath(response , "$.metadata.selfLink");
                    //detail10.innerHTML = 'Open spec';
                    //detail11.innerHTML = '';
                    //detail13.innerHTML = '';
                    //detail14.innerHTML = '';

        //        }
        //    }

        //}, false );


    }
}

