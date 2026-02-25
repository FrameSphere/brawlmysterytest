// Game Logic for Brawl Stars Guess

class BrawlStarsGame {
    constructor(mode) {
        this.mode = mode;
        this.maxAttempts = 8;
        this.attempts = 0;
        this.guesses = [];
        this.gameOver = false;
        this.won = false;
        this.maxGamesPerMode = 2; // 2 games per mode every 12 hours
        
        // Initialize or load daily brawler
        this.initializeDailyBrawler();
        
        // Load saved game state
        this.loadGameState();
        
        // Initialize UI
        this.initializeUI();
    }
    
    initializeDailyBrawler() {
        const storageKey = this.getDailyBrawlerKey();
        const gamesKey = this.getGamesKey();
        
        // Check if we have a stored brawler for today
        const stored = localStorage.getItem(storageKey);
        const gamesData = localStorage.getItem(gamesKey);
        
        if (stored && gamesData) {
            const data = JSON.parse(stored);
            const games = JSON.parse(gamesData);
            
            // Check if 12 hours have passed since last reset
            const now = Date.now();
            if (now - games.lastReset < 12 * 60 * 60 * 1000) {
                // Still within 12 hour window
                this.dailyBrawler = brawlers.find(b => b.id === data.brawlerId);
                console.log(`[DEBUG] ${this.mode} mode: Loaded existing Brawler = ${this.dailyBrawler.name} (ID: ${this.dailyBrawler.id})`);
                return;
            } else {
                // 12 hours have passed - clear old game state
                console.log(`[DEBUG] ${this.mode} mode: 12 hours passed, clearing old state`);
                localStorage.removeItem(this.getStorageKey());
            }
        }
        
        // Generate new random brawler
        this.dailyBrawler = this.getRandomBrawler();
        
        // Store it
        localStorage.setItem(storageKey, JSON.stringify({
            brawlerId: this.dailyBrawler.id,
            timestamp: Date.now()
        }));
        
        // Reset games counter
        localStorage.setItem(gamesKey, JSON.stringify({
            played: 0,
            lastReset: Date.now()
        }));
        
        // Clear old game state for this mode
        localStorage.removeItem(this.getStorageKey());
        
        // Debug: Log selected brawler for this mode
        console.log(`[DEBUG] ${this.mode} mode: Selected Brawler = ${this.dailyBrawler.name} (ID: ${this.dailyBrawler.id})`);
    }
    
    getRandomBrawler() {
        // Use mode as additional seed for different brawlers per mode
        const modeSeeds = {
            'classic': 1,
            'pixel': 2,
            'emoji': 3,
            'description': 4
        };
        
        const now = Date.now();
        const modeSeed = modeSeeds[this.mode] || 1;
        const seed = now + modeSeed * 1000000;
        
        // Simple random based on seed
        const index = Math.floor((seed * 9301 + 49297) % 233280 / 233280 * brawlers.length);
        return brawlers[index];
    }
    
    getDailyBrawlerKey() {
        return `brawlstars_brawler_${this.mode}`;
    }
    
    getGamesKey() {
        return `brawlstars_games_${this.mode}`;
    }
    
    getStorageKey() {
        return `brawlstars_state_${this.mode}`;
    }
    
    canPlayNewGame() {
        return playLimitManager.canPlayMode(this.mode);
    }
    
    getGamesRemaining() {
        return playLimitManager.getRemainingPlays(this.mode);
    }
    
    incrementGamesPlayed() {
        // Use the PlayLimitManager system
        playLimitManager.incrementPlays(this.mode);
    }
    
    resetCurrentGame() {
        if (!this.canPlayNewGame()) {
            return false;
        }
        
        // Clear result message
        const prefix = this.mode === 'classic' ? '' : `${this.mode}-`;
        const resultEl = document.getElementById(`${prefix}result`);
        if (resultEl) {
            resultEl.innerHTML = '';
            resultEl.className = 'result-message';
        }
        
        // Clear current game state
        localStorage.removeItem(this.getStorageKey());
        
        // Generate new brawler
        this.dailyBrawler = this.getRandomBrawler();
        
        // Store new brawler
        localStorage.setItem(this.getDailyBrawlerKey(), JSON.stringify({
            brawlerId: this.dailyBrawler.id,
            timestamp: Date.now()
        }));
        
        // Increment games played
        this.incrementGamesPlayed();
        playLimitManager.updateModeIndicators(); // Update indicators
        
        // Reset game state
        this.attempts = 0;
        this.guesses = [];
        this.gameOver = false;
        this.won = false;
        this.emojiRevealed = 1;
        this.revealedWordIndices = [];
        
        // Re-initialize UI
        this.initializeUI();
        
        return true;
    }
    
