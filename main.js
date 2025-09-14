import './style.css'
import { setupClock } from './clock.js'

document.querySelector('#app').innerHTML = `
  <div class="app-container">
    <h1 class="fade-in">Elegant Clock</h1>
    
    <div class="clock-container slide-in">
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
      
      <div class="controls">
        <div class="control-group">
          <div class="control-label">Theme</div>
          <div class="theme-toggle" id="theme-toggle">
            <span class="theme-icon">☀️</span>
            <span class="theme-icon">🌙</span>
            <div class="slider"></div>
          </div>
        </div>
        
        <div class="control-group">
          <div class="control-label">Time Format</div>
          <div class="clock-format-toggle">
            <div class="format-option active" data-format="12">12h</div>
            <div class="format-option" data-format="24">24h</div>
          </div>
        </div>
        
        <div class="control-group">
          <div class="control-label">Timezone</div>
          <select class="timezone-select" id="timezone-select">
            <option value="local">Local Time</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">New York</option>
            <option value="America/Los_Angeles">Los Angeles</option>
            <option value="Europe/London">London</option>
            <option value="Europe/Paris">Paris</option>
            <option value="Asia/Tokyo">Tokyo</option>
            <option value="Asia/Dubai">Dubai</option>
            <option value="Australia/Sydney">Sydney</option>
          </select>
        </div>
      </div>
    </div>
    
    <div class="world-clocks slide-in" id="world-clocks">
      <div class="world-clock">
        <div class="world-clock-city">New York</div>
        <div class="world-clock-time" id="newyork-time">--:--:-- --</div>
        <div class="world-clock-date" id="newyork-date">--</div>
      </div>
      
      <div class="world-clock">
        <div class="world-clock-city">London</div>
        <div class="world-clock-time" id="london-time">--:--:-- --</div>
        <div class="world-clock-date" id="london-date">--</div>
      </div>
      
      <div class="world-clock">
        <div class="world-clock-city">Tokyo</div>
        <div class="world-clock-time" id="tokyo-time">--:--:-- --</div>
        <div class="world-clock-date" id="tokyo-date">--</div>
      </div>
      
      <div class="world-clock">
        <div class="world-clock-city">Sydney</div>
        <div class="world-clock-time" id="sydney-time">--:--:-- --</div>
        <div class="world-clock-date" id="sydney-date">--</div>
      </div>
    </div>
  </div>
`

// Initialize the clock
setupClock()

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle')
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme')
  themeToggle.classList.toggle('dark')
  
  // Save preference to localStorage
  const isDarkMode = document.body.classList.contains('dark-theme')
  localStorage.setItem('darkMode', isDarkMode)
})

// Check for saved theme preference
const savedDarkMode = localStorage.getItem('darkMode') === 'true'
if (savedDarkMode) {
  document.body.classList.add('dark-theme')
  themeToggle.classList.add('dark')
}

// Time format toggle
const formatOptions = document.querySelectorAll('.format-option')
formatOptions.forEach(option => {
  option.addEventListener('click', () => {
    formatOptions.forEach(opt => opt.classList.remove('active'))
    option.classList.add('active')
    
    const format = option.getAttribute('data-format')
    localStorage.setItem('timeFormat', format)
    
    // Update the clock display
    const clockEvent = new CustomEvent('formatChange', { detail: { format } })
    document.dispatchEvent(clockEvent)
  })
})

// Check for saved time format preference
const savedTimeFormat = localStorage.getItem('timeFormat') || '12'
document.querySelector(`.format-option[data-format="${savedTimeFormat}"]`).classList.add('active')
document.querySelector(`.format-option[data-format="${savedTimeFormat === '12' ? '24' : '12'}"]`).classList.remove('active')

// Timezone selection
const timezoneSelect = document.getElementById('timezone-select')
timezoneSelect.addEventListener('change', () => {
  const timezone = timezoneSelect.value
  localStorage.setItem('timezone', timezone)
  
  // Update the clock display
  const timezoneEvent = new CustomEvent('timezoneChange', { detail: { timezone } })
  document.dispatchEvent(timezoneEvent)
})

// Check for saved timezone preference
const savedTimezone = localStorage.getItem('timezone')
if (savedTimezone) {
  timezoneSelect.value = savedTimezone
}

// Add animation classes with delay for a staggered effect
setTimeout(() => {
  document.querySelector('.clock-container').classList.add('fade-in')
}, 100)

setTimeout(() => {
  document.querySelector('.world-clocks').classList.add('fade-in')
}, 300)
