// ============================================
// PWA FUNCTIONALITY
// Install prompt, offline detection, updates
// ============================================

let deferredPrompt = null;
let isAppInstalled = false;

// ============================================
// SERVICE WORKER REGISTRATION
// ============================================

function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('✅ Service Worker registered:', registration.scope);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New update available
                            showUpdateBanner();
                        }
                    });
                });
                
                // Check for updates every 5 minutes
                setInterval(() => {
                    registration.update();
                }, 5 * 60 * 1000);
            })
            .catch(err => console.log('SW registration failed:', err));
        
        // Handle controller change (new SW took over)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('New service worker activated');
        });
    }
}

// ============================================
// INSTALL PROMPT
// ============================================

// Capture the install prompt
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('📱 Install prompt available');
    e.preventDefault();
    deferredPrompt = e;
    
    // Check if already dismissed recently
    const dismissed = localStorage.getItem('installDismissed');
    const dismissedTime = dismissed ? parseInt(dismissed) : 0;
    const hoursSinceDismiss = (Date.now() - dismissedTime) / (1000 * 60 * 60);
    
    // Show banner if not dismissed in last 24 hours
    if (hoursSinceDismiss > 24 && !isAppInstalled) {
        setTimeout(() => {
            showInstallBanner();
        }, 3000); // Show after 3 seconds
    }
});

// Check if app is installed
window.addEventListener('appinstalled', () => {
    console.log('✅ App installed successfully!');
    isAppInstalled = true;
    hideInstallBanner();
    deferredPrompt = null;
    
    // Show thank you message
    if (typeof alert !== 'undefined') {
        setTimeout(() => {
            alert('🎉 Wedding App installed! You can now access it from your home screen.');
        }, 500);
    }
});

// Check if running as installed PWA
if (window.matchMedia('(display-mode: standalone)').matches || 
    window.navigator.standalone === true) {
    isAppInstalled = true;
    console.log('Running as installed PWA');
}

function showInstallBanner() {
    const banner = document.getElementById('installBanner');
    if (banner && deferredPrompt) {
        banner.classList.add('show');
    }
}

function hideInstallBanner() {
    const banner = document.getElementById('installBanner');
    if (banner) {
        banner.classList.remove('show');
    }
}

function installApp() {
    if (!deferredPrompt) {
        // iOS doesn't support beforeinstallprompt
        showIOSInstallInstructions();
        return;
    }
    
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted install');
        } else {
            console.log('User dismissed install');
        }
        deferredPrompt = null;
        hideInstallBanner();
    });
}

function dismissInstall() {
    hideInstallBanner();
    localStorage.setItem('installDismissed', Date.now().toString());
}

function showIOSInstallInstructions() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        alert(
            '📱 To install this app on iOS:\n\n' +
            '1. Tap the Share button (📤) at the bottom\n' +
            '2. Scroll down and tap "Add to Home Screen"\n' +
            '3. Tap "Add" in the top right\n\n' +
            'The app will appear on your home screen!'
        );
    } else {
        alert(
            '📱 To install this app:\n\n' +
            'Look for the install icon in your browser\'s address bar, ' +
            'or use your browser menu to "Add to Home Screen"'
        );
    }
    hideInstallBanner();
}

// ============================================
// OFFLINE DETECTION
// ============================================

function updateOnlineStatus() {
    const indicator = document.getElementById('offlineIndicator');
    if (!indicator) return;
    
    if (!navigator.onLine) {
        indicator.classList.add('show');
        document.body.classList.add('offline');
    } else {
        indicator.classList.remove('show');
        document.body.classList.remove('offline');
    }
}

window.addEventListener('online', () => {
    console.log('🌐 Back online');
    updateOnlineStatus();
    
    // Trigger Firebase reconnect
    if (window.firebaseSync) {
        console.log('Reconnecting to Firebase...');
    }
});

window.addEventListener('offline', () => {
    console.log('📡 Gone offline');
    updateOnlineStatus();
});

// ============================================
// UPDATE HANDLING
// ============================================

function showUpdateBanner() {
    const banner = document.getElementById('updateBanner');
    if (banner) {
        banner.classList.add('show');
    }
}

function updateApp() {
    // Skip waiting and reload
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            if (registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
        });
    }
    
    // Reload page to get new version
    window.location.reload(true);
}

