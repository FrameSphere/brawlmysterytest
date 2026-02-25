// main-lang.js
// Language-folder aware main script
// Patches image paths for sub-directory language pages

document.addEventListener('DOMContentLoaded', () => {
    // Patch brawler image paths for language subfolders
    const base = window.IMAGE_BASE || '';
    if (base && typeof brawlers !== 'undefined') {
        brawlers.forEach(b => {
            if (!b.image.startsWith('http') && !b.image.startsWith('/') && !b.image.startsWith('../')) {
                b.image = base + b.image;
            }
        });
    }

    // Clean up old data first
    playLimitManager.cleanupOldData();

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
    }, 60000);
});

// Mode Management
function setupModeButtons() {
    const progressItems = document.querySelectorAll('.progress-item');
    progressItems.forEach(item => {
        item.addEventListener('click', () => {
            const mode = item.getAttribute('data-mode');
            if (!playLimitManager.canPlayMode(mode)) {
                playLimitManager.showCooldownMessage(mode);
                return;
            }
            switchMode(mode);
        });
    });
}

function switchMode(mode) {
    if (!playLimitManager.canPlayMode(mode)) {
        playLimitManager.showCooldownMessage(mode);
        return;
    }

    document.querySelectorAll('.progress-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-mode') === mode) item.classList.add('active');
    });

    document.querySelectorAll('.game-mode').forEach(el => el.classList.remove('active'));

    const selectedMode = document.getElementById(`${mode}-mode`);
    if (selectedMode) selectedMode.classList.add('active');

    currentGame = new BrawlStarsGame(mode);
    initializeSearch(mode);
}

function updateDailyProgressOnLoad() {
    const modes = ['classic', 'pixel', 'emoji', 'description'];
    modes.forEach(mode => {
        const saved = localStorage.getItem(`brawlstars_state_${mode}`);
        const item = document.querySelector(`.progress-item[data-mode="${mode}"]`);
        if (saved && item) {
            const state = JSON.parse(saved);
            if (state.won) item.classList.add('completed');
        }
    });
}

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
    if (modal) modal.classList.remove('show');
}

window.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('cooldown-modal');
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    }
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
});
