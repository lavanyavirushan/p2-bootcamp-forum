const logout =async () =>  {
  const response = await fetch('/api/user/logout', {
    method: 'get',
    credentials: 'include'
  });
  if (response.ok) {
    window.localStorage.removeItem('user');
    document.location.replace('/login');
  } else {
    console.warning(response.statusText);
  }
}