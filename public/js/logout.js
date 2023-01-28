const logout =async () =>  {
  const response = await fetch('/api/user/logout', {
    method: 'get',
    credentials: 'include'
  });
  alert(response.status);
  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert('Oh Oh logout failed somehow?');
  }
}
document.querySelector('.logoutBtn').addEventListener('click', logout);
