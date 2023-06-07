//helper function to display user post

const loadProfilePosts = async () => {
  const userId = localStorage.getItem('userId');

  if (userId) {
    try {
      const response = await fetch(`/api/posts/${userId}`);

      if (response.ok) {
        const postsData = await response.json();

        const recentPosts = postsData.slice(0, 5);

        const postsContainer = document.querySelector('#posts-container');

        recentPosts.forEach((post) => {
          const postDiv = document.createElement('div');

          postDiv.textContent = `${post.title} - ${new Date(
            post.createdAt
          ).toLocaleString()}`;

          postsContainer.appendChild(postDiv);
        });
      } else {
        alert('Failed to load profile posts.');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }
};
