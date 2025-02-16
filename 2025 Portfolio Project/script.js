// Simple smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // You'd typically handle form submissions here, often using `fetch` to send
  // the data to a backend service.  For this basic example, I'll leave it
  // as a placeholder.
  const contactForm = document.querySelector('#contact form');
  
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
  
    // In a real application, you would:
    // 1.  Gather the form data.
    // 2.  Validate the data (check for missing fields, email format, etc.).
    // 3.  Send the data to your backend using `fetch`.
    // 4.  Display a success/error message to the user.
  
    alert('Form submission is a placeholder. You would need to implement the actual submission logic using JavaScript and a backend service.');
  });