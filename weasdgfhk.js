const radioPlayer = document.getElementById('radioPlayer');
const powerBtn = document.getElementById('powerBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeKnob = document.getElementById('volumeKnob');
const volumeControl = document.getElementById('volume'); // We keep the volume control for backup functionality

// Power on/off the radio
let isRadioOn = false;
powerBtn.addEventListener('click', () => {
  if (isRadioOn) {
    radioPlayer.pause();
    isRadioOn = false;
  } else {
    radioPlayer.play();
    isRadioOn = true;
  }
});

// Mute/unmute the radio
let isMuted = false;
muteBtn.addEventListener('click', () => {
  if (isMuted) {
    radioPlayer.volume = volumeControl.value / 100;
    isMuted = false;
  } else {
    radioPlayer.volume = 0;
    isMuted = true;
  }
});

// Function to handle volume changes from the volume knob
function handleVolumeChange(event) {
  let rotation = parseFloat(volumeKnob.dataset.rotation) || 0;
  rotation += event.deltaY > 0 ? -5 : 5; // Adjust rotation based on scroll direction
  rotation = Math.max(0, Math.min(360, rotation)); // Limit rotation to 0-360 degrees
  volumeKnob.dataset.rotation = rotation; // Store the new rotation value

  // Calculate volume based on rotation angle
  const volume = Math.round(rotation / 3.6); // 360 degrees corresponds to volume level 100
  volumeControl.value = volume; // Update the volume control value
  radioPlayer.volume = volume / 100; // Set the actual audio volume
}

// Add event listener for the volume knob
volumeKnob.addEventListener('wheel', handleVolumeChange);

// Initialize the volume knob rotation to the initial volume
volumeKnob.dataset.rotation = volumeControl.value * 3.6;
