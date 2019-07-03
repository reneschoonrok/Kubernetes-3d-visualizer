function loadnamespaces() {

//"tst", "namespace", "rgba(0,127,127,0.2)", 14, 2, " "
 namespaces[24]=document.getElementById('customnamespace').value;
 namespaces[25]="namespace";
 namespaces[26]="rgba(0,127,127,0.2)";
 namespaces[27]=17;
 namespaces[28]=2;
 namespaces[29]=" ";

  //clear the scene before filling it again
  var endcounter = scene.children.length-1;
      for (var i = endcounter; i >= 0; i--){
         if (scene.children[i].type== 'namespace'){
           scene.remove(scene.children[i]);
         }
   }

   for (var i = sceneGl.children.length-1; i > -1; i -= 1){
      if (sceneGl.children[i].type== 'namespaceselector'){
         sceneGl.remove(sceneGl.children[i]);
      }

   }



  for ( var i = 0; i < namespaces.length; i += 6 ) {
     var namespace = document.createElement( 'div' );
     namespace.addEventListener( 'click', function (event) {
         mynamespace = event.currentTarget.childNodes[1].textContent;
         loadinfo();
         loadingresses();
         loaddeployments();
         loadevents();
         for (var i = sceneGl.children.length-1; i > -1; i -= 1){
            if (sceneGl.children[i].type== 'namespaceselector'){
               sceneGl.remove(sceneGl.children[i]);
            }

         }
         loadnamespaces();
         }, false
     );

     namespace.className = 'elementsmall';
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
     object.position.x = object.position.x = ( namespaces[ i + 3 ] * 140 ) - 1360;
     object.position.y = - ( namespaces[ i + 4 ] * 180 ) + 1100;
     object.type = 'namespace';
     scene.add( object );
     objects.push( object );

     if (mynamespace == namespaces[ i ]) {
        var runner2 = new THREE.Mesh(runner2Geometry, runner2Material);
        runner2.position.set(object.position.x-165,object.position.y,0);
        runner2.type='namespaceselector';
        sceneGl.add(runner2);
     }

    }
}