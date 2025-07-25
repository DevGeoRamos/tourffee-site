// ============================================================================
// QUIZ MODULE - Refactored with modern JavaScript patterns
// ============================================================================

class QuizApp {
  constructor() {
    this.questions = [
      { 
        question: "Qual é o acompanhamento mais típico servido com café em São Paulo?",
        answers: [
          { id: 1, text: "Pão de queijo", correct: true },
          { id: 2, text: "Pudim", correct: false },
          { id: 3, text: "Quindim", correct: false },
          { id: 4, text: "Pão Francês", correct: false },
        ],
      },
      { 
        question: "Qual é o nome da cafeteria localizada na Avenida São Luís, 84?",
        answers: [
          { id: 1, text: "Cafeteria São Luís", correct: false },
          { id: 2, text: "Café+Bar São Luís 84", correct: true },
          { id: 3, text: "Bar são luís", correct: false },
          { id: 4, text: "Cafeteria do São Luís 84", correct: false },
        ],
      },
      { 
        question: "O que é Latte art?",
        answers: [
          { id: 1, text: "Técnica feita com leite vaporizado", correct: true },
          { id: 2, text: "Desenhos no Café", correct: false },
          { id: 3, text: "Café com leite", correct: false },
          { id: 4, text: "Exposição de cafés", correct: false },
        ],
      },
      { 
        question: "Quando e onde foi inaugurada a primeira cafeteria de São Paulo?",
        answers: [
          { id: 1, text: "1985", correct: false },
          { id: 2, text: "1960", correct: false },
          { id: 3, text: "1978", correct: false },
          { id: 4, text: "1860", correct: true },
        ],
      },
      { 
        question: "Qual é a maior cafeteria da América Latina localizada em São Paulo?",
        answers: [
          { id: 1, text: "Padaria Brasileira", correct: false },
          { id: 2, text: "Padaria Santa Marta", correct: false },
          { id: 3, text: "Octávio Café", correct: true },
          { id: 4, text: "Starbucks", correct: false },
        ],
      },
      { 
        question: "Qual cafeteria famosa abriu recentemente um espaço temporário no Shopping Iguatemi?",
        answers: [
          { id: 1, text: "Tigrinhos Coffe", correct: false },
          { id: 2, text: "Café Suplicy", correct: false },
          { id: 3, text: "Blue Box Café da Tiffany & Co.", correct: true },
          { id: 4, text: "Coffeshop Sp", correct: false },
        ],
      },
      { 
        question: "Em qual país o café foi descoberto?",
        answers: [
          { id: 1, text: "Brasil", correct: false },
          { id: 2, text: "Etiópia", correct: true },
          { id: 3, text: "França", correct: false },
          { id: 4, text: "Arábia Saudita", correct: false },
        ],
      },
      { 
        question: "Qual país é o maior produtor de café?",
        answers: [
          { id: 1, text: "Israel", correct: false },
          { id: 2, text: "Colombia", correct: false },
          { id: 3, text: "Brasil", correct: true },
          { id: 4, text: "Kenya", correct: false },
        ],
      },
      { 
        question: "Qual é a origem do termo 'Café expresso'?",
        answers: [
          { id: 1, text: "Romano, Expresse coffea", correct: false },
          { id: 2, text: "Italiano, Feito rapidamente", correct: true },
          { id: 3, text: "Francês, Expresse cafe", correct: false },
          { id: 4, text: "Latim, Coffeae expressae", correct: false },
        ],
      },
    ];

    this.currentQuestionIndex = 0;
    this.score = 0;
    this.isAnswered = false;

    this.initializeElements();
    this.bindEvents();
    this.startQuiz();
  }

  initializeElements() {
    this.questionElement = document.getElementById('question');
    this.answerButtons = document.getElementById('answer-buttons');
    this.nextButton = document.getElementById('next-btn');
    this.progressBar = document.querySelector('.quiz__progress-bar');
    
    if (!this.questionElement || !this.answerButtons || !this.nextButton) {
      console.error('Quiz elements not found');
      return;
    }
  }

