import { DateTime } from 'luxon';
import { DIARY_DATA } from './diary_data.js';

// --- SVGs for Icons ---
const ICONS = {
    timer: `<svg class="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    diary: `<svg class="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    meetings: `<svg class="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    step10: `<svg class="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
    calendar: `<svg style="width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    pencil: `<svg style="width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`,
    trash: `<svg style="width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
    check: `<svg style="width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:22px;height:22px;"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    chevronLeft: `<svg style="width:24px; height:24px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
    chevronRight: `<svg style="width:24px; height:24px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    switch: `<svg style="width:22px; height:22px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17H4M4 17L8 21M4 17L8 13M4 7H20M20 7L16 3M20 7L16 11"/></svg>`,
    steps: `<svg class="nav-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 14h16M4 21h16"/></svg>`,
    plus: `<svg style="width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    draft: `<svg style="width:22px; height:22px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    info: `<svg style="width:20px; height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    download: `<svg style="width:22px; height:22px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`
};

// --- Configuration ---
const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;

// --- State ---
const state = {
    currentTab: 'timer',
    cleanDate: localStorage.getItem('clean_date') || '2024-01-01',
    diaryDate: DateTime.now(),
    meetingType: 'na', // 'na' or 'work'
    isStep10EditMode: false,
    isStepsEditMode: false,
    stepsActive: { step: null, section: null }, // Navigation state for Steps tab
    stepsData: JSON.parse(localStorage.getItem('steps_data')) || {}, // { stepNum: { sections: [{ title: string, questions: [] }] } }
    stepsAnswers: JSON.parse(localStorage.getItem('steps_answers')) || {}, // { stepNum: { sectionIdx: { qIdx: string } } }
    stepsDraft: localStorage.getItem('steps_draft') || '',
    step10Questions: JSON.parse(localStorage.getItem('step10_questions')) || [
        "В чому я був сьогодні неправий, що мені варто засвоїти на майбутнє або як вчинити по-іншому? (одержимості, прояви дефектів характеру, завдання шкоди собі та іншим людям)",
        "Чи не було в моєму житті сьогодні: Образ за минуле? Гніву на теперішнє? Страху майбутнього?",
        "Как я был корисний сьогодні Богу та іншим людям?",
        "Чи був я сьогодні щасливий? Коли?",
        "Кому і за що я вдячний?",
        "Яких успіхів я досяг сьогодні, за що можу себе похвалити?",
        "Які звички я хотів би в собі викорінити або виробити?"
    ],
    step10Answers: JSON.parse(localStorage.getItem('step10_answers') || '{}'),
    meetings: [
        { group: "Баракуда", address: "вул. Лариси Руденко, 3", info: "Приміщення клініки, кабiнет 008 (сходи вниз, зліва від ресепшена)", schedule: { "1": "20:00", "6": "16:00" } },
        { group: "На Позняках", address: "Харківське шосе 57", info: "Приміщення соц. служби на другому поверсі.", schedule: { "0": "19:00", "1": "19:00", "2": "19:00", "3": "19:00", "4": "19:00", "5": "13:00, 19:00", "6": "19:00" } },
        { group: "Вінтаж", address: "Івана Миколайчука, 11", info: "Другий поверх", schedule: { "3": "19:00", "4": "19:00", "5": "19:00" } },
        { group: "Вишня", address: "м. Вишневе, вул. Святошинська 42", info: "вхід від проїзджої частини, двері з написом 'Коло сили'", schedule: { "6": "18:00" } },
        { group: "Тiльки Сьогоднi", address: "https://t.me/+rAqy7n9GjfQ3MjYy", info: "Telegram", schedule: { "0": "08:00, 17:00, 21:00", "1": "08:00, 17:00, 21:00", "2": "08:00, 17:00, 21:00", "3": "08:00, 17:00, 21:00", "4": "08:00, 17:00, 21:00", "5": "08:00, 17:00, 21:00, 1:00", "6": "08:00, 17:00, 21:00, 1:00" } },
        { group: "На часі", address: "вул. Межигірська 22", info: "вхід у дворі, под’їзд з цифрою п’ять\n\nЯкщо домофон не працює, зателефонуйте за номером:  380984170324, пошта: nachasi.nagroup.kyivbased@gmail.com\n\nКарта проїзду: https://youtube.com/shorts/Q7RRhGDwpTw?feature=share", schedule: { "0": "13:00", "1": "13:00", "2": "13:00", "3": "13:00", "4": "13:00, 19:00", "5": "13:00", "6": "13:00" } },
        { group: "Мayday", address: "вул.Круглоуніверситетська, 7", info: "р-н Бессарабської пл. м.Хрещатик (напівпідвальне приміщення на розі)\n\nПо суботах зібрання є відкритими, можуть приходити незалежні гості.", schedule: { "0": "19:00", "1": "19:00", "2": "19:00", "3": "19:00", "4": "19:00", "5": "19:00", "6": "19:00" } },
        { group: "Мayday online", address: "https://t.me/maydayonline", info: "Telegram", schedule: { "0": "8:00, 12:00, 21:00", "1": "8:00, 12:00, 21:00", "2": "8:00, 12:00, 21:00", "3": "8:00, 12:00, 21:00", "4": "8:00, 12:00, 21:00, 23:00", "5": "8:00, 12:00, 21:00, 23:00", "6": "8:00, 12:00, 21:00, 23:00" } },
        { group: "NA Троєщині", address: "вул. Сержа Лифаря, 20", info: "(Сабурова), приміщення жека 313", schedule: { "0": "19:00", "1": "19:00", "2": "19:00", "3": "19:00", "4": "19:00", "5": "19:00", "6": "19:00" } },
        { group: "Парус", address: "вул. Довженка, 2", info: "М. Шулявська (у підвалі)\n\nКонтактний телефон: 066 16 65 149\n\nКарта проїзду: https://youtu.be/RR4sWOMn-AM", schedule: { "0": "19:00", "1": "19:00", "3": "19:00", "4": "19:00", "5": "19:00", "6": "19:00" } },
        { group: "Сталь", address: "вул. Маричанська 5", info: "Карта проїзду: https://youtu.be/KSnhnQy936M", schedule: { "1": "19:00", "3": "19:00", "5": "17:00" } },
        { group: "Буч-АН-ка", address: "м. Буча. вул. Жовтнева 66", info: "ТРЦ Буча - Пассаж 3 поверх. Кімната 136А", schedule: { "0": "19:30", "2": "19:30", "4": "19:30" } },
        { group: "Нам не все одно", address: "пр. Гонгадзе 20", info: "за Екомаркет маленька будівля з ветклінікою на розі", schedule: { "0": "19:00", "1": "19:00", "2": "19:00", "3": "19:00", "4": "19:00", "5": "19:00", "6": "19:00" } },
        { group: "Воскрєсєнка", address: "вулиця Микільсько-Слобідська, 5", info: "Для уточнення інформації про зібрання групи звертайтеся до представників групи, телефон для зв'язку: 067 325 11 77", schedule: { "2": "17:30", "4": "17:30" } },
        { group: "Солом'янка", address: "вул. Максима Кривоноса 21", info: "", schedule: { "0": "19:00", "4": "19:00", "6": "17:00" } },
        { group: "В Броварах", address: "м. Бровари, вулиця Героїв України 26", info: "4 поверх, приміщення ліворуч (каб.401)\n\nТелефон для довідок: 0636239058", schedule: { "0": "19:00", "1": "19:00", "2": "19:00", "3": "19:00", "4": "19:00", "5": "13:00", "6": "13:00" } },
        { group: "Боярка", address: "м. Боярка, вул. Ярослава Мудрого, 62", info: "(Дежнєва), приміщення соціальної служби (сіра будівля), Номер для зв'язку 380992851660", schedule: { "5": "16:00" } },
        { group: "Вишгород", address: "м.Вишгород, проспект Шевченка 6", info: "Контактний телефон: 067-219-40-61 Олександр", schedule: { "0": "19:00" } },
        { group: "ВУАН (Ветерани України Анонімні Наркомани)", address: "Вул. Рогнидинська, 3", info: "кім.4, код 236\n\nКонтактний телефон: 096-788-64-90 Евгеній", schedule: { "5": "13:00" } }
    ],
    workMeetings: [
        { group: "ПЗГ", address: "Zoom / Онлайн", info: "даних поки немає", schedule: { "0": "19:00", "1": "19:00", "2": "19:00", "3": "19:00", "4": "19:00", "5": "19:00", "6": "19:00" } },
        { group: "БУ", address: "вул. Межигірська 22", info: "Будинок Управління", schedule: { "0": "19:00", "1": "19:00", "2": "19:00", "3": "19:00", "4": "19:00", "5": "19:00", "6": "19:00" } },
        { group: "МКО", address: "Zoom", info: "Місцевий Комітет Обслуговування", schedule: { "0": "19:00", "1": "19:00", "2": "19:00", "3": "19:00", "4": "19:00", "5": "19:00", "6": "19:00" } },
        { group: "РКО", address: "вул. Довженка, 2", info: "Регіональний Комітет Обслуговування", schedule: { "0": "19:00", "1": "19:00", "2": "19:00", "3": "19:00", "4": "19:00", "5": "19:00", "6": "19:00" } }
    ]
};

