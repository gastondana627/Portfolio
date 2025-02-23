document.addEventListener('DOMContentLoaded', function() {
  // ... (existing code) ...

  // Music Controls
  const backgroundMusic = document.getElementById('background-music');
  const playPauseButton = document.getElementById('play-pause-button');
  const volumeSlider = document.getElementById('volume-slider');

  if (backgroundMusic && playPauseButton && volumeSlider) {
      let isPlaying = true; // Start playing by default, so set to true

      // Play/Pause
      playPauseButton.addEventListener('click', () => {
          if (isPlaying) {
              backgroundMusic.pause();
              playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
          } else {
              backgroundMusic.play();
              playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
          }
          isPlaying = !isPlaying;
      });

      // Volume Control
      volumeSlider.addEventListener('input', () => {
          backgroundMusic.volume = volumeSlider.value;
      });

      // Initial volume setup
      backgroundMusic.volume = volumeSlider.value;

      // Autoplay Check (moved here)
      const playPromise = backgroundMusic.play();

      if (playPromise !== undefined) {
          playPromise.then(_ => {
              // Autoplay started!
          })
          .catch(error => {
              // Autoplay was prevented.
              console.log("Autoplay prevented: ", error);
              isPlaying = false;  //Set to false so clicking will play
              playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
              // Show a UI element to let the user manually start playback.
              //For example, show a button to play the music.
          });
      }
  }
});
