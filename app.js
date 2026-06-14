const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const joinBtn = document.getElementById("joinBtn");
joinBtn.addEventListener("click",function(){
  window.location.href="register.html";
});
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
