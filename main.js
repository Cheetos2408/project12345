// === Приветствие ===
function showGreeting(name) {
  const greeting = document.getElementById('greeting');
  if (greeting) {
    greeting.textContent = name ? `Привет, ${name}!` : 'Привет, гость!';
  }
}

function askName() {
  const name = prompt('Как тебя зовут?')?.trim();
  if (name) {
    localStorage.setItem('visitorName', name);
  } else {
    localStorage.removeItem('visitorName');
  }
  showGreeting(localStorage.getItem('visitorName'));
}

document.addEventListener('DOMContentLoaded', () => {
  const greetBtn = document.getElementById('btn');
  if (greetBtn) greetBtn.addEventListener('click', askName);
  showGreeting(localStorage.getItem('visitorName'));
});

// === Переключение темы ===
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const root = document.body;
  const STORAGE_KEY = 'theme';

  if (!toggleBtn) return;

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

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  applyTheme(savedTheme === 'light');

  toggleBtn.addEventListener('click', () => {
    const newIsLight = !root.classList.contains('light');
    applyTheme(newIsLight);
  });
});

// === Бургер-меню ===
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');

  if (!burger || !menu) return;

  // Клик по гамбургеру
  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });

  // Клик по ссылке — закрываем меню (на мобильных)
  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.matchMedia('(max-width: 768px)').matches) {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Закрытие по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
});

// === Кнопка "Наверх" ===
const scrollTopBtn = document.getElementById('scrollTopBtn');
const SHOW_AFTER = 300;

window.addEventListener('scroll', () => {
  if (window.scrollY > SHOW_AFTER) {
    scrollTopBtn?.classList.add('show');
  } else {
    scrollTopBtn?.classList.remove('show');
  }
});

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Плавная прокрутка к секциям ===
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

// === Прокрутка при открытии страницы с хэшем ===
window.addEventListener('load', () => {
  const { hash } = window.location;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }
});


// === Фильтр проектов в Portfolio ===
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterButtons.length || !portfolioItems.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.dataset.filter;

      // Активная кнопка
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      portfolioItems.forEach(item => {
        const isMatch = item.classList.contains(filterValue) || filterValue === 'all';

        if (isMatch) {
          item.style.display = 'block'; // 👈 возвращаем видимость
          setTimeout(() => item.classList.add('show'), 10);
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
          item.classList.remove('show');
          setTimeout(() => (item.style.display = 'none'), 300);
        }
      });
    });
  });
});
