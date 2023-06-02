const loginFormEl = document.querySelector('#login');

const showError = (parentEl, errorText) => {
  const errorEl = document.createElement('p');
  errorEl.classList.add('error-element');
  errorEl.textContent = errorText;
  parentEl.appendChild(errorEl);
};

const removeAllErrors = () => {
  const allErrors = document.querySelectorAll('.error-element');
  allErrors.forEach((el) => el.remove());
};

const loginFormHandler = async (event) => {
  event.preventDefault();
  removeAllErrors();

  const emailOrUsername = document.querySelector('#login_id').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (!emailOrUsername || !password) {
    showError(
      loginFormEl,
      'Please provide both an email/username and password.'
    );
    return;
  }

  const userInfo = {
    email_or_username: emailOrUsername,
    password,
  };

  try {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const res = await response.json();
      console.log(res);
      const errorMsg = res.message;
      showError(loginFormEl, errorMsg);
      return;
    }

    const res = await response.json();

    console.log(res);

    document.location.replace(`/profile/${res.user.id}`);
  } catch (err) {
    console.log(err);
    showError(loginFormEl, 'A login error has ocurred');
  }
};

loginFormEl.addEventListener('submit', loginFormHandler);
