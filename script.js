// 遊戲狀態管理
let gameState = {
    score: 0,
    timeLeft: 0,
    isPlaying: false,
    interval: null
};

// 遊戲功能
function playNumberGame() {
    alert('魔法數字冒險即將開始！');
}

function startMemoryGame() {
    alert('花園記憶配對即將開始！');
}

function startTypingGame() {
    alert('魔法打字學院即將開始！');
}

function startQuizGame() {
    alert('少女知識問答即將開始！');
}

function startColorGame() {
    alert('彩虹魔法配對即將開始！');
}

function startWhackAMole() {
    alert('捕捉星星精靈即將開始！');
}

// PWA 相關
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// 底部導航切換
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// 1. 猜數字遊戲
function playNumberGame() {
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    
    while (true) {
        attempts++;
        const guess = prompt('猜一個 1-100 之間的數字：');
        
        if (guess === null) {
            alert('遊戲已取消');
            return;
        }
        
        const userGuess = parseInt(guess);
        
        if (isNaN(userGuess)) {
            alert('請輸入有效的數字！');
            continue;
        }
        
        if (userGuess === targetNumber) {
            alert(`恭喜你猜對了！答案是 ${targetNumber}\n你總共猜了 ${attempts} 次`);
            break;
        } else if (userGuess < targetNumber) {
            alert('太小了！再試一次');
        } else {
            alert('太大了！再試一次');
        }
    }
}

// 2. 記憶配對遊戲
function startMemoryGame() {
    const gameContainer = document.createElement('div');
    gameContainer.className = 'memory-game-container';
    document.body.appendChild(gameContainer);

    const emojis = ['🌸', '🎀', '🌟', '🦄', '🍭', '🎨', '🌈', '💖'];
    const cards = [...emojis, ...emojis];
    let flippedCards = [];
    let matchedPairs = 0;

    // 洗牌
    cards.sort(() => Math.random() - 0.5);

    // 創建遊戲面板
    const gameHTML = `
        <div class="game-overlay">
            <div class="game-board">
                <div class="game-header">
                    <h3>記憶配對遊戲</h3>
                    <button onclick="closeGame()">關閉</button>
                </div>
                <div class="cards-container">
                    ${cards.map((emoji, index) => `
                        <div class="memory-card" data-index="${index}">
                            <div class="card-inner">
                                <div class="card-front">❓</div>
                                <div class="card-back">${emoji}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    gameContainer.innerHTML = gameHTML;

    // 添加事件監聽器
    document.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('flipped') && flippedCards.length < 2) {
                card.classList.add('flipped');
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    const [card1, card2] = flippedCards;
                    const match = cards[card1.dataset.index] === cards[card2.dataset.index];

                    setTimeout(() => {
                        if (!match) {
                            card1.classList.remove('flipped');
                            card2.classList.remove('flipped');
                        } else {
                            matchedPairs++;
                            if (matchedPairs === emojis.length) {
                                alert('恭喜你完成遊戲！');
                            }
                        }
                        flippedCards = [];
                    }, 1000);
                }
            }
        });
    });
}

// 3. 打字遊戲
function startTypingGame() {
    const words = ['粉紅', '可愛', '星星', '彩虹', '獨角獸', '蝴蝶', '花朵', '愛心', '糖果', '魔法'];
    let currentWord = '';
    let timeLeft = 30;
    let score = 0;
    
    const gameHTML = `
        <div class="game-overlay">
            <div class="game-board">
                <div class="game-header">
                    <h3>打字遊戲</h3>
                    <div>時間: <span id="time">30</span>秒</div>
                    <div>分數: <span id="score">0</span></div>
                </div>
                <div class="game-content">
                    <div id="word-display"></div>
                    <input type="text" id="word-input" autocomplete="off">
                </div>
                <button onclick="closeGame()">關閉</button>
            </div>
        </div>
    `;
    
    const gameContainer = document.createElement('div');
    gameContainer.innerHTML = gameHTML;
    document.body.appendChild(gameContainer);
    
    const wordDisplay = document.getElementById('word-display');
    const wordInput = document.getElementById('word-input');
    const timeDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('score');
    
    function getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }
    
    function updateGame() {
        currentWord = getRandomWord();
        wordDisplay.textContent = currentWord;
        wordInput.value = '';
    }
    
    const timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        
        if (timeLeft === 0) {
            clearInterval(timer);
            alert(`遊戲結束！你的分數是: ${score}`);
            closeGame();
        }
    }, 1000);
    
    wordInput.addEventListener('input', () => {
        if (wordInput.value === currentWord) {
            score += 10;
            scoreDisplay.textContent = score;
            updateGame();
        }
    });
    
    updateGame();
    wordInput.focus();
}

