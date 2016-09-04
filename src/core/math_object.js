import InteractiveShape from 'core/shape_object.js';

MathJax.Hub.Register.MessageHook("Math Processing Error",function (message) {
  debugger
  console.log(message);
});

MathJax.Hub.Register.MessageHook("TeX Jax - parse error",function (message) {
  console.log(message);
});

var buffer_id_counter = 0;

class InteractiveMath extends InteractiveShape {

  constructor(world, text){
    super(world, null)
    this.buffer = this.init_math_buffer(text)
    this.initial_rendering( this.buffer )
  }

  init_math_buffer(text){
    let buffer = $("div#math_buffer")
    buffer.append('<div id="'+this.get_uniq_buffer_id()+'"></div>')
    buffer = $("#"+this.get_uniq_buffer_id() )
    text  = "\\("+text+"\\)"
    this._text = text
    buffer.text(text)
    return buffer
  }

  initial_rendering(buffer,text){
    this.type_setting_initial = true
    this.type_setting_update = false
    this.curr_text = this._text
    this.jax = null
    let set_jax = () => this.set_jax()
    let end_math = (evt)=> this.end_math(evt)
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, buffer.get(0)], set_jax)
    MathJax.Hub.Register.MessageHook("End Math",end_math)
  }

  set text(text){
    this._text = text
    this.check_and_run_updates()
  }

  get test(){
    return this._text
  }

  log_state(pos){
    console.log("at: "+pos+" tsi: "+this.type_setting_initial+" tsu: "+this.type_setting_update)
  }

  end_math(msg){
    let buffer_id = this.get_uniq_buffer_id()
    let updated_obj_id =  msg[1].id
    let has_correct_id_p = (buffer_id == updated_obj_id)
    if(msg[2] == "Process" && has_correct_id_p){
        this.type_setting_initial = false 
    }
    updated_obj_id =  msg[1].parentNode.id
    let has_correct_id_u = (buffer_id == updated_obj_id)
    if( msg[2] == "Update" && has_correct_id_u){
      this.type_setting_update = false 
    }
    if(has_correct_id_u || has_correct_id_p){
      this.update_content_from_buffer()
      this.check_and_run_updates()
    }
    return null
  }

  set_jax(){
    let buffer_id = this.get_uniq_buffer_id()
    this.jax = MathJax.Hub.getAllJax(buffer_id)[0]
    this.check_and_run_updates()
  }

  check_and_run_updates(){
    let own_context_trick = () => {
      // this bullshit happens so we can call check_and_run_updates from MathJax SignalHandlers & Callbacks
      // otherwise mathjax silently becomes unresponsive
      if(!this.type_setting_initial && !this.type_setting_update && this._text != this.curr_text && this.jax){
        this.type_setting_update = true
        this.curr_text = this._text
        MathJax.Hub.Queue(["Text",this.jax,this._text])
      }
    }
    setTimeout(own_context_trick,0) //why? well see above
  }

  get_uniq_buffer_id(){
    if(!this.id)
      this.id = (buffer_id_counter += 1)
    return "math_buffer_"+this.id
  }

  get_svg_buffer(){
    return $("#"+this.get_uniq_buffer_id()+" > span.MathJax_SVG").get(0)
  }

  get_svg_string_from_buffer(){
    let rendered = this.get_svg_buffer()
    if(!rendered){
      return null
    }
    let svg = rendered.innerHTML
    return svg
  }

  get_svg_bb_from_buffer(){
    let rendered = this.get_svg_buffer()
    let bb = rendered.getBoundingClientRect()
    return bb
  }

  scale_shape_from_buffer(){
    let bb = this.get_svg_bb_from_buffer()
    let orig_w = bb.width
    let orig_h = bb.height
    let b = this.shape.getBBox()
    let new_w = b.width
    let new_h = b.height
    this.scale_factor_width  = orig_w/new_w
    this.scale_factor_height = -1*orig_h/new_h
    this.shape.transform("s"+this.scale_factor_width+","+this.scale_factor_height)
  }

  apply_transformation(){
    if(!this.shape) return
    let bb = this.shape.getBBox()
    let center_x = -bb.w*this.cx
    let center_y = -bb.h*this.cy
    let renorm = "s"+(this.scale_factor_width)+","+(this.scale_factor_height)+"T"+(this.offset_x+center_x)+","+(this.offset_y+center_y)
    let translate = "R"+(-this.rot)+",0,0T"+this.x+","+this.y
    let transform = renorm + translate
    this.shape.transform(transform)
  }

  center_shape_from_buffer(){
    let b = this.shape.getBBox()
    this.offset_x = -b.x
    this.offset_y = -b.y
    //this.apply_transformation()
  }

  update_content_from_buffer(){
    let svg = this.get_svg_string_from_buffer()
    if(!(svg && svg.length > 0)) return 
    if(this.shape) this.shape.remove()
    this.shape = Snap.parse(svg).select("g")
    this.world.snap.append(this.shape)
    this.scale_shape_from_buffer()
    this.center_shape_from_buffer()
    this.update()
    return null
  }
}


export default InteractiveMath;