// --- DOM References ---
const main = document.getElementById('main-content');
const modalOverlay = document.getElementById('modal-container');
const modalBody = document.getElementById('modal-body');
const navItems = document.querySelectorAll('.nav-item');

// --- Initialization ---
function init() {
    renderTab(state.currentTab);

    navItems.forEach(item => {
        const tab = item.dataset.tab;
        const iconContainer = item.querySelector('.nav-icon');
        if (iconContainer) iconContainer.innerHTML = ICONS[tab];

        item.addEventListener('click', () => {
            if (tab === state.currentTab) return;
            navItems.forEach(ni => ni.classList.remove('active'));
            item.classList.add('active');
            state.currentTab = tab;
            state.isStep10EditMode = false;
            state.isStepsEditMode = false;
            renderTab(tab);
        });
    });

    document.querySelector('.close-modal-btn').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
}

function openSettingsModal() {
    const dStr = DateTime.fromISO(state.cleanDate).setLocale('uk').toLocaleString({ day: 'numeric', month: 'long', year: 'numeric' });
    openModal(`
        <h3 class="mb-2" style="color: var(--primary-color);">Дата початку чистоти</h3>
        <p class="mb-4" style="font-size: 0.9rem; color: var(--text-secondary);">${dStr}</p>
        <input type="date" id="new-dt" class="modal-input mb-4" value="${state.cleanDate}" style="width: 100%; border: 2px solid var(--border-color); border-radius: 14px; padding: 14px; font-size: 1rem; margin-bottom: 20px;">
        <button class="btn-primary" id="save-new-dt">Зберегти дату</button>
    `);
    document.getElementById('save-new-dt').addEventListener('click', () => {
        const val = document.getElementById('new-dt').value;
        if (val) {
            state.cleanDate = val;
            localStorage.setItem('clean_date', val);
            closeModal();
            if (state.currentTab === 'timer') renderTab('timer');
        }
    });
}

