import InteractiveShape from 'core/shape_object.js';
import InteractiveSpline from 'core/spline_object.js';

class World{

  constructor(){
    this.snap = Snap(800, 600)
  }

  circle(x,y, radius){
    let svg = this.snap.circle(0,0,radius)
    let res = new InteractiveShape(this, svg)
    res.x = x
    res.y = y
    res.update()
    return res
  }

  spline(path){
    return new InteractiveSpline(this, path)
  }

}

export default World;
