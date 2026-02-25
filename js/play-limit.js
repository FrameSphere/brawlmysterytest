// Play Limit and Reset System
// Each mode can be played 2 times, then 12h cooldown

class PlayLimitManager {
    constructor() {
        this.maxPlaysPerMode = 2;
        this.cooldownHours = 12;
    }
    
    getPlayLimitKey(mode) {
        const today = new Date().toISOString().split('T')[0];
        return `brawlstars_playlimit_${mode}_${today}`;
    }
    
    getCooldownKey(mode) {
        return `brawlstars_cooldown_${mode}`;
    }
    
    getPlaysCount(mode) {
        const key = this.getPlayLimitKey(mode);
        const data = localStorage.getItem(key);
        if (!data) return 0;
        
        const playData = JSON.parse(data);
        return playData.count || 0;
    }
    
    incrementPlays(mode) {
        const key = this.getPlayLimitKey(mode);
        const count = this.getPlaysCount(mode) + 1;
        
        localStorage.setItem(key, JSON.stringify({
            count: count,
            lastPlayed: Date.now()
        }));
        
        // If reached limit, set cooldown
        if (count >= this.maxPlaysPerMode) {
            this.setCooldown(mode);
        }
        
        return count;
    }
    
    setCooldown(mode) {
        const cooldownUntil = Date.now() + (this.cooldownHours * 60 * 60 * 1000);
        localStorage.setItem(this.getCooldownKey(mode), cooldownUntil.toString());
    }
    
    isInCooldown(mode) {
        const cooldownKey = this.getCooldownKey(mode);
        const cooldownUntil = localStorage.getItem(cooldownKey);
        
        if (!cooldownUntil) return false;
        
        const now = Date.now();
        if (now < parseInt(cooldownUntil)) {
            return true;
        }
        
        // Cooldown expired, clean up
        localStorage.removeItem(cooldownKey);
        return false;
    }
    
    getRemainingCooldown(mode) {
        const cooldownKey = this.getCooldownKey(mode);
        const cooldownUntil = localStorage.getItem(cooldownKey);
        
        if (!cooldownUntil) return 0;
        
        const remaining = parseInt(cooldownUntil) - Date.now();
        return remaining > 0 ? remaining : 0;
    }
    
    getCooldownText(mode) {
        const remaining = this.getRemainingCooldown(mode);
        if (remaining <= 0) return '';
        
        const hours = Math.floor(remaining / (60 * 60 * 1000));
        const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
        
        const lang = getCurrentLanguage();
        const texts = {
            de: `Gesperrt für ${hours}h ${minutes}m`,
            en: `Locked for ${hours}h ${minutes}m`,
            fr: `Verrouillé pour ${hours}h ${minutes}m`,
            es: `Bloqueado por ${hours}h ${minutes}m`,
            it: `Bloccato per ${hours}h ${minutes}m`
        };
        
        return texts[lang] || texts['en'];
    }
    
    canPlayMode(mode) {
        // Check if in cooldown
        if (this.isInCooldown(mode)) {
            return false;
        }
        
        // Check if reached play limit today
        const playsToday = this.getPlaysCount(mode);
        return playsToday < this.maxPlaysPerMode;
    }
    
    getRemainingPlays(mode) {
        if (this.isInCooldown(mode)) return 0;
        
        const playsToday = this.getPlaysCount(mode);
        return Math.max(0, this.maxPlaysPerMode - playsToday);
    }
    
    showCooldownMessage(mode) {
        const cooldownText = this.getCooldownText(mode);
        const remainingPlays = this.getRemainingPlays(mode);
        
        const lang = getCurrentLanguage();
        let message = '';
        let title = '';
        
        if (this.isInCooldown(mode)) {
            const titles = {
                de: 'Modus gesperrt',
                en: 'Mode Locked',
                fr: 'Mode verrouillé',
                es: 'Modo bloqueado',
                it: 'Modalità bloccata'
            };
            const messages = {
                de: `Dieser Modus ist gesperrt. ${cooldownText}`,
                en: `This mode is locked. ${cooldownText}`,
                fr: `Ce mode est verrouillé. ${cooldownText}`,
                es: `Este modo está bloqueado. ${cooldownText}`,
                it: `Questa modalità è bloccata. ${cooldownText}`
            };
            title = titles[lang] || titles['en'];
            message = messages[lang] || messages['en'];
        } else if (remainingPlays === 0) {
            const titles = {
                de: 'Keine Spiele mehr',
                en: 'No Games Left',
                fr: 'Plus de jeux',
                es: 'Sin juegos',
                it: 'Nessun gioco rimasto'
            };
            const messages = {
                de: 'Du hast alle Versuche für heute aufgebraucht. Warte 12 Stunden.',
                en: 'You\'ve used all attempts for today. Wait 12 hours.',
                fr: 'Vous avez utilisé toutes les tentatives pour aujourd\'hui. Attendez 12 heures.',
                es: 'Has usado todos los intentos de hoy. Espera 12 horas.',
                it: 'Hai esaurito tutti i tentativi di oggi. Attendi 12 ore.'
            };
            title = titles[lang] || titles['en'];
            message = messages[lang] || messages['en'];
        }
        
        if (message) {
            showModal(title, message);
        }
    }
    
