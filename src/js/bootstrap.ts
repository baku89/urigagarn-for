import * as transform from 'dom-transform'
import * as TWEEN from '@tweenjs/tween.js'
import * as Hammer from 'hammerjs'
import * as clamp from 'clamp'
import * as lerp from 'lerp'
import * as classes from 'dom-classes'

import './polyfill'
import Scroll from './scroll'
import {fit, mod, diff} from './utils'

import './smooth-scroll'

// ---- Test

import './modernizr'
const Modernizr = window['Modernizr']
const requestAnimationFrame = Modernizr.prefixed('requestAnimationFrame', window)

const SUPPORT = Modernizr.mediaqueries && Modernizr.cssvhunit && Modernizr.csstransforms && Modernizr.raf

console.info('Support:', SUPPORT)

// Google Analytics

const gtag = window['gtag']

let GtagEvents = {
	flip: false,
	open: false
}

if (SUPPORT) gtag('event', 'support', {event_category: 'modernizr'})
if (Modernizr.mediaqueries) gtag('event', 'mediaqueries', {event_category: 'modernizr'})
if (Modernizr.cssvhunit) gtag('event', 'cssvhunit', {event_category: 'modernizr'})
if (Modernizr.csstransforms) gtag('event', 'csstransform', {event_category: 'modernizr'})
if (Modernizr.raf) gtag('event', 'raf', {event_category: 'modernizr'})

//---- Jacket

const FaceAngle = {
	'F': 0,
	'B': 180
}

class Jacket {

	private mode: 'scroll' | 'pan' | 'tween'
	private face: 'F' | 'B'
	private axis: 'X' | 'Y' | 'O'
	private angle: number
	private hasOpened: boolean
	private progress: number

	private pan: {
		angle: number
		origin: {x: number, y: number}
	}
	
	private scroll: Scroll
	private spriteEl: HTMLElement

	constructor() {

		this.mode = 'scroll'
		this.face = 'F'
		this.axis = 'Y'
		this.angle = 0
		this.scroll = new Scroll
		this.spriteEl = document.querySelector('.jacket__sprite')

		this.setupGesture()
		this.update()
	}

	setupGesture() {

		const rectEl = document.querySelector('.jacket__rect')

		rectEl.addEventListener('touchmove', e => e.preventDefault())

		const hammer = Hammer(rectEl)

		hammer.get('pan').set({
			direction: Hammer.DIRECTION_ALL
		})

		hammer.on('panstart', ({center, deltaX, deltaY, type}) => {

			if (this.mode === 'tween') {
				return
			}
			
			this.mode = 'pan'
			this.pan = {
				angle: 0,
				origin: center
			}

			this.angle = FaceAngle[this.face]
			this.axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'X' : 'Y'
		})

		hammer.on('panmove', (e) => {

			if (this.mode !== 'pan') return

			let delta			
			if (this.axis === 'X') {
				delta = e.center.x - this.pan.origin.x
			} else if (this.axis === 'Y') {
				delta = -(e.center.y - this.pan.origin.y)
			}

			const vave = (window.innerWidth + window.innerHeight) * 0.5
			this.pan.angle = delta / vave * 360

		})

		hammer.on('panend', (e) => {

			// imitate swipe
			if (Math.abs(this.pan.angle) < 90 && Math.abs(e.overallVelocity) > .6) {
				this.pan.angle = Math.sign(this.pan.angle) * 91
			}

			const newAngle = mod(FaceAngle[this.face] + this.pan.angle, 360)
			const newFace = (90 < newAngle && newAngle < 270) ? 'B' : 'F'

			// set status
			this.angle = newAngle
			if (diff(this.angle, FaceAngle[newFace]) > 180) {
				this.angle -= 360
			}

			this.face = newFace
			this.mode = 'tween'
			this.hasOpened = false

			// snap to 0/180
			const duration = diff(this.angle, FaceAngle[this.face]) / 180 * 400

			new TWEEN.Tween(this)
				.to({angle: FaceAngle[this.face]}, duration)
				.onUpdate(this.render)
				.onComplete(this.beginScroll)
				.start()
		})

		hammer.on('tap', () => {

			if (this.mode !== 'scroll') return

			if (this.face === 'F') {
				this.beginFlip()
			} else if (this.face === 'B') {
				if (this.hasOpened)
					this.beginFlip()
				else
					this.beginOpen()
			}

		})
	}

