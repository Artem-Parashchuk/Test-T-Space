const firstNameErrorMessage = document.querySelector('.firstName-error');
const lastNameErrorMessage = document.querySelector('.lastName-error');
const emailErrorMessage = document.querySelector('.email-error');
const phoneErrorMessage = document.querySelector('.phone-error');

document.addEventListener('DOMContentLoaded', () => {
    const submitForm = document.querySelector('.form-btn');
    if (submitForm) {
        submitForm.addEventListener('click', (event) => {
            event.preventDefault();

            const firstName = document.querySelector('.form-firstName').value.trim();
            const lastName = document.querySelector('.form-lastName').value.trim();
            const email = document.querySelector('.form-email').value.trim();
            const phone = document.querySelector('.form-phone').value.trim();

            let isValid = true;

            // Валідація імені
            if (firstName.length < 2) {
                firstNameErrorMessage.style.display = 'block';
                isValid = false;
            } else {
                firstNameErrorMessage.style.display = 'none';
            }

            // Валідація прізвища
            if (lastName.length < 2) {
                lastNameErrorMessage.style.display = 'block';
                isValid = false;
            } else {
                lastNameErrorMessage.style.display = 'none';
            }

            // Валідація email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                emailErrorMessage.style.display = 'block';
                isValid = false;
            } else {
                emailErrorMessage.style.display = 'none';
            }

            // Валідація телефона
            const phonePattern = /^\+380\d{9}$/;
            if (!phonePattern.test(phone) ||
                phone.length < 13 || phone.length > 13) {
                    
                phoneErrorMessage.style.display = 'block';
                isValid = false;
            } else {
                phoneErrorMessage.style.display = 'none';
            }

            if (!isValid) {
                return;
            }

            // Зберігаємо дані у localStorage
            localStorage.setItem('formData', JSON.stringify({
                firstName,
                lastName,
                email,
                phone
            }));

            // Перехід на сторінку "Дякую"
            window.location.href = "success.html";
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const formData = JSON.parse(localStorage.getItem('formData'));

    if (formData) {
        console.log('Дані форми:', formData);

        localStorage.removeItem('formData');
    }
});
