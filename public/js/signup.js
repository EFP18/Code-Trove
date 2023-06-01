const signupForm = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-input').value.trim();
  const password = document.querySelector('#password-input').value.trim();

  if (email && password) {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.replace('/profile');
    } else {
      alert(data);
    }

    emailInput.value = '';
    passwordInput.value = '';
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupForm);
