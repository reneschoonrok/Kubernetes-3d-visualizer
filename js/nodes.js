function loadnodes() {
   var xhttp = new XMLHttpRequest();
   xhttp.open("GET", "http://localhost:8001/api/v1/nodes/", true);
   xhttp.send();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

      var response = JSON.parse(xhttp.responseText);

      var response7 = jsonPath(response , "$..metadata.name");
      console.log(response7);

      var arrayLength = response7.length;
      var j = 0;
      for (var i = 0; i < arrayLength; i++) {
         nodes[j] = response7[i];
         nodes[j+1] =response7[i];
         nodes[j+2] = "rgba(36, 61, 114,0.1)"; //nodes background color

         nodes[j+3] = 5 + (i*3);
         nodes[j+4] = 3 ; //rij links rechts

         j = j + 9;
      }
   }


   for ( var i = 0; i < nodes.length; i += 6 ) {
      var nodetype = document.createElement( 'div' );
      nodetype.className = 'element';
      nodetype.style.backgroundColor = nodes[ i + 2 ];

      var number = document.createElement( 'div' );
      number.className = 'number';
      number.textContent = nodes[ i + 5 ];
      nodetype.appendChild( number );

      var symbol = document.createElement( 'div' );
      symbol.className = 'symbol';
      symbol.textContent = nodes[ i ];
      nodetype.appendChild( symbol );

      var details = document.createElement( 'div' );
      details.className = 'details';
      details.id = nodes[ i ];

      nodetype.appendChild( details );

      var object = new THREE.CSS3DObject( nodetype );
      object.position.x = object.position.x = ( nodes[ i + 3 ] * 140 ) - 1330;
      object.position.y = - ( nodes[ i + 4 ] * 180 ) + 1350;
      scene.add( object );
      objects.push( object );


      nodetype.addEventListener( 'mouseover', function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://localhost:8001/api/v1/nodes/" + event.currentTarget.childNodes[2].id, true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(xhttp.responseText);
                    //console.log(response);
                    detail1.innerHTML = 'Nodename          : ' + jsonPath(response , "$.metadata.name");
                    detail2.innerHTML = 'Allocatable CPU   : ' + jsonPath(response , "$.status.allocatable.cpu");
                    detail3.innerHTML = 'Allocatable Mem   : ' + jsonPath(response , "$.status..allocatable.memory");
                    detail4.innerHTML = 'Allocatable Pods  : ' + jsonPath(response , "$.status.allocatable.pods");
                    detail5.innerHTML = 'Kubelet status    : ' + jsonPath(response , "$.status.conditions[3].message");
                    detail6.innerHTML = '' ;
                    detail7.innerHTML = '' ;
                    detail8.innerHTML = '' ;
                    detail9.innerHTML = '' ;
                    detail12.innerHTML = jsonPath(response , "$.metadata.selfLink");
                    detail10.innerHTML = 'Open spec';
                    detail11.innerHTML = '';
                    detail13.innerHTML = '';
                    detail14.innerHTML = '';

                }
            }

        }, false );


    }
}
};