    // Unlock all modes (test function)
    unlockAllModes() {
        const modes = ['classic', 'pixel', 'emoji', 'description'];
        
        modes.forEach(mode => {
            // Remove cooldown
            localStorage.removeItem(this.getCooldownKey(mode));
            
            // Reset play count
            const key = this.getPlayLimitKey(mode);
            localStorage.removeItem(key);
        });
        
        // Update UI
        this.updateModeIndicators();
        
        console.log('All modes unlocked!');
    }
    
    updateModeIndicators() {
        const modes = ['classic', 'pixel', 'emoji', 'description'];
        
        modes.forEach(mode => {
            const item = document.querySelector(`.progress-item[data-mode="${mode}"]`);
            if (!item) return;
            
            // Remove old indicators
            const oldIndicator = item.querySelector('.mode-plays-indicator');
            if (oldIndicator) oldIndicator.remove();
            
            const remainingPlays = this.getRemainingPlays(mode);
            const inCooldown = this.isInCooldown(mode);
            
            // Add plays indicator
            const indicator = document.createElement('div');
            indicator.className = 'mode-plays-indicator';
            
            if (inCooldown || remainingPlays === 0) {
                indicator.textContent = '0/2';
                indicator.title = this.getCooldownText(mode) || 'Keine Spiele mehr verfügbar';
                item.classList.add('locked');
            } else {
                indicator.textContent = `${remainingPlays}/2`;
                item.classList.remove('locked');
            }
            
            item.appendChild(indicator);
        });
    }
    
    // Clean up old data from previous days
    cleanupOldData() {
        const today = new Date().toISOString().split('T')[0];
        const keysToRemove = [];
        
        // Check all localStorage keys
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            
            // Check if it's a brawlstars game key
            if (key && key.startsWith('brawlstars_')) {
                // Extract date from key if it contains one
                const parts = key.split('_');
                const lastPart = parts[parts.length - 1];
                
                // Check if last part is a date (format: YYYY-MM-DD)
                if (lastPart.match(/^\d{4}-\d{2}-\d{2}$/)) {
                    if (lastPart !== today) {
                        keysToRemove.push(key);
                    }
                }
            }
        }
        
        // Remove old keys
        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });
        
        // Also check and clean expired cooldowns
        const modes = ['classic', 'pixel', 'emoji', 'description'];
        modes.forEach(mode => {
            if (this.isInCooldown(mode)) {
                const remaining = this.getRemainingCooldown(mode);
                if (remaining <= 0) {
                    localStorage.removeItem(this.getCooldownKey(mode));
                }
            }
        });
    }
}

// Global instance
const playLimitManager = new PlayLimitManager();

// Setup modal buttons
document.addEventListener('DOMContentLoaded', () => {
    const watchAdBtn = document.getElementById('watch-ad-btn');
    const unlockAllBtn = document.getElementById('unlock-all-btn');
    
    if (watchAdBtn) {
        watchAdBtn.addEventListener('click', () => {
            console.log('Watch ad clicked - implement ad integration here');
            // TODO: Integrate actual ad system (AdSense, etc.)
            alert('Werbung wird geladen... (noch nicht implementiert)');
        });
    }
    
    if (unlockAllBtn) {
        unlockAllBtn.addEventListener('click', () => {
            // For testing: unlock all modes
            playLimitManager.unlockAllModes();
            
            // Close modal
            const modal = document.getElementById('cooldown-modal');
            if (modal) {
                modal.classList.remove('show');
            }
            
            // Show success message
            const lang = getCurrentLanguage();
            const messages = {
                de: 'Alle Modi wurden freigeschaltet!',
                en: 'All modes unlocked!',
                fr: 'Tous les modes déverrouillés!',
                es: '¡Todos los modos desbloqueados!',
                it: 'Tutte le modalità sbloccate!'
            };
            alert(messages[lang] || messages['en']);
        });
    }
});
