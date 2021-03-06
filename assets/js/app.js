import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { CustomEase } from "gsap/CustomEase";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
gsap.registerPlugin(ScrollTrigger, CustomEase);

//init smooth scroll
let scrollContainer = document.querySelector("[data-scroll-container]");
const scroll = new LocomotiveScroll({
  el: scrollContainer,
  smooth: true,
  lerp: 0.05,
  multiplier: 0.8,
  gestureDirection: "vertical",
});

//dynamically adjust height of education timeline
function SetLineHeight() {
  let tl_line = document.querySelector(".tl-line");
  let abi_dim = document.querySelector("#tl-header-flex-abi").getBoundingClientRect();
  let master_dim = document.querySelector("#tl-header-flex-master").getBoundingClientRect();
  let tl_line_height = master_dim.top - abi_dim.top + master_dim.height / 2 - abi_dim.height / 2;
  tl_line.style.top = `${abi_dim.height / 2}px`;
  tl_line.style.height = `${tl_line_height}px`;
}

//update line height on full load and resize events
window.addEventListener("load", () => {
  SetLineHeight();
  scroll.update();
});
window.onresize = () => {
  SetLineHeight();
  scroll.update();
};

//nav click events
//ids: nav-contact; nav-bio
let nav_bio = document.querySelector("#nav-bio");
let nav_contact = document.querySelector("#nav-contact");

nav_bio.addEventListener("click", (event) => {
  event.preventDefault();
  if (window.innerWidth <= 800) {
    setTimeout(() => {
      scroll.scrollTo(document.querySelector("#section-edu"));
    }, 600);
  } else {
    scroll.scrollTo(document.querySelector("#section-edu"));
  }
});

nav_contact.addEventListener("click", (event) => {
  event.preventDefault();
  if (window.innerWidth <= 800) {
    setTimeout(() => {
      scroll.scrollTo(document.querySelector("#section-contact"));
    }, 600);
  } else {
    scroll.scrollTo(document.querySelector("#section-contact"));
  }
});

//GSAP
gsap.registerPlugin(ScrollTrigger);
scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
});

ScrollTrigger.scrollerProxy(scrollContainer, {
  scrollTop(value) {
    return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: "transform",
});

//span wrapping for animation
let wrap = function (toWrap) {
  let wrapper = document.createElement("span");
  wrapper.className = "span-wrapper";
  toWrap.parentNode.appendChild(wrapper);
  return wrapper.appendChild(toWrap);
};

let split = function (toSplit) {
  let els = document.querySelectorAll(toSplit);
  Array.prototype.forEach.call(els, function (el) {
    el.innerHTML = el.innerHTML.replace(
      /(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
      '$1<span class="rev" style="opacity: 0">$2</span>'
    );
  });
  let el_spans = document.querySelectorAll(`${toSplit} span`);
  Array.prototype.forEach.call(el_spans, function (span) {
    if (span.parentElement.className !== "span-wrapper") {
      wrap(span);
    }
  });
};

split("#hero-header");
split(".abstract-text");
split(".tl-header");
split(".exp-point-header");
split(".exp-point-container .gen-detail");
split(".project-header");
split(".project-info .gen-detail");
split("#section-contact .quote-text");

//load animation*********************************************************************

let tl_hero = gsap.timeline();

gsap.set("#section-edu", { visibility: "visible" });

tl_hero
  .add(
    gsap
      .fromTo(
        ".journal-desc.nav",
        { opacity: 0, yPercent: 100 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 1,
        }
      )
      .delay(0.3)
  )
  .fromTo(
    ".nav-first > .nav-a-replace > .nav-title-wrapper > .rev",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 0.6,
    },
    "<+=0.1"
  )
  .fromTo(
    ".nav-second > .nav-a-replace > .nav-title-wrapper > .rev",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 0.6,
    },
    "<+=0.2"
  )
  .fromTo(
    "#hero-header",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.001,
    },
    "<"
  )
  .fromTo(
    "#hero-header .rev",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 0.9,
      stagger: {
        amount: 0.5,
      },
    },
    "<"
  )
  .fromTo(".backlight", { opacity: 0 }, { opacity: 0.8, duration: 4 }, "<+=0.1")
  .fromTo(
    ".author.rev",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 2,
    },
    "<+=0.8"
  )
  .fromTo(
    "#section-hero  .page-break",
    { scaleX: 0, opacity: 0 },
    {
      scaleX: 1,
      opacity: 1,
      duration: 2,
      ease: "power2.out",
    },
    "<"
  )
  .fromTo(
    ".abstract.rev",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 2,
    },
    "<+=0.25"
  )
  .fromTo(
    "#abstract-text-id",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.001,
    },
    "<"
  )
  .fromTo(
    "#abstract-text-id .rev",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      stagger: {
        amount: 1,
      },
      duration: 1,
    },
    "<"
  );

