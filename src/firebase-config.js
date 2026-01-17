// ============================================
// 🔥 FIREBASE REAL-TIME SYNC CONFIGURATION
// ============================================
// This enables all users to see the same data across ALL devices instantly!

// ============================================
// SETUP INSTRUCTIONS (5 minutes):
// ============================================
// 1. Go to https://console.firebase.google.com/
// 2. Click "Create a project" → Name it "wedding-app-sync"
// 3. Disable Google Analytics (optional) → Create Project
// 4. Once created, click the web icon </> to add a web app
// 5. Register app name: "wedding-web"
// 6. Copy ONLY the config values below (apiKey, authDomain, etc.)
// 7. Go to Build → Realtime Database → Create Database
// 8. Choose your region → Start in TEST MODE → Enable
// 9. Paste your config values below and save this file
// ============================================

const firebaseConfig = {
    // ⬇️ PASTE YOUR FIREBASE CONFIG HERE ⬇️
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
    // ⬆️ PASTE YOUR FIREBASE CONFIG HERE ⬆️
};

// ============================================
// FIREBASE INITIALIZATION
// ============================================

const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";
let db = null;
let firebaseInitialized = false;
let connectionStatus = 'disconnected';
let lastSyncTime = null;

// Initialize Firebase
function initFirebase() {
    if (!isFirebaseConfigured) {
        console.warn("⚠️ Firebase not configured. App running in offline mode.");
        connectionStatus = 'not_configured';
        updateSyncStatusUI();
        return false;
    }
    
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        
        // Monitor connection state
        db.ref('.info/connected').on('value', (snapshot) => {
            if (snapshot.val() === true) {
                connectionStatus = 'connected';
                lastSyncTime = new Date();
                console.log("✅ Firebase connected - Real-time sync active!");
            } else {
                connectionStatus = 'disconnected';
                console.log("⚠️ Firebase disconnected - Working offline");
            }
            updateSyncStatusUI();
        });
        
        firebaseInitialized = true;
        return true;
    } catch (error) {
        console.error("Firebase initialization error:", error);
        connectionStatus = 'error';
        updateSyncStatusUI();
        return false;
    }
}

// Update sync status UI element if it exists
function updateSyncStatusUI() {
    const statusEl = document.getElementById('syncStatusIndicator');
    if (statusEl) {
        const statusConfig = {
            'connected': { icon: '🟢', text: 'Live Sync Active', class: 'sync-connected' },
            'disconnected': { icon: '🟡', text: 'Reconnecting...', class: 'sync-reconnecting' },
            'not_configured': { icon: '⚪', text: 'Offline Mode', class: 'sync-offline' },
            'error': { icon: '🔴', text: 'Sync Error', class: 'sync-error' }
        };
        const status = statusConfig[connectionStatus] || statusConfig['disconnected'];
        statusEl.innerHTML = `<span class="sync-dot ${status.class}">${status.icon}</span><span class="sync-label">${status.text}</span>`;
        statusEl.className = `sync-status-badge ${status.class}`;
    }
}

// ============================================
// REAL-TIME DATA SYNC FUNCTIONS
// ============================================

// === TASK COMPLETION SYNC ===
function initTaskCompletionSync() {
    if (!firebaseInitialized) return;
    
    db.ref('completedTasks').on('value', (snapshot) => {
        const data = snapshot.val() || {};
        const completedArray = Object.keys(data).filter(key => data[key] === true);
        
        // Update local storage
        localStorage.setItem('completedTasks', JSON.stringify(completedArray));
        
        // Update app state
        if (typeof window.completedTasks !== 'undefined') {
            window.completedTasks = completedArray;
        }
        
        // Re-render if app is loaded
        triggerAppRefresh();
        
        console.log("📋 Task completion synced:", completedArray.length, "tasks completed");
    });
}

// Mark task complete/incomplete (syncs to all devices)
function syncMarkTaskComplete(taskId, isComplete) {
    const taskIdStr = taskId.toString();
    
    // Update local state immediately for responsive UI
    let completed = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    if (isComplete) {
        if (!completed.includes(taskIdStr)) completed.push(taskIdStr);
    } else {
        completed = completed.filter(t => t !== taskIdStr);
    }
    localStorage.setItem('completedTasks', JSON.stringify(completed));
    
    // Sync to Firebase
    if (firebaseInitialized) {
        db.ref('completedTasks/' + sanitizeKey(taskIdStr)).set(isComplete)
            .then(() => console.log("✅ Task sync successful"))
            .catch(err => console.error("Task sync failed:", err));
    }
    
    return completed;
}