// ============================================
// WEDDING QUICK ACTIONS
// ============================================

// Share wedding details
function shareWedding() {
    const shareData = {
        title: '💒 Dharmesh & Neha Wedding',
        text: 'Join us for our wedding celebration! 24-26 January 2026 at Natraj Resort, Ahemdabad',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Shared successfully'))
            .catch(err => console.log('Share failed:', err));
    } else {
        // Fallback: copy to clipboard
        const text = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
        navigator.clipboard.writeText(text).then(() => {
            alert('📋 Wedding details copied to clipboard!');
        }).catch(() => {
            prompt('Copy wedding details:', text);
        });
    }
}

// Add to calendar
function addToCalendar(eventName = 'Dharmesh & Neha Wedding') {
    // Create ICS file content for the wedding
    const events = [
        {
            name: 'Dharmesh & Neha - Haldi & Sangeet',
            start: '2026-01-24T10:00:00',
            end: '2026-01-24T23:59:00',
            location: 'Natraj Resort, Ahemdabad',
            description: 'Haldi ceremony followed by Sangeet night'
        },
        {
            name: 'Dharmesh & Neha - Wedding Day',
            start: '2026-01-25T07:00:00',
            end: '2026-01-25T23:59:00',
            location: 'Natraj Resort, Ahemdabad',
            description: 'Main wedding ceremony - Fera, Jaimala, and celebrations'
        },
        {
            name: 'Dharmesh & Neha - Reception',
            start: '2026-01-26T18:00:00',
            end: '2026-01-26T23:59:00',
            location: 'Natraj Resort, Ahemdabad',
            description: 'Wedding reception party'
        }
    ];
    
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding App//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;
    
    events.forEach(event => {
        const startDate = new Date(event.start).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const endDate = new Date(event.end).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        
        icsContent += `BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${event.name}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
`;
    });
    
    icsContent += 'END:VCALENDAR';
    
    // Download ICS file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Dharmesh_Neha_Wedding.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('📅 Calendar events downloaded! Open the file to add to your calendar.');
}

// Call emergency contact
function callEmergency(type = 'general') {
    const contacts = {
        general: 'tel:+91XXXXXXXXXX', // Dharmesh's number
        coordinator: 'tel:+91XXXXXXXXXX', // Main coordinator
        resort: 'tel:+91XXXXXXXXXX' // Resort contact
    };
    
    window.location.href = contacts[type] || contacts.general;
}

// Navigate to venue
function navigateToVenue() {
    const venueLocation = 'Natraj Resort, Ahemdabad, Gujarat, India';
    const encodedLocation = encodeURIComponent(venueLocation);
    
    // Check if on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Try to open maps app
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
            window.location.href = `maps://maps.google.com/maps?q=${encodedLocation}`;
        } else {
            window.location.href = `geo:0,0?q=${encodedLocation}`;
        }
    } else {
        // Open Google Maps in new tab
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
    }
}

// ============================================
// NOTIFICATION PERMISSION
// ============================================

async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        console.log('Notifications not supported');
        return false;
    }
    
    if (Notification.permission === 'granted') {
        return true;
    }
    
    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    
    return false;
}

function showNotification(title, body, tag = 'wedding') {
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: './public/icons/icon-192.svg',
            badge: './public/icons/icon-192.svg',
            tag: tag,
            vibrate: [200, 100, 200]
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize service worker
    initServiceWorker();
    
    // Check online status
    updateOnlineStatus();
    
    // Show install banner for returning visitors
    const visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
    localStorage.setItem('visitCount', visitCount.toString());
    
    if (visitCount >= 2 && !isAppInstalled) {
        // Show install banner on second visit
        setTimeout(() => {
            if (deferredPrompt) {
                showInstallBanner();
            }
        }, 5000);
    }
    
    console.log('🎊 Wedding App PWA initialized');
});

// ============================================
// EXPOSE GLOBAL FUNCTIONS
// ============================================

window.installApp = installApp;
window.dismissInstall = dismissInstall;
window.updateApp = updateApp;
window.shareWedding = shareWedding;
window.addToCalendar = addToCalendar;
window.callEmergency = callEmergency;
window.navigateToVenue = navigateToVenue;
window.requestNotificationPermission = requestNotificationPermission;
window.showNotification = showNotification;
