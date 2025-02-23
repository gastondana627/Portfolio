document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuButton && navLinks) {
      mobileMenuButton.addEventListener('click', () => {
          navLinks.classList.toggle('active');
      });
  }

  // Scroll to Top Button
  const scrollToTopButton = document.getElementById('scroll-to-top-button');

  if (scrollToTopButton) {
      window.addEventListener('scroll', () => {
          if (window.pageYOffset > 300) {
              scrollToTopButton.style.display = 'block';
          } else {
              scrollToTopButton.style.display = 'none';
          }
      });

      scrollToTopButton.addEventListener('click', () => {
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });
  }

  // Form Submission Handling
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
      contactForm.addEventListener('submit', async (e) => {
          e.preventDefault(); // Prevent the default form submission
          formStatus.textContent = 'Sending...'; // Set status message

          const formData = new FormData(contactForm); // Get form data
          try {
              const response = await fetch(contactForm.action, {
                  method: 'POST',
                  body: formData,
                  headers: {
                      'Accept': 'application/json' // Set header to expect JSON response
                  }
              });

              if (response.ok) {
                  formStatus.textContent = 'Thanks for your message! I\'ll get back to you soon.';
                  contactForm.reset(); // Clear the form
              } else {
                  const result = await response.json(); // Parse JSON response
                  if (result && result.errors && Array.isArray(result.errors)) {
                      // Display Formspree errors
                      formStatus.textContent = 'Error: ' + result.errors.map(error => error.message).join(', ');
                  } else {
                      // Generic error message
                      formStatus.textContent = 'Oops! There was a problem submitting your form';
                  }
              }
          } catch (error) {
              console.error('Fetch error:', error);
              formStatus.textContent = 'Oops! There was a problem submitting your form'; // General catch-all error message
          }
      });
  }

  // Project Loading (Simulated)
  const loadMoreButton = document.getElementById('load-more-button');
  const projectsGrid = document.querySelector('.projects-grid');

  if (loadMoreButton && projectsGrid) {
      loadMoreButton.addEventListener('click', () => {
          // Simulate loading more projects
          const newProjects = `
              <div class="project">
                  <img src="assets/project3.jpg" alt="Project 3" class="project-image">
                  <h3>Project 3</h3>
                  <p>A description of the new project.</p>
                  <a href="#" class="button">View Project</a>
              </div>
              <div class="project">
                  <img src="assets/project4.jpg" alt="Project 4" class="project-image">
                  <h3>Project 4</h3>
                  <p>Another project to showcase.</p>
                  <a href="#" class="button">View Project</a>
              </div>
          `;
          projectsGrid.innerHTML += newProjects;
          loadMoreButton.style.display = 'none'; // Hide the button after loading all projects (for simplicity)
      });
  }

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
              playPauseButton.classList.remove('playing'); // Remove animation class
              playPauseButton.setAttribute('title', 'Play Music'); // Tooltip
          } else {
              backgroundMusic.play();
              playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
              playPauseButton.classList.add('playing'); // Add animation class
              playPauseButton.setAttribute('title', 'Pause Music'); // Tooltip
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
              if(isPlaying){
              playPauseButton.classList.add('playing');
              playPauseButton.setAttribute('title', 'Pause Music')
              }
          })
          .catch(error => {
              // Autoplay was prevented.
              console.log("Autoplay prevented: ", error);
              isPlaying = false;
              playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
              playPauseButton.setAttribute('title', 'Play Music'); // Tooltip
              // Show a UI element to let the user manually start playback.
              //For example, show a button to play the music.
          });
      } else{
           playPauseButton.setAttribute('title', 'Pause Music')
      }
  }
});
