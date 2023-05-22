!localStorage.getItem("likes") &&
  localStorage.setItem("likes", JSON.stringify([]));

const posts = [
  {
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    avatar: "images/avatar-vangogh.jpg",
    post: "images/post-vangogh.jpg",
    comment: "just took a few mushrooms lol",
    likes: JSON.parse(localStorage.getItem("likes"))[0]
      ? JSON.parse(localStorage.getItem("likes"))[0].count
      : 0,
  },
  {
    name: "Gustave Courbet",
    username: "gus1819",
    location: "Ornans, France",
    avatar: "images/avatar-courbet.jpg",
    post: "images/post-courbet.jpg",
    comment: "i'm feelin a bit stressed tbh",
    likes: JSON.parse(localStorage.getItem("likes"))[1]
      ? JSON.parse(localStorage.getItem("likes"))[1].count
      : 0,
  },
  {
    name: "Joseph Ducreux",
    username: "jd1735",
    location: "Paris, France",
    avatar: "images/avatar-ducreux.jpg",
    post: "images/post-ducreux.jpg",
    comment:
      "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    likes: JSON.parse(localStorage.getItem("likes"))[2]
      ? JSON.parse(localStorage.getItem("likes"))[2].count
      : 0,
  },
];

const containerEl = document.getElementById("container");

for (let i = 0; i < posts.length; i++) {
  // create post section
  let sectionPostEl = document.createElement("section");
  sectionPostEl.classList.add("post");

  // append post header to post section
  sectionPostEl.innerHTML = `
    <header class="user-info">
    <img
        class="avatar-img"
        src=${posts[i].avatar}
        alt="${posts[i].name} avatar"
    />
    <p>${posts[i].name} <span class="location">${posts[i].location}</span></p>
    </header>`;

  // Create post image because I need to add an event listener to it

  let postImageEl = document.createElement("img");
  postImageEl.classList.add("post-img");
  postImageEl.src = posts[i].post;
  postImageEl.alt = `${posts[i].name} self-portrait`;
  postImageEl.addEventListener("dblclick", function () {
    addLike(likesPEl, i);
  });

  sectionPostEl.append(postImageEl);

  // Create post-details section because I need to add an event listener to the heart list element
  let sectionDetailsEl = document.createElement("section");
  sectionDetailsEl.classList.add("post-details");

  // Create ul element
  let postIconsEl = document.createElement("ul");
  postIconsEl.classList.add("post-icons");

  // Create li heart icon element
  let postIconsHeartEl = document.createElement("li");
  postIconsHeartEl.classList.add("heart-icon");
  postIconsHeartEl.addEventListener("click", function () {
    addLike(likesPEl, i);
  });

  // Create the remaining li elements
  let postIconsCommentEl = document.createElement("li");
  postIconsCommentEl.classList.add("comment-icon");
  let postIconsDmEl = document.createElement("li");
  postIconsDmEl.classList.add("dm-icon");

  // Append li elements to the ul
  postIconsEl.append(postIconsHeartEl);
  postIconsEl.append(postIconsCommentEl);
  postIconsEl.append(postIconsDmEl);

  // Append ul to section details
  sectionDetailsEl.append(postIconsEl);

  // Create and append the likes paragraph to section details
  let likesPEl = document.createElement("p");
  likesPEl.innerHTML = `${posts[i].likes} likes`;
  sectionDetailsEl.append(likesPEl);

  // Create and append the comment paragraph to section details
  let commentPEl = document.createElement("p");
  commentPEl.innerHTML = `${posts[i].username}
                          <span class="comment">${posts[i].comment}</span>`;
  sectionDetailsEl.append(commentPEl);
  // Append the ul to the post section
  sectionPostEl.append(sectionDetailsEl);

  // Append post to container
  containerEl.append(sectionPostEl);
}

function addLike(likesPEl, i) {
  let storageArray = JSON.parse(localStorage.getItem("likes"));

  if (storageArray.some((el) => el.username === posts[i].username)) {
    let index = storageArray.findIndex(
      (el) => el.username === posts[i].username
    );
    storageArray[index].count += 1;

    likesPEl.innerHTML = `${storageArray[index].count} likes`;
    localStorage.setItem("likes", JSON.stringify(storageArray));
  } else {
    storageArray.push({
      count: ++posts[i].likes,
      username: posts[i].username,
    });
    let newCount = ++posts[i].likes;
    likesPEl.innerHTML = `${newCount} likes`;
    localStorage.setItem("likes", JSON.stringify(storageArray));
  }
}
