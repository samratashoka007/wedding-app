// Wedding App Data - UPDATED with correct timings from Excel
const WEDDING_DATA = {
    weddingInfo: {
        groom: "Dharmesh",
        bride: "Neha",
        dates: "24-26 January 2026",
        tagline: "Celebrating Love & Togetherness"
    },

    venues: [
        {
            name: "Natraj Resort",
            dates: "24-25 January",
            events: ["Sangeet", "Haldi", "Barat", "Wedding"],
            address: "Natraj Resort, Ahmedabad",
            mapLink: "https://maps.google.com/?q=Natraj+Resort+Ahmedabad"
        },
        {
            name: "Grand Neelkanth",
            dates: "26 January",
            events: ["Reception (500 guests)"],
            address: "Grand Neelkanth Banquet",
            mapLink: "https://maps.google.com/?q=Grand+Neelkanth+Banquet"
        }
    ],

    // COMPLETE EVENT SCHEDULE - From Excel Sheet 0
    events: [
        // 24 January 2026 - Natraj Resort
        {
            id: 0,
            date: "24 January 2026",
            day: "Friday",
            name: "Bus Pickup from Home",
            emoji: "🚌",
            time: "8:30 AM",
            venue: "Home → Natraj Resort",
            dressCode: "Casual",
            description: "2 buses (52 seater). Be ready by 8:20 AM. Arrival at resort: 9:00-10:30 AM",
            category: "travel",
            reminderBefore: 60
        },
        {
            id: 1,
            date: "24 January 2026",
            day: "Friday",
            name: "Breakfast & Tea",
            emoji: "☕",
            time: "10:30 AM",
            venue: "Natraj Resort",
            dressCode: "Casual",
            description: "Tea (100), Coffee (20), Batata Poha",
            category: "meal",
            reminderBefore: 30 // minutes
        },
        {
            id: 2,
            date: "24 January 2026",
            day: "Friday",
            name: "Lunch",
            emoji: "🍽️",
            time: "12:00 PM - 1:00 PM",
            venue: "Natraj Resort",
            dressCode: "Casual",
            description: "Full thali with Cheese Corn Soup, Tandoori Kadai Paneer, Dal Fry, Jira Rice",
            category: "meal",
            reminderBefore: 30
        },
        {
            id: 3,
            date: "24 January 2026",
            day: "Friday",
            name: "Ganesh Sthapana + Mandap Muhurat",
            emoji: "🙏",
            time: "1:00 PM - 4:00 PM",
            venue: "Natraj Resort",
            dressCode: "Traditional",
            description: "Sacred rituals with Maharaj",
            category: "ritual",
            reminderBefore: 60
        },
        {
            id: 4,
            date: "24 January 2026",
            day: "Friday",
            name: "Evening Tea",
            emoji: "☕",
            time: "4:00 PM - 4:45 PM",
            venue: "Natraj Resort",
            dressCode: "Casual",
            description: "Tea & Coffee refreshments",
            category: "meal",
            reminderBefore: 30
        },
        {
            id: 5,
            date: "24 January 2026",
            day: "Friday",
            name: "Haldi/Pithi Ceremony",
            emoji: "🌻",
            time: "6:00 PM - 7:30 PM",
            venue: "Natraj Resort",
            dressCode: "Yellow attire",
            description: "Traditional Haldi ritual",
            category: "main",
            reminderBefore: 60
        },
        {
            id: 6,
            date: "24 January 2026",
            day: "Friday",
            name: "Dinner",
            emoji: "🍛",
            time: "8:00 PM - 9:00 PM",
            venue: "Natraj Resort",
            dressCode: "Casual",
            description: "Bhaji Pav, Pulao, Chaas",
            category: "meal",
            reminderBefore: 30
        },
        {
            id: 7,
            date: "24 January 2026",
            day: "Friday",
            name: "Sangeet Night",
            emoji: "💃",
            time: "9:00 PM - 11:00 PM",
            venue: "Natraj Resort",
            dressCode: "Festive/Party Wear",
            description: "Music, dance performances & celebration with DJ",
            category: "main",
            reminderBefore: 60
        },

        // 25 January 2026 - Natraj Resort
        {
            id: 8,
            date: "25 January 2026",
            day: "Saturday",
            name: "Breakfast + Tea",
            emoji: "🍳",
            time: "8:00 AM - 9:00 AM",
            venue: "Natraj Resort",
            dressCode: "Casual",
            description: "Tea, Coffee, Khasta Kachori (hot)",
            category: "meal",
            reminderBefore: 30
        },
        {
            id: 9,
            date: "25 January 2026",
            day: "Saturday",
            name: "Saafa Ceremony",
            emoji: "👳",
            time: "8:30 AM - 10:00 AM",
            venue: "Natraj Resort",
            dressCode: "Traditional",
            description: "Turban tying for 40 people",
            category: "ritual",
            reminderBefore: 60
        },
        {
            id: 10,
            date: "25 January 2026",
            day: "Saturday",
            name: "Mameru",
            emoji: "🎁",
            time: "10:00 AM - 12:00 PM",
            venue: "Natraj Resort",
            dressCode: "Traditional",
            description: "Maternal gifts ceremony with rituals",
            category: "ritual",
            reminderBefore: 60
        },
        {
            id: 11,
            date: "25 January 2026",
            day: "Saturday",
            name: "Lunch",
            emoji: "🍽️",
            time: "12:00 PM - 1:00 PM",
            venue: "Natraj Resort",
            dressCode: "Casual",
            description: "Chole Bhature, Dosa, Chaas",
            category: "meal",
            reminderBefore: 30
        },
        {
            id: 12,
            date: "25 January 2026",
            day: "Saturday",
            name: "Evening Tea",
            emoji: "☕",
            time: "4:00 PM - 4:45 PM",
            venue: "Natraj Resort",
            dressCode: "Casual",
            description: "Tea & Coffee - Get ready for Barat!",
            category: "meal",
            reminderBefore: 30
        },
        {
            id: 13,
            date: "25 January 2026",
            day: "Saturday",
            name: "Barat Procession",
            emoji: "🐴",
            time: "5:00 PM - 7:00 PM",
            venue: "Natraj Resort",
            dressCode: "Wedding attire",
            description: "Groom's grand procession with 6 Dhol",
            category: "main",
            reminderBefore: 60
        },
        {
            id: 14,
            date: "25 January 2026",
            day: "Saturday",
            name: "Wedding Ceremony",
            emoji: "💒",
            time: "8:00 PM - 12:00 AM",
            venue: "Natraj Resort",
            dressCode: "Traditional/Formal",
            description: "Wedding rituals & Pheras",
            category: "main",
            reminderBefore: 60
        },
        {
            id: 15,
            date: "25 January 2026",
            day: "Saturday",
            name: "Wedding Dinner",
            emoji: "🍛",
            time: "After Wedding",
            venue: "Natraj Resort",
            dressCode: "Traditional",
            description: "Tomato Soup, Paneer Tikka, Shahi Paneer, Gatte ka Sabji, Kesar Pista Basundi",
            category: "meal",
            reminderBefore: 0
        },

        // 26 January 2026
        {
            id: 16,
            date: "26 January 2026",
            day: "Sunday",
            name: "Vidaai",
            emoji: "🙏",
            time: "Morning",
            venue: "Natraj Resort",
            dressCode: "Casual",
            description: "Bride's farewell",
            category: "ritual",
            reminderBefore: 0
        },
        {
            id: 17,
            date: "26 January 2026",
            day: "Sunday",
            name: "Bus Drop to Home",
            emoji: "🚌",
            time: "10:30 AM",
            venue: "Natraj Resort → Home",
            dressCode: "Casual",
            description: "Transport from resort to home",
            category: "travel",
            reminderBefore: 60
        },
        {
            id: 18,
            date: "26 January 2026",
            day: "Sunday",
            name: "Reception",
            emoji: "🎉",
            time: "7:00 PM - 10:30 PM",
            venue: "Grand Neelkanth",
            dressCode: "Formal/Party Wear",
            description: "Grand reception with 500 guests",
            category: "main",
            reminderBefore: 120
        }
    ],

    // MEAL SCHEDULE - From Excel Sheet 6 (Page 13)
    meals: [
        // 24 January
        {
            date: "24 January 2026",
            day: "Friday",
            slots: [
                {
                    time: "10:30 AM",
                    name: "Morning Tea & Breakfast",
                    items: ["Tea (100 people)", "Coffee (20 people)", "Batata Poha"],
                    guests: 120
                },
                {
                    time: "12:00 PM",
                    name: "Lunch",
                    items: [
                        "Soup: Cheese Corn Tomato (60) / Veg Manchow (60)",
                        "Sweet: Anguri Rabdi, Kala Gulab Jamun",
                        "Starter: Chat Basket",
                        "Sabji: Tandoori Kadai Paneer, Aloo Gobhi",
                        "Roti/Puri: Butter Fulka Roti, Puri",
                        "Salad: Fresh Salad, Green Salad",
                        "Dal: Dal Fry",
                        "Rice: Jira Rice",
                        "Papad: Plain Papad",
                        "Pickle: Raw Mango Pickle",
                        "Mineral Water",
                        "Mukhwas: Dry Mukhwas",
                        "Chaas"
                    ],
                    guests: 120
                },
                {
                    time: "4:00 PM",
                    name: "Evening Tea",
                    items: ["Tea (100 people)", "Coffee (20 people)"],
                    guests: 120
                },
                {
                    time: "8:00 PM",
                    name: "Dinner (Light)",
                    items: ["Bhaji Pav", "Pulao", "Chaas"],
                    guests: 120
                }
            ]
        },
        // 25 January
        {
            date: "25 January 2026",
            day: "Saturday",
            slots: [
                {
                    time: "8:00 AM",
                    name: "Breakfast",
                    items: ["Tea (100 people)", "Coffee (20 people)", "Hot Khasta Kachori"],
                    guests: 120
                },
                {
                    time: "12:00 PM",
                    name: "Lunch",
                    items: ["Chole Bhature", "Dosa", "Chaas"],
                    guests: 120
                },
                {
                    time: "4:00 PM",
                    name: "Evening Tea",
                    items: ["Tea (100 people)", "Coffee (20 people)"],
                    guests: 120
                },
                {
                    time: "8:00 PM",
                    name: "Wedding Dinner",
                    items: [
                        "Soup: Tomato Soup with Bread (60) / Hot & Sour (60)",
                        "Sweet: Panchratna Halwa, Kesar Pista Basundi",
                        "Starter: Paneer Tikka",
                        "Sabji: Shahi Paneer, Gatte ka Sabji",
                        "Roti/Puri: Butter Fulka Roti, Puri",
                        "Salad: Fresh Salad, Green Salad",
                        "Dal: Gujarati Dal",
                        "Rice: Plain Rice",
                        "Papad: Trirangi Papad",
                        "Pickle: Red Chili Pickle",
                        "Mineral Water",
                        "Mukhwas: Rajwadi Paan",
                        "Chaas"
                    ],
                    guests: 130
                }
            ]
        },
        // 26 January - Reception
        {
            date: "26 January 2026",
            day: "Sunday",
            slots: [
                {
                    time: "7:00 PM",
                    name: "Reception Dinner",
                    items: [
                        "Soup: Cream of Tomato Soup",
                        "Starter: Veg Manchurian Dry",
                        "Salad: Green Salad",
                        "Papad: Fried Papad",
                        "Main (Paneer): Paneer Tikka Lababdar",
                        "Main (Veg): Veg Handi Masala",
                        "Dal: Dal Tadka",
                        "Rice: Jira Rice",
                        "Roti: Butter Tandoori Roti, Butter Tawa Chapati",
                        "Sweet: Moong Dal Halwa",
                        "Ice Cream: Kaju Draksh (Raisin)",
                        "Drink: Chaas",
                        "Mukhwas",
                        "Mineral Water (200ml bottle)"
                    ],
                    guests: 500
                }
            ]
        }
    ],

    coordinators: [
        {
            id: 1,
            name: "Vicky Nagar",
            role: "Execution Controller",
            roleHindi: "एग्जीक्यूशन कंट्रोलर + जनरेटर/बिजली",
            events: "24-25 Jan (All Events)",
            phone: "📞",
            tasks: ["Stage/Sound/Setup check", "Power & Generator monitoring", "Vendor escalation", "Time management"],
            isLead: true
        },
        {
            id: 2,
            name: "Priyanshu Thakur",
            role: "Crowd Management Lead",
            roleHindi: "भीड़ प्रबंधन लीड",
            events: "24-25 All, 26 Support",
            phone: "📞",
            tasks: ["Guest flow management", "Seating arrangements", "Stage/Camera lane clear", "Movement control"],
            isLead: true
        },
        {
            id: 3,
            name: "Jay Nagar",
            role: "Operations Lead",
            roleHindi: "ऑप्स लीड (रिचुअल + कैटरर + फोटो)",
            events: "24-25 Main Events",
            phone: "📞",
            tasks: ["Ritual flow coordination", "Food slot timing", "Saafa line management", "Photography logistics"],
            isLead: true
        },
        {
            id: 4,
            name: "Hardik Nagar",
            role: "Barat & Travel Lead",
            roleHindi: "बारात + ढोल + ट्रैवल",
            events: "25 Barat, 24 Haldi, Travel",
            phone: "📞",
            tasks: ["Dhol timing", "Barat route & safety", "Bus movement coordination"],
            isLead: false
        },
        {
            id: 5,
            name: "Preyarsh Nagar",
            role: "Sangeet Owner",
            roleHindi: "संगीत मालिक",
            events: "24 Sangeet",
            phone: "📞",
            tasks: ["Performance order", "DJ song list & cue", "Show timing"],
            isLead: false
        },
        {
            id: 6,
            name: "Pooja Nagar",
            role: "Sangeet Anchor + Makeup",
            roleHindi: "संगीत एंकर + मेकअप सपोर्ट",
            events: "24 Sangeet, 24-26 Makeup",
            phone: "📞",
            tasks: ["Anchoring", "Makeup slot coordination", "Ready time tracking"],
            isLead: false
        },
        {
            id: 7,
            name: "Himani Chauhan",
            role: "Sangeet Anchor + Support",
            roleHindi: "संगीत एंकर + मेकअप सपोर्ट",
            events: "24 Sangeet, 24-26 Makeup",
            phone: "📞",
            tasks: ["Anchoring", "Ladies/Emotional support", "Timing coordination"],
            isLead: false
        },
        {
            id: 8,
            name: "Mukesh Nagar",
            role: "Wedding Ritual Authority",
            roleHindi: "विवाह विधि अथॉरिटी",
            events: "25 Wedding",
            phone: "📞",
            tasks: ["Ritual discipline", "Decision making (no payment issues)"],
            isLead: false
        },
        {
            id: 9,
            name: "Jayant Chauhan",
            role: "Reception Commander",
            roleHindi: "26 रिसेप्शन फ्लोर कमांडर",
            events: "26 Reception (500 guests)",
            phone: "📞",
            tasks: ["Banquet/Decor control", "Crowd management", "Spot decisions"],
            isLead: true
        }
    ],

    vendors: [
        {
            area: "Resort Manager",
            areaHindi: "रिसोर्ट मैनेजर",
            days: "24-25 Natraj",
            contact: "Faisal Bhai",
            phone: "9106704218",
            phone2: "7802903232",
            poc: "Vicky",
            backup: "Jay"
        },
        {
            area: "Decoration + DJ",
            areaHindi: "डेकोरेशन + DJ (Gold)",
            days: "24-25 Natraj",
            contact: "Nishant Patel",
            phone: "9664962577",
            poc: "Vicky",
            backup: "Preyarsh"
        },
        {
            area: "Caterer",
            areaHindi: "कैटरर",
            days: "24-25 Natraj",
            contact: "Babubhai",
            phone: "8530045450",
            poc: "Jay",
            backup: "Vicky"
        },
        {
            area: "Dhol Company",
            areaHindi: "ढोल कंपनी",
            days: "24-25 Natraj",
            contact: "Ranjit Bhatt",
            phone: "9974817599",
            poc: "Hardik",
            backup: "Jay"
        },
        {
            area: "Photography",
            areaHindi: "फोटोग्राफी (Mahi Photo)",
            days: "24-26",
            contact: "Harshal Sevak",
            phone: "6354381571",
            phone2: "7383528083",
            poc: "Jay",
            backup: "Vicky"
        },
        {
            area: "Saafa Artist",
            areaHindi: "साफा आर्टिस्ट",
            days: "25 Natraj",
            contact: "Siddhrajsinh Bihola",
            phone: "6355255006",
            poc: "Jay",
            backup: "Priyanshu"
        },
        {
            area: "26 Decor",
            areaHindi: "26 डेकोर",
            days: "26 Grand Neelkanth",
            contact: "Bhardwaj Decorations",
            phone: "7043327401",
            poc: "Jayant Chauhan",
            backup: "Priyanshu"
        }
    ],

    escalation: {
        payment: "Dharmesh (Groom)",
        general: "Vicky Nagar",
        resort24_25: "Faisal Bhai (Resort Manager)",
        banquet26: "Banquet Staff/Manager"
    },

    rules: [
        "No payment/scope change decisions without Dharmesh",
        "Coordinators facilitate only - no vendor commitments",
        "Major issues: Escalate to venue manager first",
        "Ladies are part of crowd management (except makeup prep)",
        "Group chat for instant updates"
    ]
};

