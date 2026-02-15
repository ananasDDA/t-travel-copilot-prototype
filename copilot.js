// ===== AI Travel Copilot — Interactive Prototype =====

const messagesEl = document.getElementById('copilot-messages');
const suggestionsEl = document.getElementById('copilot-suggestions');
const inputEl = document.getElementById('copilot-input');

const botAvatarSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l1.09 3.36L16.45 6.5l-2.73 2.12.68 3.38L12 10.25 9.6 12l.68-3.38L7.55 6.5l3.36-1.14L12 2z" fill="#126DF7"/><path d="M19 12l.75 2.27L22 15l-2.25.73L19 18l-.75-2.27L16 15l2.25-.73L19 12z" fill="#126DF7" opacity=".6"/><path d="M6 14l.5 1.5L8 16l-1.5.5L6 18l-.5-1.5L4 16l1.5-.5L6 14z" fill="#126DF7" opacity=".4"/></svg>';
const userAvatarSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="#333"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';

function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;
  addUserMessage(text);
  inputEl.value = '';
  suggestionsEl.style.display = 'none';
  handleUserInput(text);
}
function sendSuggestion(text) {
  addUserMessage(text);
  suggestionsEl.style.display = 'none';
  handleUserInput(text);
}

function addUserMessage(text) {
  const div = document.createElement('div');
  div.className = 'msg msg--user';
  div.innerHTML = `<div class="msg__avatar">${userAvatarSvg}</div><div class="msg__bubble">${escapeHtml(text)}</div>`;
  messagesEl.appendChild(div);
  scrollToBottom();
}

function addBotMessage(html, delay = 800) {
  const typing = document.createElement('div');
  typing.className = 'msg msg--bot';
  typing.innerHTML = `<div class="msg__avatar">${botAvatarSvg}</div><div class="msg__bubble typing"></div>`;
  messagesEl.appendChild(typing);
  scrollToBottom();

  setTimeout(() => {
    typing.remove();
    const div = document.createElement('div');
    div.className = 'msg msg--bot';
    div.innerHTML = `<div class="msg__avatar">${botAvatarSvg}</div><div class="msg__bubble">${html}</div>`;
    messagesEl.appendChild(div);
    scrollToBottom();
  }, delay);
}

function scrollToBottom() {
  setTimeout(() => { messagesEl.scrollTop = messagesEl.scrollHeight; }, 50);
}

function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

function ts() {
  return new Date().toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'});
}

// ===== SCENARIO ROUTING =====
function handleUserInput(text) {
  const lower = text.toLowerCase();
  if (lower.includes('tiktok') || lower.includes('reels') || lower.includes('youtu') || lower.includes('видео') || lower.includes('ссылк')) {
    scenarioVideo(text);
  } else if (lower.includes('море') || lower.includes('куда') || lower.includes('бюджет') || lower.includes('поехать') || lower.includes('хочу')) {
    scenarioInspiration(text);
  } else if (lower.includes('выбрать') || lower.includes('сравн') || lower.includes('рейс') || lower.includes('какой лучше')) {
    scenarioCompare();
  } else if (lower.includes('чек-лист') || lower.includes('подготовить') || lower.includes('лечу') || lower.includes('через')) {
    scenarioChecklist();
  } else {
    scenarioDefault(text);
  }
}

// ===== SCENARIO 1: INSPIRATION =====
function scenarioInspiration(text) {
  addBotMessage(`
    Отличная идея! Уточню пару моментов:<br><br>
    &bull; Пляжный отдых или пляж + экскурсии?<br>
    &bull; Дети едут?<br>
    &bull; Визу готовы оформлять или только безвиз?
  `, 1000);
  setTimeout(() => {
    showQuickReplies([
      { text: 'Только пляж, без детей, безвиз', handler: () => showInspirationResults() },
      { text: 'Пляж + экскурсии, с ребёнком', handler: () => showInspirationResultsFamily() },
    ]);
  }, 2000);
}

