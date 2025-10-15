// Показываем приветствие
function showGreeting(name) {
  const greeting = document.getElementById('greeting');
  greeting.textContent = name ? 'Привет, ' + name + '!' : 'Привет, гость!';
}

// Спрашиваем имя
function askName() {
  const name = prompt('Как тебя зовут?')?.trim();
  if (name) localStorage.setItem('visitorName', name);
  else localStorage.removeItem('visitorName');
  showGreeting(localStorage.getItem('visitorName'));
}

// Кнопка для запроса имени
document.getElementById('btn').addEventListener('click', askName);

// Если имя уже есть — показываем сразу
showGreeting(localStorage.getItem('visitorName'));

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const root = document.body;
  const STORAGE_KEY = 'theme';

  function applyTheme(isLight) {
    if (isLight) {
      root.classList.add('light');
      toggleBtn.textContent = '🌙 Тёмная тема';
      localStorage.setItem(STORAGE_KEY, 'light');
    } else {
      root.classList.remove('light');
      toggleBtn.textContent = '☀️ Светлая тема';
      localStorage.setItem(STORAGE_KEY, 'dark');
    }
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  const isLight = saved === 'light';
  applyTheme(isLight);

  toggleBtn.addEventListener('click', () => {
    const newIsLight = !root.classList.contains('light');
    applyTheme(newIsLight);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  // Клик по гамбургеру
  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Закрытие при клике на ссылку
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  // Закрытие при нажатии Esc
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });
});


// Кнопка «Наверх»
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Порог появления (в пикселях)
const SHOW_AFTER = 300;

// Следим за прокруткой и показываем/скрываем кнопку
window.addEventListener('scroll', () => {
  if (window.scrollY > SHOW_AFTER) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

// Плавно прокручиваем к началу страницы
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Плавная прокрутка без подсветки активного пункта
document.querySelectorAll('a.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', id);
  });
});

// При открытии страницы с хэшем (#about) — плавно скроллим к секции
window.addEventListener('load', () => {
  const { hash } = window.location;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});