// 4. 知識問答遊戲
function startQuizGame() {
    const questions = [
        {
            question: '哪個顏色代表愛情？',
            options: ['藍色', '粉紅色', '綠色', '黃色'],
            answer: 1
        },
        {
            question: 'Y2K風格流行於哪個年代？',
            options: ['1980年代', '1990年代末至2000年代初', '2010年代', '2020年代'],
            answer: 1
        },
        {
            question: '以下哪個不是粉紅色的英文表達？',
            options: ['Pink', 'Rose', 'Magenta', 'Violet'],
            answer: 3
        },
        {
            question: '哪個品牌的標誌色是粉紅色？',
            options: ['可口可樂', '百事可樂', 'Hello Kitty', 'Nike'],
            answer: 2
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    
    const gameHTML = `
        <div class="game-overlay">
            <div class="game-board">
                <div class="game-header">
                    <h3>知識問答</h3>
                    <div>分數: <span id="quiz-score">0</span></div>
                </div>
                <div class="game-content">
                    <div id="question"></div>
                    <div id="options"></div>
                </div>
                <button onclick="closeGame()">關閉</button>
            </div>
        </div>
    `;
    
    const gameContainer = document.createElement('div');
    gameContainer.innerHTML = gameHTML;
    document.body.appendChild(gameContainer);
    
    function displayQuestion() {
        if (currentQuestion >= questions.length) {
            alert(`遊戲結束！你的分數是: ${score}/${questions.length * 10}`);
            closeGame();
            return;
        }
        
        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');
        const question = questions[currentQuestion];
        
        questionEl.textContent = question.question;
        optionsEl.innerHTML = question.options.map((option, index) => `
            <button onclick="selectAnswer(${index})">${option}</button>
        `).join('');
    }
    
    window.selectAnswer = (index) => {
        if (index === questions[currentQuestion].answer) {
            score += 10;
            document.getElementById('quiz-score').textContent = score;
        }
        currentQuestion++;
        displayQuestion();
    };
    
    displayQuestion();
}

// 5. 顏色配對遊戲
function startColorGame() {
    const colors = ['#FFB6C1', '#FFC0CB', '#FFE4E1', '#FF69B4', '#FF1493'];
    let targetColor = '';
    let score = 0;
    let timeLeft = 30;
    
    const gameHTML = `
        <div class="game-overlay">
            <div class="game-board">
                <div class="game-header">
                    <h3>顏色配對</h3>
                    <div>時間: <span id="color-time">30</span>秒</div>
                    <div>分數: <span id="color-score">0</span></div>
                </div>
                <div class="game-content">
                    <div id="target-color"></div>
                    <div id="color-options"></div>
                </div>
                <button onclick="closeGame()">關閉</button>
            </div>
        </div>
    `;
    
    const gameContainer = document.createElement('div');
    gameContainer.innerHTML = gameHTML;
    document.body.appendChild(gameContainer);
    
    function updateGame() {
        const options = [...colors].sort(() => Math.random() - 0.5);
        targetColor = options[Math.floor(Math.random() * options.length)];
        
        document.getElementById('target-color').style.backgroundColor = targetColor;
        document.getElementById('color-options').innerHTML = options.map(color => `
            <div class="color-option" style="background-color: ${color}" onclick="selectColor('${color}')"></div>
        `).join('');
    }
    
    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById('color-time').textContent = timeLeft;
        
        if (timeLeft === 0) {
            clearInterval(timer);
            alert(`遊戲結束！你的分數是: ${score}`);
            closeGame();
        }
    }, 1000);
    
    window.selectColor = (color) => {
        if (color === targetColor) {
            score += 10;
            document.getElementById('color-score').textContent = score;
        }
        updateGame();
    };
    
    updateGame();
}

