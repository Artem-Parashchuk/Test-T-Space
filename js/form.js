document.addEventListener('DOMContentLoaded', () => {
    const submitForm = document.querySelector('.form-btn');
    if (submitForm) {
        submitForm.addEventListener('click', (event) => {
            event.preventDefault();

            const firstName = document.querySelector('.form-firstName').value.trim();
            const lastName = document.querySelector('.form-lastName').value.trim();
            const email = document.querySelector('.form-email').value.trim();
            const phone = document.querySelector('.form-phone').value.trim();

            // Валідація форми
            if (firstName.length < 2) {
                alert("Ім'я занадто коротке");
                return;
            }
            if (lastName.length < 2) {
                alert("Прізвище занадто коротке");
                return;
            }
            if (phone.length <= 9) {
                alert("Номер телефону занадто короткий")
                return
            } 
            if (phone.length >= 14) {
                alert("Номер телефону занадто довгий")
                return
            }
            if (!firstName || !lastName || !email || !phone) {
                alert("Будь ласка, заповніть всі поля.");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Будь ласка, введіть коректну електронну пошту.");
                return;
            }

            const phonePattern = /^(?:\+(\d{1,3}))?[\s.-]?(?:\(?(\d{2,5})\)?[\s.-]?)?(\d{3,4})[\s.-]?(\d{3,4})$/;
            if (!phonePattern.test(phone)) {
                alert("Будь ласка, введіть коректний номер телефону. Наприклад: +1-800-555-5555 або 800-555-5555.");
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


