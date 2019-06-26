function loadnamespaces() {
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
     object.type = 'namespace';
     scene.add( object );
     objects.push( object );
    }
}