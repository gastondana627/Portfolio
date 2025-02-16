document.addEventListener('DOMContentLoaded', function() {
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