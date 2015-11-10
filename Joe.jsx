// Joe Tryer is our protagonist. (A tryer is a hollow handle that inserts to the drum of the roaster in order to 
// obtain a coffee bean sample)

const anim_joe_walk_cycle = {
  'down-right' : { y: 0, x: -1200, stepx: 80, dx: 10, dy: 5 },
  'down-left' : { y: 0, x: -560, stepx: 80, dx: -10, dy: 5 },
  'up-right' : { y: 160, x: 0, stepx: -80, dx: 10, dy: -5 },
  'up-left' : { y: 160, x: -640, stepx: -80, dx: -10, dy: -5 }
}

Joe = React.createClass({
  getInitialState: function () {
    return {
      dir: 'down-right',
      walk: true,
      x: 100,
      y: 100,
      step: 0,
      count: 0
    }
  },

  componentWillMount: function() {
    this.intervals = [];
    this.setInterval(this.move, 70);
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  },

  move: function() {
    const anim = anim_joe_walk_cycle[this.state.dir];
    const x = this.state.x + anim.dx;
    const y = this.state.y + anim.dy;
    const step = (this.state.step + 1) % 8;
    var dir = this.state.dir;
    var count = this.state.count;

    if (step == 0) count = (count + 1) % 3;

    if (step == 0 && count == 0) {
      switch (this.state.dir) {
        case 'up-right': dir = 'down-right'; break;
        case 'up-left': dir = 'up-right'; break;
        case 'down-right': dir = 'down-left'; break;
        case 'down-left': dir = 'up-left'; break;
      }
    }

    this.setState({
      x: x,
      y: y,
      step: step,
      count: count,
      dir: dir
    });

    console.log('step: ' + this.state.step + ' count: ' + count);

  },

  render: function () {
    const scale = 4;
    const anim = anim_joe_walk_cycle[this.state.dir];
    const x = Math.round(this.state.x/scale)*scale;
    const y = Math.round(this.state.y/scale)*scale;

    var divStyle = {
      left: x,
      top: y,
      backgroundPositionY: anim.y,
      backgroundPositionX: anim.x + (anim.stepx * this.state.step)
    };

    return (
      <div className='joe' style={divStyle}></div>
    );
  }
});
