axios.defaults.headers.common["Authorization"] = "crOAxtb2nvt4HvqrTlUr9bKq";

const api_url = "https://mock-api.driven.com.br/api/vm/buzzquizz/quizzes/";

const userQuizz = {
  title: "",
  image: "",
  questions: [],
  levels: [],
};

let userQuizzAdress = [];

// Gets user-made quizzes and, if it exists, display it
function getUserQuizz() { }

function displayUserQuizz() { }

// Gets quizzes made by third-party stored server-side, and then displays it
function getAllQuizz() {
  const promise = axios.get(api_url);

  promise.then(displayAllQuizz);

  promise.catch(console.error("bad request getAllQuizz()"));
}

function displayAllQuizz(array) {
  localQuizzesString= localStorage.getItem("quizzes");
  localQuizzes = JSON.parse(localQuizzesString);
  console.log(localQuizzes)
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

function displayQuizzUserPage(id) {
  const promise = axios.get(api_url + id);

  promise.then(displayQuizz);

  promise.catch(console.error("bad request displayQuizzPage(id)"));

  document.querySelector(".sendQuizz").classList.toggle("hidden");
  document.querySelector(".quizz-page").classList.toggle("hidden");
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


function addQuizz() {
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
    return true;
  }
  return false;
}

function openInput(element) {
  if(element.classList.contains("questionPage")){
    let questionOpened = document.querySelector(".questions .opened");
    questionOpened.classList.add("closed");
    questionOpened.classList.remove("opened");
    questionOpened.previousElementSibling.querySelector("button").classList.toggle("hidden");

  }else if(element.classList.contains("levelPage")){
    let levelOpened = document.querySelector(".levels .opened");
    levelOpened.classList.add("closed");
    levelOpened.classList.remove("opened");
    levelOpened.previousElementSibling.querySelector("button").classList.toggle("hidden");
  }

  element.parentNode.nextElementSibling.classList.remove("closed");
  element.parentNode.nextElementSibling.classList.add("opened");
  setTimeout(() => {
    element.parentElement.parentElement.scrollIntoView({ block: "start" });
  }, 320);
    element.classList.toggle("hidden");
}

function renderUserQuestions(object) {
  let displayQuestion = "";
  let displayButton = "";
  const questionsFront = document.querySelector(".questionsQuizz > .questions");
  questionsFront.innerHTML = ""
  for (let i = 0; i < object.questions.length; i++) {

    if (i === 0) {
      displayQuestion = "opened";
      displayButton = "hidden"
    } else {
      displayQuestion = "closed";
      displayButton = ""
    };
    questionsFront.innerHTML += `
        <ul data-test="question-ctn" class="question${i + 1} inputs">
          <div class="toggleButton">
            <h3>Pergunta ${i + 1}</h3>
            <button data-test="toggle" class="${displayButton} questionPage" type="button" onclick="openInput(this)"><img src="./assets/button-img.png" alt=""></button>
            </div>
            <div class="${displayQuestion}">
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
          </div>
        </ul>`
  };
}

function renderUserLevel(object) {
  let displayLevel = "";
  let displayButton = "";
  const levelsFront = document.querySelector(".levelQuizz > .levels");
  levelsFront.innerHTML = ""
  for (let i = 0; i < object.levels.length; i++) {
    if (i === 0) {
      displayLevel = "opened";
      displayButton = "hidden"
    } else {
      displayLevel = "closed";
      displayButton = "";
    };
    levelsFront.innerHTML += `
      <ul data-test="level-ctn" class="level${i + 1} inputs">
        <div class="toggleButton">
          <h3>Nível ${i + 1}</h3>
          <button data-test="toggle" class="${displayButton} levelPage" type="button" onclick="openInput(this)"><img src="./assets/button-img.png" alt=""></button>
        </div>
        <div class="${displayLevel}">
          <span class="space"></span>
          <li><input data-test="level-input" class="textLevel" type="text" placeholder="Título do nível" />
          </li>
          <li><input data-test="level-percent-input" class="percentLevel" type="text"
            placeholder="% de acerto mínima" />
          </li>
          <li><input data-test="level-img-input" class="imgLevel" type="text"
            placeholder="URL da imagem do nível" />
          </li>
          <li><textarea data-test="level-description-input" class="descriptionLevel" type="text"
            placeholder="Descrição do nível" rows="5"></textarea>
          </li>
        </div>
      </ul>
      `
  }
}

function renderSenderLevel(object){
  promiseQuizz = axios.get(api_url + object.id)

  promiseQuizz.then((response)=>{
    const element = document.querySelector(".userSendQuizz");
    element.innerHTML= "";
    element.innerHTML += `
    <div data-test="success-banner" id="${response.data.id}" class="userQuizzContainer" onclick="displayQuizzUserPage(${response.data.id})">
        <img src="${response.data.image}" />
        <h3>${response.data.title}</h3>
    </div>
    `;
  })

  promiseQuizz.catch((response)=>{
    console.log(response)
  })
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
    inputNQuestions.value = "";
    inputNLevels.value = "";

    titleFront.add("hidden");
    questionsFront.remove("hidden");

    renderUserQuestions(userQuizz);
  } else {
    alert("Por favor preencha os dados corretamente.");
    inputTitle.value = "";
    inputImg.value = "";
    inputNQuestions.value = "";
    inputNLevels.value = "";
  }
}

