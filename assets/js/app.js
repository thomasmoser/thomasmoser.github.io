import LocomotiveScroll from "locomotive-scroll";
var imagesLoaded = require("imagesloaded");

let scrollContainer = document.querySelector("[data-scroll-container]");
const scroll = new LocomotiveScroll({
  el: scrollContainer,
  smooth: true,
});

imagesLoaded(scrollContainer, { background: true }, function () {
  scroll.update();
});
