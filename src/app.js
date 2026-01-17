// Wedding App - Main Application Logic (with Multi-Language Support)

// App State
let currentUser = null;
let currentTab = 'events';
let completedTasks = [];
let reminders = [];
let currentLanguage = localStorage.getItem('weddingLang') || 'en';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initServiceWorker();
  checkExistingLogin();
});

// Service Worker Registration
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered'))
      .catch(err => console.log('SW registration failed:', err));
  }
}

// Check if user already logged in
function checkExistingLogin() {
  const savedUser = localStorage.getItem('weddingAppUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    reminders = JSON.parse(localStorage.getItem('weddingReminders') || '[]');
    renderDashboard();
    checkUpcomingEvents();
  } else {
    renderLoginScreen();
  }
}

// Language switching
function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('weddingLang', lang);
  if (currentUser) {
    renderDashboard();
  } else {
    renderLoginScreen();
  }
}

// Find guest room assignment
function findGuestRoom(name) {
  const lowerName = name.toLowerCase();
  for (const guest of GUEST_LIST) {
    if (lowerName.includes(guest.name.toLowerCase()) ||
      guest.name.toLowerCase().includes(lowerName)) {
      return guest;
    }
  }
  return null;
}

// Detect user role based on name
function detectRole(name) {
  const lowerName = name.toLowerCase().trim();

  // Check if admin (Groom or Bride)
  for (const admin of ADMIN_USERS) {
    if (lowerName.includes(admin.toLowerCase()) || admin.toLowerCase().includes(lowerName)) {
      return { role: 'admin', coordinator: null };
    }
  }

  // Check if coordinator
  for (const coord of WEDDING_DATA.coordinators) {
    const coordName = coord.name.toLowerCase();
    if (lowerName.includes(coordName) || coordName.includes(lowerName)) {
      return { role: 'coordinator', coordinator: coord };
    }
  }

  // Check if family
  for (const family of FAMILY_MEMBERS) {
    if (lowerName.includes(family.toLowerCase()) || family.toLowerCase().includes(lowerName)) {
      return { role: 'family', coordinator: null };
    }
  }

  // Default to guest
  return { role: 'guest', coordinator: null };
}

// Language Switcher Component
function renderLanguageSwitcher() {
  return `
    <div class="language-switcher">
      <button class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}" onclick="setLanguage('en')">EN</button>
      <button class="lang-btn ${currentLanguage === 'hi' ? 'active' : ''}" onclick="setLanguage('hi')">हिं</button>
      <button class="lang-btn ${currentLanguage === 'gu' ? 'active' : ''}" onclick="setLanguage('gu')">ગુ</button>
    </div>
  `;
}

// Login state for multi-step auth
let loginState = { step: 1, name: '', phone: '', userInfo: null };

// Render Login Screen
function renderLoginScreen() {
  loginState = { step: 1, name: '', phone: '', userInfo: null };
  renderLoginStep1();
}

// Step 1: Enter Name
function renderLoginStep1(errorMsg = '') {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="login-screen">
      <div class="login-card">
        ${renderLanguageSwitcher()}
        <div class="wedding-emoji">💒</div>
        <h1 class="login-title">${t('welcome')}</h1>
        <p class="login-subtitle">${WEDDING_DATA.weddingInfo.groom} & ${WEDDING_DATA.weddingInfo.bride}${t('weddingOf')}</p>
        <div class="login-dates">📅 ${WEDDING_DATA.weddingInfo.dates}</div>
        
        ${errorMsg ? `<div class="login-error">${errorMsg}</div>` : ''}
        
        <form id="loginForm">
          <div class="form-group">
            <label for="name">${t('yourName')}</label>
            <input type="text" id="name" placeholder="${t('enterName')}" required autocomplete="name" value="${loginState.name}">
          </div>
          <div class="form-group">
            <label for="phone">${t('phoneNumber')}</label>
            <input type="tel" id="phone" placeholder="${t('enterPhone')}" autocomplete="tel" value="${loginState.phone}">
          </div>
          <button type="submit" class="login-btn">${t('enterApp')}</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById('loginForm').addEventListener('submit', handleLoginStep1);
}

// Step 2: Admin Password
function renderAdminPasswordPrompt(errorMsg = '') {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="login-screen">
      <div class="login-card">
        ${renderLanguageSwitcher()}
        <div class="wedding-emoji">👑</div>
        <h1 class="login-title">${t('adminLogin')}</h1>
        <p class="login-subtitle">${t('welcome')}, ${loginState.name}</p>
        <p class="login-hint">${t('enterPassword')}</p>
        
        ${errorMsg ? `<div class="login-error">${errorMsg}</div>` : ''}
        
        <form id="adminPasswordForm">
          <div class="form-group">
            <label for="password">🔐 ${t('password')}</label>
            <input type="password" id="password" placeholder="${t('password')}" required autocomplete="current-password">
          </div>
          <button type="submit" class="login-btn">🔓 ${t('unlockAdmin')}</button>
          <button type="button" class="back-btn" onclick="renderLoginStep1()">← ${t('back')}</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById('adminPasswordForm').addEventListener('submit', handleAdminPassword);
}

// Step 2: Coordinator OTP
function renderCoordinatorOTPPrompt(errorMsg = '') {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="login-screen">
      <div class="login-card">
        ${renderLanguageSwitcher()}
        <div class="wedding-emoji">🎯</div>
        <h1 class="login-title">${t('coordinatorLogin')}</h1>
        <p class="login-subtitle">${t('welcome')}, ${loginState.name}</p>
        <p class="login-hint">${t('enterOTP')}</p>
        
        ${errorMsg ? `<div class="login-error">${errorMsg}</div>` : ''}
        
        <form id="coordinatorOTPForm">
          <div class="form-group">
            <label for="otp">🔢 ${t('accessCode')}</label>
            <input type="text" id="otp" placeholder="0000" required 
                   pattern="[0-9]{4}" maxlength="4" inputmode="numeric" autocomplete="one-time-code"
                   style="text-align: center; font-size: 1.5rem; letter-spacing: 0.5rem;">
          </div>
          <button type="submit" class="login-btn">✅ ${t('verifyEnter')}</button>
          <button type="button" class="back-btn" onclick="renderLoginStep1()">← ${t('back')}</button>
        </form>
        <p class="otp-hint">${t('contactAdminForOTP')}</p>
      </div>
    </div>
  `;

  document.getElementById('coordinatorOTPForm').addEventListener('submit', handleCoordinatorOTP);
}

// Access Denied Screen
function renderAccessDenied() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="login-screen">
      <div class="login-card access-denied">
        ${renderLanguageSwitcher()}
        <div class="wedding-emoji">🚫</div>
        <h1 class="login-title error">${t('accessDenied')}</h1>
        <p class="login-subtitle">${t('notOnGuestList').replace('you are', '"' + loginState.name + '"')}</p>
        
        <div class="access-denied-info">
          <p>${t('appOnlyFor')}</p>
          <ul>
            <li>👰🤵 ${t('brideGroom')}</li>
            <li>🎯 ${t('coordinators')}</li>
            <li>👨‍👩‍👧‍👦 ${t('familyMembers')}</li>
            <li>👤 ${t('invitedGuests')}</li>
          </ul>
        </div>
        
        <p class="contact-hint">${t('contactIfError')}</p>
        
        <button class="login-btn" onclick="renderLoginStep1()">← ${t('tryAgain')}</button>
      </div>
    </div>
  `;
}

