// script.js
const postList = document.getElementById("post-list");
const postContent = document.getElementById("post-content");
const postBtn = document.getElementById("post-btn");

let posts = [];

// Add a new post
postBtn.addEventListener("click", () => {
  const content = postContent.value.trim();
  if (content === "") {
    alert("Post content cannot be empty!");
    return;
  }

  // Create a new post object
  const newPost = {
    id: Date.now(),
    content: content,
    likes: 0,
    comments: [],
  };

  // Add to the list of posts
  posts.unshift(newPost);
  postContent.value = ""; // Clear textarea
  renderPosts(); // Update the UI
});

// Render posts
function renderPosts() {
  postList.innerHTML = ""; // Clear the post list

  posts.forEach((post) => {
    // Create post elements
    const postItem = document.createElement("li");

    const postHeader = document.createElement("div");
    postHeader.classList.add("post-header");
    postHeader.innerHTML = `<h3>John Doe</h3><small>${new Date(post.id).toLocaleString()}</small>`;

    const postBody = document.createElement("div");
    postBody.classList.add("post-content");
    postBody.textContent = post.content;

    const postActions = document.createElement("div");
    postActions.classList.add("post-actions");

    // Like Button
    const likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");
    likeBtn.textContent = `Like (${post.likes})`;
    likeBtn.addEventListener("click", () => {
      post.likes++;
      renderPosts();
    });

    // Comment Button (Future Feature Placeholder)
    const commentBtn = document.createElement("button");
    commentBtn.textContent = "Comment";
    commentBtn.disabled = true;

    // Append actions
    postActions.appendChild(likeBtn);
    postActions.appendChild(commentBtn);

    // Append everything to the post item
    postItem.appendChild(postHeader);
    postItem.appendChild(postBody);
    postItem.appendChild(postActions);

    // Add post to the post list
    postList.appendChild(postItem);
  });
}

// Initial render
renderPosts();

