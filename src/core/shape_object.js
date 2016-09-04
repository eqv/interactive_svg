import InteractiveObject from 'core/object.js';

class Dragger{
  constructor(obj, fn){
    this.x=0
    this.y=0
    this.fn = fn
    this.obj = obj
    this.obj.shape.drag(
      (dx,dy,x,y,ev) => this.drag(dx,dy,x,y),
      (x,y,ev) => this.start(),
      null
    )
  }

  drag(dx,dy,x,y){
    let args = {
      x: this.start_x+dx,
      y: this.start_y+dy,
      dx: dx,
      dy: dy,
      screen_x: x,
      screen_y: y
    }
    this.fn( this.obj.updater._get_inputs({drag: args}) )
    this.obj.update()
  }

  start(){
    this.start_x = this.obj.x
    this.start_y = this.obj.y
  }
}

class InteractiveShape extends InteractiveObject{
  constructor(world, shape){
    super(world)
    this.shape = shape
    this.x = 0
    this.y = 0
    this.sx = 1
    this.sy = 1
    this.cx = 0
    this.cy = 0
    this.rot = 0
    this.apply_transformation()
    this.after(() => this.apply_transformation())
  }

  apply_transformation(){
    if(!this.shape) return
    let bb = this.shape.getBBox(true) //no transformations
    let center_x = -bb.w*this.cx
    let center_y = -bb.h*this.cy
    let renorm = "T"+center_x+","+center_y+"s"+this.sx+","+this.sy
    let trans = "R"+this.rot+",0,0T"+this.x+","+this.y
    this.shape.transform(renorm+trans)
  }

  on_drag(fn){
    new Dragger(this, fn)
  }

  attr(arg){
    this.shape.attr(arg)
  }
}

export default InteractiveShape;
