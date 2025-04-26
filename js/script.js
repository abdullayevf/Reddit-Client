let input = document.getElementById("subreddit-name");
let form = document.querySelector("form");
let popup = document.getElementById("popup");
let trigger = document.getElementById("popup-trigger");

trigger.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation()
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
        handleSubmit(name);
        popup.style.display = "none";
    } else {
        alert("Please enter a subreddit name.");
    }
})

function handleSubmit(name) {
    console.log(name);
}
