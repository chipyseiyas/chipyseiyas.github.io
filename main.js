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

const canvas = document.getElementById("field");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas && !reduceMotion) {
  const ctx = canvas.getContext("2d");
  const nodes = Array.from({ length: 46 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00032,
    vy: (Math.random() - 0.5) * 0.00032,
  }));

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > 1) node.vx *= -1;
      if (node.y < 0 || node.y > 1) node.vy *= -1;
    }
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = (a.x - b.x) * canvas.width;
        const dy = (a.y - b.y) * canvas.height;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          ctx.strokeStyle = `rgba(156, 188, 255, ${(1 - dist / 150) * 0.38})`;
          ctx.beginPath();
          ctx.moveTo(a.x * canvas.width, a.y * canvas.height);
          ctx.lineTo(b.x * canvas.width, b.y * canvas.height);
          ctx.stroke();
        }
      }
    }
    for (const node of nodes) {
      ctx.fillStyle = "rgba(228, 177, 90, 0.9)";
      ctx.beginPath();
      ctx.arc(node.x * canvas.width, node.y * canvas.height, 1.7, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  };

  resize();
  window.addEventListener("resize", resize);
  tick();
}
