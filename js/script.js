
function startQuestionCount() {
    let questionCount = 0;

    return function () {
        questionCount++;
        countQuestion.innerHTML = questionCount;
    }
}
const incrementQuestionCount = startQuestionCount()
// Функція прокрутки донизу
function scrollToBottom() {
    const chatContainer = document.getElementById('message-container');
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}
const countQuestion = document.querySelector('.nav-block__count')
const messageAnswer = document.querySelector('.message-answer');
const answerYes = document.querySelector('.yes');
const answerNo = document.querySelector('.no');
const questionMessageList = document.querySelector('.message-list');
const formContainer = document.querySelector('.form-block');



document.addEventListener("DOMContentLoaded", function () {
    const messages = document.querySelectorAll('.message-item');
    let delay = 0;

    messages.forEach((message, index) => {
        setTimeout(() => {
            if (message) {
                message.classList.add('visible');
                scrollToBottom(); // Після відображення повідомлення
                if (index === messages.length - 1) {
                    setTimeout(() => {
                        if (messageAnswer) {
                            messageAnswer.classList.add('visible');
                            scrollToBottom(); // Після відображення кнопок
                        }

                    }, 600);

                }
            }
            incrementQuestionCount()
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
    if (questionMessageList) {
        questionMessageList.appendChild(newAnswer);
        setTimeout(() => {
            newAnswer.classList.add('visible');
            scrollToBottom(); // Прокрутка після додавання нової відповіді
        }, 300);
    }
    if (messageAnswer) {
        messageAnswer.classList.remove('visible')
    }
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
        }, 600);
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
    if (questionMessageList) {
        questionMessageList.appendChild(newQuestion);
        setTimeout(() => {
            newQuestion.classList.add('visible');
            scrollToBottom(); // Прокрутка після додавання нового питання
            incrementQuestionCount()
        }, 600);

        setTimeout(() => {
            if (messageAnswer) {
                messageAnswer.classList.add('visible') /////////////
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
                        messageAnswer.style.display = 'none';

                        setTimeout(() => {
                            finalMessage.classList.add('visible');
                            formContainer.style.display = 'block';
                            scrollToBottom(); // Прокрутка після додавання фінального повідомлення
                        }, 700);
                        setTimeout(() => {
                            if (formContainer) {
                                formContainer.classList.add('visible')
                                scrollToBottom();
                            }
                        }, 1200)
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
            }
        }, 700);
    }
}

const observer = new MutationObserver(scrollToBottom);
const chatContainer = document.getElementById('message-container');
if (chatContainer) {
    observer.observe(chatContainer, { childList: true, subtree: true });
}

scrollToBottom();