// --- Tab Rendering ---
function renderTab(tab) {
    main.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'tab-content';
    switch (tab) {
        case 'timer': renderTimer(container); break;
        case 'diary': renderDiary(container); break;
        case 'meetings': renderMeetings(main); break;
        case 'steps': renderSteps(main); break;
        case 'step10': renderStep10(main); break;
    }
    main.style.overflow = 'auto';
    main.style.paddingBottom = '120px';
    main.appendChild(container);

    // Initial check for autogrow textareas
    container.querySelectorAll('textarea').forEach(autoGrow);
}

// Helper for autogrow
function autoGrow(element) {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
}

// 1. Timer
function renderTimer(container) {
    const start = DateTime.fromISO(state.cleanDate);
    const now = DateTime.now();
    const diffDays = Math.floor(now.diff(start, 'days').days);
    const detailed = now.diff(start, ['years', 'months', 'days']).toObject();

    const y = Math.floor(detailed.years);
    const m = Math.floor(detailed.months);
    const d = Math.floor(detailed.days);

    container.innerHTML = `
        <div class="timer-hero">
            <header class="timer-strip">
                <h2 class="timer-strip-text">Твій термін чистого часу</h2>
                <button class="timer-strip-btn" id="timer-settings">
                    ${ICONS.settings}
                </button>
            </header>
            
            <div class="timer-ring-container">
                <div class="timer-dots"></div>
                <div class="timer-ring">
                    <div class="timer-ring-inner">
                        <span class="days-main">${diffDays}</span>
                        <span class="days-label">${pluralize(diffDays, ['день', 'дні', 'днів'])}</span>
                    </div>
                </div>
            </div>

            <div class="breakdown-grid">
                <div class="breakdown-item">
                    <span class="breakdown-val">${y}</span>
                    <span class="breakdown-lbl">${pluralize(y, ['рік', 'роки', 'років'])}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-val">${m}</span>
                    <span class="breakdown-lbl">${pluralize(m, ['місяць', 'місяці', 'місяців'])}</span>
                </div>
                <div class="breakdown-item">
                    <span class="breakdown-val">${d}</span>
                    <span class="breakdown-lbl">${pluralize(d, ['день', 'дні', 'днів'])}</span>
                </div>
            </div>
        </div>
    `;

    container.querySelector('#timer-settings').addEventListener('click', openSettingsModal);
}

