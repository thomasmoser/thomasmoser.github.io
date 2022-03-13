import LocomotiveScroll from "locomotive-scroll";
var imagesLoaded = require("imagesloaded");

let scrollContainer = document.querySelector("[data-scroll-container]");
const scroll = new LocomotiveScroll({
  el: scrollContainer,
  smooth: true,
  lerp: 0.05,
});

function SetLineHeight() {
  let tl_line = document.querySelector(".tl-line");
  let abi_dim = document.querySelector("#tl-header-flex-abi").getBoundingClientRect();
  let master_dim = document.querySelector("#tl-header-flex-master").getBoundingClientRect();
  let tl_line_height = master_dim.top - abi_dim.top + master_dim.height / 2 - abi_dim.height / 2;
  tl_line.style.top = `${abi_dim.height / 2}px`;
  tl_line.style.height = `${tl_line_height}px`;
}

SetLineHeight();
imagesLoaded(scrollContainer, { background: true }, function () {
  scroll.update();
});

window.onresize = SetLineHeight;
