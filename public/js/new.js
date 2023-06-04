const newFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const category = document
    .querySelector('input[name="post-language"]')
    .value.trim();
  const body = document.querySelector('textarea[name="post-content"]').value;

  var res = await fetch(`/api/post`, {
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

  // TODO: add profile id
  document.location.replace(`/profile/${data.user_id}`);
};

document
  .querySelector('#new-snippet-form')
  .addEventListener('submit', newFormHandler);