// Family members - can be customized
const FAMILY_MEMBERS = [
    "Dharmesh",
    "Neha",
    "Mukesh Nagar",
    "Jayant Chauhan"
];

// Admin users (Groom & Bride) - full control over app data
const ADMIN_USERS = ["Dharmesh", "Neha"];

// Get coordinator names for role detection
const COORDINATOR_NAMES = WEDDING_DATA.coordinators.map(c => c.name.toLowerCase());

// Note: GUEST_LIST and BUS_TRAVEL are defined in translations.js

// Wedding date constants (IST)
const WEDDING_DATES = {
    day1: new Date('2026-01-24T00:00:00+05:30'),
    day2: new Date('2026-01-25T00:00:00+05:30'),
    day3: new Date('2026-01-26T00:00:00+05:30'),
    endDate: new Date('2026-01-27T00:00:00+05:30')
};

// Pre-wedding tasks (Jan 17-23)
const PRE_WEDDING_TASKS = [
    { id: 1, task: "Confirm bus driver contact numbers", dueDate: "2026-01-22", assignee: "Hardik", priority: "high" },
    { id: 2, task: "Final call to all vendors for confirmation", dueDate: "2026-01-23", assignee: "Vicky", priority: "high" },
    { id: 3, task: "Collect saafa list (40 people)", dueDate: "2026-01-22", assignee: "Jay", priority: "medium" },
    { id: 4, task: "Confirm Dhol timing with Ranjit Bhatt", dueDate: "2026-01-23", assignee: "Hardik", priority: "high" },
    { id: 5, task: "Finalize sangeet performance order", dueDate: "2026-01-21", assignee: "Preyarsh", priority: "medium" },
    { id: 6, task: "Check DJ song list ready", dueDate: "2026-01-22", assignee: "Preyarsh", priority: "medium" },
    { id: 7, task: "Confirm photographer arrival time", dueDate: "2026-01-23", assignee: "Jay", priority: "high" },
    { id: 8, task: "Check generator & power backup", dueDate: "2026-01-23", assignee: "Vicky", priority: "critical" },
    { id: 9, task: "Brief all coordinators on roles", dueDate: "2026-01-23", assignee: "Vicky", priority: "high" },
    { id: 10, task: "Confirm caterer menu final", dueDate: "2026-01-22", assignee: "Jay", priority: "high" },
    { id: 11, task: "Collect makeup artist schedule", dueDate: "2026-01-22", assignee: "Pooja", priority: "medium" },
    { id: 12, task: "Prepare welcome kits for guests", dueDate: "2026-01-23", assignee: "Priyanshu", priority: "low" },
    { id: 13, task: "Confirm 26th decor with Bhardwaj", dueDate: "2026-01-23", assignee: "Jayant Chauhan", priority: "high" }
];

