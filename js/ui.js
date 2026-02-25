/* ============================================================
   ui.js – Language Selector Sliding Indicator
   Inject a pill that glides smoothly between lang-links
   ============================================================ */
(function () {
    'use strict';

    function initLangSlider() {
        const inner = document.querySelector('.language-selector-inner');
        if (!inner) return;

        const links = Array.from(inner.querySelectorAll('.lang-link'));
        const active = inner.querySelector('.lang-link.active') || links[0];

        /* Create the sliding pill element */
        const slider = document.createElement('span');
        slider.className = 'lang-slider';
        inner.prepend(slider);

        /* Position slider over a target link element */
        function moveSlider(el, withTransition) {
            slider.style.transition = withTransition
                ? 'left 0.38s cubic-bezier(0.4, 0, 0.2, 1), width 0.38s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none';
            slider.style.left  = el.offsetLeft  + 'px';
            slider.style.width = el.offsetWidth + 'px';
        }

        /* Set initial position without animation, then unlock transitions */
        if (active) {
            moveSlider(active, false);
            /* One frame later: enable transitions so the first hover animates */
            requestAnimationFrame(function () {
                slider.style.transition = '';
            });
        }

        /* Hover behaviour: slide to target, return to active on leave */
        links.forEach(function (link) {
            link.addEventListener('mouseenter', function () {
                moveSlider(link, true);
            });
            link.addEventListener('mouseleave', function () {
                if (active) moveSlider(active, true);
            });
        });

        /* Re-calculate on window resize (font/layout changes) */
        window.addEventListener('resize', function () {
            if (active) moveSlider(active, false);
        });
    }

    /* Run after DOM is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLangSlider);
    } else {
        initLangSlider();
    }
})();
