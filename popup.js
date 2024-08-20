document.getElementById('setTime').addEventListener('click', () => {
    const hourInput = document.getElementById('hour');
    const minuteInput = document.getElementById('minute');
    const amPmSelect = document.getElementById('ampm');
  
    // Validate inputs
    const hour = parseInt(hourInput.value, 10);
    const minute = parseInt(minuteInput.value, 10);
    const amPm = amPmSelect.value;
  
    if (isNaN(hour) || hour < 1 || hour > 12) {
      alert('Please enter a valid hour (1-12).');
      return;
    }
    if (isNaN(minute) || minute < 0 || minute > 59) {
      alert('Please enter a valid minute (0-59).');
      return;
    }
  
    // Execute script in the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: setPlaybackTime,
        args: [hour, minute, amPm]
      });
    });
  });
  
  function setPlaybackTime(hour, minute, amPm) {
    const now = new Date();
    let targetHour = hour;
  
    // Convert to 24-hour format
    if (amPm === 'PM' && hour !== 12) {
      targetHour += 12;
    } else if (amPm === 'AM' && hour === 12) {
      targetHour = 0;
    }
  
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, minute, 0, 0);
  
    if (now >= targetTime) {
      alert('The target time has already passed.');
      return;
    }
  
    const timeUntilPlay = targetTime - now;
  
    setTimeout(() => {
      // Ensure elements exist before interacting
      const playButton = document.querySelector('.play-button-selector');
      if (playButton) {
        playButton.click();
      } else {
        const videoElement = document.querySelector('video');
        if (videoElement) {
          videoElement.play();
        }
      }
    }, timeUntilPlay);
  
    alert(`The movie will start at ${targetHour}:${minute.toString().padStart(2, '0')} ${amPm}.`);
  }
  