    loadGameState() {
        const saved = localStorage.getItem(this.getStorageKey());
        if (saved) {
            const state = JSON.parse(saved);
            
            // Verify that the saved state belongs to the current brawler
            if (state.brawlerId && state.brawlerId !== this.dailyBrawler.id) {
                console.log(`[DEBUG] ${this.mode} mode: Saved state belongs to different brawler (${state.brawlerId} vs ${this.dailyBrawler.id}), clearing it`);
                localStorage.removeItem(this.getStorageKey());
                this.emojiRevealed = 1;
                this.revealedWordIndices = [];
                return;
            }
            
            this.attempts = state.attempts;
            this.guesses = state.guesses;
            this.gameOver = state.gameOver;
            this.won = state.won;
            this.emojiRevealed = state.emojiRevealed || 1;
            this.revealedWordIndices = state.revealedWordIndices || [];
        } else {
            this.emojiRevealed = 1;
            this.revealedWordIndices = [];
        }
    }
    
    saveGameState() {
        const state = {
            brawlerId: this.dailyBrawler.id, // Add brawler ID to verify state belongs to current brawler
            attempts: this.attempts,
            guesses: this.guesses,
            gameOver: this.gameOver,
            won: this.won,
            emojiRevealed: this.emojiRevealed || 1,
            revealedWordIndices: this.revealedWordIndices || []
        };
        localStorage.setItem(this.getStorageKey(), JSON.stringify(state));
        this.updateDailyProgress();
    }
    
    initializeUI() {
        this.isRevealingNewWords = false; // Don't reveal new words during initialization
        
        this.renderGuesses();
        
        if (this.gameOver) {
            this.showResult();
            this.showPlayAgainButton();
        }
        
        this.initializeModeUI();
    }
    
    initializeModeUI() {
        switch (this.mode) {
            case 'classic':
                this.initializeClassicMode();
                break;
            case 'pixel':
                this.initializePixelMode();
                break;
            case 'emoji':
                this.initializeEmojiMode();
                break;
            case 'description':
                this.initializeDescriptionMode();
                break;
        }
    }
    
    initializeClassicMode() {
        const container = document.getElementById('guesses');
        if (container && this.guesses.length === 0 && !this.gameOver) {
            this.createGuessHeader();
        }
    }
    
    createGuessHeader() {
        const container = document.getElementById('guesses');
        if (!container) return;
        
        const header = document.createElement('div');
        header.className = 'guess-header';
        
        // Add Brawler image header
        const imageHeader = document.createElement('div');
        imageHeader.className = 'guess-header-cell';
        imageHeader.textContent = t('stats.brawler') || 'Brawler';
        header.appendChild(imageHeader);
        
        const headers = ['rarity', 'role', 'range', 'speed', 'health', 'releaseYear'];
        headers.forEach(stat => {
            const cell = document.createElement('div');
            cell.className = 'guess-header-cell';
            cell.textContent = t(`stats.${stat}`);
            header.appendChild(cell);
        });
        
        container.appendChild(header);
    }
    
    initializePixelMode() {
        const canvas = document.getElementById('pixel-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = 400;
            canvas.height = 400;
            
            // Start with EXTREMELY pixelated - only 2x2 or 3x3 pixels total!
            // attempts 0: 200 pixelSize (400/200 = 2x2 grid)
            // attempts 1: 133 pixelSize (400/133 ≈ 3x3 grid)
            // gradually decrease to clear
            const pixelSize = Math.max(1, 200 - (this.attempts * 25));
            
            const w = canvas.width / pixelSize;
            const h = canvas.height / pixelSize;
            
            ctx.drawImage(img, 0, 0, w, h);
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
            
            if (this.gameOver) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        };
        
        img.onerror = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#ffd700';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Image not available', canvas.width / 2, canvas.height / 2);
        };
        
