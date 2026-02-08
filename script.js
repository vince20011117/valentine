const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const card = document.querySelector(".card");

let noCount = 0;

const messages = [
  "NO 💔",
  "Are you sure? 😐",
  "Really?? 😢",
  "Please… 🥺",
  "This hurts 😭",
  "Just press YES 😏",
  "Last chance! NO or YES? 😬",
  "You’re enjoying this, aren’t you? 😤",
  "Fine, keep saying NO... 😒",
  "Okay fine… YES? 😏",
];

function shakePage() {
  card.classList.add("shake");
  setTimeout(() => card.classList.remove("shake"), 300);
}

function handleNoClick() {
  noCount++;

  // Change message text
  message.textContent = messages[Math.min(noCount, messages.length - 1)];

  // YES grows
  const yesScale = 1 + noCount * 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;

  // NO shrinks
  const noScale = Math.max(0.4, 1 - noCount * 0.12);
  noBtn.style.transform = `scale(${noScale})`;

  // Shake the page
  shakePage();
}

// Works on PC & mobile
// noBtn.addEventListener("click", handleNoClick); // for pc
// noBtn.addEventListener("touchstart", handleNoClick); // for mobile
noBtn.addEventListener("touchstart", handleNoClick); // for both

yesBtn.addEventListener("click", () => {
  window.location.href = "yes.html";
});
