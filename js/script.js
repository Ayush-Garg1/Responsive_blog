async function loadPosts() {
  const container = document.getElementById('blog-container');
  if (container) {
    const res = await fetch('data/posts.json');
    const posts = await res.json();
    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" />
        <div class="blog-card-content">
          <h3>${post.title}</h3>
          <a href="post.html?id=${post.id}">Read More</a>
        </div>
      `;
      container.appendChild(card);
    });
  }
}

async function loadPostDetails() {
  const container = document.getElementById('post-container');
  if (container) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const res = await fetch('data/posts.json');
    const posts = await res.json();
    const post = posts.find(p => p.id == id);

    if (post) {
      container.innerHTML = `
        <h2>${post.title}</h2>
        <img src="${post.image}" alt="${post.title}" />
        <p>${post.content}</p>
      `;
    } else {
      container.innerHTML = "<p>Post not found!</p>";
    }
  }
}

loadPosts();
loadPostDetails();
