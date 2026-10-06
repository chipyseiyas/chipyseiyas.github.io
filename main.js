const header = document.querySelector(".top");
const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav a")];

const markActive = () => {
  const line = header.getBoundingClientRect().bottom + 24;
  let current = sections[0]?.id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= line) current = section.id;
  }
  for (const link of links) {
    const on = link.getAttribute("href") === `#${current}`;
    if (on) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
};

markActive();
document.addEventListener("scroll", markActive, { passive: true });

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const command = document.querySelector(".cmd");
const root = document.documentElement;

if (command) {
  const text = command.dataset.cmd || "";
  if (reduceMotion) {
    command.textContent = text;
    root.classList.add("booted");
  } else {
    root.classList.add("js");
    let index = 0;
    const type = () => {
      command.textContent = text.slice(0, index);
      index += 1;
      if (index <= text.length) {
        window.setTimeout(type, 70);
      } else {
        window.setTimeout(() => root.classList.add("booted"), 180);
      }
    };
    type();
  }
}
