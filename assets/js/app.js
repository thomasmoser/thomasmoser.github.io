import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { CustomEase } from "gsap/CustomEase";
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
split(".pt-header .exp-point-header");
// split(".pt-header-subheader .gen-subheader");
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
      duration: 2.5,
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

// gsap.fromTo(
//   ".edu-wtm:nth-of-type(1)",
//   { xPercent: 0 },
//   { xPercent: -100, duration: 10, repeat: -1, repeatDelay: 2, ease: "none" }
// );

// gsap.fromTo(
//   ".edu-wtm:nth-of-type(2)",
//   { xPercent: 0 },
//   { xPercent: -100, duration: 10, repeat: -1, ease: "none", delay: 5 }
// );

// gsap.fromTo(
//   "#section-edu .wtm-category",
//   { xPercent: 0 },
//   {
//     scrollTrigger: {
//       trigger: "#section-edu .wtm-category",
//       scroller: scrollContainer,
//       start: () => {
//         if (window.innerHeight / window.innerWidth >= 1) {
//           return "top-=100 center";
//         }
//         return "top bottom-=100";
//       },
//       end: "bottom+=600 center",
//       scrub: 2,
//     },
//     xPercent: -20,
//   }
// );

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
    toggleActions: "play none none reverse",
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
    toggleActions: "play none none reverse",
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
    toggleActions: "play none none reverse",
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

//Animation experiece section***********************************************************
// let exp_bg_delay = 0.5;
// let right_side_delay = 0.5;

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
  )
  .fromTo(
    "#exp-middle-seperator",
    { scaleY: 0, opacity: 0 },
    {
      opacity: 1,
      scaleY: 1,
      duration: 2,
      delay: 0.3,
    },
    "<"
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

// gsap.fromTo(
//   "#section-exp .wtm-category",
//   { xPercent: 0 },
//   {
//     scrollTrigger: {
//       trigger: "#section-exp .wtm-category",
//       scroller: scrollContainer,
//       start: () => {
//         if (window.innerHeight / window.innerWidth >= 1) {
//           return "top-=100 center";
//         } else {
//           return "top bottom-=100";
//         }
//       },
//       end: "bottom+=600 center",
//       scrub: 2,
//     },
//     xPercent: -20,
//   }
// );

//experience section first point***********
let tl_exp_first_intro = gsap.timeline({
  scrollTrigger: {
    trigger: ".first-tbl .pt-intro",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "top bottom-=100";
      }
    },
    toggleActions: "play none none reverse",
  },
});

tl_exp_first_intro
  .fromTo(
    ".first-tbl .tbl-intro-bg",
    { scaleX: 0, opacity: 0 },
    {
      scaleX: 1,
      opacity: 1,
      duration: 1.5,
    },
    "<"
  )
  .fromTo(
    ".first-tbl .tbl-intro.rev",
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: 1,
    },
    "<"
  );

let tl_exp_first_header = gsap.timeline({
  scrollTrigger: {
    trigger: ".first-tbl .pt-header",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "center-=200 center";
      }
    },
    toggleActions: "play none none reverse",
  },
});

tl_exp_first_header
  .fromTo(
    ".first-tbl .pt-header  .exp-point-header .rev",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 1,
      stagger: {
        amount: 0.2,
      },
    },
    "<"
  )
  .fromTo(
    ".first-tbl .pt-header  .pt-header-border-left",
    { scaleY: 0, opacity: 0 },
    {
      scaleY: 1,
      opacity: 1,
      duration: 1,
      delay: 0.1,
    },
    "<"
  )
  .fromTo(
    ".first-tbl .pt-header-subheader .gen-subheader",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 0.8,
      stagger: {
        amount: 0.2,
      },
    },
    "<+=0.3"
  )
  .fromTo(
    ".first-tbl .pt-header .right-half .tbl-misc",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
      stagger: {
        amount: 0.25,
      },
    },
    "<+=0.6"
  );

let tl_exp_first_detail = gsap.timeline({
  scrollTrigger: {
    trigger: ".first-tbl #pt-detail-first",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "center-=100 center";
      }
    },
    toggleActions: "play none none reverse",
  },
});

tl_exp_first_detail
  .fromTo(
    ".first-tbl .pt-detail",
    { opacity: 0, x: -10 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: {
        amount: 0.5,
        ease: "none",
      },
    },
    "<"
  )
  .fromTo(
    ".first-tbl .tbl-pt-detail-sep",
    { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0 },
    {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      opacity: 1,
      duration: 1,
      stagger: {
        each: 0.3,
        ease: "none",
      },
    },
    "<"
  );

//experience section second point***********
let tl_exp_second_intro = gsap.timeline({
  scrollTrigger: {
    trigger: ".second-tbl .pt-intro",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "top bottom-=100";
      }
    },
    toggleActions: "play none none reverse",
  },
});

tl_exp_second_intro
  .fromTo(
    ".second-tbl .tbl-intro-bg",
    { scaleX: 0, opacity: 0 },
    {
      scaleX: 1,
      opacity: 1,
      duration: 1.5,
    },
    "<"
  )
  .fromTo(
    ".second-tbl .tbl-intro.rev",
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: 1,
    },
    "<"
  );

