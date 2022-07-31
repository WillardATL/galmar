// script for burger menu
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


//script for input mask
let selector=document.querySelectorAll('input[type="tel"]');
let im=new Inputmask('+38 (999) 999-99-99');
im.mask(selector);

// script for input validations
let validateForms = function(selector, rules) {
	new window.JustValidate(selector, {
		rules: rules,
    messages: {
      name: {
        required: 'Заповніть це поле',
        minLength:'Заповніть це поле',
        strength: 'Перевірте дані!'
      },
      tel: {
        required: 'Заповніть це поле',
        strength: 'Перевірте дані!'}
    },
		submitHandler: function(form) {
			let formData = new FormData(form);

			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						Swal.fire({
              title: 'Дякуємо!',
              text: 'Мы отримали ваше повідомлення і передзвонимо найближчим часом.',
              success: 'success',
              scrollbarPadding: false,
            });
					}
				}
			}

			xhr.open('POST', 'sendmail.php', true);
			xhr.send(formData);

			form.reset();
		}
	});
}

validateForms('.form', { 
    tel: {
      required: true,
      strength: {
        custom: '[^_]$'
      }
    }, 
    name: {
      required: true,
      minLength: 3,
      strength: {
        custom: '^[^0-9]+$'
      }
    }
});