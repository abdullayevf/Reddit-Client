let input = document.getElementById("subreddit-name");
let form = document.querySelector("form");
let popup = document.getElementById("popup");
let trigger = document.getElementById("popup-trigger");
let wrapper = document.querySelector(".wrapper");

trigger.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  popup.style.display = "block";
});

window.addEventListener("click", (event) => {
  if (!popup.contains(event.target)) {
    popup.style.display = "none";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let name = input.value;
  if (name) {
    fetchSubredditData(name);
    popup.style.display = "none";
  } else {
    alert("Please enter a subreddit name.");
  }
});

function handleSubmit(name) {
  console.log(name);
}

async function fetchSubredditData(subreddit) {
  const url = `https://www.reddit.com/r/${subreddit}.json`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(data.data.children);

    let posts = data.data.children.map((post) => {
      return {
        title: post.data.title,
        upvotes: post.data.ups,
        link: post.data.url,
      };
    });

    renderPosts(subreddit, posts);

    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
}

function renderPosts(subreddit, posts) {
  let lane = document.createElement("div");

  lane.classList.add("lane");

  lane.innerHTML += `
    <header class="lane-header">
            <h2>/r/${subreddit}</h2>
            <button type="button" class="lane-menu-trigger">
              <i class="fas fa-ellipsis-v"></i>

              <div class="lane-menu" class="lane-menu">
                <input type="button" class="refresh-button" value="Refresh"></input>
                <input type="button" class="delete-button" value="Delete"></input>
              </div>

            </button>
          </header>
  `;

  let content = document.createElement("main");
  let ul = document.createElement("ul");

  content.classList.add("lane-content");

  posts.splice(0, 10).forEach((p) => {
    let post = document.createElement("li");
    post.classList.add("post");
    post.innerHTML = `
                <span class="post-upvotes">
                  <i class="fas fa-caret-up"></i>
                  <span>${p.upvotes}</span>
                </span>
                <span class="post-title">
                  <a href="${p.link}" target="_blank">${p.title}</a>
                </span>
    `;

    ul.appendChild(post);
  });

  content.appendChild(ul);
  lane.appendChild(content);
  wrapper.insertBefore(lane, wrapper.lastElementChild);
}
