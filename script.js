const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

yesBtn.addEventListener("click", () => {
  window.location.href = "yes.html";
});

noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});
