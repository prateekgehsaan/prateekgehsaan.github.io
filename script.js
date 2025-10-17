// Dark Mode Toggle with smooth background transition
const darkModeBtn = document.getElementById('darkModeBtn');
const root = document.documentElement;
let darkMode = false;

darkModeBtn.addEventListener('click', () => {
    if (!darkMode) {
        root.style.setProperty('--primary-color', '#222');
        root.style.setProperty('--secondary-color', '#555');
        root.style.setProperty('--text-color', '#ddd');
        root.style.setProperty('--background', 'linear-gradient(135deg, #222 0%, #555 100%)');
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        darkMode = true;
        document.body.style.background = 'linear-gradient(135deg, #222 0%, #555 100%)';
    } else {
        root.style.setProperty('--primary-color', '#667eea');
        root.style.setProperty('--secondary-color', '#764ba2');
        root.style.setProperty('--text-color', '#333');
        root.style.setProperty('--background', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
        darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        darkMode = false;
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
});