// Handle Step 1: Check if user is allowed
function handleLoginStep1(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!name) {
    renderLoginStep1('Please enter your name');
    return;
  }

  loginState.name = name;
  loginState.phone = phone;

  // Check if user is allowed
  const userInfo = isAllowedUser(name);
  loginState.userInfo = userInfo;

  if (!userInfo.allowed) {
    // Not on any list - access denied
    renderAccessDenied();
    return;
  }

  // Check what auth is required
  if (userInfo.requiresAuth === 'password') {
    // Admin needs password
    renderAdminPasswordPrompt();
  } else if (userInfo.requiresAuth === 'otp') {
    // Coordinator needs OTP
    renderCoordinatorOTPPrompt();
  } else {
    // Family or Guest - direct login
    completeLogin(userInfo);
  }
}

// Handle Admin Password
function handleAdminPassword(e) {
  e.preventDefault();
  const password = document.getElementById('password').value;

  if (verifyAdminPassword(password)) {
    completeLogin(loginState.userInfo);
  } else {
    renderAdminPasswordPrompt('❌ Incorrect password. Please try again.');
  }
}

// Handle Coordinator OTP
function handleCoordinatorOTP(e) {
  e.preventDefault();
  const otp = document.getElementById('otp').value.trim();
  const coordinatorName = loginState.userInfo.coordinator.name;

  console.log('Attempting OTP login for:', coordinatorName, 'with OTP:', otp);

  if (verifyCoordinatorOTP(coordinatorName, otp)) {
    completeLogin(loginState.userInfo);
  } else {
    console.log('OTP verification failed for:', coordinatorName);
    renderCoordinatorOTPPrompt('❌ Incorrect access code. Please try again.');
  }
}

// Complete Login
function completeLogin(userInfo) {
  const guestInfo = userInfo.guestInfo || findGuestRoom(loginState.name);

  currentUser = {
    name: loginState.name,
    phone: loginState.phone,
    role: userInfo.role,
    coordinator: userInfo.coordinator || null,
    guestInfo
  };

  localStorage.setItem('weddingAppUser', JSON.stringify(currentUser));
  loginState = { step: 1, name: '', phone: '', userInfo: null };
  renderDashboard();
  checkUpcomingEvents();
}

// Logout
function logout() {
  localStorage.removeItem('weddingAppUser');
  currentUser = null;
  renderLoginScreen();
}

// Check upcoming events
function checkUpcomingEvents() {
  const upcomingEvents = WEDDING_DATA.events
    .filter(e => e.category === 'main' || e.category === 'meal')
    .slice(0, 3);

  if (upcomingEvents.length> 0 && !sessionStorage.getItem('reminderShown')) {
    sessionStorage.setItem('reminderShown', 'true');
    const nextEvent = upcomingEvents[0];
    if (Notification.permission === 'granted') {
      new Notification(`🔔 Next: ${nextEvent.name} `, {
        body: `${nextEvent.time} at ${nextEvent.venue} `,
        icon: '/public/icons/icon-192.svg'
      });
    }
  }
}

// Request notification permission
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

// Toggle reminder
function toggleReminder(eventId) {
  const idx = reminders.indexOf(eventId);
  if (idx> -1) {
    reminders.splice(idx, 1);
  } else {
    reminders.push(eventId);
    requestNotificationPermission();
  }
  localStorage.setItem('weddingReminders', JSON.stringify(reminders));
  renderDashboard();
}

// Render Dashboard
function renderDashboard() {
  const app = document.getElementById('app');
  const roleLabel = t(currentUser.role);

  app.innerHTML = `
    <header class="app-header">
      <div class="header-content">
        <div class="header-top">
          <h1 class="header-title">💒 ${WEDDING_DATA.weddingInfo.groom} & ${WEDDING_DATA.weddingInfo.bride}</h1>
          <div class="header-actions">
            ${renderLanguageSwitcher()}
            <button class="logout-btn" onclick="logout()">${t('logout')}</button>
          </div>
        </div>
        <p class="welcome-text">
          ${t('welcome')}, <strong>${currentUser.name}</strong>
          <span class="user-badge ${currentUser.role}">${roleLabel}</span>
        </p>
      </div>
    </header>
    
    <nav class="nav-tabs">
      ${getNavTabs()}
    </nav>
    
    <main class="main-content">
      ${getTabContent()}
    </main>
  `;

  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });
}

// Get Navigation Tabs based on role
function getNavTabs() {
  if (currentUser.role === 'admin') {
    return `
      <button class="nav-tab ${currentTab === 'dashboard' ? 'active' : ''}" data-tab="dashboard">
        <span>🏠</span>
        <span>${t('dashboard')}</span>
      </button>
      <button class="nav-tab ${currentTab === 'events' ? 'active' : ''}" data-tab="events">
        <span>📅</span>
        <span>${t('events')}</span>
      </button>
      <button class="nav-tab ${currentTab === 'guests' ? 'active' : ''}" data-tab="guests">
        <span>👤</span>
        <span>${t('guests')}</span>
      </button>
      <button class="nav-tab ${currentTab === 'tasks' ? 'active' : ''}" data-tab="tasks">
        <span>✅</span>
        <span>${t('tasks')}</span>
      </button>
      <button class="nav-tab ${currentTab === 'vendors' ? 'active' : ''}" data-tab="vendors">
        <span>📞</span>
        <span>${t('vendors')}</span>
      </button>
      <button class="nav-tab ${currentTab === 'settings' ? 'active' : ''}" data-tab="settings">
        <span>⚙️</span>
        <span>${t('settings')}</span>
      </button>
  `;
  } else if (currentUser.role === 'coordinator') {
    return `
      <button class="nav-tab ${currentTab === 'mytasks' ? 'active' : ''}" data-tab="mytasks">
        <span>✅</span>
        <span>${t('myTasks')}</span>
      </button>
      <button class="nav-tab ${currentTab === 'events' ? 'active' : ''}" data-tab="events">
        <span>📅</span>
        <span>${t('events')}</span>
      </button>
      <button class="nav-tab ${currentTab === 'meals' ? 'active' : ''}" data-tab="meals">
        <span>🍽️</span>
        <span>${t('meals')}</span>
      </button>
      <button class="nav-tab ${currentTab === 'guests' ? 'active' : ''}" data-tab="guests">
        <span>👤</span>
        <span>${t('guests')}</span>
      </button>
      <button class="nav-tab ${currentTab === 'vendors' ? 'active' : ''}" data-tab="vendors">
        <span>📞</span>
        <span>${t('vendors')}</span>
      </button>
      <button class="nav-tab ${currentTab === 'team' ? 'active' : ''}" data-tab="team">
        <span>👥</span>
        <span>${t('team')}</span>
      </button>
  `;
  } else {
    return `
      <button class="nav-tab ${currentTab === 'events' ? 'active' : ''}" data-tab="events">
        <span>📅</span>
        <span>${t('schedule')}</span>
      </button>
      <button class="nav-tab ${currentTab === 'travel' ? 'active' : ''}" data-tab="travel">
        <span>🚌</span>
        <span>${t('travel')}</span>
      </button>
      <button class="nav-tab ${currentTab === 'meals' ? 'active' : ''}" data-tab="meals">
        <span>🍽️</span>
        <span>${t('meals')}</span>
      </button>
      <button class="nav-tab ${currentTab === 'myroom' ? 'active' : ''}" data-tab="myroom">
        <span>🏨</span>
        <span>${t('myRoom')}</span>
      </button>
      <button class="nav-tab ${currentTab === 'help' ? 'active' : ''}" data-tab="help">
        <span>📞</span>
        <span>${t('help')}</span>
      </button>
  `;
  }
}

// Switch Tab
function switchTab(tabName) {
  currentTab = tabName;
  renderDashboard();
}