function showInspirationResults() {
  addUserMessage('Только пляж, без детей, безвиз');
  addBotMessage(`
    Подобрал 3 варианта на май, бюджет ~80 000 руб. на двоих:
    <div class="result-card">
      <div class="result-card__header">
        <span class="result-card__dest">Анталия, Турция</span>
        <span class="result-card__price">38 200 ₽/чел</span>
      </div>
      <div class="result-card__details">Прямой рейс 3.5ч &middot; All inclusive &middot; Безвиз</div>
      <div class="result-card__actions">
        <button class="result-card__btn result-card__btn--primary" onclick="addBotMessage('Открываю страницу бронирования Анталии.')">Забронировать</button>
        <button class="result-card__btn result-card__btn--secondary">Подробнее</button>
      </div>
    </div>
    <div class="result-card">
      <div class="result-card__header">
        <span class="result-card__dest">Сочи, Россия</span>
        <span class="result-card__price">22 100 ₽/чел</span>
      </div>
      <div class="result-card__details">Прямой рейс 2.5ч &middot; Отель 4* &middot; Без загранпаспорта</div>
      <div class="result-card__actions">
        <button class="result-card__btn result-card__btn--primary" onclick="addBotMessage('Открываю страницу бронирования Сочи.')">Забронировать</button>
        <button class="result-card__btn result-card__btn--secondary">Подробнее</button>
      </div>
    </div>
    <div class="result-card">
      <div class="result-card__header">
        <span class="result-card__dest">Фукуок, Вьетнам</span>
        <span class="result-card__price">41 500 ₽/чел</span>
      </div>
      <div class="result-card__details">1 пересадка 9ч &middot; Отель 4* у моря &middot; Безвиз до 15 дн</div>
      <div class="result-card__actions">
        <button class="result-card__btn result-card__btn--primary" onclick="addBotMessage('Открываю страницу бронирования Фукуока.')">Забронировать</button>
        <button class="result-card__btn result-card__btn--secondary">Подробнее</button>
      </div>
    </div>
    <div class="price-disclaimer">Цены актуальны на ${ts()}. Могут измениться при бронировании.</div>
  `, 1500);

  setTimeout(() => {
    addBotMessage(`
      <strong>Совет:</strong> при оплате картой Т-Банк Pro — кэшбэк 5% вернётся на счёт.<br>
      Для Турции и Вьетнама рекомендую оформить страховку ВЗР — <a href="#" style="color:#1a73e8">оформить</a>.
    `, 3000);
  }, 2000);
}

function showInspirationResultsFamily() {
  addUserMessage('Пляж + экскурсии, с ребёнком');
  addBotMessage(`
    Для семьи с ребёнком подобрал варианты с удобным перелётом и kids-friendly отелями:
    <div class="result-card">
      <div class="result-card__header">
        <span class="result-card__dest">Белек, Турция</span>
        <span class="result-card__price">52 000 ₽/чел</span>
      </div>
      <div class="result-card__details">Прямой 3.5ч &middot; All inclusive &middot; Kids club &middot; Аквапарк</div>
      <div class="result-card__actions">
        <button class="result-card__btn result-card__btn--primary">Забронировать</button>
        <button class="result-card__btn result-card__btn--secondary">Подробнее</button>
      </div>
    </div>
    <div class="result-card">
      <div class="result-card__header">
        <span class="result-card__dest">Адлер, Россия</span>
        <span class="result-card__price">18 500 ₽/чел</span>
      </div>
      <div class="result-card__details">Прямой 2.5ч &middot; Отель 4* с детской площадкой &middot; Олимп. парк</div>
      <div class="result-card__actions">
        <button class="result-card__btn result-card__btn--primary">Забронировать</button>
        <button class="result-card__btn result-card__btn--secondary">Подробнее</button>
      </div>
    </div>
    <div class="price-disclaimer">Цены актуальны на ${ts()}. Могут измениться при бронировании.</div>
  `, 1500);
}