//Animation education section***********************************************************
let tl_edu_desc = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-edu .wtm-category",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      }
      return "top bottom-=100";
    },
  },
});

tl_edu_desc
  .fromTo(
    "#section-edu .wtm-category",
    { opacity: 0.01 },
    {
      opacity: 1,
      duration: 1.5,
    }
  )
  .fromTo(
    "#section-edu .page-break",
    { scaleX: 0, opacity: 0 },
    {
      scaleX: 1,
      opacity: 1,
      duration: 2,
      // ease: "Power1.easeInOut",
      ease: "power2.out",
    },
    "<"
  )
  .fromTo(
    "#section-edu .desc-number",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
    },
    "<"
  )
  .fromTo(
    "#section-edu .desc-review",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
    },
    "<+=0.1"
  );

gsap.fromTo(
  "#section-edu .wtm-category",
  { xPercent: 0 },
  {
    scrollTrigger: {
      trigger: "#section-edu .wtm-category",
      scroller: scrollContainer,
      start: () => {
        if (window.innerHeight / window.innerWidth >= 1) {
          return "top-=100 center";
        }
        return "top bottom-=100";
      },
      end: "bottom+=600 center",
      scrub: 2,
    },
    xPercent: -20,
  }
);

//education section timeline
gsap.fromTo(
  ".tl-line",
  { scaleY: 0 },
  {
    scrollTrigger: {
      scroller: scrollContainer,
      trigger: "#edu-tl-container .tl-point:nth-child(2)",
      start: "top center",
      endTrigger: "#edu-tl-container .tl-point:nth-child(4)",
      end: "center center",
      scrub: 2,
    },
    // ease: CustomEase.create(
    //   "custom",
    //   "M0,0 C0.083,0.294 0.372,0.452 0.638,0.642 0.732,0.708 0.74,0.834 0.79,0.912 0.832,1.012 0.997,1 1,1 "
    // ),
    scaleY: 1,
  }
);

//education section first point***********
let tl_edu_first = gsap.timeline({
  scrollTrigger: {
    trigger: "#edu-tl-container .tl-point:nth-child(2)",
    scroller: scrollContainer,
    // start: "top bottom-=100",
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "top bottom-=100";
      }
    },
  },
});

tl_edu_first
  .fromTo(
    ".tl-point:nth-child(2) .tl-marker-container",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
    }
  )
  .fromTo(
    ".tl-point:nth-child(2) .rev",
    { yPercent: 100, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      stagger: {
        amount: 0.3,
      },
    },
    "<"
  )
  .fromTo(
    ".tl-point:nth-child(2) .gen-detail",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      stagger: {
        amount: 0.6,
      },
    },
    "<+=0.8"
  );

//education section second point***********
let tl_edu_second = gsap.timeline({
  scrollTrigger: {
    trigger: "#edu-tl-container .tl-point:nth-child(3)",
    scroller: scrollContainer,
    // start: "top bottom-=100",

    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "top bottom-=100";
      }
    },
  },
});

tl_edu_second
  .fromTo(
    ".tl-point:nth-child(2) .tl-footer-container",
    { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0 },
    {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      opacity: 1,
      duration: 2.4,
    }
  )
  .fromTo(
    ".tl-point:nth-child(3) .tl-marker-container",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
    },
    "<"
  )
  .fromTo(
    ".tl-point:nth-child(3) .rev",
    { yPercent: 100, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      stagger: {
        amount: 0.3,
      },
    },
    "<"
  )

  .fromTo(
    ".tl-point:nth-child(3) .gen-detail",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      stagger: {
        amount: 0.6,
      },
    },
    "<+=0.8"
  );

//education section third point***********
let tl_edu_third = gsap.timeline({
  scrollTrigger: {
    trigger: "#edu-tl-container .tl-point:nth-child(4)",
    scroller: scrollContainer,
    start: "top-=100 center",
  },
});