// 6. 打地鼠遊戲
function startWhackAMole() {
    let score = 0;
    let timeLeft = 30;
    
    const gameHTML = `
        <div class="game-overlay">
            <div class="game-board">
                <div class="game-header">
                    <h3>打地鼠</h3>
                    <div>時間: <span id="mole-time">30</span>秒</div>
                    <div>分數: <span id="mole-score">0</span></div>
                </div>
                <div class="mole-grid">
                    ${Array(9).fill().map((_, i) => `
                        <div class="mole-hole" data-index="${i}">
                            <div class="mole">🦄</div>
                        </div>
                    `).join('')}
                </div>
                <button onclick="closeGame()">關閉</button>
            </div>
        </div>
    `;
    
    const gameContainer = document.createElement('div');
    gameContainer.innerHTML = gameHTML;
    document.body.appendChild(gameContainer);
    
    const holes = document.querySelectorAll('.mole-hole');
    let currentHole = null;
    
    function showMole() {
        if (currentHole) {
            currentHole.classList.remove('active');
        }
        
        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        randomHole.classList.add('active');
        currentHole = randomHole;
        
        setTimeout(() => {
            randomHole.classList.remove('active');
            if (timeLeft > 0) {
                showMole();
            }
        }, Math.random() * 1000 + 500);
    }
    
    holes.forEach(hole => {
        hole.addEventListener('click', () => {
            if (hole.classList.contains('active')) {
                score += 10;
                document.getElementById('mole-score').textContent = score;
                hole.classList.remove('active');
            }
        });
    });
    
    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById('mole-time').textContent = timeLeft;
        
        if (timeLeft === 0) {
            clearInterval(timer);
            alert(`遊戲結束！你的分數是: ${score}`);
            closeGame();
        }
    }, 1000);
    
    showMole();
}

// 通用關閉遊戲函數
function closeGame() {
    const overlay = document.querySelector('.game-overlay');
    if (overlay) {
        overlay.parentElement.remove();
    }
}

// 添加必要的樣式
const gameStyles = document.createElement('style');
gameStyles.textContent = `
    .game-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .game-board {
        background: white;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0 0 20px rgba(255, 182, 193, 0.5);
        max-width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    }

    .game-header {
        text-align: center;
        margin-bottom: 20px;
    }

    .game-content {
        margin: 20px 0;
    }

    /* 記憶配對遊戲樣式 */
    .cards-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin: 20px 0;
    }

    .memory-card {
        aspect-ratio: 1;
        perspective: 1000px;
        cursor: pointer;
    }

    .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
    }

    .memory-card.flipped .card-inner {
        transform: rotateY(180deg);
    }

    .card-front, .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2em;
        background: #fff;
        border: 2px solid #FFB6C1;
        border-radius: 10px;
    }

    .card-back {
        transform: rotateY(180deg);
    }

    /* 打字遊戲樣式 */
    #word-display {
        font-size: 2em;
        margin: 20px 0;
        text-align: center;
    }

    #word-input {
        width: 100%;
        padding: 10px;
        font-size: 1.2em;
        border: 2px solid #FFB6C1;
        border-radius: 5px;
    }

    /* 顏色配對遊戲樣式 */
    #target-color {
        width: 100px;
        height: 100px;
        margin: 20px auto;
        border: 2px solid #000;
        border-radius: 10px;
    }

    #color-options {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin: 20px 0;
    }

    .color-option {
        width: 50px;
        height: 50px;
        border: 2px solid #000;
        border-radius: 5px;
        cursor: pointer;
    }

    /* 打地鼠遊戲樣式 */
    .mole-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin: 20px 0;
    }

    .mole-hole {
        aspect-ratio: 1;
        background: #FFE4E1;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        overflow: hidden;
    }

    .mole {
        font-size: 2em;
        transform: translateY(100%);
        transition: transform 0.1s;
    }

    .mole-hole.active .mole {
        transform: translateY(0);
    }
`;

document.head.appendChild(gameStyles); 