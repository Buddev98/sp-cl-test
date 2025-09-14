export function setupClock() {
  const hourHand = document.querySelector('.hour-hand');
  const minuteHand = document.querySelector('.minute-hand');
  const secondHand = document.querySelector('.second-hand');
  const digitalHours = document.querySelector('#hours');
  const digitalMinutes = document.querySelector('#minutes');
  const digitalSeconds = document.querySelector('#seconds');
  const ampmElement = document.querySelector('#ampm');
  const dateElement = document.querySelector('#date');

  function updateClock() {
    const now = new Date();
    
    // Update analog clock
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90; // +90 to offset from default position
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    
    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    
    const hours = now.getHours() % 12;
    const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    
    // Update digital clock
    const formattedHours = hours === 0 ? 12 : hours;
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    
    digitalHours.textContent = formattedHours.toString().padStart(2, '0');
    digitalMinutes.textContent = minutes.toString().padStart(2, '0');
    digitalSeconds.textContent = seconds.toString().padStart(2, '0');
    ampmElement.textContent = ampm;
    
    // Update date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString(undefined, options);
  }

  // Update clock immediately and then every second
  updateClock();
  setInterval(updateClock, 1000);
}