tl_edu_third
  .fromTo(
    ".tl-point:nth-child(3) .tl-footer-container",
    { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0 },
    {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      opacity: 1,
      duration: 1.6,
      ease: "power1.out",
    }
  )
  .fromTo(
    ".tl-point:nth-child(4) .tl-marker-container",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
    },
    "<"
  )
  .fromTo(
    ".tl-point:nth-child(4) .rev",
    { yPercent: 100, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      stagger: {
        amount: 0.3,
      },
    },
    "<"
  )

  .fromTo(
    ".tl-point:nth-child(4) .gen-detail",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.5,
      stagger: {
        amount: 0.3,
      },
    },
    "<+=0.8"
  );

console.log(tl_edu_second.duration());
console.log(tl_edu_third.duration());

//Animation experiece section***********************************************************
let exp_bg_delay = 0.5;
let right_side_delay = 0.5;

let tl_exp_desc = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-exp .wtm-category",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "top bottom-=100";
      }
    },
  },
});

tl_exp_desc
  .fromTo(
    "#section-exp .page-break",
    { scaleX: 0, opacity: 0 },
    {
      scaleX: 1,
      opacity: 1,
      duration: 2,
      // ease: "Power1.easeInOut",
      ease: "power2.out",
    }
  )
  .fromTo(
    "#section-exp .desc-number",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
    },
    "<"
  )
  .fromTo(
    "#section-exp .desc-review",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
    },
    "<+=0.1"
  );

gsap.fromTo(
  "#section-exp .wtm-category",
  { opacity: 0.01 },
  {
    scrollTrigger: {
      trigger: "#section-exp .wtm-category",
      scroller: scrollContainer,
      start: () => {
        if (window.innerHeight / window.innerWidth >= 1) {
          return "top-=100 center";
        } else {
          return "top bottom-=100";
        }
      },
      //end: "bottom center",
    },
    opacity: 1,
    duration: 1.5,
  }
);

gsap.fromTo(
  "#section-exp .wtm-category",
  { xPercent: 0 },
  {
    scrollTrigger: {
      trigger: "#section-exp .wtm-category",
      scroller: scrollContainer,
      start: () => {
        if (window.innerHeight / window.innerWidth >= 1) {
          return "top-=100 center";
        } else {
          return "top bottom-=100";
        }
      },
      end: "bottom+=600 center",
      scrub: 2,
    },
    xPercent: -20,
  }
);

//experience section first point header***********
let tl_exp_first = gsap.timeline({
  scrollTrigger: {
    trigger: "#exp-points .exp-point:nth-child(1)",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "top bottom-=100";
      }
    },
  },
});

tl_exp_first.fromTo(
  ".exp-point:nth-child(1) .exp-point-general .rev",
  { yPercent: 100, opacity: 0 },
  {
    yPercent: 0,
    opacity: 1,
    duration: 1,
    stagger: {
      amount: 0.5,
    },
  },
  "<"
);

tl_exp_first
  .fromTo(
    "#exp-points .exp-point:nth-child(1) .exp-point-detail .exp-point-detail-separator",
    { scaleY: 0 },
    {
      scaleY: 1,
      duration: 2.5,
    },
    "<"
  )
  .fromTo(
    "#exp-points .exp-point:nth-child(1) .exp-point-detail .exp-point-container:nth-child(1) .rev",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 1,
      stagger: {
        amount: 1,
      },
    },
    "<"
  )
  .fromTo(
    "#exp-points .exp-point:nth-child(1) .exp-point-detail .exp-point-container:nth-child(1) .exp-point-header-bg",
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1.5,
    },
    `<+=${exp_bg_delay}`
  )
  .fromTo(
    "#exp-points .exp-point:nth-child(1) .exp-point-detail .exp-point-container:nth-child(3) .rev",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 1,
      stagger: {
        amount: 1,
      },
    },
    `<+=${right_side_delay}`
  )
  .fromTo(
    "#exp-points .exp-point:nth-child(1) .exp-point-detail .exp-point-container:nth-child(3) .exp-point-header-bg",
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1.5,
    },
    `<+=${exp_bg_delay}`
  );

//experience section second point header***********
let tl_exp_second = gsap.timeline({
  scrollTrigger: {
    trigger: "#exp-points .exp-point:nth-child(2)",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "top bottom-=100";
      }
    },
  },
});

