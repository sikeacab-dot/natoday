import { DateTime } from 'luxon';

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
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:22px;height:22px;"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
};

// --- Configuration ---
const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
const PEER_ID = import.meta.env.VITE_PEER_ID;

// --- State ---
const state = {
    currentTab: 'timer',
    cleanDate: localStorage.getItem('clean_date') || '2024-01-01',
    diaryDate: DateTime.now(),
    isStep10EditMode: false,
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
        { group: "Баракуда", address: "вул. Лариси Руденко, 3", schedule: { "1": "20:00-21:00", "5": "16:00-17:15" }, map: "https://www.google.com/maps/search/?api=1&query=вул.+Лариси+Руденко,+3" },
        { group: "На Позняках", address: "Харківське шосе 57", schedule: { "0": "19:00", "1": "19:00", "2": "19:00", "3": "19:00", "4": "19:00", "5": "13:00, 19:00", "6": "19:00" }, map: "https://www.google.com/maps/search/?api=1&query=Харківське+шосе+57" },
        { group: "На часі", address: "вул. Межигірська 22", schedule: { "0": "13:00", "1": "13:00", "2": "13:00", "3": "13:00", "4": "13:00, 19:00", "5": "13:00", "6": "13:00" }, map: "https://www.google.com/maps/search/?api=1&query=вул.+Межигірська+22" }
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
            renderTab(tab);
        });
    });

    document.querySelector('.close-modal-btn').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
}

function openSettingsModal() {
    const dStr = DateTime.fromISO(state.cleanDate).setLocale('uk').toLocaleString({ day: 'numeric', month: 'long', year: 'numeric' });
    openModal(`
        <h3 class="mb-2" style="color: var(--primary-color);">Дата чистоти</h3>
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
        case 'meetings': renderMeetings(container); break;
        case 'step10': renderStep10(container); break;
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

    container.innerHTML = `
        <div class="diary-nav-bar">
            <button class="date-btn" id="prev-d">←</button>
            <div class="current-date-display" id="pick-d-dt" style="cursor: pointer; display: flex; align-items: center; gap: 8px; color: var(--primary-color); font-weight: 700;">
                ${dStr} ${ICONS.calendar}
            </div>
            <button class="date-btn" id="next-d">→</button>
        </div>
        
        ${!isToday ? `<button class="btn-secondary mb-4" id="go-today" style="width:100%; margin-bottom: 16px;">Сьогодні</button>` : ''}

        <div class="card">
            <h3 class="card-title" style="margin-bottom: 20px;">Щоденна медитація</h3>
            <div id="d-text" style="font-size: 1.15rem; line-height: 1.75; opacity: 0.9;">Завантаження...</div>
        </div>
    `;

    const lessons = [
        "Сьогодні я буду пам'ятати, що моє одужання залежить від моєї готовності бути чесним. Саме чесність перед собою відкриває двері до змін.",
        "Прийняття — це не згода зі всім поганим, це визнання реальності такою, якою вона є зараз. Лише з цієї точки можливий ріст.",
        "Смирення означає бачити себе таким, який я є насправді — з усіма силами та недоліками, без потреби прикидатися кимось іншим."
    ];
    container.querySelector('#d-text').innerText = lessons[Math.abs(state.diaryDate.day % lessons.length)];

    container.querySelector('#prev-d').addEventListener('click', () => { state.diaryDate = state.diaryDate.minus({ days: 1 }); renderDiary(container); });
    container.querySelector('#next-d').addEventListener('click', () => { state.diaryDate = state.diaryDate.plus({ days: 1 }); renderDiary(container); });
    container.querySelector('#pick-d-dt').addEventListener('click', () => {
        openModal(`<h3 class="mb-4">Оберіть дату</h3><input type="date" id="sel-dt" class="modal-input mb-4" value="${state.diaryDate.toISODate()}" style="width:100%; border:2px solid var(--border-color); border-radius:14px; padding:14px; margin-bottom:20px;"><button class="btn-primary" id="set-dt">Перейти</button>`);
        document.getElementById('set-dt').addEventListener('click', () => { state.diaryDate = DateTime.fromISO(document.getElementById('sel-dt').value); closeModal(); renderDiary(container); });
    });
    if (!isToday) container.querySelector('#go-today').addEventListener('click', () => { state.diaryDate = DateTime.now(); renderDiary(container); });
}

// 3. Meetings
function renderMeetings(container) {
    const luxonDay = DateTime.now().setZone('Europe/Kyiv').weekday - 1;
    const meetingsToday = state.meetings.filter(m => m.schedule[String(luxonDay)]);

    container.innerHTML = `<h2 style="margin-bottom: 24px; font-weight: 900;">📍 Зібрання на сьогодні</h2><div id="m-list"></div>`;
    const list = container.querySelector('#m-list');

    if (meetingsToday.length === 0) {
        list.innerHTML = `<div class="card text-center">Сьогодні зібрань не знайдено.</div>`;
    } else {
        meetingsToday.forEach(m => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-title-row">
                    <span class="card-title">${m.group}</span>
                    <span class="meeting-time-pill">${m.schedule[String(luxonDay)]}</span>
                </div>
                <p style="color: var(--text-secondary); margin-bottom: 12px; font-size: 0.95rem;">${m.address}</p>
                <a href="${m.map}" target="_blank" style="color: var(--accent-color); font-weight: 800; text-decoration: none; display: flex; align-items: center; gap: 4px; font-size: 0.9rem;">Карта →</a>
            `;
            list.appendChild(card);
        });
    }
}

