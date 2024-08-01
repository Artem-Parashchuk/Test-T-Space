
const messageAnswer = document.querySelector('div.message-answer');
const answerYes = document.querySelector('.yes');
const answerNo = document.querySelector('.no');
const questionMessageList = document.querySelector('.message-list');
const formContainer = document.querySelector('.form');
if (formContainer) {
    formContainer.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    const messages = document.querySelectorAll('.message-item');
    const btns = document.querySelector('.message-answer');
    let delay = 0;

    function scrollToBottom() {
        questionMessageList.scrollTop = questionMessageList.scrollHeight
      }

    messages.forEach((message, index) => {
        setTimeout(() => {
            message.classList.add('visible');
            // message.classList.remove('hidden');
            scrollToBottom()
            if (index === messages.length - 1) {
                // Показуємо блок з кнопками після останнього повідомлення
                setTimeout(() => {
                    btns.classList.add('visible');
                    // btns.classList.remove('hidden');
                    scrollToBottom()
                }, 600); // Додаємо затримку в 1 секунду після останнього повідомлення
            }
        }, delay);
        delay += 1000; // Затримка 1 секунда між повідомленнями
    });
});


function addAnswer(answerText) {
    const newAnswer = document.createElement('li');
    newAnswer.classList.add('answer-item');
    newAnswer.innerHTML = `
        <p class="answer-item__text">${answerText}</p>
        <img src="./img/teil.svg" alt="decoration img" class="answer-tail"/>
    `;
    questionMessageList.appendChild(newAnswer);
    setTimeout(() => {
        newAnswer.classList.add('visible');
    }, 100);
    messageAnswer.style.display = 'none';
}

function handleAnswerNoClick() {
    addAnswer("Дякую за вашу відповідь, чекаємо на ваше повернення");
}

if (answerYes) {
    answerYes.addEventListener('click', () => {
        addAnswer("Так");
        setTimeout(() => {
            questionStep(
                "Чи був у вас досвід пов'язаний із Арбітражем трафіку?",
                `<button class="message-answer__btn" id='answer-yes'>Так</button>
                 <button class="message-answer__btn" id='answer-no'>Ні</button>
                 <button class="message-answer__btn" id='answer-hear'>Чув про це</button>`
            );
        }, 500);
    }, { once: true });
}

if (answerNo) {
    answerNo.addEventListener('click', handleAnswerNoClick, { once: true });
}

function questionStep(question, answers, isFinalStep = false) {
    const newQuestion = document.createElement('li');
    newQuestion.classList.add('message-item', 'question');
    newQuestion.innerHTML = `
        <p class="message-text">${question}</p>
        <p class="message-time">11:45</p>
        <img src="./img/teil.svg" alt="decoration img" class="message-tail"/>
    `;
    questionMessageList.appendChild(newQuestion);
    setTimeout(() => {
        newQuestion.classList.add('visible');
    }, 100);

    setTimeout(() => {
        messageAnswer.innerHTML = answers;
        messageAnswer.style.display = 'flex';

        const ansYes = document.getElementById('answer-yes');
        const ansNo = document.getElementById('answer-no');
        const ansHear = document.getElementById('answer-hear');
        const ansOne = document.getElementById('answer-one');
        const ansTwo = document.getElementById('answer-two');
        const ansFive = document.getElementById('answer-five');

        const handleAnswerClick = (answerText) => {
            addAnswer(answerText);
            if (isFinalStep) {
                const finalMessage = document.createElement('li');
                finalMessage.classList.add('message-item');
                finalMessage.innerHTML = `
                    <p class="message-text">Дякую! Наша компанія дуже зацікавлена ​​вами, для подальшої підтримки зв'язку, будь ласка, заповніть форму.</p>
                    <p class="message-time">11:45</p>
                    <img src="./img/teil.svg" alt="decoration img" class="message-tail"/>
                `;
                questionMessageList.appendChild(finalMessage);
                formContainer.style.display = 'flex';
                setTimeout(() => {
                    finalMessage.classList.add('visible');
                }, 100);
            }
        };

        if (ansYes) {
            ansYes.addEventListener('click', () => {
                handleAnswerClick('Так');
                if (!isFinalStep) {
                    setTimeout(() => {
                        questionStep(
                            "Скільки часу ви могли б приділяти на день?",
                            `<button class="message-answer__btn" id='answer-one'>Одна година</button>
                             <button class="message-answer__btn" id='answer-two'>2-3 години</button>
                             <button class="message-answer__btn" id='answer-five'>5 і більше</button>`,
                            true
                        );
                    }, 500);
                }
            }, { once: true });
        }

        if (ansNo) {
            ansNo.addEventListener('click', () => {
                handleAnswerClick('Ні');
                if (!isFinalStep) {
                    setTimeout(() => {
                        questionStep(
                            "Скільки часу ви могли б приділяти на день?",
                            `<button class="message-answer__btn" id='answer-one'>Одна година</button>
                             <button class="message-answer__btn" id='answer-two'>2-3 години</button>
                             <button class="message-answer__btn" id='answer-five'>5 і більше</button>`,
                            true
                        );
                    }, 500);
                }
            }, { once: true });
        }

        if (ansHear) {
            ansHear.addEventListener('click', () => {
                handleAnswerClick('Чув про це');
                if (!isFinalStep) {
                    setTimeout(() => {
                        questionStep(
                            "Скільки часу ви могли б приділяти на день?",
                            `<button class="message-answer__btn" id='answer-one'>Одна година</button>
                             <button class="message-answer__btn" id='answer-two'>2-3 години</button>
                             <button class="message-answer__btn" id='answer-five'>5 і більше</button>`,
                            true
                        );
                    }, 500);
                }
            }, { once: true });
        }

        if (ansOne) {
            ansOne.addEventListener('click', () => {
                handleAnswerClick('Одна година');
            }, { once: true });
        }

        if (ansTwo) {
            ansTwo.addEventListener('click', () => {
                handleAnswerClick('2-3 години');
            }, { once: true });
        }

        if (ansFive) {
            ansFive.addEventListener('click', () => {
                handleAnswerClick('5 і більше');
            }, { once: true });
        }
    }, 100);
}



