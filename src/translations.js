// Wedding App - Multi-Language Support & Enhanced Data

// Language translations
const TRANSLATIONS = {
    en: {
        // App title
        welcome: "Welcome",
        weddingOf: "'s Wedding",
        enterApp: "Enter Wedding App 🎉",
        yourName: "Your Name",
        phoneNumber: "Phone Number (Optional)",
        enterName: "Enter your name",
        enterPhone: "Enter phone number",
        logout: "Logout",
        admin: "Admin",

        // Roles
        coordinator: "Coordinator",
        family: "Family",
        guest: "Guest",

        // Tabs
        schedule: "Schedule",
        meals: "Meals",
        venues: "Venues",
        help: "Help",
        myTasks: "My Tasks",
        events: "Events",
        vendors: "Vendors",
        team: "Team",
        travel: "Travel",
        myRoom: "My Room",
        dashboard: "Dashboard",
        guests: "Guests",
        tasks: "Tasks",
        settings: "Settings",

        // Schedule
        weddingSchedule: "Wedding Schedule",
        reminderTip: "Tap the bell icon to set reminders!",
        reminderSet: "Reminder set for",
        minBefore: "min before",

        // Meals
        mealSchedule: "Meal Schedule",
        allVegetarian: "Complete menu for all wedding days. All meals are vegetarian.",
        guestsCount: "guests",

        // Travel
        busTravel: "Bus Travel",
        pickupFromHome: "Pickup from Home",
        dropToHome: "Drop to Home",
        busDetails: "Bus Details",
        pickupPoint: "Pickup Point",
        dropPoint: "Drop Point",
        arrivalTime: "Arrival",
        busWontWait: "Please arrive at the pickup point on time. The bus will not wait.",

        // Room
        yourRoom: "Your Room",
        roomAssignment: "Room Assignment",
        guestCount: "Guest Count",
        roomName: "Room Name/Number",
        noRoomFound: "No room assignment found for your name.",
        contactCoordinator: "Please contact a coordinator.",

        // Misc
        needHelp: "Need Help?",
        contactCoordinators: "Contact these coordinators if you need any assistance.",
        openMaps: "Open in Google Maps",
        call: "Call",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        add: "Add",
        back: "Back",
        tryAgain: "Try Again",

        // Authentication
        adminLogin: "Admin Login",
        coordinatorLogin: "Coordinator Login",
        enterPassword: "Please enter your admin password",
        enterOTP: "Please enter your 4-digit access code",
        password: "Password",
        accessCode: "Access Code",
        unlockAdmin: "Unlock Admin",
        verifyEnter: "Verify & Enter",
        incorrectPassword: "Incorrect password. Please try again.",
        incorrectOTP: "Incorrect access code. Please try again.",
        contactAdminForOTP: "Contact admin if you don't have your access code",
        accessDenied: "Access Denied",
        notOnGuestList: "Sorry, you are not on the guest list.",
        appOnlyFor: "This wedding app is only for:",
        brideGroom: "Bride & Groom (Admin)",
        coordinators: "Coordinators",
        familyMembers: "Family Members",
        invitedGuests: "Invited Guests",
        contactIfError: "If you believe this is an error, please contact a coordinator.",

        // Admin Dashboard
        adminDashboard: "Admin Dashboard",
        quickStats: "Quick Stats",
        totalEvents: "Total Events",
        totalGuests: "Total Guests",
        totalCoordinators: "Total Coordinators",
        daysToWedding: "Days to Wedding",
        quickActions: "Quick Actions",
        manageEvents: "Manage Events",
        manageGuests: "Manage Guests",
        manageTasks: "Manage Tasks",
        viewVendors: "View Vendors",

        // Admin Settings
        coordinatorAccessCodes: "Coordinator Access Codes",
        manageOTPDesc: "Manage 4-digit OTPs for coordinator login. Share these codes securely with your coordinators.",
        generateNewOTP: "Generate New OTP",
        editOTP: "Edit OTP",
        remove: "Remove",
        addNewCoordinator: "Add New Coordinator",
        adminPassword: "Admin Password",
        changePasswordDesc: "Change the password used for admin login.",
        changePassword: "Change Admin Password",
        currentPassword: "Current Password",
        newPassword: "New Password",
        confirmPassword: "Confirm New Password",
        passwordChanged: "Password changed successfully!",
        passwordsDontMatch: "New passwords do not match!",
        passwordTooShort: "Password must be at least 4 characters!",
        dataManagement: "Data Management",
        dataLocalNote: "All changes are saved locally on this device",
        resetToDefaults: "Reset All Data to Defaults",
        exportData: "Export Data (JSON)",
        appInfo: "App Info",
        version: "Version",
        adminUser: "Admin User",

        // Coordinator Features
        hello: "Hello",
        currentPhase: "Current Phase",
        preWeddingPrep: "Pre-Wedding Prep",
        haldiSangeet: "Day 1 - Haldi/Sangeet",
        weddingDay: "Day 2 - Wedding",
        reception: "Day 3 - Reception",
        complete: "Complete",
        pending: "pending",
        overdue: "Overdue",
        dueToday: "Due Today",
        upcoming: "Upcoming",
        completed: "Completed",
        yourTasksForDay: "Your Tasks for Day",
        fullDayTimeline: "Full Day Timeline",
        allTeamTasks: "All Team Pre-Wedding Tasks",
        escalationContacts: "Escalation Contacts",
        paymentScope: "Payment/Scope",
        general: "General",
        resort: "Resort (24-25)",
        banquet: "Banquet (26)",
        importantRules: "Important Rules",
        callVendors: "Call Vendors",
        viewTeam: "View Team",
        fullSchedule: "Full Schedule",
        guestList: "Guest List",

        // Forms
        eventName: "Event Name",
        eventDate: "Date",
        eventTime: "Time",
        venue: "Venue",
        emoji: "Emoji",
        dressCode: "Dress Code",
        description: "Description",
        name: "Name",
        phone: "Phone",
        role: "Role",
        eventsAssignment: "Events Assignment",
        addEvent: "Add Event",
        addGuest: "Add Guest",
        addTask: "Add Task"
    },

    hi: {
        // App title
        welcome: "स्वागत है",
        weddingOf: " की शादी",
        enterApp: "शादी ऐप में प्रवेश करें 🎉",
        yourName: "आपका नाम",
        phoneNumber: "फोन नंबर (वैकल्पिक)",
        enterName: "अपना नाम दर्ज करें",
        enterPhone: "फोन नंबर दर्ज करें",
        logout: "लॉग आउट",
        admin: "एडमिन",

        // Roles
        coordinator: "कोऑर्डिनेटर",
        family: "परिवार",
        guest: "मेहमान",

        // Tabs
        schedule: "कार्यक्रम",
        meals: "भोजन",
        venues: "स्थान",
        help: "मदद",
        myTasks: "मेरे कार्य",
        events: "कार्यक्रम",
        vendors: "वेंडर",
        team: "टीम",
        travel: "यात्रा",
        myRoom: "मेरा कमरा",
        dashboard: "डैशबोर्ड",
        guests: "मेहमान",
        tasks: "कार्य",
        settings: "सेटिंग्स",

        // Schedule
        weddingSchedule: "शादी का कार्यक्रम",
        reminderTip: "रिमाइंडर सेट करने के लिए घंटी आइकन पर टैप करें!",
        reminderSet: "रिमाइंडर सेट",
        minBefore: "मिनट पहले",

        // Meals
        mealSchedule: "भोजन का समय",
        allVegetarian: "सभी दिनों का पूरा मेनू। सभी व्यंजन शाकाहारी हैं।",
        guestsCount: "मेहमान",

        // Travel
        busTravel: "बस यात्रा",
        pickupFromHome: "घर से पिकअप",
        dropToHome: "घर तक ड्रॉप",
        busDetails: "बस विवरण",
        pickupPoint: "पिकअप स्थान",
        dropPoint: "ड्रॉप स्थान",
        arrivalTime: "पहुँचने का समय",
        busWontWait: "कृपया समय पर पिकअप पॉइंट पर पहुंचें। बस इंतजार नहीं करेगी।",

        // Room
        yourRoom: "आपका कमरा",
        roomAssignment: "कमरा आवंटन",
        guestCount: "मेहमानों की संख्या",
        roomName: "कमरे का नाम/नंबर",
        noRoomFound: "आपके नाम के लिए कोई कमरा आवंटित नहीं मिला।",
        contactCoordinator: "कृपया कोऑर्डिनेटर से संपर्क करें।",

        // Misc
        needHelp: "मदद चाहिए?",
        contactCoordinators: "किसी भी सहायता के लिए इन कोऑर्डिनेटर्स से संपर्क करें।",
        openMaps: "गूगल मैप्स में खोलें",
        call: "कॉल करें",
        save: "सेव करें",
        cancel: "रद्द करें",
        delete: "हटाएं",
        edit: "संपादित करें",
        add: "जोड़ें",
        back: "वापस",
        tryAgain: "फिर से कोशिश करें",

        // Authentication
        adminLogin: "एडमिन लॉगिन",
        coordinatorLogin: "कोऑर्डिनेटर लॉगिन",
        enterPassword: "कृपया अपना एडमिन पासवर्ड दर्ज करें",
        enterOTP: "कृपया अपना 4-अंकीय एक्सेस कोड दर्ज करें",
        password: "पासवर्ड",
        accessCode: "एक्सेस कोड",
        unlockAdmin: "एडमिन अनलॉक करें",
        verifyEnter: "सत्यापित करें और प्रवेश करें",
        incorrectPassword: "गलत पासवर्ड। कृपया पुनः प्रयास करें।",
        incorrectOTP: "गलत एक्सेस कोड। कृपया पुनः प्रयास करें।",
        contactAdminForOTP: "अगर आपके पास एक्सेस कोड नहीं है तो एडमिन से संपर्क करें",
        accessDenied: "पहुंच अस्वीकृत",
        notOnGuestList: "क्षमा करें, आप मेहमान सूची में नहीं हैं।",
        appOnlyFor: "यह शादी ऐप केवल इनके लिए है:",
        brideGroom: "दुल्हन और दूल्हा (एडमिन)",
        coordinators: "कोऑर्डिनेटर",
        familyMembers: "परिवार के सदस्य",
        invitedGuests: "आमंत्रित मेहमान",
        contactIfError: "यदि आपको लगता है कि यह त्रुटि है, तो कृपया कोऑर्डिनेटर से संपर्क करें।",

        // Admin Dashboard
        adminDashboard: "एडमिन डैशबोर्ड",
        quickStats: "त्वरित आँकड़े",
        totalEvents: "कुल कार्यक्रम",
        totalGuests: "कुल मेहमान",
        totalCoordinators: "कुल कोऑर्डिनेटर",
        daysToWedding: "शादी तक के दिन",
        quickActions: "त्वरित कार्रवाइयाँ",
        manageEvents: "कार्यक्रम प्रबंधित करें",
        manageGuests: "मेहमान प्रबंधित करें",
        manageTasks: "कार्य प्रबंधित करें",
        viewVendors: "वेंडर देखें",

        // Admin Settings
        coordinatorAccessCodes: "कोऑर्डिनेटर एक्सेस कोड",
        manageOTPDesc: "कोऑर्डिनेटर लॉगिन के लिए 4-अंकीय OTP प्रबंधित करें।",
        generateNewOTP: "नया OTP जनरेट करें",
        editOTP: "OTP संपादित करें",
        remove: "हटाएं",
        addNewCoordinator: "नया कोऑर्डिनेटर जोड़ें",
        adminPassword: "एडमिन पासवर्ड",
        changePasswordDesc: "एडमिन लॉगिन के लिए पासवर्ड बदलें।",
        changePassword: "पासवर्ड बदलें",
        currentPassword: "वर्तमान पासवर्ड",
        newPassword: "नया पासवर्ड",
        confirmPassword: "नया पासवर्ड पुष्टि करें",
        passwordChanged: "पासवर्ड सफलतापूर्वक बदल गया!",
        passwordsDontMatch: "नए पासवर्ड मेल नहीं खाते!",
        passwordTooShort: "पासवर्ड कम से कम 4 अक्षरों का होना चाहिए!",
        dataManagement: "डेटा प्रबंधन",
        dataLocalNote: "सभी परिवर्तन इस डिवाइस पर स्थानीय रूप से सहेजे जाते हैं",
        resetToDefaults: "सभी डेटा रीसेट करें",
        exportData: "डेटा निर्यात करें (JSON)",
        appInfo: "ऐप जानकारी",
        version: "वर्जन",
        adminUser: "एडमिन उपयोगकर्ता",

        // Coordinator Features
        hello: "नमस्ते",
        currentPhase: "वर्तमान चरण",
        preWeddingPrep: "शादी से पहले की तैयारी",
        haldiSangeet: "दिन 1 - हल्दी/संगीत",
        weddingDay: "दिन 2 - शादी",
        reception: "दिन 3 - रिसेप्शन",
        complete: "पूर्ण",
        pending: "बाकी",
        overdue: "अतिदेय",
        dueToday: "आज देय",
        upcoming: "आगामी",
        completed: "पूर्ण",
        yourTasksForDay: "दिन के लिए आपके कार्य",
        fullDayTimeline: "पूरे दिन की समयरेखा",
        allTeamTasks: "टीम के सभी कार्य",
        escalationContacts: "एस्केलेशन संपर्क",
        paymentScope: "भुगतान/स्कोप",
        general: "सामान्य",
        resort: "रिसॉर्ट (24-25)",
        banquet: "बैंक्वेट (26)",
        importantRules: "महत्वपूर्ण नियम",
        callVendors: "वेंडर को कॉल करें",
        viewTeam: "टीम देखें",
        fullSchedule: "पूरा कार्यक्रम",
        guestList: "मेहमान सूची",

        // Forms
        eventName: "कार्यक्रम का नाम",
        eventDate: "तारीख",
        eventTime: "समय",
        venue: "स्थान",
        emoji: "इमोजी",
        dressCode: "ड्रेस कोड",
        description: "विवरण",
        name: "नाम",
        phone: "फोन",
        role: "भूमिका",
        eventsAssignment: "कार्यक्रम असाइनमेंट",
        addEvent: "कार्यक्रम जोड़ें",
        addGuest: "मेहमान जोड़ें",
        addTask: "कार्य जोड़ें"
    },

    gu: {
        // App title
        welcome: "સ્વાગત છે",
        weddingOf: " ના લગ્ન",
        enterApp: "લગ્ન એપમાં પ્રવેશ કરો 🎉",
        yourName: "તમારું નામ",
        phoneNumber: "ફોન નંબર (વૈકલ્પિક)",
        enterName: "તમારું નામ દાખલ કરો",
        enterPhone: "ફોન નંબર દાખલ કરો",
        logout: "લોગ આઉટ",
        admin: "એડમિન",

        // Roles
        coordinator: "કોઓર્ડિનેટર",
        family: "પરિવાર",
        guest: "મહેમાન",

        // Tabs
        schedule: "કાર્યક્રમ",
        meals: "ભોજન",
        venues: "સ્થળ",
        help: "મદદ",
        myTasks: "મારા કાર્યો",
        events: "કાર્યક્રમ",
        vendors: "વેન્ડર",
        team: "ટીમ",
        travel: "મુસાફરી",
        myRoom: "મારો રૂમ",
        dashboard: "ડેશબોર્ડ",
        guests: "મહેમાન",
        tasks: "કાર્યો",
        settings: "સેટિંગ્સ",

        // Schedule
        weddingSchedule: "લગ્ન કાર્યક્રમ",
        reminderTip: "રિમાઇન્ડર સેટ કરવા ઘંટડી પર ટેપ કરો!",
        reminderSet: "રિમાઇન્ડર સેટ",
        minBefore: "મિનિટ પહેલા",

        // Meals
        mealSchedule: "ભોજન સમય",
        allVegetarian: "બધા દિવસોનું સંપૂર્ણ મેનુ. બધી વાનગીઓ શાકાહારી છે.",
        guestsCount: "મહેમાન",

        // Travel
        busTravel: "બસ મુસાફરી",
        pickupFromHome: "ઘરેથી પિકઅપ",
        dropToHome: "ઘરે ડ્રોપ",
        busDetails: "બસ વિગતો",
        pickupPoint: "પિકઅપ સ્થળ",
        dropPoint: "ડ્રોપ સ્થળ",
        arrivalTime: "આગમન",
        busWontWait: "કૃપયા સમયસર પિકઅપ પોઇન્ટ પર પહોંચો. બસ રાહ જોશે નહીં.",

        // Room
        yourRoom: "તમારો રૂમ",
        roomAssignment: "રૂમ ફાળવણી",
        guestCount: "મહેમાનોની સંખ્યા",
        roomName: "રૂમનું નામ/નંબર",
        noRoomFound: "તમારા નામ માટે કોઈ રૂમ ફાળવેલ નથી.",
        contactCoordinator: "કૃપયા કોઓર્ડિનેટરનો સંપર્ક કરો.",

        // Misc
        needHelp: "મદદ જોઈએ છે?",
        contactCoordinators: "કોઈપણ મદદ માટે આ કોઓર્ડિનેટર્સનો સંપર્ક કરો.",
        openMaps: "ગૂગલ મેપ્સમાં ખોલો",
        call: "કોલ કરો",
        save: "સેવ કરો",
        cancel: "રદ કરો",
        delete: "કાઢી નાખો",
        edit: "સંપાદિત કરો",
        add: "ઉમેરો",
        back: "પાછા",
        tryAgain: "ફરી પ્રયાસ કરો",

        // Authentication
        adminLogin: "એડમિન લોગિન",
        coordinatorLogin: "કોઓર્ડિનેટર લોગિન",
        enterPassword: "કૃપયા તમારો એડમિન પાસવર્ડ દાખલ કરો",
        enterOTP: "કૃપયા તમારો 4-અંકનો એક્સેસ કોડ દાખલ કરો",
        password: "પાસવર્ડ",
        accessCode: "એક્સેસ કોડ",
        unlockAdmin: "એડમિન અનલોક કરો",
        verifyEnter: "ચકાસો અને પ્રવેશ કરો",
        incorrectPassword: "ખોટો પાસવર્ડ. કૃપયા ફરી પ્રયાસ કરો.",
        incorrectOTP: "ખોટો એક્સેસ કોડ. કૃપયા ફરી પ્રયાસ કરો.",
        contactAdminForOTP: "જો તમારી પાસે એક્સેસ કોડ નથી તો એડમિનનો સંપર્ક કરો",
        accessDenied: "પ્રવેશ નકારાયો",
        notOnGuestList: "માફ કરશો, તમે મહેમાન યાદીમાં નથી.",
        appOnlyFor: "આ લગ્ન એપ ફક્ત આ માટે છે:",
        brideGroom: "કન્યા અને વર (એડમિન)",
        coordinators: "કોઓર્ડિનેટર્સ",
        familyMembers: "પરિવારના સભ્યો",
        invitedGuests: "આમંત્રિત મહેમાનો",
        contactIfError: "જો તમને લાગે કે આ ભૂલ છે, તો કૃપયા કોઓર્ડિનેટરનો સંપર્ક કરો.",

        // Admin Dashboard
        adminDashboard: "એડમિન ડેશબોર্ড",
        quickStats: "ઝડપી આંકડા",
        totalEvents: "કુલ કાર્યક્રમો",
        totalGuests: "કુલ મહેમાનો",
        totalCoordinators: "કુલ કોઓર્ડિનેટર્સ",
        daysToWedding: "લગ્ન સુધી દિવસો",
        quickActions: "ઝડપી ક્રિયાઓ",
        manageEvents: "કાર્યક્રમો મેનેજ કરો",
        manageGuests: "મહેમાનો મેનેજ કરો",
        manageTasks: "કાર્યો મેનેજ કરો",
        viewVendors: "વેન્ડર્સ જુઓ",

        // Admin Settings
        coordinatorAccessCodes: "કોઓર્ડિનેટર એક્સેસ કોડ્સ",
        manageOTPDesc: "કોઓર્ડિનેટર લોગિન માટે 4-અંકના OTP મેનેજ કરો.",
        generateNewOTP: "નવો OTP જનરેટ કરો",
        editOTP: "OTP સંપાદિત કરો",
        remove: "દૂર કરો",
        addNewCoordinator: "નવો કોઓર્ડિનેટર ઉમેરો",
        adminPassword: "એડમિન પાસવર્ડ",
        changePasswordDesc: "એડમિન લોગિન માટેનો પાસવર્ડ બદલો.",
        changePassword: "પાસવર્ડ બદલો",
        currentPassword: "વર્તમાન પાસવર્ડ",
        newPassword: "નવો પાસવર્ડ",
        confirmPassword: "નવો પાસવર્ડ પુષ્ટિ કરો",
        passwordChanged: "પાસવર્ડ સફળતાપૂર્વક બદલાયો!",
        passwordsDontMatch: "નવા પાસવર્ડ મેળ ખાતા નથી!",
        passwordTooShort: "પાસવર્ડ ઓછામાં ઓછા 4 અક્ષરોનો હોવો જોઈએ!",
        dataManagement: "ડેટા મેનેજમેન્ટ",
        dataLocalNote: "બધા ફેરફારો આ ડિવાઇસ પર સ્થાનિક રીતે સાચવેલ છે",
        resetToDefaults: "બધો ડેટા રીસેટ કરો",
        exportData: "ડેટા એક્સપોર્ટ કરો (JSON)",
        appInfo: "એપ માહિતી",
        version: "વર્ઝન",
        adminUser: "એડમિન વપરાશકર્તા",

        // Coordinator Features
        hello: "નમસ્તે",
        currentPhase: "વર્તમાન તબક્કો",
        preWeddingPrep: "લગ્ન પહેલાની તૈયારી",
        haldiSangeet: "દિવસ 1 - હળદર/સંગીત",
        weddingDay: "દિવસ 2 - લગ્ન",
        reception: "દિવસ 3 - રિસેપ્શન",
        complete: "પૂર્ણ",
        pending: "બાકી",
        overdue: "મુદત વીતી ગઈ",
        dueToday: "આજે પૂર્ણ કરવાનું",
        upcoming: "આગામી",
        completed: "પૂર્ણ થયેલ",
        yourTasksForDay: "દિવસ માટે તમારા કાર્યો",
        fullDayTimeline: "સંપૂર્ણ દિવસની સમયરેખા",
        allTeamTasks: "ટીમના બધા કાર્યો",
        escalationContacts: "એસ્કેલેશન સંપર્કો",
        paymentScope: "ચુકવણી/સ્કોપ",
        general: "સામાન્ય",
        resort: "રિસોર્ટ (24-25)",
        banquet: "બેન્ક્વેટ (26)",
        importantRules: "મહત્વપૂર્ण નિયમો",
        callVendors: "વેન્ડરને કોલ કરો",
        viewTeam: "ટીમ જુઓ",
        fullSchedule: "સંપૂર્ણ કાર્યક્રમ",
        guestList: "મહેમાન યાદી",

        // Forms
        eventName: "કાર્યક્રમનું નામ",
        eventDate: "તારીખ",
        eventTime: "સમય",
        venue: "સ્થળ",
        emoji: "ઇમોજી",
        dressCode: "ડ્રેસ કોડ",
        description: "વર્ણન",
        name: "નામ",
        phone: "ફોન",
        role: "ભૂમિકા",
        eventsAssignment: "કાર્યક્રમ સોંપણી",
        addEvent: "કાર્યક્રમ ઉમેરો",
        addGuest: "મહેમાન ઉમેરો",
        addTask: "કાર્ય ઉમેરો"
    }
};

