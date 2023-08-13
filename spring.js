class Spring {
  constructor(k, restLength, a, b) {
    this.k = k;
    this.restLength = restLength;
    this.a = a;
    this.b = b;
  }
  update() {
    let force = Vector.sub(this.a.pos, this.b.pos);
    let x = force.mag() - this.restLength;
    force.normalize();
    force.mult(this.k * x);
    this.b.applyForce(force);
    force.mult(-1);
    this.a.applyForce(force);
    
  }
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.moveTo(this.a.pos.x, this.a.pos.y);
    ctx.lineTo(this.b.pos.x, this.b.pos.y);
    ctx.stroke();
  }
}
