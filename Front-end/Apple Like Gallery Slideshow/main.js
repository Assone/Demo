const BASEOFFSETX = 920;
let index = 0;

let container = document.querySelector(".gallery-container");
let controls = document.querySelector(".gallery-controls");

function goSlide(node, index) {
  node.style.transform = `translateX(-${index * BASEOFFSETX}px)`;
}

controls.addEventListener("click", (evt) => {
  let target = evt.target;

  if (target.tagName.toLowerCase() !== "ul") {
    if (target.tagName.toLowerCase() === "img") {
      target = target.parentElement;
    }

    goSlide(container, target.dataset.index);
    index = target.dataset.index;
  }
});

setInterval(() => {
  goSlide(container, index % controls.children.length);
  index++;
}, 3000);