// ===== SCENARIO 2: VIDEO =====
function scenarioVideo(text) {
  addBotMessage('Анализирую ссылку. Распознаю содержимое и проверяю информацию...', 800);

  setTimeout(() => {
    addBotMessage(`
      Результат анализа:<br><br>
      <strong>Бали, Индонезия — район Убуд</strong><br>
      Рисовые террасы Тегаллаланг, джунгли, храм Тирта Эмпул.<br><br>
      Место <strong>подтверждено</strong> — реальная достопримечательность, координаты совпадают с базой Т-Путешествий.<br><br>
      Хотите спланировать поездку на Бали?
    `, 2500);
  }, 1200);

  setTimeout(() => {
    showQuickReplies([
      { text: 'На двоих, март, 7 дней', handler: () => showBaliResults() },
      { text: 'Просто посмотреть цены', handler: () => showBaliPrices() },
    ]);
  }, 4500);
}

function showBaliResults() {
  addUserMessage('На двоих, март, 7 дней');
  addBotMessage(`
    План поездки на Бали, 1–8 марта, 2 человека:
    <div class="result-card">
      <div class="result-card__header">
        <span class="result-card__dest">Москва → Бали</span>
        <span class="result-card__price">42 300 ₽/чел</span>
      </div>
      <div class="result-card__details">1 пересадка (Доха) &middot; 14ч &middot; Qatar Airways &middot; Багаж 23кг</div>
    </div>
    <div class="result-card">
      <div class="result-card__header">
        <span class="result-card__dest">Ubud Valley Resort 4*</span>
        <span class="result-card__price">4 200 ₽/ночь</span>
      </div>
      <div class="result-card__details">Вид на террасы &middot; Бассейн &middot; 7 ночей = 29 400 ₽</div>
    </div>
    <div style="margin-top:8px;padding:10px;background:#f8f9fa;border-radius:10px;font-size:13px;border:1px solid #eee;">
      <strong>Итого ~114 000 ₽</strong> на двоих (перелёт + отель)<br>
      Кэшбэк с картой Pro: ~5 700 ₽ вернётся
    </div>
    <div class="price-disclaimer">Цены из API Т-Путешествий на ${ts()}.</div>
  `, 1500);

  setTimeout(() => {
    addBotMessage(`
      Для Индонезии рекомендую:<br>
      &bull; Страховка ВЗР 50 000$ — <a href="#" style="color:#1a73e8">оформить</a><br>
      &bull; eSIM 10ГБ — <a href="#" style="color:#1a73e8">подключить</a><br>
      &bull; Индонезийские рупии — <a href="#" style="color:#1a73e8">купить валюту</a>
    `, 3500);
  }, 2000);
}

function showBaliPrices() {
  addUserMessage('Просто посмотреть цены');
  addBotMessage(`
    Перелёт Москва → Бали в марте: от <strong>38 000 ₽/чел</strong> (1 пересадка).<br>
    Отели в Убуде: от <strong>2 800 ₽/ночь</strong> (3*) до <strong>12 000 ₽/ночь</strong> (5* вилла).<br><br>
    Хотите подобрать конкретные варианты?
    <div class="price-disclaimer">Цены из API на ${ts()}.</div>
  `, 1200);
}

