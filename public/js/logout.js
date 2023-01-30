window.onload = function() {
  if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
  }
}

const logout =async () =>  {
  const response = await fetch('/api/user/logout', {
    method: 'get',
    credentials: 'include'
  });
  if (response.ok) {
    document.location.replace('/login');
  } else {
    console.warning(response.statusText);
  }
}
document.querySelector('.btn-logout').addEventListener('click', logout);
