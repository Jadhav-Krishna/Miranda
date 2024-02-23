Shery.mouseFollower();

function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    multiplier: 0.5,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotive();

function darkmode() {
  var paper = document.querySelector("#paper");
  var body = document.querySelector("#body");
  var currMode = "light";

  paper.addEventListener("click", () => {
    if (currMode == "light") {
      currMode = "dark";
      body.classList.add("dark");
      body.classList.remove("light");
    } else {
      currMode = "light";
      body.classList.add("light");
      body.classList.remove("dark");
    }
    console.log(currMode);
  });
}
darkmode();

var timelinex = gsap.timeline();
function time() {
  a = 0;
  setInterval(function () {
    a = a + Math.floor(Math.random() * 10);
    if (a < 100) {
      document.querySelector("#loader h2").innerHTML = a + "%";
    } else {
      a = 100;
      document.querySelector("#loader h2").innerHTML = a + "%";
    }
  }, 250);
}
time();
timelinex.to("#loader h2", {
  delay: 1,
  duration: 1,
  onStart: time(),
});
timelinex.to("#loader", {
  y: "-100vh",
  delay: 1,
  duration: 1.5,
  scale: 0,
});

timeline.from("#nav",{
  y:10,
  opacity:0,
  duration:1,
  delay: 0.5,
})
timelinex.from(
  "#page1 #work #w2 h1 ,#page1 #work #w2 h2 ,#page1 #work #w2 h4",
  {
    y: 100,
    scale: 0.5,
    duration: 0.5,
    stagger: 0.3,
    delay: 1,
  }
);