// ===== SCENARIO 3: COMPARE =====
function scenarioCompare() {
  addBotMessage(`
    Сравниваю рейсы Москва → Стамбул:
    <div class="result-card">
      <div class="result-card__header">
        <span class="result-card__dest">1. Turkish Airlines</span>
        <span class="result-card__price">12 400 ₽</span>
      </div>
      <div class="result-card__details">09:15–12:45 &middot; Прямой &middot; 3ч30 &middot; Багаж 23кг &middot; Бесплатная отмена до 10.05</div>
    </div>
    <div class="result-card">
      <div class="result-card__header">
        <span class="result-card__dest">2. Pegasus</span>
        <span class="result-card__price">9 800 ₽</span>
      </div>
      <div class="result-card__details">06:00–13:20 &middot; 1 пересадка &middot; 7ч20 &middot; Без багажа &middot; Невозвратный</div>
    </div>
    <div class="result-card">
      <div class="result-card__header">
        <span class="result-card__dest">3. Аэрофлот</span>
        <span class="result-card__price">14 100 ₽</span>
      </div>
      <div class="result-card__details">14:30–17:50 &middot; Прямой &middot; 3ч20 &middot; Багаж 23кг &middot; Возврат 50% до 12.05</div>
    </div>
  `, 1200);

  setTimeout(() => {
    addBotMessage(`
      <strong>Анализ:</strong><br><br>
      <strong>Комфорт</strong> — Turkish (#1): прямой, с багажом, бесплатная отмена. +2 600 ₽ к бюджетному, но без рисков.<br><br>
      <strong>Цена</strong> — Pegasus (#2): дешевле всех, но пересадка 4ч, багаж отдельно (+3 000 ₽), невозвратный.<br><br>
      <strong>Баланс</strong> — Аэрофлот (#3): прямой, удобное время, дороже, возврат 50%.<br><br>
      <span style="color:#999;font-size:12px;">Все цены и условия из системы Т-Путешествий.</span>
    `, 2500);
  }, 1800);
}

// ===== SCENARIO 4: CHECKLIST =====
function scenarioChecklist() {
  addBotMessage(`
    Таиланд через 2 недели. Персональный чек-лист:
    <div class="checklist">
      <div class="checklist__item checklist__item--done">&#10003; Загранпаспорт — срок действия ОК</div>
      <div class="checklist__item checklist__item--done">&#10003; Авиабилет — Москва → Бангкок, 1 марта</div>
      <div class="checklist__item checklist__item--done">&#10003; Отель — Phuket Marriott, 7 ночей</div>
      <div class="checklist__item checklist__item--todo">&#9744; Страховка ВЗР <span class="checklist__link" onclick="addBotMessage('Открываю Т-Страхование. Полис ВЗР от 1 200 ₽ для Таиланда.')">Оформить →</span></div>
      <div class="checklist__item checklist__item--todo">&#9744; Тайские баты <span class="checklist__link" onclick="addBotMessage('Курс бата: 2.58 ₽. Купить 10 000 бат = 25 800 ₽?')">Купить →</span></div>
      <div class="checklist__item checklist__item--todo">&#9744; eSIM Таиланд <span class="checklist__link" onclick="addBotMessage('eSIM 10ГБ для Таиланда — 890 ₽ через Т-Мобайл.')">Подключить →</span></div>
      <div class="checklist__item checklist__item--todo">&#9744; Адаптер розеток <span class="checklist__link" onclick="addBotMessage('Адаптер типа A/B для Таиланда — от 350 ₽. Доставка до 27.02.')">Заказать →</span></div>
    </div>
  `, 1200);

  setTimeout(() => {
    addBotMessage(`
      <strong>В дорогу:</strong> фильм «Пляж» (2000) и сериал «White Lotus» S1 — скачать в <a href="#" style="color:#1a73e8">Т-Плюс</a>.<br><br>
      За 24ч до вылета пришлю напоминание и предложу заказать такси в аэропорт.
    `, 3000);
  }, 2000);
}

// ===== DEFAULT =====
function scenarioDefault(text) {
  addBotMessage(`
    Подскажите подробнее:<br><br>
    &bull; Куда хотите поехать?<br>
    &bull; На какие даты?<br>
    &bull; Сколько человек?<br><br>
    Или вставьте ссылку на видео — разберусь и предложу план.
  `, 800);
}

// ===== QUICK REPLIES =====
function showQuickReplies(options) {
  const container = document.createElement('div');
  container.className = 'copilot-inline__suggestions';
  container.style.padding = '0 20px 8px';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'suggestion-chip';
    btn.textContent = opt.text;
    btn.onclick = () => { container.remove(); opt.handler(); };
    container.appendChild(btn);
  });
  messagesEl.appendChild(container);
  scrollToBottom();
}
