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

    const data = await response.json();

    if (response.ok) {
      document.location.replace(`/profile/${data.user.id}`);
      alert('Success! You have successfully signed up!');
    } else {
      alert('Failed to sign up.');
    }

    // emailInput.value = '';
    // passwordInput.value = '';
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupForm);