// Get translation
function t(key) {
    const lang = currentLanguage || 'en';
    return TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || key;
}

// Guest list with room assignments (from Excel Sheet 1)
const GUEST_LIST = [
    { id: 1, name: "Dharmesh's Family", phone: "8160956107", count: 5, room: "DWARKA & SANTIVAN" },
    { id: 2, name: "MUKESH MAMA", phone: "8128116080", count: 5, room: "YAMNOTRI" },
    { id: 3, name: "SURESH MAMA", phone: "9825054879", count: 3, room: "GOKUL" },
    { id: 4, name: "ASHOK MAMA", phone: "9998010884", count: 4, room: "SARSVATI" },
    { id: 5, name: "PRAGNESH MAMA", phone: "9974940921", count: 4, room: "AYODHYA" },
    { id: 6, name: "MAHENDRA MAMA", phone: "9898286884", count: 2, room: "GURUKUL" },
    { id: 7, name: "MASI", phone: "6351806070", count: 4, room: "YASHODA" },
    { id: 8, name: "USHA FAI", phone: "9879861236", count: 5, room: "104" },
    { id: 9, name: "SUSHILA FAI", phone: "9106841823", count: 6, room: "GANGOTRI" },
    { id: 10, name: "MAYA FAI", phone: "6352570291", count: 3, room: "JANKI" },
    { id: 11, name: "PRAKASH KAKA", phone: "9982080107", count: 2, room: "110" },
    { id: 12, name: "GHANSHYAM MAMA", phone: "7990672974", count: 4, room: "107" },
    { id: 13, name: "RAJANI KAKAI", phone: "9773477076", count: 3, room: "111" },
    { id: 14, name: "RAHUL", phone: "9909744797", count: 2, room: "109" },
    { id: 15, name: "SURENDRA", phone: "8866379024", count: 4, room: "108" },
    { id: 16, name: "Neha Family", phone: "9409859976", count: 6, room: "VRUNDAVAN & MADHUVAN" },
    { id: 17, name: "Jitu Mama", phone: "9638155553", count: 3, room: "TULSI" },
    { id: 18, name: "Govind Mama", phone: "9106485979", count: 4, room: "SHABRI" },
    { id: 19, name: "Ajay Mama", phone: "8401998030", count: 4, room: "CHITRAKUT" },
    { id: 20, name: "Bajrang Mama", phone: "8128108994", count: 2, room: "KARNAVATI" },
    { id: 21, name: "Gautam Mama", phone: "8735057873", count: 4, room: "DEVKI" },
    { id: 22, name: "Tulsi Aunty", phone: "", count: 2, room: "102" },
    { id: 23, name: "Bua", phone: "9974772927", count: 3, room: "RADHIKA" },
    { id: 24, name: "Roshni Masi", phone: "7069604336", count: 3, room: "101" },
    { id: 25, name: "Suman Dadi", phone: "", count: 2, room: "105" },
    { id: 26, name: "Uma Dadi", phone: "", count: 2, room: "105" },
    { id: 27, name: "Nilesh Maharaj", phone: "9898641305", count: 2, room: "PANCHVATI" },
    { id: 28, name: "Neha's Friends", phone: "7574855114", count: 5, room: "TRIVENI" },
    { id: 29, name: "Photographer", phone: "6354381571", count: 4, room: "103" },
    { id: 30, name: "Bhawna Mami", phone: "", count: 0, room: "" },
    { id: 31, name: "Pushpa Masi", phone: "9724138178", count: 2, room: "" }
];

