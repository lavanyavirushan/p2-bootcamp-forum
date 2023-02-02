const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const email = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();


  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const userResponse = await response.json();
      // If successful, redirect the browser to the homepage
      window.localStorage.setItem('user', JSON.stringify(userResponse.user));
      window.location = "/profile/account";
    } else {
      console.warning(response.statusText);
    }
  }
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);