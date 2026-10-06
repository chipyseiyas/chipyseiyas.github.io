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
