const userQuizz ={
    title: "",
    image: "",
    questions: [],
    levels: []
}

function addQuizz(){
    document.querySelector(".home-page").classList.add("hidden");
    document.querySelector(".addQuizz.hidden").classList.remove("hidden");
}

/* Função para checar se a URL é valida*/
function checkUrl (string) {
    let givenURL;
    try {
        givenURL = new URL (string);
    } catch (error) {
        console.log ("error is", error);
       return false; 
    }
    return true;
  }

function renderUserQuestions(object){
    const questionsFront = document.querySelector(".questionsQuizz > .questions");
    questionsFront.innerHTML = ""
    for(let i = 0; i<object.questions.length;i++){
        questionsFront.innerHTML += `
        <ul data-test="question-ctn" class="question inputs">
            <h3>Pergunta ${i+1}</h3>
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
        </ul>`
    };
}

function toQuestions(){
    const inputTitle = document.querySelector(".quizzTitle");
    const inputImg = document.querySelector(".quizzImg");
    const inputNQuestions = document.querySelector(".nquestions");
    const inputNLevels = document.querySelector(".nlevels");

    const titleFront = document.querySelector(".titleQuizz").classList;
    const questionsFront = document.querySelector(".questionsQuizz.hidden").classList;
    
    if((inputTitle.value.length >=20 && inputTitle.value.length <=65) &&
        (checkUrl (inputImg.value)) &&
        (inputNQuestions.value>2 && Number.isInteger(Number(inputNQuestions.value))) &&
        (inputNLevels.value>1 && Number.isInteger(Number(inputNLevels.value)))
    ){
        userQuizz.title = inputTitle.value;
        userQuizz.image = inputImg.value;
        userQuizz.questions.length = inputNQuestions.value;
        userQuizz.levels.length = inputNLevels.value;

        inputTitle.value = "";
        inputImg.value = "";
        inputNQuestions.value= "";
        inputNLevels.value = "";

        titleFront.add("hidden");
        questionsFront.remove("hidden");

        renderUserQuestions(userQuizz);
    }else{
        alert("Por favor preencha os dados corretamente.")
        inputTitle.value = "";
        inputImg.value = "";
        inputNQuestions.value= "";
        inputNLevels.value = "";
    }
}