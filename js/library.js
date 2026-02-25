// Library Page JavaScript
// Note: getCurrentLanguage, setLanguage, updatePageLanguage, and getDescription
// are already defined in translations.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLibrary();
});

let allBrawlers = [];

function initializeLibrary() {
    // Set up language
    const savedLanguage = localStorage.getItem('language') || 'de';
    document.getElementById('languageSelect').value = savedLanguage;
    updatePageLanguage();
    
    // Set up event listeners
    document.getElementById('languageSelect').addEventListener('change', function(e) {
        setLanguage(e.target.value);
        renderBrawlers(filterBrawlers());
    });
    
    document.getElementById('library-search').addEventListener('input', function() {
        renderBrawlers(filterBrawlers());
    });
    
    document.getElementById('rarity-filter').addEventListener('change', function() {
        renderBrawlers(filterBrawlers());
    });
    
    document.getElementById('role-filter').addEventListener('change', function() {
        renderBrawlers(filterBrawlers());
    });
    
    // Initialize brawlers
    allBrawlers = [...brawlers];
    renderBrawlers(allBrawlers);
}

function filterBrawlers() {
    const searchTerm = document.getElementById('library-search').value.toLowerCase();
    const rarityFilter = document.getElementById('rarity-filter').value;
    const roleFilter = document.getElementById('role-filter').value;
    const currentLang = getCurrentLanguage();
    
    return allBrawlers.filter(brawler => {
        // Search filter
        const translatedName = (brawlerNameTranslations[brawler.name] && brawlerNameTranslations[brawler.name][currentLang]) 
            ? brawlerNameTranslations[brawler.name][currentLang].toLowerCase() 
            : brawler.name.toLowerCase();
        const matchesSearch = translatedName.includes(searchTerm) || brawler.name.toLowerCase().includes(searchTerm);
        
        // Rarity filter
        const matchesRarity = rarityFilter === 'all' || brawler.rarity === rarityFilter;
        
        // Role filter
        const matchesRole = roleFilter === 'all' || brawler.role === roleFilter;
        
        return matchesSearch && matchesRarity && matchesRole;
    });
}

