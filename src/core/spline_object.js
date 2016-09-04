import InteractiveShape from 'core/shape_object.js';

class PathConstructor{
  constructor(spline){
    this.spline = spline
    this.path = ""
  }

  mov(x,y){
    this.path += "M "+x+","+y
    return this
  }

  lin(x,y){
    this.path += "L "+x+","+y
    return this
  }

  fin(){
    this.spline.path = this.path
  }

}

class InteractiveSpline extends InteractiveShape{
  constructor(world, path=""){
    let obj = world.snap.path(path)
    super(world, obj)
    this.attr({fill: "none", stroke: "#000"})
  }

  get path(){
    this.attr("path")
  }

  set path(val){
    return this.attr({path: val})
  }

  length(){
    return Snap.path.getTotalLength(this.path)
  }

  pos_at(){
    let p = Snap.path.getPointAtLength(this.path,length)
    return [p.x,p.y]
  }

  rot_at(length){
    let res = Snap.path.getPointAtLength(this.path,length)
    return res.alpha
  }

  construct(){
    return new PathConstructor(this)
  }
}

export default InteractiveSpline;
