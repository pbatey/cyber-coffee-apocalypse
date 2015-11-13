Table = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    round: React.PropTypes.bool,
    cup: React.PropTypes.string
  },

  renderCup() {
    const checker = (this.props.x+this.props.y)%2;
    if (this.props.cup === 'none') return;
    else {
      const className = "cup cup-" + this.props.cup + ' checker-' + checker;
      return (<div className={className} />);
    }
  },

  render() {
    const offx = 80;
    const offy = 80;
    const dx = 80;
    const dy = 40;
    const left = offx + (this.props.x*dx)-(this.props.y*dx);
    const top = offy + (this.props.x+this.props.y)*dy;
    const className = 'table ' + (this.props.round ? 'table-round' : 'table-square');
    const divStyle = {
      top: top,
      left: left
    };

    return (
      <div className={className} style={divStyle}>{this.renderCup(this.props.cup)}</div>
    );
  }
});

Chair = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    facing: React.PropTypes.string,
  },

  render() {
    const offx = 112;
    const offy = 108;
    const dx = 80;
    const dy = 40;
    const left = offx + (this.props.x*dx)-(this.props.y*dx);
    const top = offy + (this.props.x+this.props.y)*dy;
    const className = 'chair ' + 'facing-' + this.props.facing;
    const divStyle = {
    top: top,
    left: left
    };

    return (
      <div className={className} style={divStyle}></div>
    );
  }
});

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

  renderTablesAndChairs(floorPlan) {
    var tiles = [];
    const cupTypes = [ 'none', 'paper', 'china' ];
    const round = true;
    const notRound = false;
    for (var i=0; i<floorPlan.length; i++) {
      for (var j=0; j<floorPlan[i].length; j++) {
        const cupType = cupTypes[(i+j)%3];
        const key=i + '.' + j;
        const c = floorPlan[i].charAt(j);
        switch (c) {
          case 'T':
            tiles.push(<Table key={key} x={j} y={i} round={notRound} cup={cupType}/>);
            break;
          case 'o':
            tiles.push(<Table key={key} x={j} y={i} round={round} cup={cupType}/>);
            break;
          case '>':
            tiles.push(<Chair key={key} x={j} y={i} facing='right' cup={cupType}/>);
            break;
          case '<':
            tiles.push(<Chair key={key} x={j} y={i} facing='left' cup={cupType}/>);
            break;
          case '^':
            tiles.push(<Chair key={key} x={j} y={i} facing='back' cup={cupType}/>);
            break;
          case 'v':
            tiles.push(<Chair key={key} x={j} y={i} facing='front' cup={cupType}/>);
            break;
        }
      }
    }
    return <div>{tiles}</div>
  },

  getDefaultProps() {
    return {
      floorPlan: [
        'T      T       ',
        '^>o T< ^ o< T< ',
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
        ]
    }
  },

  render() {
    const depth = this.props.floorPlan.length;
    const width = this.props.floorPlan[0].length;
    return (
      <div className='theShop'>
        {this.renderWalls(width/2,depth/2,2)}
        {this.renderFloor(width/2,depth/2)}
        {this.renderTablesAndChairs(this.props.floorPlan)}
      </div>
    );
  }
});