// 4. Step 10
function renderStep10(container) {
    const today = DateTime.now().toISODate();
    const currentData = state.step10Answers[today] || {};

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <h2 style="font-weight: 900; margin: 0;">👣 10 Крок</h2>
            <button class="btn-secondary" id="edit-q-btn" style="padding: 0; border-radius: 12px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white;">
                ${state.isStep10EditMode ? ICONS.check : ICONS.pencil}
            </button>
        </div>
        <div id="step-area"></div>
        ${!state.isStep10EditMode ? `<button class="btn-primary" id="save-send-bot" style="margin-top: 20px;">Скопіювати та відкрити бота</button>` : ''}
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

            const tg = window.Telegram?.WebApp;
            const chatId = tg?.initDataUnsafe?.user?.id;
            const botToken = BOT_TOKEN;

            sendBtn.disabled = true;
            sendBtn.innerText = 'Надсилаю...';

            // --- STRATEGY 1: Bot API (Most automatic & reliable) ---
            if (chatId && botToken) {
                try {
                    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ chat_id: chatId, text: msg })
                    });
                    if (response.ok) {
                        if (tg?.showAlert) {
                            tg.showAlert('✅ Відповіді надіслано боту!', () => tg.close());
                        } else {
                            alert('✅ Відповіді надіслано боту!');
                        }
                        return;
                    }
                } catch (e) {
                    console.error('Bot API error:', e);
                }
            }

            // --- STRATEGY 2: sendData (Backup for specific contexts) ---
            try {
                if (tg && tg.sendData) {
                    tg.sendData(msg);
                    // We don't return here because if sendData is not supported by context, it might do nothing
                }
            } catch (e) {
                console.error('sendData error:', e);
            }

            // --- STRATEGY 3: Clipboard + Redirect (Final Fallback) ---
            try {
                await navigator.clipboard.writeText(msg);
                const botUsername = import.meta.env.VITE_BOT_USERNAME || 'onlytodayuabot';
                const successMsg = 'Автоматична відправка не вдалася, але відповіді скопійовано!\nВставте їх у чат з ботом.';

                if (tg?.showAlert) {
                    tg.showAlert(successMsg, () => {
                        window.open(`https://t.me/${botUsername}`, '_blank');
                        sendBtn.disabled = false;
                        sendBtn.innerText = 'Скопіювати та відкрити бота';
                    });
                } else {
                    alert(successMsg);
                    window.open(`https://t.me/${botUsername}`, '_blank');
                }
            } catch (err) {
                alert('Помилка: не вдалося надіслати чи скопіювати. Перевірте дозволи.');
            } finally {
                sendBtn.disabled = false;
                sendBtn.innerText = 'Спробувати ще раз';
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
    addBtn.addEventListener('click', () => { const n = prompt('Текст питання:'); if (n) { state.step10Questions.push(n); localStorage.setItem('step10_questions', JSON.stringify(state.step10Questions)); renderTab('step10'); } });
}

// --- Utils ---
function pluralize(n, forms) {
    return n % 10 == 1 && n % 100 != 11 ? forms[0] : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? forms[1] : forms[2]);
}
function openModal(html, topAlign = false) { modalBody.innerHTML = html; modalOverlay.classList.add('active'); if (topAlign) modalOverlay.classList.add('top-align'); }
function closeModal() { modalOverlay.classList.remove('active', 'top-align'); }

init();