// Get Tab Content
function getTabContent() {
  if (currentUser.role === 'admin') {
    switch (currentTab) {
      case 'dashboard': return renderAdminDashboard();
      case 'events': return renderAdminEvents();
      case 'guests': return renderAdminGuests();
      case 'tasks': return renderAdminTasks();
      case 'vendors': return renderAdminVendors();
      case 'settings': return renderAdminSettings();
      default: return renderAdminDashboard();
    }
  } else if (currentUser.role === 'coordinator') {
    switch (currentTab) {
      case 'mytasks': return renderMyTasks();
      case 'events': return renderEventsTab();
      case 'meals': return renderMealsTab();
      case 'guests': return renderGuestListTab();
      case 'vendors': return renderVendorsTab();
      case 'team': return renderTeamTab();
      default: return renderMyTasks();
    }
  } else {
    switch (currentTab) {
      case 'events': return renderEventsTabGuest();
      case 'travel': return renderTravelTab();
      case 'meals': return renderMealsTab();
      case 'myroom': return renderMyRoomTab();
      case 'help': return renderContactsTab();
      default: return renderEventsTabGuest();
    }
  }
}

// Render My Tasks (Coordinator Only) - TIME AWARE
function renderMyTasks() {
  const coord = currentUser.coordinator;
  if (!coord) return `<div class="empty-state"><span>🤔</span>${t('noTasksAssigned')}</div>`;

  const countdown = getWeddingCountdown();
  const phase = getWeddingPhase();
  const now = new Date();
  const currentTime = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  });
  const currentDate = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata'
  });

  // Get tasks based on phase
  const myTasks = getCoordinatorTasks(coord.name, phase);

  return `
    <div class="countdown-banner ${countdown.isWeddingDay ? 'wedding-day' : ''}">
      <div class="current-time">
        <span class="time-display">🕐 ${currentTime}</span>
        <span class="date-display">${currentDate}</span>
      </div>
      <div class="countdown-text">
        ${countdown.isWeddingDay ? '🎊' : '⏱️'} ${countdown.text}
      </div>
    </div>
    
    <div class="section-header">
      <span class="emoji">👋</span>
      <h2>${t('hello')}, ${coord.name.split(' ')[0]}!</h2>
    </div>
    
    <div class="phase-indicator">
      <span class="phase-label">${t('currentPhase')}:</span>
      <span class="phase-badge ${phase}">${phase === 'pre-wedding' ? '📋 ' + t('preWeddingPrep') :
      phase === 'day1' ? '🌻 ' + t('haldiSangeet') :
        phase === 'day2' ? '💒 ' + t('weddingDay') :
          phase === 'day3' ? '🎉 ' + t('reception') :
            '✅ ' + t('complete')
    }</span>
    </div>
    
    ${phase === 'pre-wedding' ? renderPreWeddingTasks(myTasks, coord) : renderDayTasks(myTasks, phase, coord)}
    
    <div class="coordinator-card">
      <div class="coordinator-header">
        <div class="coordinator-avatar">${coord.name.charAt(0)}</div>
        <div class="coordinator-info">
          <h3>${coord.role} ${coord.isLead ? '<span class="lead-badge">LEAD</span>' : ''}</h3>
          <p class="coordinator-role">${coord.roleHindi}</p>
        </div>
      </div>
      <div class="coordinator-events">📅 Active: ${coord.events}</div>
    </div>
    
    <div class="quick-actions">
      <h3>⚡ ${t('quickActions')}</h3>
      <div class="action-buttons">
        <button class="action-btn" onclick="switchTab('vendors')">📞 ${t('callVendors')}</button>
        <button class="action-btn" onclick="switchTab('team')">👥 ${t('viewTeam')}</button>
        <button class="action-btn" onclick="switchTab('events')">📅 ${t('fullSchedule')}</button>
        <button class="action-btn" onclick="switchTab('guests')">👤 ${t('guestList')}</button>
      </div>
    </div>
    
    <div class="escalation-card">
      <h3>🚨 ${t('escalationContacts')}</h3>
      <div class="escalation-item"><strong>${t('paymentScope')}:</strong> ${WEDDING_DATA.escalation.payment}</div>
      <div class="escalation-item"><strong>${t('general')}:</strong> ${WEDDING_DATA.escalation.general}</div>
      <div class="escalation-item"><strong>${t('resort')}:</strong> ${WEDDING_DATA.escalation.resort24_25}</div>
      <div class="escalation-item"><strong>${t('banquet')}:</strong> ${WEDDING_DATA.escalation.banquet26}</div>
    </div>
    
    <div class="rules-card">
      <h3>📜 ${t('importantRules')}</h3>
      <ul>
        ${WEDDING_DATA.rules.map(rule => `<li>${rule}</li>`).join('')}
      </ul>
    </div>
  `;
}

// Render Pre-Wedding Tasks
function renderPreWeddingTasks(tasks, coord) {
  const today = new Date().toISOString().split('T')[0];

  // Sort by due date
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // Categorize tasks
  const overdue = sortedTasks.filter(t => t.dueDate < today && !completedTasks.includes(t.task));
  const dueToday = sortedTasks.filter(t => t.dueDate === today && !completedTasks.includes(t.task));
  const upcoming = sortedTasks.filter(t => t.dueDate> today && !completedTasks.includes(t.task));
  const completed = sortedTasks.filter(t => completedTasks.includes(t.task));

  return `
    <div class="my-tasks">
      <h3>📋 ${t('preWeddingTasks')} (${tasks.length - completed.length} ${t('pending')})</h3>
      
      ${overdue.length> 0 ? `
        <div class="task-group overdue">
          <h4>⚠️ ${t('overdue')}</h4>
          ${overdue.map(task => renderPreWeddingTaskItem(task)).join('')}
        </div>
      ` : ''
    }
      
      ${dueToday.length> 0 ? `
        <div class="task-group today">
          <h4>📌 ${t('dueToday')}</h4>
          ${dueToday.map(task => renderPreWeddingTaskItem(task)).join('')}
        </div>
      ` : ''
    }
      
      ${upcoming.length> 0 ? `
        <div class="task-group upcoming">
          <h4>📅 ${t('upcoming')}</h4>
          ${upcoming.map(task => renderPreWeddingTaskItem(task)).join('')}
        </div>
      ` : ''
    }
      
      ${completed.length> 0 ? `
        <div class="task-group completed">
          <h4>✅ ${t('completed')} (${completed.length})</h4>
          ${completed.map(task => renderPreWeddingTaskItem(task, true)).join('')}
        </div>
      ` : ''
    }
      
      ${tasks.length === 0 ? `
        <div class="empty-state small">
          <span>✨</span>
          <p>${t('noTasksAssigned')}</p>
        </div>
      ` : ''
    }
    </div>

    <div class="all-prewedding-tasks">
      <h3>📋 ${t('allTeamTasks')}</h3>
      <p style="color:#666;font-size:0.85rem;margin-bottom:0.75rem;">${t('overview')} - ${t('beforeWedding')}</p>
      ${PRE_WEDDING_TASKS.map(task => `
        <div class="mini-task ${task.priority} ${completedTasks.includes(task.task) ? 'done' : ''}">
          <span class="mini-task-date">${formatDueDate(task.dueDate)}</span>
          <span class="mini-task-text">${task.task}</span>
          <span class="mini-task-assignee">${task.assignee}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderPreWeddingTaskItem(task, isDone = false) {
  const priorityEmoji = task.priority === 'critical' ? '🔴' : task.priority === 'high' ? '🟠' : task.priority === 'medium' ? '🟡' : '🟢';
  return `
    <div class="task-item ${isDone ? 'done' : ''} ${task.priority}">
      <div class="task-checkbox ${isDone ? 'checked' : ''}"
        onclick="toggleTask('${task.task.replace(/'/g, "\\'")}') "></div>
          <div class="task-content">
        <span class="task-text ${isDone ? 'done' : ''}">${priorityEmoji} ${task.task}</span>
        <span class="task-due">Due: ${formatDueDate(task.dueDate)}</span>
      </div>
    </div>
    `;
}

function formatDueDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short'
  });
}