// Day-specific tasks
const DAY_TASKS = {
    "24": [
        { time: "8:00 AM", task: "Call bus driver - confirm pickup", assignee: "Hardik", done: false },
        { time: "8:20 AM", task: "Be at pickup points (both houses)", assignee: "Hardik", done: false },
        { time: "9:30 AM", task: "Resort arrival - guest check-in", assignee: "Priyanshu", done: false },
        { time: "10:00 AM", task: "Verify breakfast setup", assignee: "Jay", done: false },
        { time: "10:30 AM", task: "Tea/Coffee service check", assignee: "Jay", done: false },
        { time: "11:30 AM", task: "Lunch prep check with caterer", assignee: "Jay", done: false },
        { time: "12:00 PM", task: "Lunch service monitoring", assignee: "Jay", done: false },
        { time: "12:30 PM", task: "Mandap setup verification", assignee: "Vicky", done: false },
        { time: "1:00 PM", task: "Ganesh Sthapana - Maharaj coordination", assignee: "Jay", done: false },
        { time: "3:30 PM", task: "Evening tea prep check", assignee: "Jay", done: false },
        { time: "4:00 PM", task: "DJ sound check for Sangeet", assignee: "Vicky", done: false },
        { time: "5:00 PM", task: "Haldi setup & decoration check", assignee: "Vicky", done: false },
        { time: "5:30 PM", task: "Photography team briefing", assignee: "Jay", done: false },
        { time: "6:00 PM", task: "Haldi ceremony starts - crowd management", assignee: "Priyanshu", done: false },
        { time: "7:30 PM", task: "Dinner prep verification", assignee: "Jay", done: false },
        { time: "8:00 PM", task: "Dinner service begins", assignee: "Jay", done: false },
        { time: "8:30 PM", task: "Sangeet stage & lighting final check", assignee: "Vicky", done: false },
        { time: "9:00 PM", task: "Sangeet starts - anchor coordination", assignee: "Pooja", done: false },
        { time: "9:00 PM", task: "Performance order execution", assignee: "Preyarsh", done: false },
        { time: "11:00 PM", task: "Generator status check", assignee: "Vicky", done: false }
    ],
    "25": [
        { time: "7:00 AM", task: "Morning power & setup check", assignee: "Vicky", done: false },
        { time: "7:30 AM", task: "Breakfast prep with caterer", assignee: "Jay", done: false },
        { time: "8:00 AM", task: "Breakfast service", assignee: "Jay", done: false },
        { time: "8:00 AM", task: "Saafa artist arrival check", assignee: "Jay", done: false },
        { time: "8:30 AM", task: "Saafa ceremony coordination (40 people)", assignee: "Jay", done: false },
        { time: "9:00 AM", task: "Makeup schedule verification", assignee: "Pooja", done: false },
        { time: "10:00 AM", task: "Mameru ceremony setup", assignee: "Jay", done: false },
        { time: "11:30 AM", task: "Lunch prep check", assignee: "Jay", done: false },
        { time: "12:00 PM", task: "Lunch service", assignee: "Jay", done: false },
        { time: "2:00 PM", task: "Barat route confirmation", assignee: "Hardik", done: false },
        { time: "3:00 PM", task: "Dhol team arrival check", assignee: "Hardik", done: false },
        { time: "3:30 PM", task: "Evening tea service", assignee: "Jay", done: false },
        { time: "4:00 PM", task: "Groom ready - final checks", assignee: "Priyanshu", done: false },
        { time: "4:30 PM", task: "Horse/Baggi arrival", assignee: "Hardik", done: false },
        { time: "5:00 PM", task: "BARAT STARTS - safety first!", assignee: "Hardik", done: false },
        { time: "5:00 PM", task: "Dhol management (6 Dhol)", assignee: "Hardik", done: false },
        { time: "6:30 PM", task: "Barat arrival at mandap", assignee: "Hardik", done: false },
        { time: "7:00 PM", task: "Wedding mandap final check", assignee: "Vicky", done: false },
        { time: "7:30 PM", task: "Wedding dinner prep", assignee: "Jay", done: false },
        { time: "8:00 PM", task: "WEDDING CEREMONY BEGINS", assignee: "Mukesh Nagar", done: false },
        { time: "8:00 PM", task: "Photography lane clear", assignee: "Priyanshu", done: false },
        { time: "8:00 PM", task: "Crowd management at mandap", assignee: "Priyanshu", done: false },
        { time: "10:00 PM", task: "Dinner service check", assignee: "Jay", done: false },
        { time: "12:00 AM", task: "Pheras - absolutely no disturbance", assignee: "Mukesh Nagar", done: false }
    ],
    "26": [
        { time: "6:00 AM", task: "Morning arrangements for Vidaai", assignee: "Priyanshu", done: false },
        { time: "8:00 AM", task: "Guest checkout coordination", assignee: "Priyanshu", done: false },
        { time: "9:30 AM", task: "Bus ready for departure", assignee: "Hardik", done: false },
        { time: "10:00 AM", task: "Vidaai ceremony support", assignee: "Priyanshu", done: false },
        { time: "10:30 AM", task: "Bus departure to homes", assignee: "Hardik", done: false },
        { time: "3:00 PM", task: "26th venue (Grand Neelkanth) visit", assignee: "Jayant Chauhan", done: false },
        { time: "4:00 PM", task: "Decor setup verification", assignee: "Jayant Chauhan", done: false },
        { time: "5:00 PM", task: "Catering setup check (500 pax)", assignee: "Jayant Chauhan", done: false },
        { time: "6:00 PM", task: "Sound & lighting test", assignee: "Jayant Chauhan", done: false },
        { time: "6:30 PM", task: "Entry gate & parking coordination", assignee: "Priyanshu", done: false },
        { time: "7:00 PM", task: "RECEPTION STARTS", assignee: "Jayant Chauhan", done: false },
        { time: "7:00 PM", task: "Guest flow management (500 guests)", assignee: "Priyanshu", done: false },
        { time: "7:30 PM", task: "Dinner service begins", assignee: "Jayant Chauhan", done: false },
        { time: "8:00 PM", task: "Stage photography coordination", assignee: "Jay", done: false },
        { time: "10:00 PM", task: "Guest departure management", assignee: "Priyanshu", done: false },
        { time: "10:30 PM", task: "Venue closeout verification", assignee: "Jayant Chauhan", done: false }
    ]
};