// Bus travel information
const BUS_TRAVEL = {
    pickup: {
        date: "24 January 2026",
        time: "8:30 AM",
        description: {
            en: "Pickup from home to Natraj Resort",
            hi: "घर से नटराज रिसोर्ट तक पिकअप",
            gu: "ઘરેથી નટરાજ રિસોર્ટ સુધી પિકઅપ"
        },
        details: {
            en: "2 buses (52 seater), 30 min buffer. Driver call at 8:00 AM.",
            hi: "2 बस (52 सीटर), 30 मिनट बफर। 8:00 बजे ड्राइवर को कॉल।",
            gu: "2 બસ (52 સીટર), 30 મિનિટ બફર. 8:00 વાગ્યે ડ્રાઇવરને કોલ."
        },
        coordinator: "Hardik Nagar",
        arrivalAtResort: "9:00 AM - 10:30 AM"
    },
    drop: {
        date: "26 January 2026",
        time: "10:30 AM",
        description: {
            en: "Drop from Resort to Home",
            hi: "रिसोर्ट से घर तक ड्रॉप",
            gu: "રિસોર્ટથી ઘરે ડ્રોપ"
        },
        details: {
            en: "Drop to homes with intermediate stops along the route.",
            hi: "बीच के स्टॉप वाले रूट से घरों तक ड्रॉप।",
            gu: "રસ્તામાં મધ્યવર્તી સ્ટોપ સાથે ઘરે ડ્રોપ."
        },
        coordinator: "Hardik Nagar"
    }
};

