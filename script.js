document.addEventListener('DOMContentLoaded', function() {
<<<<<<< HEAD
  var music = document.getElementById('background-music');
  var playPauseButton = document.createElement('button');

  // Style the button (you can add classes and CSS for better styling)
  playPauseButton.textContent = 'Play Music';
  playPauseButton.style.position = 'fixed';
  playPauseButton.style.bottom = '20px';
  playPauseButton.style.right = '20px';
  playPauseButton.style.padding = '10px 20px';
  playPauseButton.style.backgroundColor = '#333';
  playPauseButton.style.color = '#fff';
  playPauseButton.style.border = 'none';
  playPauseButton.style.borderRadius = '5px';
  playPauseButton.style.cursor = 'pointer';
  document.body.appendChild(playPauseButton);

  var isPlaying = false;

  playPauseButton.addEventListener('click', function() {
    if (isPlaying) {
      music.pause();
      playPauseButton.textContent = 'Play Music';
    } else {
      music.play().catch(function(error) {
        console.error("Autoplay prevented:", error);
        // Display a message to the user if autoplay is prevented
        alert("Please interact with the page to enable music."); // You might want a nicer UI
      });
      playPauseButton.textContent = 'Pause Music';
    }
    isPlaying = !isPlaying;
  });
});
=======
    var music = document.getElementById('background-music');
  
    function playMusic() {
      music.play().catch(function(error) {
        // Autoplay was prevented.
        console.log("Autoplay prevented: ", error);
      });
      document.removeEventListener('click', playMusic);
      document.removeEventListener('touchstart', playMusic);
    }
  
    document.addEventListener('click', playMusic);
    document.addEventListener('touchstart', playMusic);
  });
>>>>>>> 3caf9a2bee5caa58ffed3454233f9e66fba56f2f