	update = (time?) => {
		
		requestAnimationFrame(this.update)

		if (this.mode === 'scroll') {

			this.angle += this.scroll.dy() * -600
			this.angle = lerp(this.angle, FaceAngle[this.face], 0.1)

			this.render()

		} else if (this.mode === 'pan') {

			this.angle = lerp(this.angle, FaceAngle[this.face] + this.pan.angle, 0.6)
			this.render()

		}

		TWEEN.update(time)

	}

	beginFlip = () => {
		
		this.mode = 'tween'
		this.hasOpened = false
		this.axis = 'X'
		this.angle = FaceAngle[this.face]
		this.face = this.face === 'F' ? 'B' : 'F'

		new TWEEN.Tween(this)
			.to({angle: this.angle - 180}, 400)
			.onUpdate(this.render)
			.onComplete(this.beginScroll)
			.start()
	}

	beginScroll = () => {

		this.mode = 'scroll'
		this.axis = 'Y'
		this.angle = mod(this.angle, 360)

	}

	beginOpen = () => {

		this.mode = 'tween'
		this.axis = 'O'
		this.angle = FaceAngle[this.face]
		this.hasOpened = true
		this.progress = 0

		let tweenOpen = new TWEEN.Tween(this)
			.to({progress: 1}, 200)
			.onUpdate(this.render)

		let tweenClose = new TWEEN.Tween(this)
			.to({progress: 0}, 200)
			.onUpdate(this.render)
			.onComplete(this.beginScroll)

		tweenOpen.chain(tweenClose)
		tweenOpen.start()

	}

	render = () => {

		if (!GtagEvents.flip && this.face === 'B') {
			gtag('event', 'flip')
			GtagEvents.flip = true
		}

		if (!GtagEvents.open && this.axis === 'O') {
			gtag('event', 'open')
			GtagEvents.open = true
		}

		let x, y
		const r = mod(Math.round(this.angle / 180 * 16), 32)

		if (this.axis === 'Y') {

			switch (true) {
				case (r === 0): // F
					x = 0; y = 0
					break
				case (r < 8): // F -> D
					x = r - 1
					y = 5
					break
				case (r === 8): // D
					x = 4
					y = 0
					break
				case (r < 16): // D -> B
					x = r - 9
					y = 6
					break
				case (r === 16): // B
					x = 1
					y = 0
					break
				case (r < 24): // B -> T
					x = 6 - (r - 17)
					y = 2
					break
				case (r === 24): // T
					x = 2
					y = 0
					break
				case (r < 32): // T -> F
					x = 6 - (r - 25)
					y = 1
					break
			}

		} else if (this.axis === 'X') {

			switch (true) {
				case (r === 0): // F
					x = 0
					y = 0
					break
				case (r < 8): // F -> L
					x = r - 1
					y = 7
					break
				case (r === 8): // L
					x = 5
					y = 0
					break
				case (r < 16): // L -> B
					x = r - 9
					y = 8
					break
				case (r === 16): // B
					x = 1
					y = 0
					break
				case (r < 24): // B -> R
					x = 6 - (r - 17)
					y = 4
					break
				case (r === 24): // R
					x = 3
					y = 0
					break
				case (r < 32): // R -> F
					x = 6 - (r - 25)
					y = 3
					break
			}

		} else if (this.axis === 'O') {
			
			const t = Math.round(this.progress * 8)

			switch (true) {
				case (t === 0):
					x = 5
					y = 0
					break
				case (t < 8):
					x = t - 1
					y = 9
					break
				case (t === 8):
					x = 6
					y = 0
					break
			}
		}

		transform(this.spriteEl, {
			translateX: `${(x / 7) * -100}%`,
			translateY: `${(y / 10) * -100}%`
		})

	}

}

new Jacket()