// ====== EDITABLE DATA MANAGEMENT ======
// Load custom data from localStorage or use defaults
function loadEditableData() {
    const saved = localStorage.getItem('weddingAppData');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Failed to parse saved data:', e);
        }
    }
    // Return default data structure
    return {
        events: [...WEDDING_DATA.events],
        guests: [...GUEST_LIST],
        meals: [...WEDDING_DATA.meals],
        vendors: [...WEDDING_DATA.vendors],
        preWeddingTasks: [...PRE_WEDDING_TASKS],
        dayTasks: JSON.parse(JSON.stringify(DAY_TASKS))
    };
}

// Save editable data to localStorage
function saveEditableData(data) {
    localStorage.setItem('weddingAppData', JSON.stringify(data));
}

// Global editable data object - initialized after all dependencies are defined
let editableData = loadEditableData();

// Reset to defaults
function resetToDefaults() {
    localStorage.removeItem('weddingAppData');
    editableData = loadEditableData();
}

// ====== CRUD Operations ======
// Events
function addEvent(event) {
    event.id = Date.now();
    editableData.events.push(event);
    saveEditableData(editableData);
    return event.id;
}

function updateEvent(eventId, updates) {
    const idx = editableData.events.findIndex(e => e.id === eventId);
    if (idx !== -1) {
        editableData.events[idx] = { ...editableData.events[idx], ...updates };
        saveEditableData(editableData);
        return true;
    }
    return false;
}

