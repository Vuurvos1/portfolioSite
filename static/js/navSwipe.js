// add this to all pages (currently only home page)

const trigger = document.querySelector("#swipeTrigger");
const menuList = document.querySelector(".menu__list");
const menuToggle = document.querySelector(".menu__label");
const menuCheckbox = document.querySelector("#toggleMenu");

let touchStartX;
let touchmoveX;
let dragDist = null;

let menuOpen = false;
let menuWidth = menuList.offsetWidth;

const menuOpenDrag = 80;
const mobileWidht = 768;

// Get window width
let windowWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

// Setup code
if (windowWidth < mobileWidht) {
  menuList.style.transform = `translateX(${menuWidth + 32}px)`;
}

// window resize
window.onresize = () => {
  windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  console.log(`windowWidth: ${windowWidth}`);

  menuWidth = menuList.offsetWidth;

  if (windowWidth > mobileWidht) {
    menuList.style.transform = `translateX(0px)`;
  } else {
    menuList.style.transform = `translateX(${menuWidth + 32}px)`;
  }
};

// Menu toggle
menuToggle.addEventListener("click", () => {
  if (menuOpen) {
    menuOpen = false;
    menuCheckbox.checked = true;
    menuList.style.transform = `translateX(${menuWidth + 32}px)`;
  } else {
    menuOpen = true;
    menuCheckbox.checked = false;
    menuList.style.transform = `translateX(0)`;
  }
});

// Touch start
trigger.addEventListener(
  "touchstart",
  (e) => {
    const firstTouch = e.touches[0] || e.originalEvent.touches[0]; // browser API
    touchStartX = firstTouch.clientX;
  },
  false
);

// Dragging
trigger.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    touchmoveX = e.changedTouches[0].clientX;

    dragDist = touchStartX - touchmoveX;

    if (dragDist > 0 && dragDist < menuOpenDrag) {
      menuOpen(false);
    }
  },
  false
);

// Swipe end
trigger.addEventListener("touchend", (e) => {
  console.log("touch end");
  console.log(e);
  if (dragDist < menuOpenDrag) {
    // close menu
    openMenu(false);
  } else {
    // open menu
    openMenu(true);
  }
});

// tap next to menu when open
document.querySelector("body").addEventListener("click", (e) => {
  if (menuOpen) {
    if (e.clientX < windowWidth - menuWidth) {
      // close menu
      openMenu(false);
    }
  }
});

// add swipe to close menu

function openMenu(a) {
  // true is open menu, false is close menu
  if (a) {
    menuOpen = true;
    menuCheckbox.checked = true;
    menuList.style.transform = `translateX(0)`;
  } else {
    menuOpen = false;
    menuCheckbox.checked = false;
    menuList.style.transform = `translateX(${menuWidth + 32}px)`;
  }
}