// 2. Diary
function renderDiary(container) {
    const isToday = state.diaryDate.hasSame(DateTime.now(), 'day');
    const dStr = state.diaryDate.setLocale('uk').toLocaleString({ day: 'numeric', month: 'long' });
    const key = `${state.diaryDate.month}-${state.diaryDate.day}`;
    const data = DIARY_DATA[key];

    let contentHtml = '';
    if (data) {
        contentHtml = `
            <div class="diary-content-card">
                <h2 class="diary-title">${data.title}</h2>
                <div class="diary-quote-box">
                    <p class="diary-quote">${data.quote}</p>
                    <p class="diary-ref">${data.ref}</p>
                </div>
                <div class="diary-paragraphs">
                    ${data.paragraphs.map(p => `<p class="diary-p">${p}</p>`).join('')}
                </div>
                <div class="diary-footer">
                    <h3 class="jft-title">Лише сьогодні:</h3>
                    <p class="jft-text">${data.justForToday}</p>
                </div>
            </div>
        `;
    } else {
        contentHtml = `
            <div class="card" style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 3rem; margin-bottom: 20px;">📖</div>
                <h3 class="mb-2">Даних для цієї дати поки немає</h3>
                <p style="opacity: 0.7;">Ми працюємо над додаванням всіх текстів з перекладу.</p>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="diary-nav-bar">
            <button class="date-btn" id="prev-d">${ICONS.chevronLeft}</button>
            <div class="current-date-display" id="pick-d-dt">
                <span>${dStr}</span> ${ICONS.calendar}
            </div>
            <button class="date-btn" id="next-d" style="transform: rotate(180deg);">${ICONS.chevronLeft}</button>
        </div>
        
        ${!isToday ? `<button class="btn-secondary" id="go-today" style="width:100%; margin-bottom: 20px; border-radius: 12px; height: 44px; font-weight: 600;">Сьогодні</button>` : ''}

        <div id="diary-container-inner" class="fade-in">
            ${contentHtml}
        </div>
    `;

    container.querySelector('#prev-d').addEventListener('click', () => { 
        state.diaryDate = state.diaryDate.minus({ days: 1 }); 
        renderDiary(container); 
    });
    container.querySelector('#next-d').addEventListener('click', () => { 
        state.diaryDate = state.diaryDate.plus({ days: 1 }); 
        renderDiary(container); 
    });
    container.querySelector('#pick-d-dt').addEventListener('click', () => {
        openModal(`
            <h3 class="mb-4">Оберіть дату</h3>
            <div class="modal-body-content">
                <input type="date" id="sel-dt" class="modal-input mb-4" value="${state.diaryDate.toISODate()}" 
                    style="width:100%; border:2px solid var(--border-color); border-radius:14px; padding:14px; margin-bottom:20px;">
                <button class="btn-primary" id="set-dt" style="width:100%;">Перейти</button>
            </div>
        `);
        document.getElementById('set-dt').addEventListener('click', () => { 
            state.diaryDate = DateTime.fromISO(document.getElementById('sel-dt').value); 
            closeModal(); 
            renderDiary(container); 
        });
    });
    if (!isToday) {
        container.querySelector('#go-today').addEventListener('click', () => { 
            state.diaryDate = DateTime.now(); 
            renderDiary(container); 
        });
    }
}

// 3. Meetings
function renderMeetings(container) {
    const luxonDay = DateTime.now().setZone('Europe/Kyiv').weekday - 1;
    const isWork = state.meetingType === 'work';
    const meetingsSource = isWork ? state.workMeetings : state.meetings;
    const meetingsToday = meetingsSource.filter(m => m.schedule[String(luxonDay)]);

    container.innerHTML = `
        <div class="meeting-header-row">
            <h2 class="meeting-type-title">📍 Зібрання ${isWork ? 'робочі' : 'АН'} на сьогодні</h2>
            <button class="switcher-btn" id="meeting-type-btn">${ICONS.switch}</button>
        </div>
        <div id="m-list"></div>
    `;

    const list = container.querySelector('#m-list');
    container.querySelector('#meeting-type-btn').addEventListener('click', () => {
        state.meetingType = state.meetingType === 'na' ? 'work' : 'na';
        renderMeetings(container);
    });

    if (meetingsToday.length === 0) {
        list.innerHTML = `<div class="card text-center">Сьогодні зібрань не знайдено.</div>`;
    } else {
        meetingsToday.forEach(m => {
            const isOnline = m.address.startsWith('http') || m.address.toLowerCase().includes('zoom') || m.address.toLowerCase().includes('онлайн');
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-title-row">
                    <span class="card-title">${m.group}</span>
                    <span class="meeting-time-pill">${m.schedule[String(luxonDay)]}</span>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 12px;">
                    <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.4; flex: 1;">${m.address}</p>
                    ${m.info ? `<button class="meeting-info-btn" style="background: none; border: none; padding: 0; color: var(--primary-color); cursor: pointer; opacity: 0.8;">${ICONS.info}</button>` : ''}
                </div>
                ${isOnline ?
                    `<a href="${m.address.startsWith('http') ? m.address : '#'}" target="_blank" style="color: var(--accent-color); font-weight: 800; text-decoration: none; display: flex; align-items: center; gap: 4px; font-size: 0.9rem;">Приєднатися →</a>` :
                    `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.address)}" target="_blank" style="color: var(--accent-color); font-weight: 800; text-decoration: none; display: flex; align-items: center; gap: 4px; font-size: 0.9rem;">Карта →</a>`
                }
            `;

            if (m.info) {
                card.querySelector('.meeting-info-btn').addEventListener('click', () => {
                    const infoText = m.info.trim() || "даних поки немає";
                    openModal(`
                        <h3 class="mb-4" style="color: var(--primary-color);">Інфо</h3>
                        <p style="font-size: 1rem; line-height: 1.6; white-space: pre-wrap; color: var(--text-primary);">${infoText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>')}</p>
                    `);
                });
            }

            list.appendChild(card);
        });
    }
}

// 4. Steps (Кроки)
function renderSteps(container) {
    const { step, section } = state.stepsActive;

    if (step === null) {
        // --- 1. Main View (1-12 Steps List + Draft Icon) ---
        container.innerHTML = `
            <div class="steps-header-main">
                <h2 style="margin: 0;">👣 Кроки</h2>
                <div style="display: flex; gap: 8px;">
                    <button class="draft-icon-btn" id="open-draft-btn" title="Чернетка">${ICONS.draft}</button>
                    <button class="draft-icon-btn" id="share-steps-btn" title="Вивантажити в бот">${ICONS.download}</button>
                </div>
            </div>

            <div id="steps-list">
                ${Array.from({ length: 12 }, (_, i) => i + 1).map(num => `
                    <div class="step-item" data-step="${num}">
                        <div style="display: flex; align-items: center;">
                            <div class="step-number">${num}</div>
                            <span style="font-weight: 700;">Крок ${num}</span>
                        </div>
                        <span style="opacity: 0.5;">${ICONS.chevronRight}</span>
                    </div>
                `).join('')}
            </div>
        `;

        container.querySelector('#open-draft-btn').addEventListener('click', () => {
            openModal(`
                <h3 class="mb-4" style="color: var(--primary-color);">📝 Чернетка</h3>
                <div class="modal-textarea-container">
                    <textarea id="modal-draft-area" class="modal-input" style="width: 100%; border: 2px solid var(--border-color); border-radius: 14px; padding: 14px; font-size: 1rem;">${state.stepsDraft}</textarea>
                </div>
                <button class="btn-primary" id="save-draft-btn">Зберегти чернетку</button>
            `, true);

            const area = document.getElementById('modal-draft-area');
            document.getElementById('save-draft-btn').addEventListener('click', () => {
                state.stepsDraft = area.value;
                localStorage.setItem('steps_draft', area.value);
                closeModal();
                renderSteps(container);
            });
        });

        // Share button logic
        container.querySelector('#share-steps-btn').addEventListener('click', async () => {
            const btn = container.querySelector('#share-steps-btn');
            const originalHTML = btn.innerHTML;

            try {
                btn.innerHTML = `<span style="font-size: 0.8rem;">...</span>`;
                btn.disabled = true;

                let text = "👣 *МОЇ КРОКИ*\n\n";

                if (state.stepsDraft) {
                    text += "📝 *Чернетка:*\n" + state.stepsDraft + "\n\n";
                }

                let hasData = false;
                for (let num = 1; num <= 12; num++) {
                    const stepData = state.stepsData[num];
                    const stepAns = state.stepsAnswers[num];
                    if (!stepAns) continue;

                    let stepText = `━━━━━━ *КРОК ${num}* ━━━━━━\n`;
                    let stepHasAns = false;

                    stepData.sections.forEach((sec, sIdx) => {
                        const secAns = stepAns[sIdx];
                        if (!secAns) return;

                        let secHasAns = false;
                        let secText = `\n📍 *${sec.title}*\n`;

                        sec.questions.forEach((q, qIdx) => {
                            if (secAns[qIdx]) {
                                secText += `\n${q}\n- ${secAns[qIdx]}\n`;
                                secHasAns = true;
                                stepHasAns = true;
                                hasData = true;
                            }
                        });

                        if (secHasAns) stepText += secText;
                    });

                    if (stepHasAns) text += stepText + "\n";
                }

                if (!hasData && !state.stepsDraft) {
                    alert("У вас ще немає відповідей для відправки.");
                    return;
                }

                const tg = window.Telegram?.WebApp;
                const userId = tg?.initDataUnsafe?.user?.id;

                if (!userId) {
                    alert("Помилка: Не вдалося отримати ID користувача. Запустіть додаток у Telegram.");
                    return;
                }

                const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: userId,
                        text: text,
                        parse_mode: 'Markdown'
                    })
                });

                if (response.ok) {
                    alert("Всі відповіді надіслано вам у чат з ботом!");
                } else {
                    const err = await response.json();
                    alert("Помилка при відправці: " + (err.description || "невідома помилка"));
                }

            } catch (e) {
                console.error(e);
                alert("Помилка мережі або системи.");
            } finally {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }
        });

        container.querySelectorAll('.step-item').forEach(item => {
            item.addEventListener('click', () => {
                state.stepsActive.step = item.dataset.step;
                renderSteps(container);
            });
        });

    } else if (section === null) {
        // --- 2. Step View (List of Sections within a Step) ---
        const stepNum = state.stepsActive.step;
        const sections = state.stepsData[stepNum]?.sections || [];

        container.innerHTML = `
            <div class="steps-nav-header">
                <button class="back-btn" id="step-back">${ICONS.chevronLeft}</button>
                <div style="flex: 1;">
                    <h2 style="font-weight: 900; margin: 0;">Крок ${stepNum}</h2>
                </div>
                <button class="btn-secondary" id="edit-sections-btn" style="padding: 0; border-radius: 12px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white;">
                    ${state.isStepsEditMode ? ICONS.check : ICONS.pencil}
                </button>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="color: rgba(255,255,255,0.7); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Розділи</h3>
            </div>

            <div id="sections-list">
                ${sections.length === 0 ? '<p style="opacity: 0.5; text-align: center; padding: 40px 0;">Натисніть "Створити розділ", щоб почати</p>' : ''}
                ${sections.map((s, idx) => `
                    <div class="step-item ${state.isStepsEditMode ? 'edit-mode' : ''}" data-idx="${idx}" style="${state.isStepsEditMode ? 'cursor: default;' : ''}">
                        <span style="font-weight: 700; flex: 1;">${s.title}</span>
                        ${state.isStepsEditMode ? `
                            <button class="del-section-btn" data-idx="${idx}" style="background:none; border:none; color:#ef4444; padding: 8px; cursor: pointer;">${ICONS.trash}</button>
                        ` : `
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <span style="font-size: 0.8rem; opacity: 0.5;">${s.questions.length} питань</span>
                            <span style="opacity: 0.3;">${ICONS.chevronRight}</span>
                        </div>
                        `}
                    </div>
                `).join('')}
            </div>

            <button class="btn-primary" id="add-section-btn" style="margin-top: 20px; background: rgba(255,255,255,0.1); border: 1px dashed rgba(255,255,255,0.3);">
                ${ICONS.plus} Створити розділ
            </button>
        `;

        container.querySelector('#step-back').addEventListener('click', () => {
            state.stepsActive.step = null;
            state.isStepsEditMode = false;
            renderSteps(container);
        });

        container.querySelector('#edit-sections-btn').addEventListener('click', () => {
            state.isStepsEditMode = !state.isStepsEditMode;
            renderSteps(container);
        });

        container.querySelectorAll('.del-section-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Видалити цей розділ? Всі питання до нього будуть також видалені.')) {
                    state.stepsData[stepNum].sections.splice(btn.dataset.idx, 1);
                    if (state.stepsAnswers[stepNum]) {
                        delete state.stepsAnswers[stepNum][btn.dataset.idx];
                        const newAnswers = {};
                        Object.keys(state.stepsAnswers[stepNum]).forEach(k => {
                            if (parseInt(k) < parseInt(btn.dataset.idx)) newAnswers[k] = state.stepsAnswers[stepNum][k];
                            else if (parseInt(k) > parseInt(btn.dataset.idx)) newAnswers[parseInt(k) - 1] = state.stepsAnswers[stepNum][k];
                        });
                        state.stepsAnswers[stepNum] = newAnswers;
                        localStorage.setItem('steps_answers', JSON.stringify(state.stepsAnswers));
                    }
                    localStorage.setItem('steps_data', JSON.stringify(state.stepsData));
                    renderSteps(container);
                }
            });
        });

        container.querySelector('#add-section-btn').addEventListener('click', () => {
            openModal(`
                <h3 class="mb-4" style="color: var(--primary-color);">Новий розділ</h3>
                <input type="text" id="new-section-title" class="modal-input mb-4" placeholder="Назва розділу (напр. Одержимість)" style="width: 100%; border: 2px solid var(--border-color); border-radius: 14px; padding: 14px; font-size: 1rem;">
                <button class="btn-primary" id="confirm-add-section">Додати</button>
            `);
            document.getElementById('confirm-add-section').addEventListener('click', () => {
                const title = document.getElementById('new-section-title').value.trim();
                if (title) {
                    if (!state.stepsData[stepNum]) state.stepsData[stepNum] = { sections: [] };
                    state.stepsData[stepNum].sections.push({ title, questions: [] });
                    localStorage.setItem('steps_data', JSON.stringify(state.stepsData));
                    closeModal();
                    renderSteps(container);
                }
            });
        });

        container.querySelectorAll('.step-item:not(.edit-mode)').forEach(item => {
            item.addEventListener('click', () => {
                if (state.isStepsEditMode) return;
                state.stepsActive.section = item.dataset.idx;
                renderSteps(container);
            });
        });

    } else {
        // --- 3. Section View (Questions & Answers) ---
        const stepNum = state.stepsActive.step;
        const sectionIdx = state.stepsActive.section;
        const sectionData = state.stepsData[stepNum].sections[sectionIdx];
        const answers = state.stepsAnswers[stepNum]?.[sectionIdx] || {};

        container.innerHTML = `
            <div class="steps-nav-header">
                <button class="back-btn" id="section-back">${ICONS.chevronLeft}</button>
                <div style="flex: 1;">
                    <h2 style="font-weight: 900; line-height: 1.1; margin: 0;">${sectionData.title}</h2>
                    <p style="font-size: 0.75rem; opacity: 0.6; margin-top: 4px; margin-bottom: 0;">Крок ${stepNum}</p>
                </div>
                <button class="btn-secondary" id="edit-questions-btn" style="padding: 0; border-radius: 12px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white;">
                    ${state.isStepsEditMode ? ICONS.check : ICONS.pencil}
                </button>
            </div>

            <div id="questions-list">
                ${sectionData.questions.length === 0 ? '<p style="opacity: 0.5; text-align: center; padding: 40px 0;">Питань ще немає. Додайте перше!</p>' : ''}
                ${sectionData.questions.map((q, qIdx) => `
                    <div class="question-card" data-qidx="${qIdx}">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                            <p style="font-weight: 700; font-size: 1rem; flex: 1; padding-right: 12px; margin: 0;">${q}</p>
                            ${state.isStepsEditMode ? `
                                <button class="del-question-btn" data-qidx="${qIdx}" style="background:none; border:none; color:#ef4444; padding: 4px; cursor: pointer;">${ICONS.trash}</button>
                            ` : ''}
                        </div>
                        <div class="answer-preview ${!answers[qIdx] ? 'answer-empty' : ''}" style="cursor: pointer; ${state.isStepsEditMode ? 'opacity: 0.5; pointer-events: none;' : ''}">
                            ${answers[qIdx] || 'Торкнись, щоб відповісти...'}
                        </div>
                    </div>
                `).join('')}
            </div>

            <button class="btn-primary" id="add-question-btn" style="margin-top: 20px; background: rgba(255,255,255,0.1); border: 1px dashed rgba(255,255,255,0.3);">
                ${ICONS.plus} Додати питання
            </button>
        `;

        container.querySelector('#section-back').addEventListener('click', () => {
            state.stepsActive.section = null;
            state.isStepsEditMode = false;
            renderSteps(container);
        });

        container.querySelector('#edit-questions-btn').addEventListener('click', () => {
            state.isStepsEditMode = !state.isStepsEditMode;
            renderSteps(container);
        });

        container.querySelectorAll('.del-question-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Видалити це питання та всі відповіді до нього?')) {
                    sectionData.questions.splice(btn.dataset.qidx, 1);
                    if (state.stepsAnswers[stepNum] && state.stepsAnswers[stepNum][sectionIdx]) {
                        delete state.stepsAnswers[stepNum][sectionIdx][btn.dataset.qidx];
                        const newAns = {};
                        Object.keys(state.stepsAnswers[stepNum][sectionIdx]).forEach(k => {
                            if (parseInt(k) < parseInt(btn.dataset.qidx)) newAns[k] = state.stepsAnswers[stepNum][sectionIdx][k];
                            else if (parseInt(k) > parseInt(btn.dataset.qidx)) newAns[parseInt(k) - 1] = state.stepsAnswers[stepNum][sectionIdx][k];
                        });
                        state.stepsAnswers[stepNum][sectionIdx] = newAns;
                        localStorage.setItem('steps_answers', JSON.stringify(state.stepsAnswers));
                    }
                    localStorage.setItem('steps_data', JSON.stringify(state.stepsData));
                    renderSteps(container);
                }
            });
        });

        container.querySelector('#add-question-btn').addEventListener('click', () => {
            openModal(`
                <h3 class="mb-4" style="color: var(--primary-color);">Додати питання</h3>
                <textarea id="new-q-text" class="modal-input mb-4" placeholder="Введіть текст питання..." style="width: 100%; min-height: 100px; border: 2px solid var(--border-color); border-radius: 14px; padding: 14px; font-size: 1rem;"></textarea>
                <button class="btn-primary" id="confirm-add-q">Додати</button>
            `);
            document.getElementById('confirm-add-q').addEventListener('click', () => {
                const text = document.getElementById('new-q-text').value.trim();
                if (text) {
                    sectionData.questions.push(text);
                    localStorage.setItem('steps_data', JSON.stringify(state.stepsData));
                    closeModal();
                    renderSteps(container);
                }
            });
        });

        container.querySelectorAll('.answer-preview').forEach(ans => {
            ans.addEventListener('click', () => {
                const qIdx = ans.closest('.question-card').dataset.qidx;
                const questionText = sectionData.questions[qIdx];
                const currentAns = answers[qIdx] || '';

                openModal(`
                    <h3 class="mb-4" style="color: var(--primary-color); font-size: 1rem;">${questionText}</h3>
                    <div class="modal-textarea-container">
                        <textarea id="step-ans-input" class="modal-input" style="width: 100%; border: 2px solid var(--border-color); border-radius: 14px; padding: 14px; font-size: 1rem;">${currentAns}</textarea>
                    </div>
                    <button class="btn-primary" id="save-step-ans">Зберегти відповідь</button>
                `, true);

                document.getElementById('save-step-ans').addEventListener('click', () => {
                    if (!state.stepsAnswers[stepNum]) state.stepsAnswers[stepNum] = {};
                    if (!state.stepsAnswers[stepNum][sectionIdx]) state.stepsAnswers[stepNum][sectionIdx] = {};

                    const val = document.getElementById('step-ans-input').value;
                    state.stepsAnswers[stepNum][sectionIdx][qIdx] = val;
                    localStorage.setItem('steps_answers', JSON.stringify(state.stepsAnswers));
                    closeModal();
                    renderSteps(container);
                });
            });
        });
    }
}

// 5. Step 10
function renderStep10(container) {
    const today = DateTime.now().toISODate();
    const currentData = state.step10Answers[today] || {};

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <h2 style="font-weight: 900; margin: 0;">👣 10 Крок</h2>
            <div style="display: flex; gap: 8px;">
                ${!state.isStep10EditMode ? `
                    <button class="btn-secondary" id="reset-answers-btn" style="padding: 0; border-radius: 12px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: #ef4444;">
                        ${ICONS.trash}
                    </button>
                ` : ''}
                <button class="btn-secondary" id="edit-q-btn" style="padding: 0; border-radius: 12px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white;">
                    ${state.isStep10EditMode ? ICONS.check : ICONS.pencil}
                </button>
            </div>
        </div>
        <div id="step-area"></div>
        ${!state.isStep10EditMode ? `<button class="btn-primary" id="save-send-bot" style="margin-top: 20px;">Зберегти собі</button>` : ''}
    `;

    const area = container.querySelector('#step-area');
    if (state.isStep10EditMode) {
        renderEditQuestions(area);
    } else {
        renderInputQuestions(area, currentData);
    }

    container.querySelector('#edit-q-btn').addEventListener('click', () => { state.isStep10EditMode = !state.isStep10EditMode; renderTab('step10'); });

    const sendBtn = container.querySelector('#save-send-bot');
    if (sendBtn) {
        sendBtn.addEventListener('click', async () => {
            const answers = state.step10Answers[today] || {};
            let msg = `👣 10 крок (${DateTime.now().toFormat('dd.MM')})\n\n`;
            let hasAnswers = false;

            state.step10Questions.forEach((q, i) => {
                if (answers[i] && answers[i].trim()) {
                    msg += `${i + 1}. ${q}\n📝 ${answers[i]}\n\n`;
                    hasAnswers = true;
                }
            });

            if (!hasAnswers) {
                alert('Будь ласка, заповніть хоча б одну відповідь.');
                return;
            }

            sendBtn.disabled = true;
            sendBtn.innerText = 'Відправка та копіювання...';

            // Always copy to clipboard first
            try {
                await navigator.clipboard.writeText(msg);
            } catch (e) { console.warn('Clipboard error:', e); }

            const tg = window.Telegram?.WebApp;
            const chatId = tg?.initDataUnsafe?.user?.id;
            const botToken = BOT_TOKEN;

            let sentOk = false;
            if (chatId && botToken) {
                try {
                    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ chat_id: chatId, text: msg })
                    });
                    sentOk = response.ok;
                } catch (e) { console.error('Bot API error:', e); }
            }

            // Also try sendData
            try { if (tg && tg.sendData) tg.sendData(msg); } catch (e) { }

            // Clear answers after successful actions
            delete state.step10Answers[today];
            localStorage.setItem('step10_answers', JSON.stringify(state.step10Answers));

            const successMsg = sentOk
                ? '✅ Надіслано в ваш чат з застосунком та скопійовано!\n\nВідповіді в самому застосунку очищено.'
                : '✅ Скопійовано! (Авто-відправка не вдалася, вставте вручну).\n\nВідповіді в самому застосунку очищено.';

            if (tg?.showAlert) {
                tg.showAlert(successMsg, () => {
                    if (sentOk) tg.close();
                    else renderTab('step10');
                });
            } else {
                alert(successMsg);
                renderTab('step10');
            }
        });
    }

    const resetBtn = container.querySelector('#reset-answers-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Ви впевнені, що хочете очистити всі відповіді за сьогодні?')) {
                delete state.step10Answers[today];
                localStorage.setItem('step10_answers', JSON.stringify(state.step10Answers));
                renderTab('step10');
            }
        });
    }
}