function renderBrawlers(brawlersToRender) {
    const grid = document.getElementById('brawler-grid');
    const currentLang = getCurrentLanguage();
    
    if (brawlersToRender.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <div class="empty-state-text" data-i18n="library.noResults">
                    Keine Brawler gefunden
                </div>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = brawlersToRender.map(brawler => createBrawlerCard(brawler, currentLang)).join('');
}

function createBrawlerCard(brawler, lang) {
    const translatedName = (brawlerNameTranslations[brawler.name] && brawlerNameTranslations[brawler.name][lang]) 
        ? brawlerNameTranslations[brawler.name][lang] 
        : brawler.name;
    
    const description = getDescription(brawler.name);
    const rarityClass = getRarityClass(brawler.rarity);
    
    // Translate stats
    const stats = {
        rarity: translateStat('rarity', brawler.rarity, lang),
        role: translateStat('role', brawler.role, lang),
        range: translateStat('range', brawler.range, lang),
        speed: translateStat('speed', brawler.speed, lang),
        health: translateStat('health', brawler.health, lang)
    };
    
    return `
        <div class="brawler-card">
            <div class="brawler-card-image">
                <img src="${brawler.image}" alt="${translatedName}" loading="lazy">
            </div>
            <div class="brawler-card-content">
                <div class="brawler-card-header">
                    <h3 class="brawler-name">${translatedName}</h3>
                    <span class="brawler-rarity ${rarityClass}">${stats.rarity}</span>
                </div>
                <div class="brawler-stats">
                    <div class="stat-row">
                        <span class="stat-label" data-i18n="stats.role">Rolle</span>
                        <span class="stat-value">${stats.role}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label" data-i18n="stats.range">Reichweite</span>
                        <span class="stat-value">${stats.range}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label" data-i18n="stats.speed">Geschwindigkeit</span>
                        <span class="stat-value">${stats.speed}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label" data-i18n="stats.health">Gesundheit</span>
                        <span class="stat-value">${stats.health}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label" data-i18n="stats.releaseYear">Erscheinungsjahr</span>
                        <span class="stat-value">${brawler.releaseYear}</span>
                    </div>
                </div>
                ${description ? `
                    <div class="brawler-description">
                        ${description}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function getRarityClass(rarity) {
    const rarityMap = {
        'Starting': 'rarity-starting',
        'Rare': 'rarity-rare',
        'Super Rare': 'rarity-super-rare',
        'Epic': 'rarity-epic',
        'Mythic': 'rarity-mythic',
        'Legendary': 'rarity-legendary',
        'ultralegendary': 'rarity-ultralegendary'
    };
    return rarityMap[rarity] || '';
}

function translateStat(statType, value, lang) {
    // Translation mappings for each stat type
    const translations = {
        rarity: {
            'Starting': {
                de: 'Starter',
                en: 'Starting',
                es: 'Inicial',
                fr: 'Départ',
                it: 'Iniziale'
            },
            'Rare': {
                de: 'Selten',
                en: 'Rare',
                es: 'Raro',
                fr: 'Rare',
                it: 'Raro'
            },
            'Super Rare': {
                de: 'Superselten',
                en: 'Super Rare',
                es: 'Súper Raro',
                fr: 'Super Rare',
                it: 'Super Raro'
            },
            'Epic': {
                de: 'Episch',
                en: 'Epic',
                es: 'Épico',
                fr: 'Épique',
                it: 'Epico'
            },
            'Mythic': {
                de: 'Mythisch',
                en: 'Mythic',
                es: 'Mítico',
                fr: 'Mythique',
                it: 'Mitico'
            },
            'Legendary': {
                de: 'Legendär',
                en: 'Legendary',
                es: 'Legendario',
                fr: 'Légendaire',
                it: 'Leggendario'
            },
            'ultralegendary': {
                de: 'Ultra Legendär',
                en: 'Ultra Legendary',
                es: 'Ultra Legendario',
                fr: 'Ultra Légendaire',
                it: 'Ultra Leggendario'
            }
        },
        role: {
            'Damage Dealer': {
                de: 'Schadensverursacher',
                en: 'Damage Dealer',
                es: 'Infligidor de daño',
                fr: 'Dealer de dégâts',
                it: 'Infliggitore di danni'
            },
            'Tank': {
                de: 'Tank',
                en: 'Tank',
                es: 'Tanque',
                fr: 'Tank',
                it: 'Tank'
            },
            'Assassin': {
                de: 'Attentäter',
                en: 'Assassin',
                es: 'Asesino',
                fr: 'Assassin',
                it: 'Assassino'
            },
            'Support': {
                de: 'Unterstützung',
                en: 'Support',
                es: 'Apoyo',
                fr: 'Support',
                it: 'Supporto'
            },
            'Marksman': {
                de: 'Scharfschütze',
                en: 'Marksman',
                es: 'Tirador',
                fr: 'Tireur d\'élite',
                it: 'Tiratore'
            },
            'Controller': {
                de: 'Kontrolleur',
                en: 'Controller',
                es: 'Controlador',
                fr: 'Contrôleur',
                it: 'Controllore'
            },
            'Artillery': {
                de: 'Artillerie',
                en: 'Artillery',
                es: 'Artillería',
                fr: 'Artillerie',
                it: 'Artiglieria'
            }
        },
        range: {
            'Short': {
                de: 'Kurz',
                en: 'Short',
                es: 'Corto',
                fr: 'Court',
                it: 'Corto'
            },
            'Medium': {
                de: 'Mittel',
                en: 'Medium',
                es: 'Medio',
                fr: 'Moyen',
                it: 'Medio'
            },
            'Long': {
                de: 'Lang',
                en: 'Long',
                es: 'Largo',
                fr: 'Long',
                it: 'Lungo'
            },
            'Very Long': {
                de: 'Sehr lang',
                en: 'Very Long',
                es: 'Muy largo',
                fr: 'Très long',
                it: 'Molto lungo'
            },
            'High': {
                de: 'Hoch',
                en: 'High',
                es: 'Alto',
                fr: 'Haut',
                it: 'Alto'
            },
            'Very High': {
                de: 'Sehr hoch',
                en: 'Very High',
                es: 'Muy alto',
                fr: 'Très haut',
                it: 'Molto alto'
            },
            'Low': {
                de: 'Niedrig',
                en: 'Low',
                es: 'Bajo',
                fr: 'Bas',
                it: 'Basso'
            },
            'Very Low': {
                de: 'Sehr niedrig',
                en: 'Very Low',
                es: 'Muy bajo',
                fr: 'Très bas',
                it: 'Molto basso'
            }
        },
        speed: {
            'Slow': {
                de: 'Langsam',
                en: 'Slow',
                es: 'Lento',
                fr: 'Lent',
                it: 'Lento'
            },
            'Langsam': {
                de: 'Langsam',
                en: 'Slow',
                es: 'Lento',
                fr: 'Lent',
                it: 'Lento'
            },
            'Normal': {
                de: 'Normal',
                en: 'Normal',
                es: 'Normal',
                fr: 'Normal',
                it: 'Normale'
            },
            'Fast': {
                de: 'Schnell',
                en: 'Fast',
                es: 'Rápido',
                fr: 'Rapide',
                it: 'Veloce'
            },
            'Schnell': {
                de: 'Schnell',
                en: 'Fast',
                es: 'Rápido',
                fr: 'Rapide',
                it: 'Veloce'
            },
            'Very Fast': {
                de: 'Sehr schnell',
                en: 'Very Fast',
                es: 'Muy rápido',
                fr: 'Très rapide',
                it: 'Molto veloce'
            },
            'Sehr schnell': {
                de: 'Sehr schnell',
                en: 'Very Fast',
                es: 'Muy rápido',
                fr: 'Très rapide',
                it: 'Molto veloce'
            },
            'High': {
                de: 'Hoch',
                en: 'High',
                es: 'Alta',
                fr: 'Haute',
                it: 'Alta'
            }
        },
        health: {
            'Very Low': {
                de: 'Sehr niedrig',
                en: 'Very Low',
                es: 'Muy baja',
                fr: 'Très faible',
                it: 'Molto bassa'
            },
            'Low': {
                de: 'Niedrig',
                en: 'Low',
                es: 'Baja',
                fr: 'Faible',
                it: 'Bassa'
            },
            'Medium': {
                de: 'Mittel',
                en: 'Medium',
                es: 'Media',
                fr: 'Moyen',
                it: 'Media'
            },
            'High': {
                de: 'Hoch',
                en: 'High',
                es: 'Alta',
                fr: 'Élevée',
                it: 'Alta'
            },
            'Very High': {
                de: 'Sehr hoch',
                en: 'Very High',
                es: 'Muy alta',
                fr: 'Très élevée',
                it: 'Molto alta'
            }
        }
    };
    
    if (translations[statType] && translations[statType][value] && translations[statType][value][lang]) {
        return translations[statType][value][lang];
    }
    
    return value;
}