// Render Day Tasks (for wedding days)
function renderDayTasks(tasks, phase, coord) {
  const dayNum = phase.replace('day', '');
  const allDayTasks = DAY_TASKS[dayNum] || [];

  return `
    <div class="day-selector">
      <button class="day-btn ${phase === 'day1' ? 'active' : ''}" onclick="previewDay('24')">${t('day1')} (24th)</button>
      <button class="day-btn ${phase === 'day2' ? 'active' : ''}" onclick="previewDay('25')">${t('day2')} (25th)</button>
      <button class="day-btn ${phase === 'day3' ? 'active' : ''}" onclick="previewDay('26')">${t('day3')} (26th)</button>
    </div>
    
    <div class="my-tasks">
      <h3>🕐 ${t('yourTasksForDay')} ${dayNum} (${tasks.length} ${t('tasksLabel')})</h3>
      
      ${tasks.length> 0 ? tasks.map(task => `
        <div class="task-item day-task ${completedTasks.includes(task.task) ? 'done' : ''}">
          <div class="task-checkbox ${completedTasks.includes(task.task) ? 'checked' : ''}" 
               onclick="toggleTask('${task.task.replace(/'/g, "\\'")}')"></div>
          <div class="task-content">
            <span class="task-time">${task.time}</span>
            <span class="task-text ${completedTasks.includes(task.task) ? 'done' : ''}">${task.task}</span>
          </div>
        </div>
      `).join('') : `
        <div class="empty-state small">
          <span>✨</span>
          <p>${t('noTasksAssigned')}</p>
        </div>
      `}
    </div>
    
    <div class="all-day-tasks">
      <h3>📋 ${t('fullDayTimeline')}</h3>
      <p style="color:#666;font-size:0.85rem;margin-bottom:0.75rem;">${t('allTeamTasks')}</p>
      ${allDayTasks.map(task => `
        <div class="timeline-task ${completedTasks.includes(task.task) ? 'done' : ''}">
          <span class="timeline-time">${task.time}</span>
          <span class="timeline-text">${task.task}</span>
          <span class="timeline-assignee">${task.assignee}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// Preview different day's tasks (for coordinators)
function previewDay(day) {
  // Store selected day and re-render
  selectedPreviewDay = day;
  renderDashboard();
}

let selectedPreviewDay = null;

// Toggle Task
function toggleTask(task) {
  if (completedTasks.includes(task)) {
    completedTasks = completedTasks.filter(t => t !== task);
  } else {
    completedTasks.push(task);
  }
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  renderDashboard();
}

// Render Events Tab (Coordinator)
function renderEventsTab() {
  const eventsByDate = {};
  WEDDING_DATA.events.forEach(event => {
    if (!eventsByDate[event.date]) {
      eventsByDate[event.date] = [];
    }
    eventsByDate[event.date].push(event);
  });

  return `
    <div class="section-header">
      <span class="emoji">📅</span>
      <h2>${t('weddingSchedule')}</h2>
    </div>

    ${Object.entries(eventsByDate).map(([date, events]) => `
      <div class="date-header">
        <h3>${date}</h3>
        <span class="day-badge">${getDay(events[0].day)}</span>
      </div>
      ${events.map(event => `
        <div class="event-card ${event.category}">
          <div class="event-header">
            <span class="event-emoji">${event.emoji}</span>
            <span class="event-time-badge">${event.time}</span>
          </div>
          <h3 class="event-name">${getEventName(event.name)}</h3>
          <div class="event-details">
            <div class="event-detail">📍 ${event.venue}</div>
            <div class="event-detail">👔 ${event.dressCode}</div>
          </div>
          <p class="event-description">${event.description}</p>
        </div>
      `).join('')}
    `).join('')
    }
  `;
}

// Render Events Tab for Guests
function renderEventsTabGuest() {
  const eventsByDate = {};
  WEDDING_DATA.events.forEach(event => {
    if (!eventsByDate[event.date]) {
      eventsByDate[event.date] = [];
    }
    eventsByDate[event.date].push(event);
  });

  return `
    <div class="section-header">
      <span class="emoji">📅</span>
      <h2>${t('weddingSchedule')}</h2>
    </div>

    <div class="reminder-banner">
      <span>🔔</span>
      <span>${t('reminderTip')}</span>
    </div>
    
    ${Object.entries(eventsByDate).map(([date, events]) => `
      <div class="date-header">
        <h3>${date}</h3>
        <span class="day-badge">${getDay(events[0].day)}</span>
      </div>
      ${events.map(event => `
        <div class="event-card ${event.category}">
          <div class="event-header">
            <span class="event-emoji">${event.emoji}</span>
            <div class="event-header-right">
              <span class="event-time-badge">${event.time}</span>
              ${event.reminderBefore> 0 ? `
                <button class="reminder-btn ${reminders.includes(event.id) ? 'active' : ''}" 
                        onclick="toggleReminder(${event.id})">
                  ${reminders.includes(event.id) ? '🔔' : '🔕'}
                </button>
              ` : ''}
            </div>
          </div>
          <h3 class="event-name">${getEventName(event.name)}</h3>
          <div class="event-details">
            <div class="event-detail">📍 ${event.venue}</div>
            <div class="event-detail">👔 ${event.dressCode}</div>
          </div>
          <p class="event-description">${event.description}</p>
          ${reminders.includes(event.id) ? `
            <div class="reminder-set">✅ ${t('reminderSet')} ${event.reminderBefore} ${t('minBefore')}</div>
          ` : ''}
        </div>
      `).join('')}
    `).join('')
    }
  `;
}

// Render Travel Tab (Bus Info)
function renderTravelTab() {
  const lang = currentLanguage;

  return `
    <div class="section-header">
      <span class="emoji">🚌</span>
      <h2>${t('busTravel')}</h2>
    </div>
    
    <div class="travel-card pickup">
      <div class="travel-header">
        <span class="travel-icon">🚌➡️🏨</span>
        <div>
          <h3>${t('pickupFromHome')}</h3>
          <p class="travel-date">${BUS_TRAVEL.pickup.date}</p>
        </div>
      </div>
      <div class="travel-time">
        <span class="time-badge">${BUS_TRAVEL.pickup.time}</span>
        <span class="arrival-info">→ ${t('arrivalTime')}: ${BUS_TRAVEL.pickup.arrivalAtResort}</span>
      </div>
      <p class="travel-desc">${BUS_TRAVEL.pickup.description[lang] || BUS_TRAVEL.pickup.description.en}</p>
      <div class="travel-details">
        <p>📋 ${BUS_TRAVEL.pickup.details[lang] || BUS_TRAVEL.pickup.details.en}</p>
        <p>👤 ${t('coordinator')}: <strong>${BUS_TRAVEL.pickup.coordinator}</strong></p>
      </div>
    </div>
    
    <div class="travel-card drop">
      <div class="travel-header">
        <span class="travel-icon">🏨➡️🏠</span>
        <div>
          <h3>${t('dropToHome')}</h3>
          <p class="travel-date">${BUS_TRAVEL.drop.date}</p>
        </div>
      </div>
      <div class="travel-time">
        <span class="time-badge">${BUS_TRAVEL.drop.time}</span>
      </div>
      <p class="travel-desc">${BUS_TRAVEL.drop.description[lang] || BUS_TRAVEL.drop.description.en}</p>
      <div class="travel-details">
        <p>📋 ${BUS_TRAVEL.drop.details[lang] || BUS_TRAVEL.drop.details.en}</p>
        <p>👤 ${t('coordinator')}: <strong>${BUS_TRAVEL.drop.coordinator}</strong></p>
      </div>
    </div>
    
    <div class="travel-note">
      <p>⚠️ ${t('arriveOnTime')}</p>
    </div>
  `;
}

