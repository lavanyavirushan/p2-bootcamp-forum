$( document ).ready( function() {
  const signupModal = new bootstrap.Modal(document.getElementById('modalCookie1'));

  const signupFormHandler = async (event) => {
      event.preventDefault();

      const name = document.querySelector('#username').value.trim();
      const email = document.querySelector('#email').value.trim();
      const password = document.querySelector('#password').value.trim();

      if (name && email && password) {
        const response = await fetch('/api/user/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/login');
        } else {
          signupModal.show();
        }
      }
  };


  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
});