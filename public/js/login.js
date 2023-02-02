$( document ).ready( function() {
  
  const loginModal = new bootstrap.Modal(document.getElementById('modalCookie1'));

  const loginFormHandler = async (event) => {
    event.preventDefault();
    // Collect values from the login form
    const email = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();


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