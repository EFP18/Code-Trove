const newFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const category = document
    .querySelector('input[name="post-language"]')
    .value.trim();
  const body = document.querySelector('input[name="post-content"]').value;

  await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
      category,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  // TODO: add profile id
  document.location.replace('/profile');
};

document
  .querySelector('#new-snippet-form')
  .addEventListener('submit', newFormHandler);
