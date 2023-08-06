const $startGameButton = document.querySelector(".start-quiz")
const $questionContainer = document.querySelector(".question-container")
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

let currentQuestionIndex = 0
let totalCorrect = 0

function startGame() {
    $startGameButton.classList.add("hide")
    $questionContainer.classList.remove("hide")
    displayNextQuestion()
}


function displayNextQuestion() {
    resetState()

    if (questions.length === currentQuestionIndex) {
        return finishGame()
    }

    $questionText.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }
        $answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener("click", selectAnswer)
    })

}

function resetState() {
    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
    const answerClicked = event.target

    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct")
        totalCorrect++
    } else {
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }
        button.disabled = true
    })

    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestion = questions.length
    const performance = Math.floor(totalCorrect * 100 / totalQuestion)

    let message = ""

    switch (true) {
        case (performance >= 90):
            message = "Execelente! :)"
            break
        case (performance >= 70):
            message = "Muito bom! :)"
            break
        case (performance >= 50):
            message = "Bom!"
            break
        default:
            message = "Pode melhorar! :("
    }

    $questionContainer.innerHTML =
        `
        <p class="final-message">
        Você acertou ${totalCorrect} de ${totalQuestion} questões!
        <span> Resultado: ${message} </span>
        </p>
        <button onclick=window.location.reload() class="button"> 
        Refazer teste
        </button>
    `
}













const questions = [
    {
        question: "Em qual HQ o Batman apareceu pela primeira vez?",
        answers: [
            { text: "Detective Comics #27", correct: true },
            { text: "Batman, o Cavaleiro das Trevas #1", correct: false },
            { text: "Superman #12", correct: false },
            { text: "Superman #12", correct: false },
        ]
    },

    {
        question: "Quando Bruce Wayne criou a identidade Batman?",
        answers: [
            { text: "Quando um morcego gigante invadiu seu quarto", correct: false },
            { text: "Quando seus pais foram mortos por um assaltante", correct: false },
            { text: "Quando ele caiu em uma caverna infestada de morcegos", correct: true },
        ]
    },

    {
        question: "Qual o nome do primeiro Robin?",
        answers: [
            { text: "Tim Drake", correct: false },
            { text: "Jason Todd", correct: false },
            { text: "Dick Grayson", correct: true },
        ]
    },

    {
        question: "De acordo com a Forbes, qual o valor da fortuna de Bruce Wayne?",
        answers: [
            { text: "40,1 bilhões", correct: false },
            { text: "9,2 bilhões", correct: true },
            { text: "13,9 bilhões", correct: false },
        ]
    },

    {
        question: "Qual desses diretores nunca dirigiu um filme do Batman?",
        answers: [
            { text: "Tim Burton", correct: false },
            { text: "Christopher Nolan", correct: false },
            { text: "Anthony Russo", correct: true },
        ]
    },

]