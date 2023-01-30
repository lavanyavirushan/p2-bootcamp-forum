const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    alert(name + ' ' + email  + ' ' + password);

    if (name && email && password) {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/login');
      } else {
        alert(response.statusText);
      }
    }
};

function login() {
    window.location='/login';
}

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

document.querySelector('.registered').addEventListener('click', login);