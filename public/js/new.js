const newFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value;
  const body = document.querySelector('input[name="new-snippet"]').value;

  await fetch(`/api/post`, {
    method: 'POST', 
    body: JSON.stringify({
      title, 
      body
    }), 
    headers: { 'Content-Type': 'application/json'}
  });

  document.location.replace('/profile');  
};

document
.querySelector('#new-snippet-form')
.addEventListener('submit', newFormHandler);