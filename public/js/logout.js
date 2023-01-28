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
document.querySelector('.logoutBtn').addEventListener('click', logout);
