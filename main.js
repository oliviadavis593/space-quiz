
const STORE = [
    {
        question: 'What is the closest planet to the sun?',
        answers: [
          'Earth',
          'Venus',
          'Mercury',
          'Mars'
        ],
        correctAnswer:
          'Mercury'
      },
    
    {
        question: 'Who was the first person to walk on the moon?',
        answers: [
            'Chris Hadfield',
            'Neil Armstrong',
            'John Young',
            'Svetlana Savitskaya'
        ],
        correctAnswer:
        'Neil Armstrong'
    },

    {
        question: 'Earth is located in which galaxy?',
        answers: [
            'Andromeda Galaxy',
            'Backward Galaxy',
            'Milkyway Galaxy',
            'Cosmo Redshift 7'
        ],
        correctAnswer:
        'Milkyway Galaxy'
    },

    {
        question: 'What is the 2nd biggest planet in our solar system?',
        answers: [
            'Saturn',
            'Neptune',
            'Jupiter',
            'Earth'
        ],
        correctAnswer:
        'Saturn'
    },

    {
        question: 'How many rings does Saturn have?',
        answers: [
            '7 rings',
            '4 rings',
            '2 rings',
            '3 rings'
        ],
        correctAnswer:
        '3 rings'
    },

    {
        question: 'How many Earths could fit inside the Sun?',
        answers: [
            '10 million',
            '500,000',
            '1 million',
            '200,000'
        ],
        correctAnswer: 
        '1 million'
    },

    {
        question: 'How many years would it take to fly a plane to pluto?',
        answers: [
            '7 years',
            '90 years',
            '20 years',
            '800 years'
        ],
        correctAnswer:
        '800 years'
    }
];

//quiz scoring and question number variabales 
let score = 0; 
let questionNumber = 0; 

// updates the question number 
function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1)
}

// updates the score increments of 2
function updateScore() {
    score += 2;
    $('.score').text(score);
}

//resets the number value of the score and questionNumber variables to update to correct value
function updateNumbers() {
    score = 0; 
    questionNumber = 0; 
    $('.score').text(0);
    $('.questionNumber').text(0);
}

//starts the quiz
function startQuiz() {
    $('.altBox').hide();
    $('.startButton').on('click', function(event) {
        $('.spaceIntro').hide();
        $('.questionNumber').text(1);
        $('.questionBox').show();
        $('.questionBox').html(presentQuestion());
    });
}


//generates each question
function presentQuestion() {
    if(questionNumber < STORE.length) {
        return createThing(questionNumber);
    }
    else {
        $('.questionBox').hide();
        finalScore();
        $('.questionNumber').text(7);
    }
}


//set the html for question form 
function createThing(questionIndex) {
    let formCreator = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formCreator).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="input-container" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formCreator;
}

//selects an answer and checks if it is equivalent to correct answer
function submitAnswer() {
    $('#quizBox').on('submit', function(event) {
        event.preventDefault();
        $('.altBox').hide();
        $('.response').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNumber].correctAnswer;
        if (answer === correct) {
        correctAnswer();
        } else {
        incorrectAnswer();
        }
    });
       
}

//feedback for correct answer and updates the score by 2
function correctAnswer() {
    $('.response').html(
        `<img class="goodjob-gif" src="https://media.giphy.com/media/wue4QtxncWuE8/giphy.gif" alt="Sailor Moon well done gif">
        <button type="button" class="nextButton button">Next</button>
        `
    );
    updateScore();
}

// feedback if the answer is incorrect
function incorrectAnswer(){
    $('.response').html(
        `<img class="explosion-gif" src="https://media.giphy.com/media/cN34n6Ka8GrcY/giphy.gif" alt="Planet explosion gif">
        <p class="incorrect-response">The correct answer is: ${STORE[questionNumber].correctAnswer}</p>
        <button type="button" class="nextButton button">Next</button>`
    );
}

//function that moves on to the next question

function nextQuestion() {
    $('#quizBox').on('click', '.nextButton', function(event) {
        $('.altBox').hide();
        $('.questionBox').show();
        updateQuestionNumber();
        $('.questionBox form').replaceWith(presentQuestion());
    });
}


//final score and final feedback for the entirety of the quiz

function finalScore() {
    $('.final').show();
  
    const amazing = [
      'You are so smart!',
      'https://media.giphy.com/media/3NtY188QaxDdC/giphy.gif',
      'I think you could be an astronaut',
    ];
  
    const okay = [
      'You could do better',
      'https://media.giphy.com/media/K5wSiAo98f2xi/giphy.gif',
      ,
    ];
  
    const terrible = [
      'Do you know anything about space?',
      'https://media.giphy.com/media/RK9RkBogLtxmvOaKrV/giphy.gif',
      'This is too funny'
    ];
  
    if (score >= 12) {
      array = amazing;
    } else if (score < 10 && score >= 8) {
      array = okay;
    } else {
      array = terrible;
    }
    return $('.final').html(
      `<h3 class="result-feedback">${array[0]}</h3>
        <img src="${array[1]}" alt="${array[2]}" class="feedback-images">
          <h3 class="final-score">Your score is: ${score} / 14</h3>
          <button type="submit" class="restartButton button">Restart</button>`
    );
  }

        //activates restart quiz
      function restartQuiz() {
        $('#quizBox').on('click', '.restartButton', function(event) {
            event.preventDefault();
            updateNumbers();
            $('.altBox').hide();
            $('.spaceIntro').show();
            startQuiz();
        });
    } 

      //runs all functions

      function createQuiz() {
          startQuiz();
          presentQuestion();
          submitAnswer();
          nextQuestion();
          restartQuiz();
      }
      $(createQuiz);