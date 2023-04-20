axios.defaults.headers.common["Authorization"] = "crOAxtb2nvt4HvqrTlUr9bKq";

const api_url = "https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/";

const userQuizz =  {
  title: "",
  image: "",
  questions: [],
  levels: [],
};

// Gets user-made quizzes and, if it exists, display it
function getUserQuizz() {}

function displayUserQuizz() {}

// Gets quizzes made by third-party stored server-side, and then displays it
function getAllQuizz() {
  const promise = axios.get(api_url);

  promise.then(displayAllQuizz);

  promise.catch(console.error("bad request getAllQuizz()"));
}

function displayAllQuizz(array) {
  const element = document.querySelector(".all-quizz");

  for (const entry of array.data) {
    element.innerHTML += `
        <div class="quizz-container" onclick="displayQuizzPage(${entry.id})">
            <img src="${entry.image}" />
            <h3>${entry.title}</h3>
        </div>
        `;
  }
}

function displayQuizzPage(id) {
  const promise = axios.get(api_url + id);

  promise.then(displayQuizz);

  promise.catch(console.error("bad request displayQuizzPage(id)"));

  document.querySelector(".quizz-page").classList.toggle("hidden");
  document.querySelector(".home-page").classList.toggle("hidden");
}

function hideQuizzPage() {
  document.querySelector(".home-page").classList.toggle("hidden");
  document.querySelector(".quizz-page").classList.toggle("hidden");

  document.querySelector(".quizz-header").innerHTML = "";
  document.querySelector(".quizz-body").innerHTML = "";
}

// Display chosen quizz
function displayQuizz(array) {
  const element = document.querySelector(".quizz-body");

  let i = 0;

  document.querySelector(".quizz-header").innerHTML = `
    <img src="${array.data.image}" />
    <h2>${array.data.title}</h2>
    `;

  const questionGroup = array.data.questions;

  shuffle(questionGroup);

  for (const entry of questionGroup) {
    element.innerHTML += `
      <div class="quizz-question-container">
        <div class="quizz-title">${entry.title}</div>
        <div class="answer-group"></div>
      </div>
      `;

    const questionContainer = document.getElementsByClassName("answer-group");

    const questionItem = entry.answers;

    shuffle(questionItem);

    for (const answer of questionItem) {
      questionContainer[i].innerHTML += `
            <div class="answer-item" onclick="${answer.isCorrectAnswer}">
              <img src="${answer.image}" />
              <h3>${answer.text}</h3>
            </div>
            `;
    }

    i++;
  }
}

function shuffle(array) {
  let i = array.length,
    j,
    temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
}


function addQuizz()  {
  document.querySelector(".home-page").classList.add("hidden");
  document.querySelector(".addQuizz.hidden").classList.remove("hidden");
};

/* Função para checar se a URL é valida*/
function checkUrl(string) {
    let givenURL;
    try {
        givenURL = new URL(string);
    } catch (error) {
        console.log("error is", error);
        return false;
    }
    return true;
}

/* Função para checar se a cor está em um formato HEX valido*/
function isHexColor(hex) {
    let isHex = hex.match(/[A-F-0-9]/gi);
    if (hex[0] === "#" &&
        isHex.length === 6) {
        console.log(isHex)
        return true;
    }
    return false;
}

function openQuestion(element) {
    let questionOpened = document.querySelector(".opened");
    questionOpened.classList.remove("opened");
    questionOpened.classList.add("closed");
    questionOpened.previousElementSibling.innerHTML += `
    <button type="button" onclick="openQuestion(this)"><img src="./assets/button-img.png" alt=""></button>`

    element.parentNode.nextElementSibling.classList.remove("closed");
    element.parentNode.nextElementSibling.classList.add("opened");
    element.remove();
}


function renderUserQuestions(object) {
    let displayStatus = "";
    const questionsFront = document.querySelector(".questionsQuizz > .questions");
    questionsFront.innerHTML = ""
    for (let i = 0; i < object.questions.length; i++) {
        if (i === 0) {
            displayStatus = "opened";
        } else {
            displayStatus = "closed";
        };
        questionsFront.innerHTML += `
        <ul data-test="question-ctn" class="question${i + 1} inputs">
            <div class="questionButton">
            <h3>Pergunta ${i + 1}
            </div>
            <div class="${displayStatus}">
            <span class="space"></span>
            <li><input data-test="question-input" class="textQuestion" type="text" placeholder="Texto da pergunta" /></li>
            <li><input data-test="question-color-input" class="colorQuestion" type="text"
                placeholder="Cor de fundo da pergunta" />
            </li>
            <span class="space"></span>
            <h3>Resposta Correta</h3>
            <span class="space"></span>
            <li><input data-test="correct-answer-input" class="correctAnswer" type="text"
                placeholder="Resposta correta" />
            </li>
            <li><input data-test="correct-img-input" class="correctImg" type="text" placeholder="URL da imagem" />
            </li>
            <span class="space"></span>
            <h3>Respostas Incorretas</h3>
            <span class="space"> </span>
            <li><input data-test="wrong-answer-input" class="wrongAnswer1" type="text"
                placeholder="Resposta incorreta 1" />
            </li>
            <li><input data-test="wrong-img-input" class="wrongImg1" type="text" placeholder="URL da imagem 1" /></li>
            <span class="space"></span>
            <li><input data-test="wrong-answer-input" class="wrongAnswer2" type="text"
                placeholder="Resposta incorreta 2" />
            </li>
            <li><input data-test="wrong-img-input" class="wrongImg2" type="text" placeholder="URL da imagem 2" /></li>
            <span class="space"></span>
            <li><input data-test="wrong-answer-input" class="wrongAnswer3" type="text"
                placeholder="Resposta incorreta 3" />
            </li>
            <li><input data-test="wrong-img-input" class="wrongImg3" type="text" placeholder="URL da imagem 3" /></li>
        </ul>
        </div>`
        if (i > 0) {
            questionsFront.querySelector(`.question${i + 1} .closed`).previousElementSibling.innerHTML += `
            <button type="button" onclick="openQuestion(this)"><img src="./assets/button-img.png" alt=""></button>`
        }
    };
}