// === CUSTOM TASKS SYNC (Admin added tasks) ===
function initCustomTasksSync() {
    if (!firebaseInitialized) return;
    
    db.ref('customTasks').on('value', (snapshot) => {
        const tasks = snapshot.val();
        const tasksArray = tasks ? Object.values(tasks) : [];
        localStorage.setItem('customTasks', JSON.stringify(tasksArray));
        triggerAppRefresh();
        console.log("📝 Custom tasks synced:", tasksArray.length, "tasks");
    });
}

// Add custom task (syncs to all devices)
function syncAddCustomTask(task) {
    const taskWithId = {
        ...task,
        id: 'custom_' + Date.now(),
        createdAt: new Date().toISOString(),
        createdBy: 'admin'
    };
    
    if (firebaseInitialized) {
        db.ref('customTasks').push(taskWithId)
            .then(() => console.log("✅ Custom task added and synced"))
            .catch(err => {
                console.error("Custom task sync failed:", err);
                // Fallback to local storage
                saveCustomTaskLocally(taskWithId);
            });
    } else {
        saveCustomTaskLocally(taskWithId);
    }
    
    return taskWithId;
}

function saveCustomTaskLocally(task) {
    let customTasks = JSON.parse(localStorage.getItem('customTasks') || '[]');
    customTasks.push(task);
    localStorage.setItem('customTasks', JSON.stringify(customTasks));
}

// Delete custom task
function syncDeleteCustomTask(taskId) {
    // Remove locally first
    let customTasks = JSON.parse(localStorage.getItem('customTasks') || '[]');
    customTasks = customTasks.filter(t => t.id !== taskId);
    localStorage.setItem('customTasks', JSON.stringify(customTasks));
    
    // Remove from Firebase
    if (firebaseInitialized) {
        db.ref('customTasks').orderByChild('id').equalTo(taskId).once('value', (snapshot) => {
            snapshot.forEach((child) => {
                child.ref.remove();
            });
        });
    }
}

// === EVENTS SYNC ===
function initEventsSync() {
    if (!firebaseInitialized) return;
    
    db.ref('events').on('value', (snapshot) => {
        const events = snapshot.val();
        if (events) {
            const eventsArray = Object.values(events);
            // Update editable data
            if (window.editableData) {
                window.editableData.events = eventsArray;
                window.saveEditableData(window.editableData);
            }
            triggerAppRefresh();
            console.log("📅 Events synced:", eventsArray.length, "events");
        }
    });
}

// Sync event changes
function syncEvent(event, action = 'update') {
    if (!firebaseInitialized) return;
    
    if (action === 'delete') {
        db.ref('events').orderByChild('id').equalTo(event.id).once('value', (snapshot) => {
            snapshot.forEach((child) => child.ref.remove());
        });
    } else {
        db.ref('events').orderByChild('id').equalTo(event.id).once('value', (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((child) => child.ref.update(event));
            } else {
                db.ref('events').push(event);
            }
        });
    }
}

// === GUESTS SYNC ===
function initGuestsSync() {
    if (!firebaseInitialized) return;
    
    db.ref('guests').on('value', (snapshot) => {
        const guests = snapshot.val();
        if (guests) {
            const guestsArray = Object.values(guests);
            if (window.editableData) {
                window.editableData.guests = guestsArray;
                window.saveEditableData(window.editableData);
            }
            triggerAppRefresh();
            console.log("👥 Guests synced:", guestsArray.length, "guests");
        }
    });
}

// Sync guest changes
function syncGuest(guest, action = 'update') {
    if (!firebaseInitialized) return;
    
    if (action === 'delete') {
        db.ref('guests').orderByChild('id').equalTo(guest.id).once('value', (snapshot) => {
            snapshot.forEach((child) => child.ref.remove());
        });
    } else {
        db.ref('guests').orderByChild('id').equalTo(guest.id).once('value', (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((child) => child.ref.update(guest));
            } else {
                db.ref('guests').push(guest);
            }
        });
    }
}

