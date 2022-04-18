function mrua_x(x0, v0, a, dt) {
	return x0 + v0 * dt + 0.5 * a * dt * dt
}

export class SmoothNumber {
	constructor(a) {
		this.a = a
		this.v = 0
		this.x = 0
		this.target = 200
		this.past_t = performance.now()
	}

	#step_time() {
		const t_now = performance.now()
		const dt = (t_now - this.past_t) / 1000
		this.past_t = t_now
		return dt
	}

	step() {
		const dt = this.#step_time()
		if (Math.abs(this.x - this.target) < 0.000001) return

		let dir = Math.sign(this.target - this.x);

		// predict stop position if start to slow down
		const stop_t = Math.abs(this.v / this.a)
		const stop_x = mrua_x(this.x, this.v, - this.a * dir, stop_t)

		let a = this.a * dir
		if (Math.sign(stop_x - this.target) == dir || Math.abs(stop_x - this.target) < 1) {
			// slow down (change a sign)
			// calculate exact a to not overshoot (a = -a whould overshoot)
			a = - this.v * this.v / (2 * (this.target - this.x))
			const t_to_stop = Math.abs(this.v / a)

			if (dt > t_to_stop) {
				this.x = this.target
				this.v = 0
				return
			}
		}

		this.x = mrua_x(this.x, this.v, a, dt)
		this.v += a * dt
	}
	set_target(new_target) {
		this.target = new_target
	}
	increment_target(dx) {
		this.target += dx
	}
}
