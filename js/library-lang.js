// library-lang.js — Language-folder aware library init
// Overrides initializeLibrary from library.js

document.addEventListener('DOMContentLoaded', function() {
    // Patch image paths
    const base = window.IMAGE_BASE || '';
    if (base && typeof brawlers !== 'undefined') {
        brawlers.forEach(b => {
            if (!b.image.startsWith('http') && !b.image.startsWith('/') && !b.image.startsWith('../')) {
                b.image = base + b.image;
            }
        });
    }

    // Initialize filters
    document.getElementById('library-search').addEventListener('input', function() {
        renderBrawlers(filterBrawlers());
    });
    document.getElementById('rarity-filter').addEventListener('change', function() {
        renderBrawlers(filterBrawlers());
    });
    document.getElementById('role-filter').addEventListener('change', function() {
        renderBrawlers(filterBrawlers());
    });

    allBrawlers = [...brawlers];
    renderBrawlers(allBrawlers);
});