let tl_exp_second_header = gsap.timeline({
  scrollTrigger: {
    trigger: ".second-tbl .pt-header",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "center-=200 center";
      }
    },
    toggleActions: "play none none reverse",
  },
});

tl_exp_second_header
  .fromTo(
    ".second-tbl .pt-header  .exp-point-header .rev",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 1,
      stagger: {
        amount: 0.2,
      },
    },
    "<"
  )
  .fromTo(
    ".second-tbl .pt-header  .pt-header-border-left",
    { scaleY: 0, opacity: 0 },
    {
      scaleY: 1,
      opacity: 1,
      duration: 1,
      delay: 0.1,
    },
    "<"
  )
  .fromTo(
    ".second-tbl .pt-header-subheader .gen-subheader",
    { opacity: 0, yPercent: 100 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 0.8,
      stagger: {
        amount: 0.2,
      },
    },
    "<+=0.3"
  )
  .fromTo(
    ".second-tbl .pt-header .right-half .tbl-misc",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.8,
      stagger: {
        amount: 0.25,
      },
    },
    "<+=0.6"
  );

let tl_exp_second_detail = gsap.timeline({
  scrollTrigger: {
    trigger: ".second-tbl #pt-detail-first",
    scroller: scrollContainer,
    start: () => {
      if (window.innerHeight / window.innerWidth >= 1) {
        return "top-=100 center";
      } else {
        return "center-=100 center";
      }
    },
    toggleActions: "play none none reverse",
  },
});

tl_exp_second_detail
  .fromTo(
    ".second-tbl .pt-detail",
    { opacity: 0, x: -10 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      stagger: {
        amount: 0.5,
        ease: "none",
      },
    },
    "<"
  )
  .fromTo(
    ".second-tbl .tbl-pt-detail-sep",
    { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0 },
    {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      opacity: 1,
      duration: 1,
      stagger: {
        each: 0.3,
        ease: "none",
      },
    },
    "<"
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
    toggleActions: "play none none reverse",
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
    toggleActions: "play none none reverse",
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
    toggleActions: "play none none reverse",
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

//Education Section
let prevScrollEdu = 0;
let scrollDirectionEdu = 1;
let EduPosition = document.querySelector(".wtm-marquee.wtm-edu").getBoundingClientRect().top;
let loopsEdu;
let initEdu = 0;

scroll.on("scroll", () => {
  let direction;
  let nextScroll = scroll.scroll.instance.scroll.y;
  if (scrollDirectionEdu == 1) {
    direction = Math.floor(nextScroll) >= Math.floor(prevScrollEdu) ? 1 : -1;
  } else {
    direction = Math.ceil(nextScroll) <= Math.ceil(prevScrollEdu) ? -1 : 1;
  }

  if (nextScroll + window.innerHeight >= EduPosition) {
    if (initEdu == 0) {
      loopsEdu = gsap.utils.toArray(".wtm-single.wtm-edu").map((line, i) => {
        const links = line.querySelectorAll(".wtm-edu.js-text");
        const speed = window.innerWidth > 800 ? 1 + i * 0.5 : 0.5 + i * 0.5;
        initEdu = 1;
        return horizontalLoop(links, {
          repeat: -1,
          speed: speed,
          reversed: false,
          paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px")),
        });
      });
    }
    if (direction !== scrollDirectionEdu && nextScroll + window.innerHeight >= EduPosition) {
      try {
        loopsEdu.forEach((tl) => gsap.to(tl, { timeScale: direction, overwrite: true }));
        scrollDirectionEdu = direction;
      } catch {
        console.log("no looped elements found");
      }
    }
  }
  prevScrollEdu = nextScroll;
});

//Experience Section
let prevScrollExp = 0;
let scrollDirectionExp = 1;
let ExpPosition = document.querySelector(".wtm-marquee.wtm-exp").getBoundingClientRect().top;
let loopsExp;
let initExp = 0;

scroll.on("scroll", () => {
  let direction;
  let nextScroll = scroll.scroll.instance.scroll.y;
  if (scrollDirectionExp == 1) {
    direction = Math.floor(nextScroll) >= Math.floor(prevScrollExp) ? 1 : -1;
  } else {
    direction = Math.ceil(nextScroll) <= Math.ceil(prevScrollExp) ? -1 : 1;
  }

  if (nextScroll + window.innerHeight >= ExpPosition) {
    if (initExp == 0) {
      loopsExp = gsap.utils.toArray(".wtm-single.wtm-exp").map((line, i) => {
        const links = line.querySelectorAll(".wtm-exp.js-text");
        const speed = window.innerWidth > 800 ? 1 + i * 0.5 : 0.5 + i * 0.5;
        initExp = 1;
        return horizontalLoop(links, {
          repeat: -1,
          speed: speed,
          reversed: false,
          paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px")),
        });
      });
    }
    if (direction !== scrollDirectionExp && nextScroll + window.innerHeight >= ExpPosition) {
      try {
        loopsExp.forEach((tl) => gsap.to(tl, { timeScale: direction, overwrite: true }));
        scrollDirectionExp = direction;
      } catch {
        console.log("no looped elements found");
      }
    }
  }
  prevScrollExp = nextScroll;
});

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 + gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        { xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100) },
        {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}