function renderInputQuestions(parent, data) {
    state.step10Questions.forEach((q, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.cursor = 'pointer';
        const answer = data[i] || '';
        card.innerHTML = `
            <span style="font-weight: 800; margin-bottom: 8px; display: block; color: var(--primary-color); font-size: 0.9rem;">${i + 1}. ${q}</span>
            <div class="answer-preview ${answer ? '' : 'answer-empty'}">
                ${answer ? answer.replace(/\n/g, '<br>') : 'Натисніть щоб відповісти...'}
            </div>
        `;
        card.addEventListener('click', () => openAnswerModal(i, q, data[i] || ''));
        parent.appendChild(card);
    });
}

function openAnswerModal(idx, question, currentAnswer) {
    const today = DateTime.now().toISODate();
    openModal(`
        <div style="margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--border-color); padding-right: 44px;">
            <div style="display: flex; align-items: flex-start; gap: 10px;">
                <span style="flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; background: var(--primary-color); color: white; width: 28px; height: 28px; border-radius: 50%; font-weight: 900; font-size: 0.8rem;">${idx + 1}</span>
                <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">${question}</p>
            </div>
        </div>
        <textarea id="answer-modal-ta" placeholder="Ваша відповідь..." style="width: 100%; min-height: 160px; border: 2px solid var(--border-color); border-radius: 16px; padding: 14px; font-size: 1rem; font-family: inherit; resize: none; box-sizing: border-box; margin-bottom: 14px; outline: none; transition: border-color 0.2s; display: block;">${currentAnswer}</textarea>
        <button class="btn-primary" id="save-answer-modal-btn">Зберегти відповідь</button>
    `, true);

    const ta = document.getElementById('answer-modal-ta');
    setTimeout(() => { ta.focus(); }, 100);
    ta.addEventListener('focus', () => { ta.style.borderColor = 'var(--accent-color)'; });
    ta.addEventListener('blur', () => { ta.style.borderColor = 'var(--border-color)'; });

    document.getElementById('save-answer-modal-btn').addEventListener('click', () => {
        if (!state.step10Answers[today]) state.step10Answers[today] = {};
        state.step10Answers[today][idx] = ta.value;
        localStorage.setItem('step10_answers', JSON.stringify(state.step10Answers));
        closeModal();
        renderTab('step10');
    });
}

