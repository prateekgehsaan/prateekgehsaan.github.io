document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const hamburgerIcon = hamburger.querySelector('i');
    const darkModeIcon = darkModeToggle.querySelector('i');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        if (isOpen) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times');
        } else {
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (isDarkMode) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            darkModeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            darkModeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    });
});