  bindEvents() {
    this.nextButton.addEventListener('click', () => this.handleNextButton());
  }

  startQuiz() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.isAnswered = false;
    this.nextButton.textContent = "Próxima";
    this.nextButton.classList.remove('quiz__next--visible');
    this.showQuestion();
    this.updateProgress();
  }

  resetState() {
    this.nextButton.classList.remove('quiz__next--visible');
    this.isAnswered = false;
    
    while (this.answerButtons.firstChild) {
      this.answerButtons.removeChild(this.answerButtons.firstChild);
    }
  }

  showQuestion() {
    this.resetState();
    
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const questionNo = this.currentQuestionIndex + 1;
    
    this.questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
    
    currentQuestion.answers.forEach(answer => {
      const button = this.createAnswerButton(answer);
      this.answerButtons.appendChild(button);
    });
  }

  createAnswerButton(answer) {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.dataset.id = answer.id;
    button.classList.add('quiz__answer');
    button.setAttribute('aria-label', `Resposta: ${answer.text}`);
    button.addEventListener('click', (e) => this.selectAnswer(e));
    
    return button;
  }

  selectAnswer(e) {
    if (this.isAnswered) return;
    
    this.isAnswered = true;
    const selectedBtn = e.target;
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const correctAnswer = currentQuestion.answers.find(answer => answer.correct);
    const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
    
    if (isCorrect) {
      selectedBtn.classList.add('quiz__answer--correct');
      this.score++;
      this.showFeedback('Correto!', 'success');
    } else {
      selectedBtn.classList.add('quiz__answer--incorrect');
      // Highlight the correct answer
      const correctBtn = Array.from(this.answerButtons.children)
        .find(btn => btn.dataset.id == correctAnswer.id);
      if (correctBtn) {
        correctBtn.classList.add('quiz__answer--correct');
      }
      this.showFeedback('Incorreto!', 'error');
    }
    
    // Disable all buttons
    Array.from(this.answerButtons.children).forEach(button => {
      button.disabled = true;
      button.setAttribute('aria-disabled', 'true');
    });
    
    this.nextButton.classList.add('quiz__next--visible');
    this.updateProgress();
  }

  showFeedback(message, type) {
    // Create temporary feedback element
    const feedback = document.createElement('div');
    feedback.className = `quiz__feedback quiz__feedback--${type}`;
    feedback.textContent = message;
    feedback.setAttribute('aria-live', 'polite');
    
    this.answerButtons.insertAdjacentElement('afterend', feedback);
    
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 2000);
  }

  updateProgress() {
    if (this.progressBar) {
      const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
      this.progressBar.style.width = `${progress}%`;
    }
  }

  showScore() {
    this.resetState();
    
    const percentage = Math.round((this.score / this.questions.length) * 100);
    let message = `Você acertou ${this.score} de ${this.questions.length} perguntas!`;
    let emoji = '';
    
    if (percentage >= 80) {
      emoji = '🎉';
      message += ' Excelente conhecimento sobre café!';
    } else if (percentage >= 60) {
      emoji = '👍';
      message += ' Bom trabalho!';
    } else if (percentage >= 40) {
      emoji = '📚';
      message += ' Continue estudando sobre café!';
    } else {
      emoji = '☕';
      message += ' Que tal visitar mais cafeterias?';
    }
    
    this.questionElement.innerHTML = `${emoji} ${message}`;
    this.nextButton.textContent = "Recomeçar";
    this.nextButton.classList.add('quiz__next--visible');
    this.nextButton.classList.add('quiz__restart');
    
    // Announce result to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Quiz finalizado. ${message}`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 3000);
  }

  handleNextButton() {
    this.currentQuestionIndex++;
    
    if (this.currentQuestionIndex < this.questions.length) {
      this.showQuestion();
    } else {
      this.showScore();
    }
  }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if quiz elements exist
  if (document.getElementById('question')) {
    new QuizApp();
  }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuizApp;
}