function renderEditQuestions(parent) {
    const list = document.createElement('div');
    list.className = 'card';
    list.innerHTML = `<h3 class="mb-4" style="color: var(--primary-color); margin-bottom: 15px;">Налаштування питань</h3>`;
    state.step10Questions.forEach((q, i) => {
        const row = document.createElement('div');
        row.style.cssText = 'display: flex; gap: 12px; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border-color);';
        row.innerHTML = `<span style="font-weight: 900; color: var(--accent-color);">${i + 1}</span><span style="flex:1; font-weight:500; font-size: 0.9rem;">${q}</span><button class="del-q" data-idx="${i}" style="background:none; border:none; color:#ef4444; cursor: pointer;">${ICONS.trash}</button>`;
        list.appendChild(row);
    });
    const addBtn = document.createElement('button');
    addBtn.className = 'btn-secondary';
    addBtn.style.cssText = 'width: 100%; margin-top: 15px;';
    addBtn.innerText = '+ Додати нове';
    list.appendChild(addBtn);
    parent.appendChild(list);

    list.querySelectorAll('.del-q').forEach(b => b.addEventListener('click', () => { state.step10Questions.splice(parseInt(b.dataset.idx), 1); localStorage.setItem('step10_questions', JSON.stringify(state.step10Questions)); renderTab('step10'); }));
    addBtn.addEventListener('click', () => {
        openModal(`
            <h3 class="mb-4" style="color: var(--primary-color);">Нове питання</h3>
            <textarea id="new-q-text" placeholder="Введіть текст питання..." style="width: 100%; min-height: 100px; border: 2px solid var(--border-color); border-radius: 16px; padding: 14px; font-size: 1rem; font-family: inherit; resize: none; margin-bottom: 20px; outline: none; display: block;"></textarea>
            <button class="btn-primary" id="save-new-q-btn">Додати</button>
        `);
        const ta = document.getElementById('new-q-text');
        setTimeout(() => ta.focus(), 100);
        document.getElementById('save-new-q-btn').addEventListener('click', () => {
            const val = ta.value.trim();
            if (val) {
                state.step10Questions.push(val);
                localStorage.setItem('step10_questions', JSON.stringify(state.step10Questions));
                closeModal();
                renderTab('step10');
            }
        });
    });
}

// --- Utils ---
function pluralize(n, forms) {
    return n % 10 == 1 && n % 100 != 11 ? forms[0] : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? forms[1] : forms[2]);
}
function openModal(html, topAlign = false) { modalBody.innerHTML = html; modalOverlay.classList.add('active'); if (topAlign) modalOverlay.classList.add('top-align'); }
function closeModal() { modalOverlay.classList.remove('active', 'top-align'); }

init();
