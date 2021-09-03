let mobileBody=document.getElementById("body");
let burgerButton=document.getElementById("burgerCheckbox");
let mobileMenu=document.getElementById('burgerMenuList');

burgerButton.addEventListener("click", function() {
    mobileBody.classList.toggle("bodyOverflow");
  });

mobileMenu.onclick = function() {
      burgerButton.click();
      mobileBody.classList.remove("bodyOverflow");
  }