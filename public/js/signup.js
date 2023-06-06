//helper function for signing up.

const signupForm = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-input').value.trim();
  const password = document.querySelector('#password-input').value.trim();
  const username = document.querySelector('#username').value.trim();

  if (email && password && username) {
    const response = await fetch(`/api/user`, {
      method: 'POST',
      body: JSON.stringify({ email, password, username }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      document.location.replace(`/profile`);
    } else {
      alert('Failed to sign up.');
    }
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupForm);
