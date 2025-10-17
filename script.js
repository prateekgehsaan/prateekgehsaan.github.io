const darkModeBtn = document.getElementById('darkModeBtn');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Dark mode toggle
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});
