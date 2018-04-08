import * as mezr from 'mezr'

export default class Scroll {

	private history: Array<number>
	private prevY: number

	constructor() {

		this.history = []

		for (let i = 0; i < 10; i++) {
			this.history.push(0)
		}	

		const vp = (window.innerWidth + window.innerHeight) / 2
		this.prevY = mezr.offset(document.body, window).top / vp
	}

	dy() {
		const vp = (window.innerWidth + window.innerHeight) / 2
		const y =  mezr.offset(document.body, window).top / vp
		const dy = y - this.prevY
		this.prevY = y

		this.history.shift()
		this.history.push(dy)

		return this.history.reduce((prev, current) => prev + current) / this.history.length
	}
}