// Event names in multiple languages
const EVENT_TRANSLATIONS = {
    "Breakfast & Tea": { hi: "नाश्ता और चाय", gu: "નાસ્તો અને ચા" },
    "Lunch": { hi: "दोपहर का भोजन", gu: "બપોરનું ભોજન" },
    "Ganesh Sthapana + Mandap Muhurat": { hi: "गणेश स्थापना + मंडप मुहूर्त", gu: "ગણેશ સ્થાપના + મંડપ મુહૂર્ત" },
    "Evening Tea": { hi: "शाम की चाय", gu: "સાંજની ચા" },
    "Haldi/Pithi Ceremony": { hi: "हल्दी/पीठी रस्म", gu: "હળદર/પીઠી વિધિ" },
    "Dinner": { hi: "रात का खाना", gu: "રાત્રિ ભોજન" },
    "Sangeet Night": { hi: "संगीत रात्रि", gu: "સંગીત રાત્રિ" },
    "Breakfast + Tea": { hi: "नाश्ता + चाय", gu: "નાસ્તો + ચા" },
    "Saafa Ceremony": { hi: "साफा रस्म", gu: "સાફા વિધિ" },
    "Mameru": { hi: "मामेरा", gu: "મામેરું" },
    "Barat Procession": { hi: "बारात", gu: "જાન" },
    "Wedding Ceremony": { hi: "विवाह समारोह", gu: "લગ્ન વિધિ" },
    "Wedding Dinner": { hi: "शादी का भोजन", gu: "લગ્ન ભોજન" },
    "Vidaai": { hi: "विदाई", gu: "વિદાય" },
    "Bus Drop to Home": { hi: "बस से घर", gu: "બસથી ઘરે" },
    "Reception": { hi: "रिसेप्शन", gu: "રિસેપ્શન" },
    "Bus Pickup from Home": { hi: "घर से बस पिकअप", gu: "ઘરેથી બસ પિકઅપ" }
};

// Get translated event name
function getEventName(englishName) {
    const lang = currentLanguage || 'en';
    if (lang === 'en') return englishName;
    return EVENT_TRANSLATIONS[englishName]?.[lang] || englishName;
}

// Day translations
const DAY_TRANSLATIONS = {
    "Friday": { hi: "शुक्रवार", gu: "શુક્રવાર" },
    "Saturday": { hi: "शनिवार", gu: "શનિવાર" },
    "Sunday": { hi: "रविवार", gu: "રવિવાર" }
};

function getDay(englishDay) {
    const lang = currentLanguage || 'en';
    if (lang === 'en') return englishDay;
    return DAY_TRANSLATIONS[englishDay]?.[lang] || englishDay;
}