function deleteEvent(eventId) {
    editableData.events = editableData.events.filter(e => e.id !== eventId);
    saveEditableData(editableData);
}

// Guests
function addGuest(guest) {
    guest.id = Date.now();
    editableData.guests.push(guest);
    saveEditableData(editableData);
    return guest.id;
}

function updateGuest(guestId, updates) {
    const idx = editableData.guests.findIndex(g => g.id === guestId);
    if (idx !== -1) {
        editableData.guests[idx] = { ...editableData.guests[idx], ...updates };
        saveEditableData(editableData);
        return true;
    }
    return false;
}

function deleteGuest(guestId) {
    editableData.guests = editableData.guests.filter(g => g.id !== guestId);
    saveEditableData(editableData);
}

// Tasks
function addPreWeddingTask(task) {
    task.id = Date.now();
    editableData.preWeddingTasks.push(task);
    saveEditableData(editableData);
    return task.id;
}

function deletePreWeddingTask(taskId) {
    editableData.preWeddingTasks = editableData.preWeddingTasks.filter(t => t.id !== taskId);
    saveEditableData(editableData);
}

// Get editable events (for rendering)
function getEditableEvents() {
    return editableData.events;
}

// Get editable guests
function getEditableGuests() {
    return editableData.guests;
}

// Get current wedding phase
function getWeddingPhase() {
    const now = new Date();
    if (now < WEDDING_DATES.day1) return 'pre-wedding';
    if (now >= WEDDING_DATES.day1 && now < WEDDING_DATES.day2) return 'day1';
    if (now >= WEDDING_DATES.day2 && now < WEDDING_DATES.day3) return 'day2';
    if (now >= WEDDING_DATES.day3 && now < WEDDING_DATES.endDate) return 'day3';
    return 'post-wedding';
}

