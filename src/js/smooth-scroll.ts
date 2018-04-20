import * as smoothScroll from 'smoothscroll'

const badgeEl = document.querySelector('.updated-badge')

badgeEl.addEventListener('click', (e) => {
	e.preventDefault()

	const id = badgeEl.getAttribute('href').replace('#', '')
	const targetEl = document.getElementById(id)

	smoothScroll(targetEl)
})