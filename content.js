// Create a container for the UI
const uiContainer = document.createElement('div');
uiContainer.style.position = 'fixed';
uiContainer.style.top = '10px';
uiContainer.style.right = '10px';
uiContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
uiContainer.style.color = 'white';
uiContainer.style.padding = '10px';
uiContainer.style.borderRadius = '5px';
uiContainer.style.zIndex = '9999';
uiContainer.style.fontFamily = 'Arial, sans-serif';

// Create time input fields
const hourInput = document.createElement('input');
hourInput.type = 'number';
hourInput.value = '10';
hourInput.style.width = '30px';
hourInput.min = '1';
hourInput.max = '12';

const minuteInput = document.createElement('input');
minuteInput.type = 'number';
minuteInput.value = '0';
minuteInput.style.width = '30px';
minuteInput.min = '0';
minuteInput.max = '59';

// Create AM/PM selector
const amPmSelect = document.createElement('select');
const amOption = document.createElement('option');
amOption.value = 'AM';
amOption.textContent = 'AM';
amPmSelect.appendChild(amOption);

const pmOption = document.createElement('option');
pmOption.value = 'PM';
pmOption.textContent = 'PM';
amPmSelect.appendChild(pmOption);

// Function to play the movie at the set time
function playAtSetTime(hour, minute, amPm) {
  const now = new Date();
  if (amPm === 'PM' && hour !== 12) {
    hour += 12;
  } else if (amPm === 'AM' && hour === 12) {
    hour = 0;
  }

  const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);

  if (now >= targetTime) {
    alert('The target time has already passed.');
    return;
  }

  const timeUntilPlay = targetTime - now;

  setTimeout(() => {
    const playButton = document.querySelector('.play-button-selector'); // Adjust selector
    if (playButton) {
      playButton.click();
    } else {
      const videoElement = document.querySelector('video');
      if (videoElement) {
        videoElement.play();
      }
    }
  }, timeUntilPlay);

  alert(`The movie will start at ${hour}:${minute} ${amPm}.`);
}

// Add event listener to the button
setTimeButton.addEventListener('click', () => {
  let hour = parseInt(hourInput.value, 10);
  const minute = parseInt(minuteInput.value, 10);
  const amPm = amPmSelect.value;
  playAtSetTime(hour, minute, amPm);
});
