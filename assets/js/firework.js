function Firework() {
	this.hue = random(255);
	this.firework = new Particle(random(width), height, this.hue, true);
	this.exploded = false;
	this.particles = [];

	this.done = function () {
		return this.exploded && this.particles.length === 0;
	}

	this.update = function () {
		if (!this.exploded) {
			this.firework.applyForce(gravity);
			this.firework.update();

			if (this.firework.velocity.y >= 0) {
				this.exploded = true;
				this.explode();
			}
		}
		for (let i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].applyForce(gravity);
			this.particles[i].update();

			if (this.particles[i].done()) {
				this.particles.splice(i, 1);
			}
		}
	}

	this.explode = function () {
		for (let i = 0; i < 100; i++) {
			const p = new Particle(this.firework.position.x, this.firework.position.y, this.hue, false);
			this.particles.push(p);
		}
	}

	this.show = function () {
		if (!this.exploded) {
			this.firework.show();
		}
		for (let i = 0; i < this.particles.length; i++) {
			this.particles[i].show();
		}
	}
}