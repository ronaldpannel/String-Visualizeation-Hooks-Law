class Particle {
  constructor(x, y) {
    this.locked = false
    this.acc = new Vector(0, 0);
    this.vel = new Vector(0, 0);
    this.pos = new Vector(x,y);
    this.mass = 1;
   
  }
  applyForce(force){
    let f = force.copy()
    f.div(this.mass)
    this.acc.add(f)
  }
  update(){
    if(!this.locked){
       this.vel.mult(0.99);
       this.vel.add(this.acc);
       this.pos.add(this.vel);
       this.acc.mult(0);

    }
   
    
  }
  draw(){
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'white'
    //ctx.arc(this.pos.x, this.pos.y, 5, 0, Math.PI * 2 )
    ctx.fill()
    ctx.stroke()
  }
}
