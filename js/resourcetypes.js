function loadresourcetypes() {
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
      object.type = 'resourcetype';
      scene.add( object );
      objects.push( object );
   }
}