// === ANNOUNCEMENTS (Live messages to all users) ===
function initAnnouncementsSync() {
    if (!firebaseInitialized) return;
    
    db.ref('announcements').orderByChild('timestamp').limitToLast(5).on('value', (snapshot) => {
        const announcements = [];
        snapshot.forEach((child) => {
            announcements.push({ key: child.key, ...child.val() });
        });
        localStorage.setItem('announcements', JSON.stringify(announcements.reverse()));
        triggerAppRefresh();
    });
}

// Send announcement (admin only)
function syncSendAnnouncement(message, priority = 'normal') {
    if (!firebaseInitialized) return;
    
    const announcement = {
        message: message,
        priority: priority,
        timestamp: Date.now(),
        sender: 'Admin'
    };
    
    db.ref('announcements').push(announcement);
}

// === ACTIVITY LOG (Track who did what) ===
function logActivity(action, details) {
    if (!firebaseInitialized) return;
    
    const activity = {
        action: action,
        details: details,
        user: window.currentUser ? window.currentUser.name : 'Unknown',
        timestamp: Date.now()
    };
    
    db.ref('activityLog').push(activity);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Sanitize keys for Firebase (can't have . $ # [ ] /)
function sanitizeKey(key) {
    return String(key).replace(/[.#$\[\]\/]/g, '_');
}

// Trigger app refresh without full reload
function triggerAppRefresh() {
    if (typeof window.renderApp === 'function' && 
        typeof window.currentUser !== 'undefined' && 
        window.currentUser) {
        // Debounce to prevent rapid re-renders
        clearTimeout(window._refreshTimeout);
        window._refreshTimeout = setTimeout(() => {
            window.renderApp();
        }, 100);
    }
}

// Get sync status
function getSyncStatus() {
    return {
        isOnline: navigator.onLine,
        isFirebaseConfigured: isFirebaseConfigured,
        isFirebaseConnected: firebaseInitialized && connectionStatus === 'connected',
        connectionStatus: connectionStatus,
        lastSyncTime: lastSyncTime
    };
}

// Initialize all data from Firebase (for new devices)
function initializeFromFirebase() {
    if (!firebaseInitialized) return Promise.resolve(false);
    
    return Promise.all([
        db.ref('events').once('value'),
        db.ref('guests').once('value'),
        db.ref('completedTasks').once('value'),
        db.ref('customTasks').once('value')
    ]).then(([events, guests, completed, customTasks]) => {
        console.log("📥 Initial data loaded from Firebase");
        return true;
    }).catch(err => {
        console.error("Failed to load initial data:", err);
        return false;
    });
}

// Push all local data to Firebase (first-time setup)
function pushAllDataToFirebase() {
    if (!firebaseInitialized) return Promise.resolve(false);
    
    const events = window.getEditableEvents ? window.getEditableEvents() : window.WEDDING_DATA.events;
    const guests = window.getEditableGuests ? window.getEditableGuests() : window.GUEST_LIST;
    
    // Clear existing and push fresh
    return Promise.all([
        db.ref('events').set(null).then(() => {
            events.forEach(event => db.ref('events').push(event));
        }),
        db.ref('guests').set(null).then(() => {
            guests.forEach(guest => db.ref('guests').push(guest));
        })
    ]).then(() => {
        console.log("📤 All data pushed to Firebase");
        return true;
    }).catch(err => {
        console.error("Failed to push data:", err);
        return false;
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    if (initFirebase()) {
        // Start all sync listeners
        initTaskCompletionSync();
        initCustomTasksSync();
        initEventsSync();
        initGuestsSync();
        initAnnouncementsSync();
        
        // Load initial data
        initializeFromFirebase();
        
        console.log("🔥 Firebase real-time sync initialized!");
    }
});

// ============================================
// EXPORT TO WINDOW
// ============================================

window.firebaseSync = {
    // Status
    getSyncStatus,
    isConfigured: () => isFirebaseConfigured,
    isConnected: () => firebaseInitialized && connectionStatus === 'connected',
    
    // Task operations
    markTaskComplete: syncMarkTaskComplete,
    addCustomTask: syncAddCustomTask,
    deleteCustomTask: syncDeleteCustomTask,
    
    // Event operations
    syncEvent,
    
    // Guest operations
    syncGuest,
    
    // Announcements
    sendAnnouncement: syncSendAnnouncement,
    
    // Activity logging
    logActivity,
    
    // Setup
    pushAllDataToFirebase,
    initializeFromFirebase
};

// Also expose individual functions
window.getSyncStatus = getSyncStatus;
window.updateSyncStatusUI = updateSyncStatusUI;