tl_exp_second.fromTo(
  ".exp-point:nth-child(2) .exp-point-general .rev",
  { yPercent: 100, opacity: 0 },
  {
    yPercent: 0,
    opacity: 1,
    duration: 1,
    stagger: {
      amount: 0.5,
    },
  },
  "<"
);
//experience section second point detail***********
// let tl_exp_second_detail = gsap.timeline({
//   scrollTrigger: {
//     trigger: "#exp-points .exp-point:nth-child(2) .exp-point-detail",
//     scroller: scrollContainer,
//     start: "top center",
//   },
// });

tl_exp_second
  .fromTo(
    "#exp-points .exp-point:nth-child(2) .exp-point-detail .exp-point-detail-separator",
    { scaleY: 0 },
    {
      scaleY: 1,
      duration: 2.5,
    },
    "<"
  )

  .fromTo(
    "#exp-points .exp-point:nth-child(2) .exp-point-detail .exp-point-container:nth-child(1) .rev",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 1,
      stagger: {
        amount: 1,
      },
    },
    "<"
  )
  .fromTo(
    "#exp-points .exp-point:nth-child(2) .exp-point-detail .exp-point-container:nth-child(1) .exp-point-header-bg",
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1.5,
    },
    `<+=${exp_bg_delay}`
  )
  .fromTo(
    "#exp-points .exp-point:nth-child(2) .exp-point-detail .exp-point-container:nth-child(3) .rev",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 1,
      stagger: {
        amount: 1,
      },
    },
    `<+=${right_side_delay}`
  )
  .fromTo(
    "#exp-points .exp-point:nth-child(2) .exp-point-detail .exp-point-container:nth-child(3) .exp-point-header-bg",
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1.5,
    },
    `<+=${exp_bg_delay}`
  );

//Animation project section***********************************************************

let tl_pro_desc = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-pro .projects-grid-wrapper",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "top bottom-=100";
      }
    },
  },
});

tl_pro_desc
  .fromTo(
    "#section-pro .page-break",
    { scaleX: 0, opacity: 0 },
    {
      scaleX: 1,
      opacity: 1,
      duration: 2,
      // ease: "Power1.easeInOut",
      ease: "power2.out",
    }
  )
  .fromTo(
    "#section-pro .desc-number",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
    },
    "<"
  )
  .fromTo(
    "#section-pro .desc-review",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
    },
    "<+=0.1"
  );

//grid animation*******************
gsap.fromTo(
  ".projects-grid-wrapper .grid-row:nth-child(1)",
  { xPercent: 0 },
  {
    scrollTrigger: {
      trigger: "#section-pro .projects-grid-wrapper",
      scroller: scrollContainer,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    xPercent: -5,
  }
);
gsap.fromTo(
  ".projects-grid-wrapper .grid-row:nth-child(2)",
  { xPercent: 0 },
  {
    scrollTrigger: {
      trigger: "#section-pro .projects-grid-wrapper",
      scroller: scrollContainer,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    xPercent: 5,
  }
);
gsap.fromTo(
  ".projects-grid-wrapper .grid-row:nth-child(3)",
  { xPercent: 0 },
  {
    scrollTrigger: {
      trigger: "#section-pro .projects-grid-wrapper",
      scroller: scrollContainer,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    xPercent: -5,
  }
);

//first project animation*******************
let tl_pro_first = gsap.timeline({
  scrollTrigger: {
    trigger: "#esports-wrapper",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "top bottom-=100";
      }
    },
  },
});

tl_pro_first
  .fromTo(
    "#esports-wrapper .project-header .rev",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 0.8,
      stagger: {
        amount: 0.5,
      },
    },
    "<"
  )
  .fromTo(
    "#esports-wrapper .gen-detail .rev",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 0.6,
      stagger: {
        amount: 0.6,
      },
    },
    "<+=0.3"
  )
  .fromTo(
    "#esports-wrapper .project-info-code",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.5,
    },
    "<+=0.5"
  )
  .fromTo(
    "#esports-wrapper .project-info-links",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.5,
    },
    "<+=0.2"
  );
