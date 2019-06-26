function loadresourcetypes() {
   for ( var i = 0; i < resourcetypes.length; i += 6 ) {
      var resourcetype = document.createElement( 'div' );
      resourcetype.className = resourcetypes[ i + 1 ];
      resourcetype.style.backgroundColor = resourcetypes[ i + 2 ];

      var symbol = document.createElement( 'div' );
      symbol.className = 'symbol';
      symbol.textContent = resourcetypes[ i ];
      resourcetype.appendChild( symbol );

      var object = new THREE.CSS3DObject( resourcetype );
      object.position.x = object.position.x = ( resourcetypes[ i + 3 ] * 140 ) - 1210;
      object.position.y = ( resourcetypes[ i + 5 ] );
      object.type = 'resourcetype';
      scene.add( object );
      objects.push( object );
   }
}