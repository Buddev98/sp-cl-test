import './style.css'
import { setupClock } from './clock.js'

document.querySelector('#app').innerHTML = `
  <div class="clock-container">
    <h1>Simple Clock</h1>
    <div class="clock">
      <div class="clock-face">
        <div class="hand hour-hand"></div>
        <div class="hand minute-hand"></div>
        <div class="hand second-hand"></div>
        <div class="center-point"></div>
        <div class="markers">
          ${Array(12).fill().map((_, i) => `<div class="marker marker-${i+1}"></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="digital-clock">
      <span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>
      <span id="ampm">AM</span>
    </div>
    <div class="date" id="date">Monday, January 1, 2023</div>
  </div>
`

setupClock()