//first project animation - images*******************
let tl_pro_first_img = gsap.timeline({
  scrollTrigger: {
    trigger: "#esports-wrapper",
    scroller: scrollContainer,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
});

tl_pro_first_img
  .fromTo(
    "#esports-wrapper .img-row-wrapper .vignette",
    { y: -15 },
    {
      y: -50,
    },
    "<"
  )
  .fromTo(
    "#esports-wrapper .img-row-wrapper .img-row:nth-child(2) .img-wrapper:nth-child(1)",
    { y: 0 },
    {
      y: -50,
    },
    "<"
  )
  .fromTo(
    "#esports-wrapper .img-row-wrapper .img-row:nth-child(2) .img-wrapper:nth-child(2)",
    { y: 0 },
    {
      y: -50,
    },
    "<"
  )
  .fromTo(
    "#esports-wrapper .img-row-wrapper .img-row:nth-child(1) .img-wrapper:nth-child(2)",
    { y: 0 },
    {
      y: -40,
    },
    "<"
  )
  .fromTo(
    "#esports-wrapper .img-row-wrapper .img-row:nth-child(1) .img-wrapper:nth-child(1)",
    { y: 0 },
    {
      y: -40,
    },
    "<"
  );

//second project animation*******************
let tl_pro_second = gsap.timeline({
  scrollTrigger: {
    trigger: "#bejour-wrapper",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "top bottom-=100";
      }
    },
  },
});

tl_pro_second
  .fromTo(
    "#bejour-wrapper .project-header .rev",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 0.8,
      stagger: {
        amount: 0.5,
      },
    },
    "<"
  )
  .fromTo(
    "#bejour-wrapper .gen-detail .rev",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 0.6,
      stagger: {
        amount: 0.6,
      },
    },
    "<+=0.3"
  )
  .fromTo(
    "#bejour-wrapper .project-info-code",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.5,
    },
    "<+=0.5"
  )
  .fromTo(
    "#bejour-wrapper .project-info-links",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.5,
    },
    "<+=0.2"
  );

//second project animation - images*******************
let tl_pro_second_img = gsap.timeline({
  scrollTrigger: {
    trigger: "#bejour-wrapper",
    scroller: scrollContainer,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
});

tl_pro_second_img
  .fromTo(
    "#bejour-wrapper .img-row-wrapper .vignette",
    { y: -15 },
    {
      y: -50,
    },
    "<"
  )
  .fromTo(
    "#bejour-wrapper .img-row-wrapper .img-row:nth-child(2) .img-wrapper:nth-child(1)",
    { y: 0 },
    {
      y: -50,
    },
    "<"
  )
  .fromTo(
    "#bejour-wrapper .img-row-wrapper .img-row:nth-child(2) .img-wrapper:nth-child(2)",
    { y: 0 },
    {
      y: -50,
    },
    "<"
  )
  .fromTo(
    "#bejour-wrapper .img-row-wrapper .img-row:nth-child(1) .img-wrapper:nth-child(2)",
    { y: 0 },
    {
      y: -40,
    },
    "<"
  )
  .fromTo(
    "#bejour-wrapper .img-row-wrapper .img-row:nth-child(1) .img-wrapper:nth-child(1)",
    { y: 0 },
    {
      y: -40,
    },
    "<"
  );

//Animation contact section***********************************************************

let tl_contact_desc = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-contact",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "top bottom-=100";
      }
    },
  },
});

tl_contact_desc
  .fromTo(
    "#section-contact .page-break",
    { scaleX: 0, opacity: 0 },
    {
      scaleX: 1,
      opacity: 1,
      duration: 2,
      // ease: "Power1.easeInOut",
      ease: "power2.out",
    }
  )
  .fromTo(
    "#section-contact .desc-number",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
    },
    "<"
  )
  .fromTo(
    "#section-contact .desc-review",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
    },
    "<+=0.1"
  );

let tl_contact = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-contact .contact-text-wrapper",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "top bottom-=100";
      }
    },
  },
});

tl_contact
  .fromTo(
    "#section-contact #quote-icon",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
    },
    "<"
  )
  .fromTo(
    "#section-contact .contact-text-wrapper .rev",
    { yPercent: 100, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      stagger: {
        amount: 0.5,
      },
    },
    "<"
  )
  .fromTo(
    "#section-contact .contact-info-wrapper .gen-detail",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
    },
    "<+=1"
  )
  .fromTo(
    "#section-contact .contact-info-wrapper #contact-icons",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
    },
    "<+=0.2"
  );

// gsap.fromTo(
//   "h3",
//   { opacity: 0 },
//   {
//     scrollTrigger: {
//       trigger: ".comp-header.hero.abstract",
//       scroller: scrollContainer,
//       markers: true,
//       start: "top center",
//     },
//     opacity: 1,
//     duration: 1,
//   }
// );
