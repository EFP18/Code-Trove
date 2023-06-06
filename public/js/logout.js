// create log out function with a post route
const logout = async (event) => {
  event.preventDefault()
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

// grab element with id logout and add log out function
document.querySelector('#logout').addEventListener('click', logout);
