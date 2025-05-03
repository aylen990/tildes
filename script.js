document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show target content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Practice Section
    const words = document.querySelectorAll('.word');
    const scoreDisplay = document.getElementById('score');
    const totalDisplay = document.getElementById('total');
    const resetPracticeBtn = document.getElementById('reset-practice');
    
    let score = 0;
    let total = 0;
    
    words.forEach(word => {
        word.addEventListener('click', () => {
            if (!word.classList.contains('correct') && !word.classList.contains('wrong')) {
                const needsTilde = word.dataset.needsTilde === 'true';
                
                if (needsTilde) {
                    word.classList.add('correct');
                    createConfetti(word);
                    score++;
                } else {
                    word.classList.add('wrong');
                }
                
                total++;
                updateScore();
            }
        });
    });
    
    function updateScore() {
        scoreDisplay.textContent = score;
        totalDisplay.textContent = total;
    }
    
    resetPracticeBtn.addEventListener('click', () => {
        words.forEach(word => {
            word.classList.remove('correct', 'wrong');
        });
        score = 0;
        total = 0;
        updateScore();
    });
    
    // Quiz Section
    const quizContainer = document.getElementById('quiz-container');
    const checkQuizBtn = document.getElementById('check-quiz');
    const resetQuizBtn = document.getElementById('reset-quiz');
    
    const quizQuestions = [
        {
            question: "¿Cuándo llevan tilde las palabras agudas?",
            options: [
                "Siempre llevan tilde",
                "Cuando terminan en 'n', 's' o vocal",
                "Cuando no terminan en 'n', 's' o vocal",
                "Nunca llevan tilde"
            ],
            correctAnswer: 1
        },
        {
            question: "¿Cuándo llevan tilde las palabras graves?",
            options: [
                "Siempre llevan tilde",
                "Cuando terminan en 'n', 's' o vocal",
                "Cuando no terminan en 'n', 's' o vocal",
                "Nunca llevan tilde"
            ],
            correctAnswer: 2
        },
        {
            question: "Las palabras esdrújulas...",
            options: [
                "Siempre llevan tilde",
                "Nunca llevan tilde",
                "Llevan tilde cuando terminan en vocal",
                "Llevan tilde cuando terminan en consonante"
            ],
            correctAnswer: 0
        },
        {
            question: "¿Qué es la tilde diacrítica?",
            options: [
                "Una tilde que se usa en palabras extranjeras",
                "Una tilde que diferencia palabras que se escriben igual pero tienen distinto significado",
                "Una tilde que se usa en los interrogativos",
                "Una tilde que se usa en hiatos"
            ],
            correctAnswer: 1
        },
        {
            question: "En la palabra 'había', ¿por qué lleva tilde la 'i'?",
            options: [
                "Porque es una palabra aguda",
                "Porque es una palabra esdrújula",
                "Porque forma un hiato con la 'a'",
                "Por regla de tilde diacrítica"
            ],
            correctAnswer: 2
        }
    ];
    
    function loadQuiz() {
        quizContainer.innerHTML = '';
        
        quizQuestions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('quiz-question');
            questionElement.innerHTML = `
                <h3>Pregunta ${index + 1}:</h3>
                <p>${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((option, optIndex) => `
                        <div class="quiz-option" data-question="${index}" data-option="${optIndex}">
                            ${option}
                        </div>
                    `).join('')}
                </div>
                <div class="quiz-feedback"></div>
            `;
            
            quizContainer.appendChild(questionElement);
        });
        
        // Add event listeners to options
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', selectOption);
        });
    }
    
    function selectOption() {
        const questionIndex = this.dataset.question;
        const optionIndex = this.dataset.option;
        
        // Remove selection from other options in the same question
        document.querySelectorAll(`.quiz-option[data-question="${questionIndex}"]`).forEach(opt => {
            opt.classList.remove('selected', 'correct', 'wrong');
        });
        
        // Mark this option as selected
        this.classList.add('selected');
    }
    
    function checkQuiz() {
        let correct = 0;
        let answered = 0;
        
        quizQuestions.forEach((q, index) => {
            const selectedOption = document.querySelector(`.quiz-option.selected[data-question="${index}"]`);
            const feedbackElement = document.querySelectorAll('.quiz-feedback')[index];
            
            if (selectedOption) {
                answered++;
                const optionIndex = parseInt(selectedOption.dataset.option);
                
                if (optionIndex === q.correctAnswer) {
                    selectedOption.classList.add('correct');
                    feedbackElement.textContent = '¡Correcto! ¡Bien hecho!';
                    feedbackElement.className = 'quiz-feedback correct';
                    correct++;
                    createConfetti(selectedOption);
                } else {
                    selectedOption.classList.add('wrong');
                    const correctOption = document.querySelector(`.quiz-option[data-question="${index}"][data-option="${q.correctAnswer}"]`);
                    correctOption.classList.add('correct');
                    feedbackElement.textContent = '¡Incorrecto! La respuesta correcta está marcada en verde.';
                    feedbackElement.className = 'quiz-feedback wrong';
                }
            }
        });
        
        if (answered === quizQuestions.length) {
            alert(`Has completado el quiz con ${correct} de ${quizQuestions.length} respuestas correctas.`);
        } else {
            alert(`Por favor responde todas las preguntas. Has respondido ${answered} de ${quizQuestions.length}.`);
        }
    }
    
    function resetQuiz() {
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('selected', 'correct', 'wrong');
        });
        
        document.querySelectorAll('.quiz-feedback').forEach(feedback => {
            feedback.textContent = '';
            feedback.className = 'quiz-feedback';
        });
    }
    
    checkQuizBtn.addEventListener('click', checkQuiz);
    resetQuizBtn.addEventListener('click', resetQuiz);
    
    // Interactive Playground
    const textInput = document.getElementById('text-input');
    const accentKeys = document.querySelectorAll('.accent-key');
    const ejemplosCambio = document.querySelectorAll('#ejemplos-cambio .word');
    const resultBox = document.getElementById('result-box');
    const resultText = document.getElementById('result-text');
    const toggleRule = document.getElementById('toggle-rule');
    const ruleExplanation = document.getElementById('rule-explanation');
    
    // Add null checks for interactive playground elements
    if (textInput && accentKeys.length > 0) {
        accentKeys.forEach(key => {
            key.addEventListener('click', () => {
                const letter = key.dataset.letter;
                
                // Get cursor position
                const startPos = textInput.selectionStart;
                const endPos = textInput.selectionEnd;
                
                // Insert the letter at cursor position
                textInput.value = textInput.value.substring(0, startPos) + letter + textInput.value.substring(endPos);
                
                // Move cursor after the inserted letter
                textInput.selectionStart = startPos + 1;
                textInput.selectionEnd = startPos + 1;
                
                // Focus back on the textarea
                textInput.focus();
            });
        });
    }
    
    if (ejemplosCambio && ejemplosCambio.length > 0) {
        ejemplosCambio.forEach(ejemplo => {
            ejemplo.addEventListener('click', () => {
                const original = ejemplo.dataset.original;
                const withTilde = ejemplo.dataset.withTilde;
                const explanation = ejemplo.dataset.explanation;
                
                if (resultText && resultBox && ruleExplanation) {
                    resultText.textContent = `"${original}" vs "${withTilde}": Estas palabras tienen diferentes significados.`;
                    ruleExplanation.textContent = explanation;
                    resultBox.style.display = 'block';
                    ruleExplanation.style.display = 'none';
                }
            });
        });
    }
    
    if (toggleRule && ruleExplanation) {
        toggleRule.addEventListener('click', () => {
            if (ruleExplanation.style.display === 'none') {
                ruleExplanation.style.display = 'block';
                toggleRule.textContent = 'Ocultar regla';
            } else {
                ruleExplanation.style.display = 'none';
                toggleRule.textContent = 'Ver regla aplicada';
            }
        });
    }
    
    // Confetti Animation for correct answers
    function createConfetti(element) {
        // Check if element is valid before proceeding
        if (!element || typeof element.getBoundingClientRect !== 'function') {
            console.warn('Invalid element provided to createConfetti function');
            return;
        }
        
        const colors = ['#ff7e5f', '#feb47b', '#7debff', '#7ed56f', '#ff9ff3'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            document.body.appendChild(confetti);
            
            const rect = element.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            
            const size = Math.random() * 8 + 6;
            const destinationX = startX + (Math.random() - 0.5) * 200;
            const destinationY = startY - Math.random() * 200;
            const rotation = Math.random() * 520;
            const delay = Math.random() * 200;
            
            // Random color
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.left = `${startX}px`;
            confetti.style.top = `${startY}px`;
            
            setTimeout(() => {
                confetti.style.transition = 'all 1s ease-out';
                confetti.style.transform = `translate(${destinationX - startX}px, ${destinationY - startY}px) rotate(${rotation}deg)`;
                confetti.style.opacity = '0';
                
                setTimeout(() => {
                    confetti.remove();
                }, 1000);
            }, delay);
        }
    }
    
    // Initialize
    loadQuiz();
    
    // Analyze text for accent rules
    if (textInput && resultBox && resultText && ruleExplanation) {
        textInput.addEventListener('input', () => {
            const text = textInput.value.trim();
            if (text) {
                // Simple analysis of the last word
                const words = text.split(/\s+/);
                const lastWord = words[words.length - 1];
                
                if (lastWord && lastWord.length > 2) {
                    let explanation = '';
                    let rule = '';
// Check if it's a known word with tilde
if (/[áéíóúÁÉÍÓÚ]/.test(lastWord)) {
    explanation = `La palabra "${lastWord}" lleva tilde.`;
    
    // Try to determine the rule
    if (/[áéíóúÁÉÍÓÚ][^aeiouáéíóúAEIOUÁÉÍÓÚ]*$/.test(lastWord)) {
        rule = "Esta es una palabra aguda que termina en vocal, 'n' o 's', por lo que lleva tilde en la última sílaba.";
    } else if (/[^aeiouáéíóúAEIOUÁÉÍÓÚ]*[áéíóúÁÉÍÓÚ][^aeiouáéíóúAEIOUÁÉÍÓÚ]*[aeiouAEIOU][^aeiouáéíóúAEIOUÁÉÍÓÚ]*$/.test(lastWord)) {
        rule = "Esta es una palabra grave que no termina en vocal, 'n' o 's', por lo que lleva tilde en la penúltima sílaba.";
    } else if (lastWord.length >= 3) {
        rule = "Esta parece ser una palabra esdrújula o sobresdrújula, que siempre llevan tilde en la antepenúltima sílaba o anterior.";
    }
    
    // Check for diacritic tilde
    if (/^(él|tú|mí|sí|té|dé|sé|más|aún)$/i.test(lastWord)) {
        rule = "Esta palabra lleva tilde diacrítica para diferenciarla de otra palabra que se escribe igual pero tiene distinto significado.";
    }
} else {
    explanation = `La palabra "${lastWord}" no lleva tilde según lo escrito.`;
    
    // Check if it should have a tilde
    if (/[áéíóúÁÉÍÓÚ][^áéíóú]*$/.test(lastWord)) {
        const syllables = countSyllables(lastWord);
        if (syllables === 1) {
        rule = "Esta es una palabra aguda que termina en vocal, 'n' o 's', por lo que lleva tilde en la última sílaba.";
    }

    } else if (!/[aeiou][ns]?$/i.test(lastWord) && lastWord.length > 1) {
        const syllables = countSyllables(lastWord);
        if (syllables >= 2) {
            rule = "Si la sílaba tónica es la penúltima, esta palabra grave no necesita tilde al no terminar en vocal, 'n' o 's'.";
        }
    }
    
    // Check for words that usually have tilde
    if (/^(el|tu|mi|si|te|de|se|mas|aun)$/i.test(lastWord)) {
        rule = "Si esta palabra es " + lastWord.toLowerCase() + ", podría necesitar tilde diacrítica dependiendo de su significado en la oración.";
    }
}
                    
                    if (explanation) {
                        resultText.textContent = explanation;
                        ruleExplanation.textContent = rule;
                        resultBox.style.display = 'block';
                        ruleExplanation.style.display = 'none';
                    }
                }
            } else {
                resultBox.style.display = 'none';
            }
        });
    }
    
    // Simple syllable counter (not perfect but gives an estimate)
    function countSyllables(word) {
        if (!word) return 0;
        word = word.toLowerCase();
        
        // Remove accents for counting
        word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        // Count vowel groups as syllables
        const vowelGroups = word.match(/[aeiou]+/gi);
        return vowelGroups ? vowelGroups.length : 0;
    }
});