// Render My Room Tab
function renderMyRoomTab() {
  const guestInfo = currentUser.guestInfo;

  if (!guestInfo || !guestInfo.room) {
    return `
    <div class="section-header">
        <span class="emoji">🏨</span>
        <h2>${t('yourRoom')}</h2>
      </div>

    <div class="empty-state">
      <span>🔍</span>
      <p>${t('noRoomAssignment')}</p>
      <p style="font-size:0.85rem;margin-top:0.5rem;color:#666;">
        ${t('pleaseContactCoordinator')}
      </p>
    </div>
  `;
  }

  return `
    <div class="section-header">
      <span class="emoji">🏨</span>
      <h2>${t('yourRoom')}</h2>
    </div>
    
    <div class="room-card">
      <div class="room-icon">🏠</div>
      <div class="room-info">
        <h3>${t('roomName')}</h3>
        <p class="room-number">${guestInfo.room}</p>
      </div>
    </div>
    
    <div class="room-details">
      <div class="room-detail-item">
        <span class="detail-label">${t('guestCount')}</span>
        <span class="detail-value">${guestInfo.count} ${t('guests')}</span>
      </div>
      <div class="room-detail-item">
        <span class="detail-label">📍 ${t('location')}</span>
        <span class="detail-value">Natraj Resort</span>
      </div>
    </div>
    
    <div class="room-note">
      <p>📌 ${t('checkIn')}: 24 January, ${t('after')} 12 PM</p>
      <p>📌 ${t('checkOut')}: 26 January, ${t('by')} 10:30 AM</p>
    </div>
  `;
}

