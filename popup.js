document.getElementById('setTime').addEventListener('click', () => {
    const hour = parseInt(document.getElementById('hour').value, 10);
    const minute = parseInt(document.getElementById('minute').value, 10);
    const ampm = document.getElementById('ampm').value;
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: setPlaybackTime,
        args: [hour, minute, ampm]
      });
    });
  });
  
  function setPlaybackTime(hour, minute, ampm) {
    // Convert 12-hour format to 24-hour format
    if (ampm === 'PM' && hour !== 12) {
      hour += 12;
    } else if (ampm === 'AM' && hour === 12) {
      hour = 0;
    }
  
    // Get local time
    const now = new Date();
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);
  
    // Ensure target time is set for the current day
    if (now >= targetTime) {
      alert('The target time has already passed.');
      return;
    }
  
    const timeUntilPlay = targetTime - now;
  
    setTimeout(() => {
      // Action to perform when the time comes
      const playButton = document.querySelector('.play-button-selector'); // Adjust selector if needed
      if (playButton) {
        playButton.click();
      } else {
        const videoElement = document.querySelector('video');
        if (videoElement) {
          videoElement.play();
        }
      }
    }, timeUntilPlay);
  
    alert(`The movie will start at ${hour}:${minute} ${ampm}.`);
  }
  