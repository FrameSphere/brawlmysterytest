// Main application logic

document.addEventListener('DOMContentLoaded', () => {
    // Clean up old data first
    playLimitManager.cleanupOldData();
    
    // Initialize language
    initializeLanguage();
    
    // Update play limit indicators
    playLimitManager.updateModeIndicators();
    
    // Initialize first game (classic mode)
    switchMode('classic');
    
    // Set up mode switching
    setupModeButtons();
    
    // Update daily progress on load
    updateDailyProgressOnLoad();
    
    // Update cooldown indicators every minute
    setInterval(() => {
        playLimitManager.updateModeIndicators();
    }, 60000); // Update every minute
});

// Language Management
function initializeLanguage() {
    const langSelect = document.getElementById('languageSelect');
    const savedLang = getCurrentLanguage();
    
    if (langSelect) {
        langSelect.value = savedLang;
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
            
            // Reinitialize current game to update UI
            if (currentGame) {
                const mode = currentGame.mode;
                switchMode(mode);
            }
            
            // Update indicators with new language
            playLimitManager.updateModeIndicators();
            
            // Update about modal content
            updateAboutModalContent();
        });
    }
    
    updatePageLanguage();
    updateAboutModalContent();
}

// Update About Modal Content
function updateAboutModalContent() {
    const aboutList = document.querySelector('.about-list');
    if (!aboutList) return;
    
    const lang = getCurrentLanguage();
    const trans = translations[lang];
    
    aboutList.innerHTML = `
        <li><strong>${trans.mode.classic}:</strong> ${trans.about.classicDesc}</li>
        <li><strong>${trans.mode.pixel}:</strong> ${trans.about.pixelDesc}</li>
        <li><strong>${trans.mode.emoji}:</strong> ${trans.about.emojiDesc}</li>
        <li><strong>${trans.mode.description}:</strong> ${trans.about.descriptionDesc}</li>
    `;
}

// Mode Management
function setupModeButtons() {
    const progressItems = document.querySelectorAll('.progress-item');
    
    progressItems.forEach(item => {
        item.addEventListener('click', () => {
            const mode = item.getAttribute('data-mode');
            
            // Check if mode is locked
            if (!playLimitManager.canPlayMode(mode)) {
                playLimitManager.showCooldownMessage(mode);
                return;
            }
            
            switchMode(mode);
        });
    });
}

function switchMode(mode) {
    // Check if mode is available
    if (!playLimitManager.canPlayMode(mode)) {
        playLimitManager.showCooldownMessage(mode);
        return;
    }
    
    // Update progress item states
    document.querySelectorAll('.progress-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-mode') === mode) {
            item.classList.add('active');
        }
    });
    
    // Hide all game modes
    document.querySelectorAll('.game-mode').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show selected mode
    const selectedMode = document.getElementById(`${mode}-mode`);
    if (selectedMode) {
        selectedMode.classList.add('active');
    }
    
    // Initialize game for this mode
    currentGame = new BrawlStarsGame(mode);
    
    // Initialize search for this mode
    initializeSearch(mode);
}

// Update daily progress on page load
function updateDailyProgressOnLoad() {
    const modes = ['classic', 'pixel', 'emoji', 'description'];
    
    modes.forEach(mode => {
        const key = `brawlstars_${mode}_${new Date().toISOString().split('T')[0]}`;
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

// Modal Functions
function showModal(title, message) {
    const modal = document.getElementById('cooldown-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    
    if (modal && modalTitle && modalText) {
        modalTitle.textContent = title;
        modalText.textContent = message;
        modal.classList.add('show');
    }
}

function closeModal() {
    const modal = document.getElementById('cooldown-modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Setup modal close handlers on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('cooldown-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    // Close on X button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close on outside click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