function toLevels() {
  const questionsFront = document.querySelector(".questionsQuizz").classList;
  const levelsFront = document.querySelector(".levelQuizz.hidden").classList;

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

      inputQuestion.value = "";
      inputColor.value = "";
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
      inputCorrectAnswer.value = "";
      inputCorrectImg.value = "";
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
        inputCorrectAnswer.value = "";
        inputCorrectImg.value = "";
      } else if (k === 1) {
        alert("Por favor preencha os dados corretamente.")
        inputWrongAnswer.value = "";
        inputWrongImg.value = "";
        return;
      }
    }
    userQuizz.questions[i] = question;
  }

  questionsFront.add("hidden");
  levelsFront.remove("hidden");
  renderUserLevel(userQuizz)
}

function toSend() {
  const levelsFront = document.querySelector(".levelQuizz").classList;
  const sendFront = document.querySelector(".sendQuizz.hidden").classList;

  let check = 0;
  for (let i = 0; i < userQuizz.levels.length; i++) {
    const level = {
      title: "",
      image: "",
      text: "",
      minValue: Number
    };

    const inputLevel = document.querySelector(`.level${i + 1} .textLevel`);
    const inputPercent = document.querySelector(`.level${i + 1} .percentLevel`);
    const inputImgLevel = document.querySelector(`.level${i + 1} .imgLevel`);
    const inputDescriptionLevel = document.querySelector(`.level${i + 1} .descriptionLevel`);

    if (Number(inputPercent.value) === 0) {
      check = 1;
    }

    if (inputLevel.value.length >= 0 &&
      (inputPercent.value.length >= 0 && inputPercent.value.length <= 100) &&
      (checkUrl(inputImgLevel.value)) &&
      inputDescriptionLevel.value.length >= 30
    ) {
      level.title = inputLevel.value
      level.image = inputImgLevel.value
      level.text = inputDescriptionLevel.value
      level.minValue = inputPercent.value

      inputLevel.value = "";
      inputPercent.value = "";
      inputImgLevel.value = "";
      inputDescriptionLevel.value = "";
    } else {
      alert("Por favor preencha os dados corretamente.")
      inputLevel.value = "";
      inputPercent.value = "";
      inputImgLevel.value = "";
      inputDescriptionLevel.value = "";
      return
    }
    userQuizz.levels[i] = level;
    if (i === (userQuizz.levels.length - 1) && check === 0) {
      alert("Por favor preencha os dados corretamente.")
      inputLevel.value = "";
      inputPercent.value = "";
      inputImgLevel.value = "";
      inputDescriptionLevel.value = "";
      return
    }
  }
  const sendQuizPromise = axios.post(api_url, userQuizz)

  sendQuizPromise.then((response) => {
    let quizzData = {
      id: "",
      key: ""
    };

    quizzData.id = response.data.id
    quizzData.key = response.data.key

    userQuizzAdress.push(quizzData)
    let localQuizzArdress = JSON.stringify(userQuizzAdress)
    localStorage.setItem("quizzes", localQuizzArdress)

    levelsFront.add("hidden");
    sendFront.remove("hidden");

    renderSenderLevel(quizzData)
  });

  sendQuizPromise.catch();
}

function toQuizz(){
  let quizzID = document.querySelector(".userQuizzContainer").id;
  displayQuizzUserPage(quizzID);
}
let test={
  id:139
}

function toHome(){
  window.location.reload()
}
renderSenderLevel(test)


document.addEventListener("DOMContentLoaded", function () {
  getAllQuizz();

  getUserQuizz();
});