function renderUserLevel() {
    const level = {
        title: "",
        image: "",
        text: "",
        minValue: Number
    };
}

function toQuestions() {
    const inputTitle = document.querySelector(".quizzTitle");
    const inputImg = document.querySelector(".quizzImg");
    const inputNQuestions = document.querySelector(".nquestions");
    const inputNLevels = document.querySelector(".nlevels");

    const titleFront = document.querySelector(".titleQuizz").classList;
    const questionsFront = document.querySelector(".questionsQuizz.hidden").classList;

    if ((inputTitle.value.length >= 20 && inputTitle.value.length <= 65) &&
        (checkUrl(inputImg.value)) &&
        (inputNQuestions.value > 2 && Number.isInteger(Number(inputNQuestions.value))) &&
        (inputNLevels.value > 1 && Number.isInteger(Number(inputNLevels.value)))
    ) {
        userQuizz.title = inputTitle.value;
        userQuizz.image = inputImg.value;
        userQuizz.questions.length = inputNQuestions.value;
        userQuizz.levels.length = inputNLevels.value;

    inputTitle.value = "";
    inputImg.value = "";
    inputNQuestions.value  = "";
    inputNLevels.value = "";

    titleFront.add("hidden");
    questionsFront.remove("hidden");

    renderUserQuestions(userQuizz);
  }  else  {
    alert("Por favor preencha os dados corretamente.");
    inputTitle.value = "";
    inputImg.value = "";
    inputNQuestions.value  = "";
    inputNLevels.value = "";
  }
}

function toLevels() {

    for (let i = 0; i < userQuizz.questions.length; i++) {
        let question = {
            title: "",
            color: "",
            answers: []
        };

        const inputQuestion = document.querySelector(`.question${i + 1} .textQuestion`);
        const inputColor = document.querySelector(`.question${i + 1} .colorQuestion`);

        if (inputQuestion.value.length >= 20 &&
            isHexColor(inputColor.value)) {
            question.title = inputQuestion.value;
            question.color = inputColor.value;
        } else {
            alert("Por favor preencha os dados corretamente.")
            inputQuestion.value = "";
            inputColor.value = "";
            return
        }

        const inputCorrectAnswer = document.querySelector(`.question${i + 1} .correctAnswer`);
        const inputCorrectImg = document.querySelector(`.question${i + 1} .correctImg`);

        if (inputCorrectAnswer.value !== "" &&
            (checkUrl(inputCorrectImg.value))) {
            let answer = {};
            answer.text = inputCorrectAnswer.value;
            answer.image = inputCorrectImg.value;
            answer.isCorrectAnswer = true;
            question.answers.push(answer);
        } else {
            alert("Por favor preencha os dados corretamente.")
            inputCorrectAnswer.value = "";
            inputCorrectImg.value = "";
            return
        }
        for (let k = 1; k < 4; k++) {
            const inputWrongAnswer = document.querySelector(`.question${i + 1} .wrongAnswer${k}`);
            const inputWrongImg = document.querySelector(`.question${i + 1} .wrongImg${k}`);
            if (inputWrongAnswer.value !== "" &&
                (checkUrl(inputWrongImg.value))) {
                let answer = {};
                answer.text = inputWrongAnswer.value;
                answer.image = inputWrongImg.value;
                answer.isCorrectAnswer = false;
                question.answers.push(answer);
            } else if (k === 1) {
                alert("Por favor preencha os dados corretamente.")
                inputWrongAnswer.value = "";
                inputWrongImg.value = "";
                return;
            }
        }
        userQuizz.questions[i] = question;
    }
    console.log(userQuizz)
    const questionsFront = document.querySelector(".questionsQuizz").classList;
    const levelFront = document.querySelector(".levelQuizz.hidden").classList;
    questionsFront.add("hidden");
    levelFront.remove("hidden");

    renderUserLevel()
}

document.addEventListener("DOMContentLoaded", function () {
  getAllQuizz();

  getUserQuizz();
});
