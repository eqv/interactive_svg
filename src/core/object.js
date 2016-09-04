
class Handler{
  constructor(name, parent, child, callback){
    this.name = name
    this.parent = parent
    this.child = child
    this.callback = callback
  }

  run(){
    if(this.child.updater.was_updated) return
    this.callback(this.child.updater.inputs, this.child, this.parent)
    this.child.update()
  }
}


class UpdateInfo{
  constructor(object){
    this.object = object
    this.watchers = new Set([])
    this.post_update_hooks = new Set([])
    this.inputs = {}
  }

  watch_parent(name, parent, callback){
    let handler = new Handler(name, parent, this.object, callback)
    parent.updater.watchers.add(handler);
    this.inputs[name]=parent
    return handler
  }

  update(){
    if(this.was_updated){alert("bad")}
    this.was_updated = true
    this.run_post_update_hooks()
    this.run_handlers()
    this.was_updated = false
  }

  run_post_update_hooks(){
    for(let fn of this.post_update_hooks){
      fn.call(this.inputs)
    }
  }

  run_handlers(){
    for(let handler of this.watchers){
      handler.run()
    }
  }

  after_update(fn){
    this.post_update_hooks.add(fn)
  }

  _get_inputs(args){
    return Object.assign({},  this.inputs, args)
  }
}

class InteractiveObject{
  constructor(world){
    this.world = world
    this.updater = new UpdateInfo(this)
  }

  update(args){
    this.updater.update(args);
  }

  on(other, name, fn){
    let handler = this.updater.watch_parent(name, other, fn)
    handler.run()
  }

  on_any(others, fn){
    for(let name of Object.keys(others)){
      this.on(others[name], name, fn)
    }
  }

  after(fn){
    this.updater.after_update(fn)
  }
}

export default InteractiveObject;
