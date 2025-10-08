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