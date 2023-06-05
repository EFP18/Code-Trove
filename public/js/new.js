const newFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const category = document.querySelector('#post-language').value.trim();
  const body = document.querySelector('#post-content').value.trim();

  const response = await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
      category,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  var data = await res.json();
  //debugger;

  console.log('post created')
  const data = await response.json();
  document.location.replace(`/profile`);
};

document
  .querySelector('#new-snippet-form')
  .addEventListener('submit', newFormHandler);