// Get countdown to wedding
function getWeddingCountdown() {
    const now = new Date();
    const target = WEDDING_DATES.day1;
    const diff = target - now;

    if (diff <= 0) {
        // Wedding has started or passed
        const phase = getWeddingPhase();
        if (phase === 'day1') return { text: "Day 1 - Haldi & Sangeet", isWeddingDay: true, day: 1 };
        if (phase === 'day2') return { text: "Day 2 - Wedding Day!", isWeddingDay: true, day: 2 };
        if (phase === 'day3') return { text: "Day 3 - Reception", isWeddingDay: true, day: 3 };
        return { text: "Wedding Complete! 🎉", isWeddingDay: false, day: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return {
        text: `${days}d ${hours}h ${minutes}m until wedding`,
        days,
        hours,
        minutes,
        isWeddingDay: false,
        day: 0
    };
}

// Get tasks for coordinator based on current phase  
function getCoordinatorTasks(coordinatorName, phase) {
    const name = coordinatorName.toLowerCase();

    if (phase === 'pre-wedding') {
        return PRE_WEDDING_TASKS.filter(t =>
            t.assignee.toLowerCase().includes(name) || name.includes(t.assignee.toLowerCase())
        );
    }

    const dayNum = phase.replace('day', '');
    const dayTasks = DAY_TASKS[dayNum] || [];
    return dayTasks.filter(t =>
        t.assignee.toLowerCase().includes(name) || name.includes(t.assignee.toLowerCase())
    );
}

// ====== AUTHENTICATION SYSTEM ======

// Simple hash function for password (not cryptographically secure, but provides basic protection)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(16);
}

// Default admin password (hashed) - "wedding2026"
const DEFAULT_ADMIN_PASSWORD_HASH = simpleHash("wedding2026");

// Initialize authentication data
function initAuthData() {
    // Initialize admin password if not set
    if (!localStorage.getItem('weddingAdminPwd')) {
        localStorage.setItem('weddingAdminPwd', DEFAULT_ADMIN_PASSWORD_HASH);
    }

    // Initialize coordinator OTPs if not set
    if (!localStorage.getItem('coordinatorOTPs')) {
        const defaultOTPs = {};
        WEDDING_DATA.coordinators.forEach(coord => {
            // Generate random 4-digit OTP
            defaultOTPs[coord.name] = generateOTP();
        });
        localStorage.setItem('coordinatorOTPs', JSON.stringify(defaultOTPs));
    }

    // Initialize custom coordinators if not set
    if (!localStorage.getItem('customCoordinators')) {
        localStorage.setItem('customCoordinators', JSON.stringify([]));
    }
}

// Generate random 4-digit OTP (always returns string with leading zeros preserved)
function generateOTP() {
    const num = Math.floor(Math.random() * 10000);
    return num.toString().padStart(4, '0');
}

// Admin Password Management
function verifyAdminPassword(password) {
    const storedHash = localStorage.getItem('weddingAdminPwd');
    return simpleHash(password) === storedHash;
}

function changeAdminPassword(oldPassword, newPassword) {
    if (!verifyAdminPassword(oldPassword)) {
        return { success: false, error: 'Current password is incorrect' };
    }
    if (newPassword.length < 4) {
        return { success: false, error: 'Password must be at least 4 characters' };
    }
    localStorage.setItem('weddingAdminPwd', simpleHash(newPassword));
    return { success: true };
}

// Coordinator OTP Management
function getCoordinatorOTPs() {
    const otps = localStorage.getItem('coordinatorOTPs');
    return otps ? JSON.parse(otps) : {};
}

function setCoordinatorOTP(coordinatorName, otp) {
    const cleanOTP = otp ? otp.toString().trim() : '';
    if (!/^\d{4}$/.test(cleanOTP)) {
        return { success: false, error: 'OTP must be exactly 4 digits' };
    }
    const otps = getCoordinatorOTPs();
    otps[coordinatorName] = cleanOTP;
    localStorage.setItem('coordinatorOTPs', JSON.stringify(otps));
    console.log('OTP set for', coordinatorName, ':', cleanOTP);
    return { success: true };
}

function verifyCoordinatorOTP(coordinatorName, otp) {
    const otps = getCoordinatorOTPs();
    const storedOTP = otps[coordinatorName];
    const inputOTP = otp ? otp.toString().trim() : '';
    
    // Debug logging for troubleshooting
    console.log('OTP Verification:', {
        coordinatorName: coordinatorName,
        inputOTP: inputOTP,
        storedOTP: storedOTP,
        allOTPs: Object.keys(otps)
    });
    
    return storedOTP && storedOTP.toString().trim() === inputOTP;
}

function regenerateCoordinatorOTP(coordinatorName) {
    const newOTP = generateOTP();
    setCoordinatorOTP(coordinatorName, newOTP);
    return newOTP;
}

// Custom Coordinators (added by admin)
function getCustomCoordinators() {
    const custom = localStorage.getItem('customCoordinators');
    return custom ? JSON.parse(custom) : [];
}

function addCustomCoordinator(coordinator) {
    const customCoords = getCustomCoordinators();
    coordinator.id = Date.now();
    coordinator.isCustom = true;
    customCoords.push(coordinator);
    localStorage.setItem('customCoordinators', JSON.stringify(customCoords));

    // Also set their OTP
    const otp = generateOTP();
    setCoordinatorOTP(coordinator.name, otp);

    return { id: coordinator.id, otp: otp };
}

function updateCustomCoordinator(id, updates) {
    const customCoords = getCustomCoordinators();
    const idx = customCoords.findIndex(c => c.id === id);
    if (idx !== -1) {
        customCoords[idx] = { ...customCoords[idx], ...updates };
        localStorage.setItem('customCoordinators', JSON.stringify(customCoords));
        return true;
    }
    return false;
}

function deleteCustomCoordinator(id) {
    let customCoords = getCustomCoordinators();
    const coord = customCoords.find(c => c.id === id);
    if (coord) {
        // Remove OTP
        const otps = getCoordinatorOTPs();
        delete otps[coord.name];
        localStorage.setItem('coordinatorOTPs', JSON.stringify(otps));
    }
    customCoords = customCoords.filter(c => c.id !== id);
    localStorage.setItem('customCoordinators', JSON.stringify(customCoords));
}

// Get all coordinators (built-in + custom)
function getAllCoordinators() {
    const builtIn = WEDDING_DATA.coordinators.map(c => ({ ...c, isCustom: false }));
    const custom = getCustomCoordinators();
    return [...builtIn, ...custom];
}

// Access Control - Check if name is allowed to login
function isAllowedUser(name) {
    const lowerName = name.toLowerCase().trim();

    // Check if admin
    for (const admin of ADMIN_USERS) {
        if (lowerName.includes(admin.toLowerCase()) || admin.toLowerCase().includes(lowerName)) {
            return { allowed: true, role: 'admin', requiresAuth: 'password' };
        }
    }

    // Check if coordinator (built-in)
    for (const coord of WEDDING_DATA.coordinators) {
        const coordName = coord.name.toLowerCase();
        if (lowerName.includes(coordName) || coordName.includes(lowerName)) {
            return { allowed: true, role: 'coordinator', coordinator: coord, requiresAuth: 'otp' };
        }
    }

    // Check if custom coordinator
    const customCoords = getCustomCoordinators();
    for (const coord of customCoords) {
        const coordName = coord.name.toLowerCase();
        if (lowerName.includes(coordName) || coordName.includes(lowerName)) {
            return { allowed: true, role: 'coordinator', coordinator: coord, requiresAuth: 'otp' };
        }
    }

    // Check if family member
    for (const family of FAMILY_MEMBERS) {
        if (lowerName.includes(family.toLowerCase()) || family.toLowerCase().includes(lowerName)) {
            return { allowed: true, role: 'family', requiresAuth: null };
        }
    }

    // Check if in guest list
    for (const guest of GUEST_LIST) {
        const guestName = guest.name.toLowerCase();
        if (lowerName.includes(guestName) || guestName.includes(lowerName)) {
            return { allowed: true, role: 'guest', guestInfo: guest, requiresAuth: null };
        }
    }

    // Not found - access denied
    return { allowed: false, role: null, requiresAuth: null };
}

// Initialize auth on load
initAuthData();
