document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('nav');
  const darkToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const darkIconClass = 'fa-moon';
  const lightIconClass = 'fa-sun';

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Dark mode toggle
  darkToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-mode');

    // Swap icon
    const icon = darkToggle.querySelector('i');
    if (isDark) {
      icon.classList.remove(darkIconClass);
      icon.classList.add(lightIconClass);
    } else {
      icon.classList.remove(lightIconClass);
      icon.classList.add(darkIconClass);
    }
  });
});
