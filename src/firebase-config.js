// Firebase Configuration for Real-time Sync
// This enables all users to see the same data across all devices

// ============================================
// IMPORTANT: You need to set up your own Firebase project
// ============================================
// 1. Go to https://console.firebase.google.com/
// 2. Click "Create a project" (name it "wedding-app" or similar)
// 3. Once created, click the web icon </> to add a web app
// 4. Copy the config values below
// 5. Go to Realtime Database → Create Database → Start in TEST MODE
// 6. Replace the placeholder values below with your actual config
// ============================================

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Check if Firebase config is set up
const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

let db = null;
let firebaseInitialized = false;

// Initialize Firebase
function initFirebase() {
    if (!isFirebaseConfigured) {
        console.warn("⚠️ Firebase not configured. App will use local storage only.");
        console.warn("To enable real-time sync, set up Firebase config in firebase-config.js");
        return false;
    }
    
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        firebaseInitialized = true;
        console.log("✅ Firebase initialized - Real-time sync enabled!");
        return true;
    } catch (error) {
        console.error("Firebase initialization error:", error);
        return false;
    }
}

// ============================================
// SYNC FUNCTIONS
// ============================================

// Sync completed tasks across all devices
function syncCompletedTasks() {
    if (!firebaseInitialized) return;
    
    // Listen for changes
    db.ref('completedTasks').on('value', (snapshot) => {
        const data = snapshot.val() || {};
        const completedArray = Object.keys(data).filter(key => data[key] === true);
        
        // Update local storage and app state
        localStorage.setItem('completedTasks', JSON.stringify(completedArray));
        if (typeof window.completedTasks !== 'undefined') {
            window.completedTasks = completedArray;
        }
        
        // Re-render if app is loaded
        if (typeof renderApp === 'function' && typeof currentUser !== 'undefined' && currentUser) {
            renderApp();
        }
    });
}

// Mark task as complete (sync to all devices)
function markTaskComplete(taskId, isComplete) {
    // Save locally first
    let completed = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    if (isComplete) {
        if (!completed.includes(taskId)) {
            completed.push(taskId);
        }
    } else {
        completed = completed.filter(t => t !== taskId);
    }
    localStorage.setItem('completedTasks', JSON.stringify(completed));
    
    // Update app state
    if (typeof window.completedTasks !== 'undefined') {
        window.completedTasks = completed;
    }
    
    // Sync to Firebase
    if (firebaseInitialized) {
        db.ref('completedTasks/' + sanitizeKey(taskId)).set(isComplete);
    }
}

// Sync custom tasks added by admin
function syncCustomTasks() {
    if (!firebaseInitialized) return;
    
    db.ref('customTasks').on('value', (snapshot) => {
        const tasks = snapshot.val() || [];
        localStorage.setItem('customTasks', JSON.stringify(Object.values(tasks)));
        
        // Re-render if app is loaded
        if (typeof renderApp === 'function' && typeof currentUser !== 'undefined' && currentUser) {
            renderApp();
        }
    });
}

// Add a custom task (admin only)
function addCustomTask(task) {
    const taskWithId = {
        ...task,
        id: 'custom_' + Date.now(),
        createdAt: new Date().toISOString()
    };
    
    // Save locally
    let customTasks = JSON.parse(localStorage.getItem('customTasks') || '[]');
    customTasks.push(taskWithId);
    localStorage.setItem('customTasks', JSON.stringify(customTasks));
    
    // Sync to Firebase
    if (firebaseInitialized) {
        db.ref('customTasks').push(taskWithId);
    }
    
    return taskWithId;
}

// Delete a custom task
function deleteCustomTask(taskId) {
    // Remove locally
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

// Sync event attendance/RSVPs
function syncAttendance() {
    if (!firebaseInitialized) return;
    
    db.ref('attendance').on('value', (snapshot) => {
        const data = snapshot.val() || {};
        localStorage.setItem('eventAttendance', JSON.stringify(data));
    });
}

// Mark attendance
function markAttendance(eventId, guestId, status) {
    const key = `${eventId}_${guestId}`;
    
    // Save locally
    let attendance = JSON.parse(localStorage.getItem('eventAttendance') || '{}');
    attendance[key] = status;
    localStorage.setItem('eventAttendance', JSON.stringify(attendance));
    
    // Sync to Firebase
    if (firebaseInitialized) {
        db.ref('attendance/' + sanitizeKey(key)).set(status);
    }
}

// Helper to sanitize Firebase keys (can't have . $ # [ ] /)
function sanitizeKey(key) {
    return key.replace(/[.#$\[\]\/]/g, '_');
}

// Get sync status
function getSyncStatus() {
    return {
        isOnline: navigator.onLine,
        isFirebaseConfigured: isFirebaseConfigured,
        isFirebaseConnected: firebaseInitialized
    };
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    if (initFirebase()) {
        syncCompletedTasks();
        syncCustomTasks();
        syncAttendance();
    }
});

// Export for use in other files
window.firebaseSync = {
    markTaskComplete,
    addCustomTask,
    deleteCustomTask,
    markAttendance,
    getSyncStatus,
    isConfigured: () => isFirebaseConfigured,
    isConnected: () => firebaseInitialized
};
