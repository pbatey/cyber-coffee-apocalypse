var level = [
  '       T       ',
  ' >o T< ^ o< T< ',
  '               ',
  ' >o v TTT o >o ',
  '    T  ^  ^    ',
  'v v T<   >o o< ',
  'TTT ^     ^ ^v ',
  '^ ^    v    >T<',
  '      >T<      ',
  'vv  o  ^  o TTT',
  'TT< ^       ^ ^',
  '      TTT o    ',
  '       ^    >T<',
  '>o           T<',
  '   v  TTT  v   ',
  ' >TT<     >T<  ',
  ];

WallTile = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    z: React.PropTypes.number,
    facing: React.PropTypes.string
  },

  render() {
      const facingOffy = { right: 0, left: 160 };
      const offx = facingOffy[this.props.facing];
      const offy = 0;
      const dx = 160;
      const dy = 80;
      const dz = -160;
      const left = offx + (this.props.x*dx)-(this.props.y*dx);
      const top = offy + (this.props.x+this.props.y)*dy + (this.props.z*dz);
      const checker = (this.props.x+this.props.y)%2;
      const className = 'wall-tile' + ' facing-' + this.props.facing;
      const divStyle = {
          top: top,
          left: left
      };

    return (
      <div className={className} style={divStyle}></div>
    );
  }
}),

FloorTile = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number
  },

  render() {
      const offx = 0;
      const offy = 160;
      const dx = 160;
      const dy = 80;
      const left = offx + (this.props.x*dx)-(this.props.y*dx);
      const top = offy + (this.props.x+this.props.y)*dy;
      const checker = (this.props.x+this.props.y)%2;
      const className = 'floor-tile ' + 'checker-' + checker;
      const divStyle = {
          top: top,
          left: left
      };

    return (
      <div className={className} style={divStyle}></div>
    );
  }
});

TheShop  = React.createClass({
  renderWalls(width, depth, height) {
    const zero = 0;
    var tiles = [];
    for (var i=0; i<height; i++) {
      for (var j=0; j<width; j++) {
        const key=i + '.' + j + 'l';
          tiles.push(<WallTile key={key} x={j} y={zero} z={i} facing='left'/>);
      }
      for (var j=0; j<depth; j++) {
        const key=i + '.' + j + 'r';
          tiles.push(<WallTile key={key} y={j} x={zero} z={i} facing='right'/>);
      }
    }
    return <div className='walls'>{tiles}</div>
  },
  
  renderFloor(width, depth) {
    var tiles = [];
    for (var i=0; i<width; i++) {
      for (var j=0; j<depth; j++) {
        const key=i + '.' + j;
        tiles.push(<FloorTile key={key} x={i} y={j} />);
      }
    }
    return <div className='floor'>{tiles}</div>
  },

  render() {
    return (
      <div className='theShop'>
        {this.renderWalls(16,16,2)}
        {this.renderFloor(16,16)}
      </div>
    );
  }
});
