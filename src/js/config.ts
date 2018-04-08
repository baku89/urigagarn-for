import './modernizr'
const Modernizr = window['Modernizr']
const requestAnimationFrame = Modernizr.prefixed('requestAnimationFrame', window)