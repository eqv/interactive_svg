import InteractiveObject from 'core/object.js';
import InteractiveMath from 'core/math_object.js';
import World from 'core/world.js';


class DemoWorld extends World {
  constructor(){
    super()

    let x = this.circle(50,100,20)
    let y = this.circle(100,50,20)
    let c = this.circle(50,50,10)
    let s = this.spline("")
    let t = this.spline("")
    let m = new InteractiveMath(this, "7 = 3*4")
    m.on(c,"c", (dep) => m.text = "\\frac{"+c.x+"}{"+c.y+"}="+c.x/c.y)
    m.x = 400
    m.y = 400

    x.on(c, "c", () => x.x = c.x )
    x.on_drag((dep) => x.x = dep.drag.x )

    y.on(c, "c", (dep) => y.y = c.y )
    y.on_drag((dep) => y.y = dep.drag.y )

    c.on(x, "x", (dep) => c.x = x.x )
    c.on(y, "y", (dep) => c.y = y.y )
    c.on_drag((dep) => { c.x = dep.drag.x; c.y = dep.drag.y } )

    s.on_any({x: x, y: y, c: c}, (dep) => s.construct().mov(x.x, x.y).lin(c.x,c.y).lin(y.x,y.y).fin() )

    let tracer = t.construct().mov(c.x,c.y)
    t.on(c, "c", (dep) => tracer.lin(c.x,c.y).fin() )
  }
}

export default DemoWorld;
