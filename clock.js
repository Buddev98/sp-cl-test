export function setupClock() {
  const hourHand = document.querySelector('.hour-hand');
  const minuteHand = document.querySelector('.minute-hand');
  const secondHand = document.querySelector('.second-hand');
  const digitalHours = document.querySelector('#hours');
  const digitalMinutes = document.querySelector('#minutes');
  const digitalSeconds = document.querySelector('#seconds');
  const ampmElement = document.querySelector('#ampm');
  const dateElement = document.querySelector('#date');
  
  // World clock elements
  const worldClocks = {
    'newyork': { 
      timezone: 'America/New_York',
      timeElement: document.getElementById('newyork-time'),
      dateElement: document.getElementById('newyork-date')
    },
    'london': { 
      timezone: 'Europe/London',
      timeElement: document.getElementById('london-time'),
      dateElement: document.getElementById('london-date')
    },
    'tokyo': { 
      timezone: 'Asia/Tokyo',
      timeElement: document.getElementById('tokyo-time'),
      dateElement: document.getElementById('tokyo-date')
    },
    'sydney': { 
      timezone: 'Australia/Sydney',
      timeElement: document.getElementById('sydney-time'),
      dateElement: document.getElementById('sydney-date')
    }
  };
  
  // Default settings
  let use24HourFormat = localStorage.getItem('timeFormat') === '24';
  let currentTimezone = localStorage.getItem('timezone') || 'local';
  
  // Listen for format change events
  document.addEventListener('formatChange', (event) => {
    use24HourFormat = event.detail.format === '24';
    updateClock();
  });
  
  // Listen for timezone change events
  document.addEventListener('timezoneChange', (event) => {
    currentTimezone = event.detail.timezone;
    updateClock();
  });

  function updateClock() {
    const now = new Date();
    
    // Get time in selected timezone
    let localTime = now;
    if (currentTimezone !== 'local') {
      localTime = new Date(now.toLocaleString('en-US', { timeZone: currentTimezone }));
    }
    
    // Update analog clock
    const seconds = localTime.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90; // +90 to offset from default position
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    
    const minutes = localTime.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    
    const hours = localTime.getHours() % 12;
    const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    
    // Update digital clock
    if (use24HourFormat) {
      digitalHours.textContent = localTime.getHours().toString().padStart(2, '0');
      ampmElement.textContent = '';
    } else {
      const formattedHours = hours === 0 ? 12 : hours;
      digitalHours.textContent = formattedHours.toString().padStart(2, '0');
      ampmElement.textContent = localTime.getHours() >= 12 ? 'PM' : 'AM';
    }
    
    digitalMinutes.textContent = minutes.toString().padStart(2, '0');
    digitalSeconds.textContent = seconds.toString().padStart(2, '0');
    
    // Update date
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: currentTimezone === 'local' ? undefined : currentTimezone
    };
    
    dateElement.textContent = now.toLocaleDateString(undefined, options);
    
    // Update world clocks
    updateWorldClocks(now);
  }
  
  function updateWorldClocks(now) {
    for (const [city, data] of Object.entries(worldClocks)) {
      try {
        const cityTime = new Date(now.toLocaleString('en-US', { timeZone: data.timezone }));
        
        // Format time based on preference
        let timeString;
        if (use24HourFormat) {
          timeString = `${cityTime.getHours().toString().padStart(2, '0')}:${cityTime.getMinutes().toString().padStart(2, '0')}:${cityTime.getSeconds().toString().padStart(2, '0')}`;
        } else {
          const hours = cityTime.getHours();
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const formattedHours = hours % 12 || 12;
          timeString = `${formattedHours.toString().padStart(2, '0')}:${cityTime.getMinutes().toString().padStart(2, '0')}:${cityTime.getSeconds().toString().padStart(2, '0')} ${ampm}`;
        }
        
        data.timeElement.textContent = timeString;
        
        // Format date
        const dateOptions = { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric',
          timeZone: data.timezone
        };
        
        data.dateElement.textContent = now.toLocaleDateString(undefined, dateOptions);
      } catch (error) {
        console.error(`Error updating world clock for ${city}:`, error);
        data.timeElement.textContent = 'Error';
        data.dateElement.textContent = 'Timezone not supported';
      }
    }
  }

  // Add a subtle pulse animation to the center point
  setInterval(() => {
    const centerPoint = document.querySelector('.center-point');
    centerPoint.classList.add('pulse');
    setTimeout(() => centerPoint.classList.remove('pulse'), 2000);
  }, 10000);

  // Update clock immediately and then every second
  updateClock();
  setInterval(updateClock, 1000);
}