        img.src = this.dailyBrawler.image;
    }
    
    initializeEmojiMode() {
        const display = document.getElementById('emoji-display');
        if (!display) return;
        
        const emojis = this.generateEmojis(this.dailyBrawler);
        const revealed = this.emojiRevealed || 1;
        
        display.innerHTML = '';
        emojis.forEach((emoji, index) => {
            const span = document.createElement('span');
            span.className = 'emoji-item';
            if (index < revealed || this.gameOver) {
                span.textContent = emoji;
            } else {
                span.textContent = '❓';
                span.classList.add('hidden-emoji');
            }
            display.appendChild(span);
        });
    }
    
    generateEmojis(brawler) {
        const emojiMap = {
            'Shelly': ['🔫', '💥', '👢'],
            'Nita': '🐻🌀👧',
            'Colt': '🔫🎯✨',
            'Bull': '🐂💪💥',
            'El Primo': '🤼‍♂️💪🔥',
            'Barley': '🍾🔥🤖',
            'Poco': '🎸💀🎵',
            'Rosa': '🌹🥊🛡️',
            'Jessie': '🔧⚡🧠',
            'Brock': '🚀💣😎',
            'Dynamike': '💣🧔⛏️',
            'Tick': '⏰💣😵',
            '8-Bit': '👾🎮💥',
            'Rico': '🔵⚡🤖',
            'Darryl': '🛢️🏴‍☠️💨',
            'Penny': '💰⚓💥',
            'Carl': '⛏️🪨🌀',
            'Jacky': '🔨🦺💢',
            'Gus': '👻🎈😢',
            'Bo': '🏹🦅🔥',
            'Emz': '📱💜☠️',
            'Stu': '🏎️🔥🤖',
            'Piper': '☂️🎯💣',
            'Pam': '🔧❤️🔫',
            'Frank': '🔨😡🧱',
            'Bibi': '⚾💨😏',
            'Bea': '🐝🎯⚡',
            'Nani': '🤖👁️💥',
            'Edgar': '🧣⚡😤',
            'Griff': '💰🏦😠',
            'Grom': '👮💣📦',
            'Bonnie': '🎪🦷💥',
            'Hank': '🦀💣🫧',
            'Pearl': '🍪🔥🤖',
            'Mortis': '⚰️🦇💨',
            'Tara': '🔮🃏🌌',
            'Max': '⚡🏃‍♀️💨',
            'Mr. P': '🐧🎩📦',
            'Sprout': '🌱🧱🤖',
            'Byron': '💉🧪😈',
            'Squeak': '💧🐶💣',
            'Gray': '🎭🖌️🚪',
            'Willow': '🐸🌀🧠',
            'Doug': '🌭❤️🔔',
            'Chuck': '🚂⚙️💨',
            'Charlie': '🕷️🕸️🎭',
            'Gene': '🧞‍♂️✨🖐️',
            'Spike': '🌵💥😄',
            'Crow': '🦅☠️🗡️',
            'Leon': '🦎👻🔪',
            'Sandy': '😴🌙💨',
            'Amber': '🔥🛢️😈',
            'Meg': '🤖💥👧',
            'Chester': '🃏🎭💣',
            'Cordelius': '🍄🌙🌀',
            'Gale': '❄️🌬️🧓',
            'Surge': '⚡🤖📈',
            'Colette': '📔💜🩸',
            'Lou': '❄️🍦😬',
            'Ruffs': '🐕🚀🎖️',
            'Belle': '⚡💰🎯',
            'Buzz': '🦈🏖️🚨',
            'Ash': '🗑️🔥😡',
            'Lola': '🎬⭐🪞',
            'Fang': '🥋👟🔥',
            'Eve': '🥚👽🛸',
            'Janet': '🎤🚀🎶',
            'Otis': '🎨🐙🚫',
            'Sam': '🦾🔩🥊',
            'Buster': '🎥🛡️😎',
            'Mandy': '🍬🎯👑',
            'R-T': '🤖📡👁️',
            'Maisie': '🔫💨💣',
            'Alli': '🌟👑⚔️',
            'Berry': '🍓💥🎯',
            'Clancy': '🏙️🛠️🔥',
            'Finx': '🌊🔱⚡',
            'Gigi': '🎭🪄👻',
            'Jae-Yong': '🗡️🐉💨',
            'Juju': '🌀🍄✨',
            'Kaze': '🍃⚡🤐',
            'Kenji': '🥷⚔️🌀',
            'Larry & Lawrie': '🐻🤼‍♂️💥',
            'Lumi': '🌙❄️✨',
            'Melo​die': '🎼🎤💥',
            'Meeple': '🎲👾🌀',
            'Mico': '🐭💣⚡',
            'Mina': '⬛🧠🩸',
            'Moe': '⚙️🔫🌀',
            'Pierce': '🏊‍♂️🔫🛟',
            'Trunk': '🌴💪🐘',
            'Ziggy': '👾✨🔮',
            'Glowbert': '🌟🦀🔬',
            'Angelo': '🦟💉💨',
            'Lily': '🌸🔪👧',
            'Kit': '🐱🧥🎯',
            'Melodie': '🎵🎤💥',
            'Draco': '🐉🔥🎸'
        };
        const emojis = emojiMap[brawler.name] || ['❓', '❓', '❓'];
        // Convert string to array if needed
        if (typeof emojis === 'string') {
            // Split emoji string into array using regex to handle multi-char emojis
            const emojiArray = emojis.match(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g);
            return emojiArray && emojiArray.length >= 3 ? emojiArray.slice(0, 3) : ['❓', '❓', '❓'];
        }
        return emojis;
    }
    
    initializeDescriptionMode() {
        const descText = document.getElementById('description-text');
        if (descText) {
            const description = getDescription(this.dailyBrawler.name);
            
            const words = description.split(' ');
            
            // Initialize revealed words tracking if not exists
            if (!this.revealedWordIndices || this.revealedWordIndices.length === 0) {
                this.revealedWordIndices = [];
                
                // Start with exactly 1 random word that is NOT the first word (likely the brawler name)
                const availableIndices = [];
                
                // Skip first word (index 0) as it's often the brawler name
                for (let i = 1; i < words.length; i++) {
                    availableIndices.push(i);
                }
                
                // Pick 1 random initial word
                if (availableIndices.length > 0) {
                    const randomIndex = Math.floor(Math.random() * availableIndices.length);
                    this.revealedWordIndices.push(availableIndices[randomIndex]);
                }
            }
            
            // Reveal more words with each guess (but not first word) - maximum 2 words per guess
            // Only reveal during actual gameplay (makeGuess), not during initialization
            if (this.attempts > 0 && !this.gameOver && this.isRevealingNewWords) {
                const wordsToRevealPerGuess = Math.min(2, Math.max(1, Math.floor((words.length - 1) / this.maxAttempts)));
                const availableIndices = [];
                
                // Skip first word and already revealed words
                for (let i = 1; i < words.length; i++) {
                    if (!this.revealedWordIndices.includes(i)) {
                        availableIndices.push(i);
                    }
                }
                
                // Add maximum 2 random words
                const wordsToAdd = Math.min(wordsToRevealPerGuess, availableIndices.length, 2);
                for (let i = 0; i < wordsToAdd; i++) {
                    const randomIndex = Math.floor(Math.random() * availableIndices.length);
                    this.revealedWordIndices.push(availableIndices[randomIndex]);
                    availableIndices.splice(randomIndex, 1);
                }
            }
            
            if (this.gameOver) {
                descText.textContent = description;
            } else {
                // Build text with revealed words and blanks
                const displayWords = words.map((word, index) => {
                    if (this.revealedWordIndices.includes(index)) {
                        return word;
                    } else {
                        return '___';
                    }
                });
                descText.textContent = displayWords.join(' ');
            }
        }
    }
    
    makeGuess(brawlerName) {
        if (this.gameOver) return;
        
        const guessed = brawlers.find(b => b.name.toLowerCase() === brawlerName.toLowerCase());
        if (!guessed) return;
        
        if (this.guesses.some(g => g.name === guessed.name)) {
            return;
        }
        
        this.attempts++;
        
        // Flag for revealing new words in description mode
        this.isRevealingNewWords = true;
        
        // For emoji mode, reveal one more emoji per guess
        if (this.mode === 'emoji') {
            this.emojiRevealed = Math.min(3, this.emojiRevealed + 1);
        }
        
        const isCorrect = guessed.id === this.dailyBrawler.id;
        
        const comparison = this.compareStats(guessed, this.dailyBrawler);
        
        this.guesses.push({
            name: guessed.name,
            correct: isCorrect,
            stats: {
                rarity: guessed.rarity,
                role: guessed.role,
                range: guessed.range,
                speed: guessed.speed,
                health: guessed.health,
                releaseYear: guessed.releaseYear
            },
            comparison: comparison
        });
        
        if (isCorrect) {
            this.won = true;
            this.gameOver = true;
        } else if (this.attempts >= this.maxAttempts) {
            this.gameOver = true;
        }
        
        this.saveGameState();
        this.updateUI();
        
        // Update indicators after game ends
        if (this.gameOver) {
            playLimitManager.updateModeIndicators();
        }
        
        // Reset the flag after updating
        this.isRevealingNewWords = false;
    }
    
    compareStats(guessed, target) {
        const comparison = {};
        
        const rarityGuess = statValues.rarity[guessed.rarity];
        const rarityTarget = statValues.rarity[target.rarity];
        comparison.rarity = rarityGuess === rarityTarget ? 'correct' : (rarityGuess < rarityTarget ? 'higher' : 'lower');
        
        comparison.role = guessed.role === target.role ? 'correct' : 'wrong';
        
        const rangeGuess = statValues.range[guessed.range];
        const rangeTarget = statValues.range[target.range];
        comparison.range = rangeGuess === rangeTarget ? 'correct' : (rangeGuess < rangeTarget ? 'higher' : 'lower');
        
        const speedGuess = statValues.speed[guessed.speed];
        const speedTarget = statValues.speed[target.speed];
        comparison.speed = speedGuess === speedTarget ? 'correct' : (speedGuess < speedTarget ? 'higher' : 'lower');
        
        const healthGuess = statValues.health[guessed.health];
        const healthTarget = statValues.health[target.health];
        comparison.health = healthGuess === healthTarget ? 'correct' : (healthGuess < healthTarget ? 'higher' : 'lower');
        
        comparison.releaseYear = guessed.releaseYear === target.releaseYear ? 'correct' : (guessed.releaseYear < target.releaseYear ? 'higher' : 'lower');
        
        return comparison;
    }
    
    updateUI() {
        if (this.mode === 'pixel') {
            this.initializePixelMode();
        } else if (this.mode === 'description') {
            this.initializeDescriptionMode();
        } else if (this.mode === 'emoji') {
            this.initializeEmojiMode();
        }
        
        this.renderGuesses();
        
        if (this.gameOver) {
            this.showResult();
            this.showPlayAgainButton();
        }
    }
    
    renderGuesses() {
        if (this.mode === 'classic') {
            this.renderClassicGuesses();
        } else {
            this.renderSimpleGuesses();
        }
    }
    
    renderClassicGuesses() {
        const container = document.getElementById('guesses');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.guesses.length > 0) {
            this.createGuessHeader();
        }
        
        this.guesses.forEach(guess => {
            const row = document.createElement('div');
            row.className = 'guess-row';
            
            // Add Brawler image cell
            const imageCell = document.createElement('div');
            imageCell.className = 'guess-brawler-image';
            const brawler = brawlers.find(b => b.name === guess.name);
            if (brawler) {
                const img = document.createElement('img');
                img.src = brawler.image;
                img.alt = brawler.name;
                imageCell.appendChild(img);
            }
            row.appendChild(imageCell);
            
            const stats = ['rarity', 'role', 'range', 'speed', 'health', 'releaseYear'];
            stats.forEach(stat => {
                const cell = document.createElement('div');
                cell.className = 'guess-cell';
                cell.textContent = guess.stats[stat];
                
                const comp = guess.comparison[stat];
                if (comp === 'correct') {
                    cell.classList.add('correct');
                } else if (comp === 'higher') {
                    cell.classList.add('higher');
                } else if (comp === 'lower') {
                    cell.classList.add('lower');
                }
                
                row.appendChild(cell);
            });
            
            container.appendChild(row);
        });
    }
    
    renderSimpleGuesses() {
        const prefix = this.mode === 'classic' ? '' : `${this.mode}-`;
        const container = document.getElementById(`${prefix}guesses`);
        if (!container) return;
        
        container.innerHTML = '';
        
        this.guesses.forEach(guess => {
            const div = document.createElement('div');
            div.className = `guess-item ${guess.correct ? 'correct' : 'wrong'}`;
            div.innerHTML = `
                <span>${guess.name}</span>
                <span>${guess.correct ? '✅' : '❌'}</span>
            `;
            container.appendChild(div);
        });
    }
    
    showResult() {
        const prefix = this.mode === 'classic' ? '' : `${this.mode}-`;
        const resultEl = document.getElementById(`${prefix}result`);
        if (!resultEl) return;
        
        if (this.won) {
            resultEl.className = 'result-message success';
            resultEl.innerHTML = `${t('correct')} ${this.dailyBrawler.name}!`;
        } else {
            resultEl.className = 'result-message failure';
            resultEl.innerHTML = `${t('wrong')} ${this.dailyBrawler.name}.`;
        }
    }
    
    showPlayAgainButton() {
        const prefix = this.mode === 'classic' ? '' : `${this.mode}-`;
        const resultEl = document.getElementById(`${prefix}result`);
        if (!resultEl) return;
        
        // Remove old button if exists
        const oldBtn = resultEl.querySelector('.play-again-btn');
        if (oldBtn) oldBtn.remove();
        
        // Check if can play again
        const remaining = this.getGamesRemaining();
        
        if (remaining > 0) {
            const btn = document.createElement('button');
            btn.className = 'play-again-btn';
            btn.textContent = `${t('playAgain')} (${remaining}/${this.maxGamesPerMode})`;
            btn.onclick = () => {
                if (this.resetCurrentGame()) {
                    // Don't reload page - just reinitialize in current mode
                    // The resetCurrentGame already does everything needed
                }
            };
            resultEl.appendChild(btn);
        } else {
            const msg = document.createElement('div');
            msg.className = 'wait-message';
            msg.textContent = t('waitMessage');
            resultEl.appendChild(msg);
        }
    }
    
    updateDailyProgress() {
        const modes = ['classic', 'pixel', 'emoji', 'description'];
        
        modes.forEach(mode => {
            const key = `brawlstars_state_${mode}`;
            const saved = localStorage.getItem(key);
            const item = document.querySelector(`.progress-item[data-mode="${mode}"]`);
            
            if (saved && item) {
                const state = JSON.parse(saved);
                if (state.won) {
                    item.classList.add('completed');
                }
            }
        });
    }
}

