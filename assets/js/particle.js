function Particle(x, y, hue, firework) {
	this.position = createVector(x, y);
	this.firework = firework;
	this.lifespan = 255;
	this.hue = hue;

	if (this.firework) {
		this.velocity = createVector(0, random(-17, -8));
	} else {
		this.velocity = p5.Vector.random2D();
		this.velocity.mult(random(2, 10));
	}

	this.acceleration = createVector(0, 0);

	this.applyForce = function (force) {
		this.acceleration.add(force);
	}

	this.update = function () {
		if (!this.firework) {
			this.velocity.mult(0.9);
			this.lifespan -= 4;
		}
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}

	this.done = function () {
		return this.lifespan < 0;
	}

	this.show = function () {
		colorMode(HSB);
		if (!this.firework) {
			stroke(hue, 255, 255, this.lifespan);
			strokeWeight(2);
		} else {
			stroke(hue, 255, 255);
			strokeWeight(4);
		}
		point(this.position.x, this.position.y);
	}
}