// Render Meals Tab
function renderMealsTab() {
  return `
    <div class="section-header">
      <span class="emoji">🍽️</span>
      <h2>${t('mealSchedule')}</h2>
    </div>

    <p class="meals-intro">${t('allVegetarian')}</p>
    
    ${WEDDING_DATA.meals.map(dayMeals => `
      <div class="meal-day-card">
        <div class="meal-day-header">
          <h3>${dayMeals.date}</h3>
          <span class="day-badge">${getDay(dayMeals.day)}</span>
        </div>
        
        ${dayMeals.slots.map(slot => `
          <div class="meal-slot">
            <div class="meal-slot-header">
              <span class="meal-time">🕐 ${slot.time}</span>
              <span class="meal-name">${slot.name}</span>
              <span class="meal-guests">${slot.guests} ${t('guests')}</span>
            </div>
            <ul class="meal-items">
              ${slot.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `).join('')
    }
  `;
}

// Render Vendors Tab (Coordinator Only)
function renderVendorsTab() {
  return `
    <div class="section-header">
      <span class="emoji">📞</span>
      <h2>${t('vendors')}</h2>
    </div>

    ${WEDDING_DATA.vendors.map(vendor => `
      <div class="vendor-card">
        <h3 class="vendor-area">${vendor.area}</h3>
        <p class="vendor-days">📅 ${vendor.days}</p>
        <div class="vendor-contact">
          <p class="vendor-name">${vendor.contact}</p>
          <a href="tel:${vendor.phone}" class="call-btn">📞 ${t('call')} ${vendor.phone}</a>
          ${vendor.phone2 ? `<a href="tel:${vendor.phone2}" class="call-btn">📞 ${vendor.phone2}</a>` : ''}
        </div>
        <p class="vendor-poc"><strong>POC:</strong> ${vendor.poc}</p>
      </div>
    `).join('')
    }
  `;
}

// Render Team Tab (Coordinator Only)
function renderTeamTab() {
  return `
    <div class="section-header">
      <span class="emoji">👥</span>
      <h2>${t('team')}</h2>
    </div>

    ${WEDDING_DATA.coordinators.map(coord => `
      <div class="coordinator-card">
        <div class="coordinator-header">
          <div class="coordinator-avatar">${coord.name.charAt(0)}</div>
          <div class="coordinator-info">
            <h3>${coord.name} ${coord.isLead ? '<span class="lead-badge">LEAD</span>' : ''}</h3>
            <p class="coordinator-role">${coord.role}</p>
          </div>
        </div>
        <div class="coordinator-events">📅 ${coord.events}</div>
        <ul class="coordinator-tasks">
          ${coord.tasks.map(task => `<li>${task}</li>`).join('')}
        </ul>
      </div>
    `).join('')
    }
  `;
}

// Render Guest List Tab (Coordinator Only)
function renderGuestListTab() {
  const totalGuests = GUEST_LIST.reduce((sum, g) => sum + g.count, 0);

  return `
    <div class="section-header">
      <span class="emoji">👤</span>
      <h2>${t('guestList')}</h2>
    </div>
    
    <div class="guest-summary">
      <div class="summary-item">
        <span class="summary-number">${GUEST_LIST.length}</span>
        <span class="summary-label">${t('familiesGroups')}</span>
      </div>
      <div class="summary-item">
        <span class="summary-number">${totalGuests}</span>
        <span class="summary-label">${t('totalGuestsLabel')}</span>
      </div>
    </div>
    
    <div class="guest-list">
      ${GUEST_LIST.filter(g => g.room).map(guest => `
        <div class="guest-card">
          <div class="guest-main">
            <div class="guest-name">${guest.name}</div>
            <div class="guest-count">${guest.count} ${t('pax')}</div>
          </div>
          <div class="guest-details">
            <div class="guest-room">
              <span class="room-icon">🏨</span>
              <span>${guest.room}</span>
            </div>
            ${guest.phone ? `
              <a href="tel:${guest.phone}" class="guest-phone">
                📞 ${guest.phone}
              </a>
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Render Contacts Tab (Guest/Family)
function renderContactsTab() {
  const leadCoords = WEDDING_DATA.coordinators.filter(c => c.isLead);

  return `
    <div class="section-header">
      <span class="emoji">📞</span>
      <h2>${t('needHelp')}</h2>
    </div>

    <p style="color:#666;margin-bottom:1rem;font-size:0.9rem;">${t('contactCoordinators')}</p>
    
    ${leadCoords.map(coord => `
      <div class="coordinator-card">
        <div class="coordinator-header">
          <div class="coordinator-avatar">${coord.name.charAt(0)}</div>
          <div class="coordinator-info">
            <h3>${coord.name}</h3>
            <p class="coordinator-role">${coord.role}</p>
          </div>
        </div>
        <div class="coordinator-events">📅 ${coord.events}</div>
      </div>
    `).join('')
    }
  `;
}

// =============================================
// ADMIN DASHBOARD FUNCTIONS
// =============================================

// Admin Dashboard - Overview
function renderAdminDashboard() {
  const countdown = getWeddingCountdown();
  const events = getEditableEvents();
  const guests = getEditableGuests();
  const totalGuests = guests.reduce((sum, g) => sum + (g.count || 1), 0);

  return `
    <div class="admin-header">
      <span class="admin-crown">👑</span>
      <h2>${t('welcome')}, ${currentUser.name}!</h2>
      <p class="admin-subtitle">${t('fullAdminAccess')}</p>
    </div>
    
    <div class="countdown-banner ${countdown.isWeddingDay ? 'wedding-day' : ''}">
      <div class="countdown-text">
        ${countdown.isWeddingDay ? '🎊' : '⏱️'} ${countdown.text}
      </div>
    </div>
    
    <div class="admin-stats">
      <div class="stat-card">
        <span class="stat-number">${events.length}</span>
        <span class="stat-label">${t('events')}</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">${guests.length}</span>
        <span class="stat-label">${t('families')}</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">${totalGuests}</span>
        <span class="stat-label">${t('totalGuestsLabel')}</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">${WEDDING_DATA.coordinators.length}</span>
        <span class="stat-label">${t('coordinators')}</span>
      </div>
    </div>
    
    <div class="admin-quick-actions">
      <h3>⚡ ${t('quickActions')}</h3>
      <div class="admin-action-grid">
        <button class="admin-action-btn" onclick="switchTab('events')">➕ ${t('addEvent')}</button>
        <button class="admin-action-btn" onclick="switchTab('guests')">👤 ${t('addGuest')}</button>
        <button class="admin-action-btn" onclick="switchTab('tasks')">✅ ${t('addTask')}</button>
        <button class="admin-action-btn" onclick="switchTab('vendors')">📞 ${t('viewVendors')}</button>
      </div>
    </div>
    
    <div class="admin-section">
      <h3>📋 ${t('recentActivity')}</h3>
      <p style="color:#666;font-size:0.85rem;">${t('allChangesSavedLocally')}</p>
    </div>
  `;
}

// Admin Events - Add/Edit/Delete
function renderAdminEvents() {
  const events = getEditableEvents();
  const eventsByDate = {};
  events.forEach(event => {
    if (!eventsByDate[event.date]) eventsByDate[event.date] = [];
    eventsByDate[event.date].push(event);
  });

  return `
    <div class="section-header">
      <span class="emoji">📅</span>
      <h2>${t('manageEventsTitle')}</h2>
    </div>
    
    <button class="add-btn" onclick="showAddEventForm()">➕ ${t('addNewEvent')}</button>
    
    <div id="eventFormContainer"></div>
    
    ${Object.entries(eventsByDate).map(([date, dayEvents]) => `
      <div class="date-header">
        <h3>${date}</h3>
      </div>
      ${dayEvents.map(event => `
        <div class="admin-event-card">
          <div class="event-main">
            <span class="event-emoji">${event.emoji}</span>
            <div class="event-info">
              <strong>${getEventName(event.name)}</strong>
              <span class="event-time">${event.time} • ${event.venue}</span>
            </div>
          </div>
          <div class="event-actions">
            <button class="edit-btn" onclick="editEventForm(${event.id})">✏️</button>
            <button class="delete-btn" onclick="confirmDeleteEvent(${event.id})">🗑️</button>
          </div>
        </div>
      `).join('')}
    `).join('')
    }
  `;
}

// Admin Guests - Add/Edit/Delete
function renderAdminGuests() {
  const guests = getEditableGuests();
  const totalGuests = guests.reduce((sum, g) => sum + (g.count || 1), 0);

  return `
    <div class="section-header">
      <span class="emoji">👤</span>
      <h2>${t('manageGuestsTitle')} (${totalGuests} ${t('total')})</h2>
    </div>
    
    <button class="add-btn" onclick="showAddGuestForm()">➕ ${t('addGuest')}</button>
    
    <div id="guestFormContainer"></div>
    
    ${guests.map(guest => `
      <div class="admin-guest-card">
        <div class="guest-main">
          <div class="guest-info">
            <strong>${guest.name}</strong>
            <span class="guest-count-badge">${guest.count || 1} ${t('pax')}</span>
          </div>
          ${guest.room ? `<span class="guest-room-badge">🏨 ${guest.room}</span>` : ''}
        </div>
        <div class="guest-actions">
          <button class="edit-btn" onclick="editGuestForm(${guest.id})">✏️</button>
          <button class="delete-btn" onclick="confirmDeleteGuest(${guest.id})">🗑️</button>
        </div>
      </div>
    `).join('')
    }
  `;
}

// Admin Tasks
function renderAdminTasks() {
  return `
    <div class="section-header">
      <span class="emoji">✅</span>
      <h2>${t('manageTasksTitle')}</h2>
    </div>
    
    <button class="add-btn" onclick="showAddTaskForm()">➕ ${t('addTask')}</button>
    
    <div id="taskFormContainer"></div>
    
    <h3 style="margin:1rem 0 0.5rem;">${t('preWeddingTasks')}</h3>
    ${editableData.preWeddingTasks.map(task => `
      <div class="admin-task-card">
        <div class="task-main">
          <span class="priority-dot ${task.priority}"></span>
          <div class="task-info">
            <strong>${task.task}</strong>
            <span>Due: ${formatDueDate(task.dueDate)} • ${task.assignee}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="delete-btn" onclick="confirmDeleteTask(${task.id})">🗑️</button>
        </div>
      </div>
    `).join('')
    }
    
    <h3 style="margin:1.5rem 0 0.5rem;">${t('weddingDayTasks')}</h3>
    <p style="color:#666;font-size:0.85rem;">${t('day1')}: ${DAY_TASKS['24'].length} ${t('tasksLabel')} | ${t('day2')}: ${DAY_TASKS['25'].length} ${t('tasksLabel')} | ${t('day3')}: ${DAY_TASKS['26'].length} ${t('tasksLabel')}</p>
  `;
}

// Admin Vendors
function renderAdminVendors() {
  return `
    <div class="section-header">
      <span class="emoji">📞</span>
      <h2>${t('vendorDirectory')}</h2>
    </div>

    ${WEDDING_DATA.vendors.map(vendor => `
      <div class="admin-vendor-card">
        <div class="vendor-header">
          <h4>${vendor.area}</h4>
          <span class="vendor-days">${vendor.days}</span>
        </div>
        <div class="vendor-contact-row">
          <span>${vendor.contact}</span>
          <a href="tel:${vendor.phone}" class="call-btn-small">📞 ${vendor.phone}</a>
        </div>
        <div class="vendor-poc">${t('poc')}: ${vendor.poc}</div>
      </div>
    `).join('')
    }
  `;
}

// Admin Settings
function renderAdminSettings() {
  const allCoords = getAllCoordinators();

  // Default OTPs (same across all devices)
  const defaultOTPs = {
    "Vicky Nagar": "1111",
    "Priyanshu Thakur": "2222",
    "Jay Nagar": "3333",
    "Hardik Nagar": "4444",
    "Preyarsh Nagar": "5555",
    "Pooja Nagar": "6666",
    "Himani Chauhan": "7777",
    "Mukesh Nagar": "8888",
    "Jayant Chauhan": "9999"
  };

  return `
    <div class="section-header">
      <span class="emoji">⚙️</span>
      <h2>${t('settings')}</h2>
    </div>
    
    <!--Coordinator OTP Management-->
    <div class="settings-section">
      <h3>🎯 ${t('coordinatorAccessCodes')}</h3>
      <p style="color:#666;font-size:0.85rem;margin-bottom:1rem;">
        Share these access codes with coordinators. These codes are fixed and work on all devices.
      </p>
      
      <div class="coordinator-otp-list">
        ${allCoords.filter(c => !c.isCustom).map(coord => `
          <div class="coordinator-otp-card">
            <div class="coord-info">
              <div class="coord-avatar">${coord.name.charAt(0)}</div>
              <div class="coord-details">
                <strong>${coord.name}</strong>
                <span class="coord-role">${coord.role || t('coordinator')}</span>
              </div>
            </div>
            <div class="coord-otp">
              <span class="otp-display otp-fixed">${defaultOTPs[coord.name] || '----'}</span>
              <button class="otp-btn copy-btn" onclick="copyOTP('${defaultOTPs[coord.name] || ''}', '${coord.name}')" title="Copy OTP">📋</button>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="otp-note" style="background:#e8f5e9;padding:12px;border-radius:8px;margin-top:1rem;font-size:0.85rem;">
        <strong>💡 Tip:</strong> These OTPs are permanent and work on any device. Just share the code with each coordinator!
      </div>
    </div>
    
    <!--Change Admin Password-->
    <div class="settings-section">
      <h3>🔐 ${t('adminPassword')}</h3>
      <p style="color:#666;font-size:0.85rem;margin-bottom:1rem;">
        ${t('changePasswordDesc')}
      </p>
      
      <button class="settings-btn" onclick="showChangePasswordForm()">
        🔑 ${t('changePassword')}
      </button>
      <div id="changePasswordForm"></div>
    </div>
    
    <!--Data Management-->
    <div class="settings-section">
      <h3>🔄 ${t('dataManagement')}</h3>
      <p style="color:#666;font-size:0.85rem;margin-bottom:1rem;">${t('dataLocalNote')}</p>
      
      <button class="settings-btn warning" onclick="confirmResetData()">
        🔄 ${t('resetToDefaults')}
      </button>
      
      <button class="settings-btn" onclick="exportData()">
        📥 ${t('exportData')}
      </button>
    </div>
    
    <div class="settings-section">
      <h3>📱 ${t('appInfo')}</h3>
      <div class="info-row">
        <span>${t('version')}</span>
        <span>2.0.0</span>
      </div>
      <div class="info-row">
        <span>${t('adminUser')}</span>
        <span>${currentUser.name}</span>
      </div>
      <div class="info-row">
        <span>${t('totalCoordinators')}</span>
        <span>${allCoords.length}</span>
      </div>
      <div class="info-row">
        <span>${t('totalGuests')}</span>
        <span>${GUEST_LIST.length}</span>
      </div>
    </div>
  `;
}

// Copy OTP to clipboard
function copyOTP(otp, coordinatorName) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(otp).then(() => {
      alert(`✅ OTP "${otp}" for ${coordinatorName} copied to clipboard!`);
    }).catch(() => {
      prompt(`Copy this OTP for ${coordinatorName}:`, otp);
    });
  } else {
    prompt(`Copy this OTP for ${coordinatorName}:`, otp);
  }
}

// Change admin password form
function showChangePasswordForm() {
  const container = document.getElementById('changePasswordForm');
  container.innerHTML = `
    <div class="admin-form change-password-form">
      <h4>${t('changePassword')}</h4>
      <div class="form-group">
        <label>${t('currentPassword')}</label>
        <input type="password" id="currentPwd" placeholder="${t('currentPassword')}" required>
      </div>
      <div class="form-group">
        <label>${t('newPassword')}</label>
        <input type="password" id="newPwd" placeholder="${t('newPassword')}" required>
      </div>
      <div class="form-group">
        <label>${t('confirmPassword')}</label>
        <input type="password" id="confirmPwd" placeholder="${t('confirmPassword')}" required>
      </div>
      <div class="form-buttons">
        <button onclick="saveNewPassword()">${t('changePassword')}</button>
        <button onclick="hideChangePasswordForm()" class="cancel">${t('cancel')}</button>
      </div>
    </div>
    `;
}

function hideChangePasswordForm() {
  document.getElementById('changePasswordForm').innerHTML = '';
}

function saveNewPassword() {
  const currentPwd = document.getElementById('currentPwd').value;
  const newPwd = document.getElementById('newPwd').value;
  const confirmPwd = document.getElementById('confirmPwd').value;

  if (newPwd !== confirmPwd) {
    alert('New passwords do not match!');
    return;
  }

  if (newPwd.length < 4) {
    alert('Password must be at least 4 characters!');
    return;
  }

  const result = changeAdminPassword(currentPwd, newPwd);

  if (result.success) {
    alert('Password changed successfully!');
    hideChangePasswordForm();
  } else {
    alert(`Error: ${result.error} `);
  }
}

// =============================================
// ADMIN FORM FUNCTIONS
// =============================================

function showAddEventForm() {
  const container = document.getElementById('eventFormContainer');
  container.innerHTML = `
    <div class="admin-form">
      <h4>${t('addNewEvent')}</h4>
      <input type="text" id="eventName" placeholder="${t('eventName')}" required>
      <input type="date" id="eventDate" required>
      <input type="time" id="eventTime" required>
      <input type="text" id="eventVenue" placeholder="${t('venue')}">
      <input type="text" id="eventEmoji" placeholder="${t('emoji')} (e.g. 🎉)" value="🎉">
      <input type="text" id="eventDress" placeholder="${t('dressCode')}" value="Traditional">
      <textarea id="eventDesc" placeholder="${t('description')}"></textarea>
      <div class="form-buttons">
        <button onclick="saveNewEvent()">${t('save')}</button>
        <button onclick="hideEventForm()" class="cancel">${t('cancel')}</button>
      </div>
    </div>
  `;
}

function hideEventForm() {
  document.getElementById('eventFormContainer').innerHTML = '';
}

function saveNewEvent() {
  const dateVal = document.getElementById('eventDate').value;
  const timeVal = document.getElementById('eventTime').value;
  const date = new Date(dateVal);
  const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const event = {
    date: formattedDate,
    day: days[date.getDay()],
    name: document.getElementById('eventName').value,
    time: formatTime(timeVal),
    venue: document.getElementById('eventVenue').value,
    emoji: document.getElementById('eventEmoji').value || '🎉',
    dressCode: document.getElementById('eventDress').value || 'Traditional',
    description: document.getElementById('eventDesc').value,
    category: 'custom',
    reminderBefore: 30
  };

  addEvent(event);
  hideEventForm();
  renderDashboard();
}

function formatTime(time24) {
  const [h, m] = time24.split(':');
  const hour = parseInt(h);
  const ampm = hour>= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${m} ${ampm}`;
}

function confirmDeleteEvent(eventId) {
  if (confirm('Are you sure you want to delete this event?')) {
    deleteEvent(eventId);
    renderDashboard();
  }
}

function showAddGuestForm() {
  const container = document.getElementById('guestFormContainer');
  container.innerHTML = `
    <div class="admin-form">
      <h4>${t('addGuest')}</h4>
      <input type="text" id="guestName" placeholder="${t('name')}" required>
      <input type="tel" id="guestPhone" placeholder="${t('phone')}">
      <input type="number" id="guestCount" placeholder="${t('guestCount')}" value="1" min="1">
      <input type="text" id="guestRoom" placeholder="${t('roomAssignment')}">
      <div class="form-buttons">
        <button onclick="saveNewGuest()">${t('save')}</button>
        <button onclick="hideGuestForm()" class="cancel">${t('cancel')}</button>
      </div>
    </div>
  `;
}

function hideGuestForm() {
  document.getElementById('guestFormContainer').innerHTML = '';
}

function saveNewGuest() {
  const guest = {
    name: document.getElementById('guestName').value,
    phone: document.getElementById('guestPhone').value,
    count: parseInt(document.getElementById('guestCount').value) || 1,
    room: document.getElementById('guestRoom').value
  };

  addGuest(guest);
  hideGuestForm();
  renderDashboard();
}

function confirmDeleteGuest(guestId) {
  if (confirm('Are you sure you want to remove this guest?')) {
    deleteGuest(guestId);
    renderDashboard();
  }
}

function showAddTaskForm() {
  const container = document.getElementById('taskFormContainer');
  container.innerHTML = `
    <div class="admin-form">
      <h4>${t('addPreWeddingTask')}</h4>
      <input type="text" id="taskName" placeholder="${t('description')}" required>
      <input type="date" id="taskDue" required>
      <select id="taskAssignee">
        ${WEDDING_DATA.coordinators.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
      </select>
      <select id="taskPriority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high" selected>High</option>
        <option value="critical">Critical</option>
      </select>
      <div class="form-buttons">
        <button onclick="saveNewTask()">${t('save')}</button>
        <button onclick="hideTaskForm()" class="cancel">${t('cancel')}</button>
      </div>
    </div>
  `;
}

function hideTaskForm() {
  document.getElementById('taskFormContainer').innerHTML = '';
}

function saveNewTask() {
  const task = {
    task: document.getElementById('taskName').value,
    dueDate: document.getElementById('taskDue').value,
    assignee: document.getElementById('taskAssignee').value,
    priority: document.getElementById('taskPriority').value
  };

  addPreWeddingTask(task);
  hideTaskForm();
  renderDashboard();
}

function confirmDeleteTask(taskId) {
  if (confirm('Are you sure you want to delete this task?')) {
    deletePreWeddingTask(taskId);
    renderDashboard();
  }
}

function confirmResetData() {
  if (confirm('Are you sure you want to reset ALL data to defaults? This cannot be undone.')) {
    resetToDefaults();
    renderDashboard();
    alert('All data has been reset to defaults.');
  }
}

function exportData() {
  const data = JSON.stringify(editableData, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wedding-data.json';
  a.click();
}

// Make functions globally accessible
window.logout = logout;
window.toggleTask = toggleTask;
window.toggleReminder = toggleReminder;
window.setLanguage = setLanguage;
window.showAddEventForm = showAddEventForm;
window.hideEventForm = hideEventForm;
window.saveNewEvent = saveNewEvent;
window.confirmDeleteEvent = confirmDeleteEvent;
window.editEventForm = editEventForm;
window.showAddGuestForm = showAddGuestForm;
window.hideGuestForm = hideGuestForm;
window.saveNewGuest = saveNewGuest;
window.confirmDeleteGuest = confirmDeleteGuest;
window.showAddTaskForm = showAddTaskForm;
window.hideTaskForm = hideTaskForm;
window.saveNewTask = saveNewTask;
window.confirmDeleteTask = confirmDeleteTask;
window.confirmResetData = confirmResetData;
window.exportData = exportData;
window.saveEditedEvent = saveEditedEvent;
window.editGuestForm = editGuestForm;
window.saveEditedGuest = saveEditedGuest;
window.copyOTP = copyOTP;

function editEventForm(eventId) {
  const events = getEditableEvents();
  const event = events.find(e => e.id === eventId);
  if (!event) {
    alert('Event not found!');
    return;
  }

  // Parse the date from the event
  const dateParts = event.date.match(/(\d+)\s+(\w+)\s+(\d+)/);
  let dateValue = '';
  if (dateParts) {
    const months = { 'January': '01', 'February': '02', 'March': '03', 'April': '04', 'May': '05', 'June': '06', 'July': '07', 'August': '08', 'September': '09', 'October': '10', 'November': '11', 'December': '12' };
    const day = dateParts[1].padStart(2, '0');
    const month = months[dateParts[2]] || '01';
    const year = dateParts[3];
    dateValue = `${year}-${month}-${day}`;
  }

  // Parse the time from the event
  const timeMatch = event.time.match(/^(\d+):(\d+)\s*(AM|PM)/i);
  let timeValue = '';
  if (timeMatch) {
    let hour = parseInt(timeMatch[1]);
    const minute = timeMatch[2];
    const ampm = timeMatch[3].toUpperCase();
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    timeValue = `${hour.toString().padStart(2, '0')}:${minute}`;
  }

  const container = document.getElementById('eventFormContainer');
  container.innerHTML = `
    <div class="admin-form">
      <h4>✏️ ${t('edit')} ${t('events')}</h4>
      <input type="text" id="editEventName" placeholder="${t('eventName')}" value="${event.name}" required>
      <input type="date" id="editEventDate" value="${dateValue}" required>
      <input type="time" id="editEventTime" value="${timeValue}" required>
      <input type="text" id="editEventVenue" placeholder="${t('venue')}" value="${event.venue || ''}">
      <input type="text" id="editEventEmoji" placeholder="${t('emoji')} (e.g. 🎉)" value="${event.emoji || '🎉'}">
      <input type="text" id="editEventDress" placeholder="${t('dressCode')}" value="${event.dressCode || 'Traditional'}">
      <textarea id="editEventDesc" placeholder="${t('description')}">${event.description || ''}</textarea>
      <select id="editEventCategory">
        <option value="main" ${event.category === 'main' ? 'selected' : ''}>Main Event</option>
        <option value="meal" ${event.category === 'meal' ? 'selected' : ''}>Meal</option>
        <option value="ritual" ${event.category === 'ritual' ? 'selected' : ''}>Ritual</option>
        <option value="travel" ${event.category === 'travel' ? 'selected' : ''}>Travel</option>
        <option value="custom" ${event.category === 'custom' ? 'selected' : ''}>Custom</option>
      </select>
      <div class="form-buttons">
        <button onclick="saveEditedEvent(${eventId})">💾 ${t('save')}</button>
        <button onclick="hideEventForm()" class="cancel">${t('cancel')}</button>
      </div>
    </div>
  `;

  // Scroll to form
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function saveEditedEvent(eventId) {
  const dateVal = document.getElementById('editEventDate').value;
  const timeVal = document.getElementById('editEventTime').value;
  const date = new Date(dateVal);
  const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const updates = {
    date: formattedDate,
    day: days[date.getDay()],
    name: document.getElementById('editEventName').value,
    time: formatTime(timeVal),
    venue: document.getElementById('editEventVenue').value,
    emoji: document.getElementById('editEventEmoji').value || '🎉',
    dressCode: document.getElementById('editEventDress').value || 'Traditional',
    description: document.getElementById('editEventDesc').value,
    category: document.getElementById('editEventCategory').value
  };

  if (updateEvent(eventId, updates)) {
    hideEventForm();
    renderDashboard();
  } else {
    alert('Failed to update event!');
  }
}

function editGuestForm(guestId) {
  const guests = getEditableGuests();
  const guest = guests.find(g => g.id === guestId);
  if (!guest) {
    alert('Guest not found!');
    return;
  }

  const container = document.getElementById('guestFormContainer');
  container.innerHTML = `
    <div class="admin-form">
      <h4>✏️ ${t('edit')} ${t('guest')}</h4>
      <input type="text" id="editGuestName" placeholder="${t('name')}" value="${guest.name}" required>
      <input type="tel" id="editGuestPhone" placeholder="${t('phone')}" value="${guest.phone || ''}">
      <input type="number" id="editGuestCount" placeholder="${t('guestCount')}" value="${guest.count || 1}" min="1">
      <input type="text" id="editGuestRoom" placeholder="${t('roomAssignment')}" value="${guest.room || ''}">
      <div class="form-buttons">
        <button onclick="saveEditedGuest(${guestId})">💾 ${t('save')}</button>
        <button onclick="hideGuestForm()" class="cancel">${t('cancel')}</button>
      </div>
    </div>
  `;

  // Scroll to form
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function saveEditedGuest(guestId) {
  const updates = {
    name: document.getElementById('editGuestName').value,
    phone: document.getElementById('editGuestPhone').value,
    count: parseInt(document.getElementById('editGuestCount').value) || 1,
    room: document.getElementById('editGuestRoom').value
  };

  if (updateGuest(guestId, updates)) {
    hideGuestForm();
    renderDashboard();
  } else {
    alert('Failed to update guest!');
  }
}