function initializeSearch(mode) {
    const prefix = mode === 'classic' ? '' : `${mode}-`;
    const searchInput = document.getElementById(`${prefix}search`);
    const resultsContainer = document.getElementById(`${prefix}results`);
    
    if (!searchInput || !resultsContainer) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 1) {
            resultsContainer.classList.remove('active');
            return;
        }
        
        const matches = brawlers.filter(b => 
            b.name.toLowerCase().includes(query)
        );
        
        if (matches.length === 0) {
            resultsContainer.classList.remove('active');
            return;
        }
        
        resultsContainer.innerHTML = '';
        matches.forEach(brawler => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            
            // Add brawler image
            const img = document.createElement('img');
            img.src = brawler.image;
            img.alt = brawler.name;
            img.style.width = '30px';
            img.style.height = '30px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '4px';
            img.style.marginRight = '10px';
            div.appendChild(img);
            
            // Add brawler name
            const span = document.createElement('span');
            span.textContent = brawler.name;
            div.appendChild(span);
            
            div.addEventListener('click', () => {
                currentGame.makeGuess(brawler.name);
                searchInput.value = '';
                resultsContainer.classList.remove('active');
            });
            resultsContainer.appendChild(div);
        });
        
        resultsContainer.classList.add('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.classList.remove('active');
        }
    });
}

let currentGame = null;
