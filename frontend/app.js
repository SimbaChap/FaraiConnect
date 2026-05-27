const forms = document.querySelectorAll(".auth-form");
const googleLogin = document.querySelector("#google-login");
const formSwitchButtons = document.querySelectorAll("[data-show-form]");
const authScreen = document.querySelector("#auth-screen");
const homeScreen = document.querySelector("#home-screen");
const categoryButtons = document.querySelectorAll(".category-pill");
const navItems = document.querySelectorAll("[data-home-view]");
const subfilterStrip = document.querySelector(".subfilter-strip");
const listingFeed = document.querySelector(".listing-feed");
let activeHomeView = "home";
let activeCategory = "houses";
const detailContent = {
  likes: ["Likes", "248 people liked this listing. Popular with renters looking around Avondale and Milton Park."],
  comments: ["Comments", "Comments will open here. For now: 36 people asked about viewing times, water, lease terms, and nearby schools."],
  property: ["Property verification", "Documents checked, agent profile verified, and listing reviewed by FaraiConnect moderation."],
  poster: ["Poster verification", "Tariro M. is marked as a verified agent. Phone and business details have been checked."],
  history: ["Property history", "Listed 2 days ago. Price unchanged. No scam reports. Last verification review completed today."],
};

const propertyListings = [
  {
    id: "avondale-family-home",
    type: "House to rent",
    title: "Avondale 3-bedroom family home",
    price: "$850/mo",
    poster: "Tariro M.",
    initials: "TM",
    posterPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    agentRating: 4,
    agentLikes: 128,
    agentLiked: false,
    agentFollowed: false,
    agentReports: ["Slow response on viewing time", "Asked to confirm business address"],
    agentComments: [
      { tone: "positive", author: "Rudo", text: "Helpful and explained the lease terms clearly." },
      { tone: "positive", author: "Tinashe", text: "Shared extra photos quickly." },
      { tone: "negative", author: "Mako", text: "Viewing time was changed twice." },
      { tone: "negative", author: "Belinda", text: "Needed a clearer office address." },
    ],
    description: "Secure home with borehole water, walled yard, fitted kitchen, and quick access to schools and shopping centres.",
    likes: 248,
    liked: false,
    comments: 36,
    propertyVerified: true,
    propertyVerifiedAt: "Verified today",
    posterVerified: true,
    allowsWhatsapp: true,
    whatsappNumber: "263771234567",
    rooms: 6,
    bedrooms: 3,
    bathrooms: 2,
    postedAt: "Posted 2 days ago",
    views: 1240,
    historyNotes: ["No duplicate listing found", "No previous agent posts detected", "Verification completed today"],
    commentsList: [
      { tone: "positive", author: "Rumbi", text: "The area is quiet and close to good schools." },
      { tone: "positive", author: "Tawanda", text: "Borehole water is a big plus for Avondale." },
      { tone: "negative", author: "Makanaka", text: "Please confirm if the rent includes council bills." },
    ],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "borrowdale-garden-house",
    type: "House to buy",
    title: "Borrowdale modern garden house",
    price: "$180,000",
    poster: "Nyasha Realty",
    initials: "NR",
    posterPhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    agentRating: 5,
    agentLikes: 342,
    agentLiked: false,
    agentFollowed: false,
    agentReports: [],
    agentComments: [
      { tone: "positive", author: "Munashe", text: "Very professional and fast with documents." },
      { tone: "positive", author: "Linda", text: "Answered title deed questions clearly." },
      { tone: "negative", author: "Brian", text: "Price negotiation feedback was slow." },
    ],
    description: "Modern family property with solar backup, landscaped garden, double lock-up garage, and verified ownership documents.",
    likes: 391,
    liked: false,
    comments: 58,
    propertyVerified: true,
    propertyVerifiedAt: "Verified 3 days ago",
    posterVerified: true,
    allowsWhatsapp: false,
    whatsappNumber: "",
    rooms: 8,
    bedrooms: 4,
    bathrooms: 3,
    postedAt: "Posted 5 days ago",
    views: 2188,
    historyNotes: ["Previously listed by Eastview Agents", "Price changed once", "Title deed check requested"],
    commentsList: [
      { tone: "positive", author: "Munashe", text: "The solar backup makes this one stand out." },
      { tone: "positive", author: "Linda", text: "Looks clean and well maintained." },
      { tone: "negative", author: "Brian", text: "Price feels high unless title deeds are ready." },
    ],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "waterfalls-starter-home",
    type: "House to rent",
    title: "Waterfalls starter home",
    price: "$450/mo",
    poster: "Kuda Homes",
    initials: "KH",
    posterPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    agentRating: 3,
    agentLikes: 89,
    agentLiked: false,
    agentFollowed: false,
    agentReports: ["One duplicate post reported"],
    agentComments: [
      { tone: "positive", author: "Ashley", text: "Friendly and easy to reach." },
      { tone: "negative", author: "Nyasha", text: "Water details were not complete." },
      { tone: "negative", author: "Kudzi", text: "Duplicate post confused me at first." },
    ],
    description: "Neat two-bedroom home close to transport routes, with prepaid ZESA, council water, and secure parking.",
    likes: 112,
    liked: false,
    comments: 19,
    propertyVerified: false,
    propertyVerifiedAt: "",
    posterVerified: true,
    allowsWhatsapp: true,
    whatsappNumber: "263772345678",
    rooms: 4,
    bedrooms: 2,
    bathrooms: 1,
    postedAt: "Posted yesterday",
    views: 842,
    historyNotes: ["Appeared once under another agent", "Awaiting property document verification", "No scam reports yet"],
    commentsList: [
      { tone: "positive", author: "Ashley", text: "Good starter home for a small family." },
      { tone: "negative", author: "Nyasha", text: "Need more info about water reliability." },
      { tone: "negative", author: "Kudzi", text: "Parking looks limited from the photos." },
    ],
    images: [
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "greendale-family-property",
    type: "House to buy",
    title: "Greendale family property",
    price: "$125,000",
    poster: "Rudo Properties",
    initials: "RP",
    posterPhoto: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80",
    agentRating: 4,
    agentLikes: 74,
    agentLiked: false,
    agentFollowed: false,
    agentReports: ["Agent verification pending"],
    agentComments: [
      { tone: "positive", author: "Farai", text: "Knows the Greendale market well." },
      { tone: "positive", author: "Vimbai", text: "Good follow-up after viewing." },
      { tone: "negative", author: "Simba", text: "Verification still needs to be completed." },
    ],
    description: "Spacious home on a quiet road with staff quarters, mature trees, and a recent document verification check.",
    likes: 204,
    liked: false,
    comments: 27,
    propertyVerified: true,
    propertyVerifiedAt: "Verified 1 week ago",
    posterVerified: false,
    allowsWhatsapp: false,
    whatsappNumber: "",
    rooms: 7,
    bedrooms: 3,
    bathrooms: 2,
    postedAt: "Posted 1 week ago",
    views: 1675,
    historyNotes: ["Previously listed 3 months ago", "Same owner confirmed", "Agent verification pending"],
    commentsList: [
      { tone: "positive", author: "Farai", text: "Greendale is a strong location for families." },
      { tone: "positive", author: "Vimbai", text: "Staff quarters and trees are a good touch." },
      { tone: "negative", author: "Simba", text: "Would like to know the age of the roof." },
    ],
    images: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "mount-pleasant-cottage",
    type: "House to rent",
    title: "Mount Pleasant cottage",
    price: "$600/mo",
    poster: "Farai Lettings",
    initials: "FL",
    posterPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    agentRating: 3,
    agentLikes: 51,
    agentLiked: false,
    agentFollowed: false,
    agentReports: [],
    agentComments: [
      { tone: "positive", author: "Tino", text: "Quick reply on WhatsApp." },
      { tone: "positive", author: "Rudo", text: "Helpful for remote workers." },
      { tone: "negative", author: "Anesu", text: "Could share more landlord details." },
    ],
    description: "Private cottage with open-plan lounge, reliable water tank, fibre-ready connection, and a verified landlord profile.",
    likes: 176,
    liked: false,
    comments: 24,
    propertyVerified: false,
    propertyVerifiedAt: "",
    posterVerified: false,
    allowsWhatsapp: true,
    whatsappNumber: "263773456789",
    rooms: 3,
    bedrooms: 1,
    bathrooms: 1,
    postedAt: "Posted 3 days ago",
    views: 934,
    historyNotes: ["First FaraiConnect listing", "Landlord profile not yet verified", "No duplicate posts found"],
    commentsList: [
      { tone: "positive", author: "Tino", text: "Private cottage setup looks ideal." },
      { tone: "positive", author: "Rudo", text: "Fibre-ready is helpful for remote work." },
      { tone: "negative", author: "Anesu", text: "One bedroom may be too small for some tenants." },
    ],
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

const resortListings = [
  {
    id: "nyanga-mountain-lodge",
    category: "resort",
    type: "Resort stay",
    title: "Nyanga mountain lodge escape",
    price: "$95/night",
    poster: "Eastern Highlands Retreats",
    initials: "EH",
    posterPhoto: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=300&q=80",
    agentRating: 5,
    agentLikes: 214,
    agentLiked: false,
    agentFollowed: false,
    agentReports: [],
    agentComments: [
      { tone: "positive", author: "Maita", text: "Clear booking process and beautiful views." },
      { tone: "positive", author: "Tapiwa", text: "Staff were responsive before we travelled." },
      { tone: "negative", author: "Kundai", text: "Network can be weak in the evenings." },
    ],
    description: "Scenic lodge near mountain trails, fireplaces, family rooms, and guided outdoor activities.",
    likes: 521,
    liked: false,
    comments: 64,
    propertyVerified: true,
    propertyVerifiedAt: "Verified yesterday",
    posterVerified: true,
    allowsWhatsapp: true,
    whatsappNumber: "263774112233",
    rooms: 12,
    bedrooms: 8,
    bathrooms: 8,
    dayTrip: true,
    accommodationProvided: true,
    activities: ["Mountain hiking", "Bonfire nights", "Guided nature walks", "Family picnic spots"],
    visitors: ["Rumbi visited last month", "Tapiwa visited with family", "Maita saved this for winter"],
    plannedCount: 8,
    hangoutCount: 3,
    userPlanned: false,
    userHangout: false,
    planTiming: "anytime",
    planDate: "",
    openToGroups: false,
    openToPartner: false,
    plannedVisitors: ["Rumbi wants to go in June", "Tapiwa is planning a family weekend", "Maita is open to a winter trip"],
    planningPeople: [
      {
        name: "Rumbi",
        type: "person",
        status: "planning",
        gender: "female",
        availability: "june",
        openFor: "partner",
        note: "Wants to go in June for hiking and photos.",
        visitWhen: "Planning to visit in June",
        photos: ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"],
      },
      {
        name: "Tapiwa family group",
        type: "group",
        status: "hangout",
        gender: "mixed",
        availability: "weekend",
        openFor: "group",
        note: "Planning a family weekend and open to another small group.",
        visitWhen: "Planning a family weekend",
        photos: [
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
        ],
      },
      {
        name: "Maita",
        type: "person",
        status: "hangout",
        gender: "female",
        availability: "winter",
        openFor: "partner",
        note: "Open to a winter trip partner.",
        visitWhen: "Planning a winter trip",
        photos: ["https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80"],
      },
    ],
    postedAt: "Posted 1 day ago",
    views: 3480,
    historyNotes: ["Booking contact verified", "Location checked on map", "No duplicate resort post found"],
    commentsList: [
      { tone: "positive", author: "Rumbi", text: "The views look perfect for a weekend away." },
      { tone: "positive", author: "Tanaka", text: "Great for families who want quiet space." },
      { tone: "negative", author: "Noma", text: "Please confirm if breakfast is included." },
    ],
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "kariba-lakeside-resort",
    category: "resort",
    type: "Lake resort",
    title: "Kariba lakeside family resort",
    price: "$130/night",
    poster: "Zambezi Holiday Stays",
    initials: "ZH",
    posterPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    agentRating: 4,
    agentLikes: 173,
    agentLiked: false,
    agentFollowed: false,
    agentReports: ["One visitor asked for clearer boat fee details"],
    agentComments: [
      { tone: "positive", author: "Farai", text: "Good communication about check-in." },
      { tone: "positive", author: "Vimbai", text: "Shared activity prices before booking." },
      { tone: "negative", author: "Blessing", text: "Boat cruise cost needed more detail." },
    ],
    description: "Waterfront resort with pool, boat activities, sunset views, and family-friendly chalets.",
    likes: 448,
    liked: false,
    comments: 42,
    propertyVerified: true,
    propertyVerifiedAt: "Verified 4 days ago",
    posterVerified: true,
    allowsWhatsapp: true,
    whatsappNumber: "263775445566",
    rooms: 20,
    bedrooms: 14,
    bathrooms: 14,
    dayTrip: true,
    accommodationProvided: true,
    activities: ["Boat cruise", "Fishing", "Pool day", "Sunset braai"],
    visitors: ["Farai visited in April", "Vimbai posted memories here", "Kuda liked the lake view"],
    plannedCount: 11,
    hangoutCount: 5,
    userPlanned: false,
    userHangout: false,
    planTiming: "anytime",
    planDate: "",
    openToGroups: false,
    openToPartner: false,
    plannedVisitors: ["Farai wants a weekend trip", "Vimbai is open to group travel", "Kuda wants to join a boat cruise"],
    planningPeople: [
      {
        name: "Farai",
        type: "person",
        status: "planning",
        gender: "male",
        availability: "weekend",
        openFor: "partner",
        note: "Wants a weekend lake trip.",
        visitWhen: "Planning a weekend visit",
        photos: ["https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"],
      },
      {
        name: "Vimbai group",
        type: "group",
        status: "hangout",
        gender: "mixed",
        availability: "anytime",
        openFor: "group",
        note: "Open to group travel and boat activities.",
        visitWhen: "Planning around school holidays",
        photos: [
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
        ],
      },
      {
        name: "Kuda",
        type: "person",
        status: "hangout",
        gender: "male",
        availability: "weekend",
        openFor: "partner",
        note: "Wants to join a boat cruise.",
        visitWhen: "Planning a boat cruise weekend",
        photos: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"],
      },
    ],
    postedAt: "Posted 4 days ago",
    views: 2904,
    historyNotes: ["Resort contact confirmed", "Visitor photos matched location", "Activity pricing needs regular updates"],
    commentsList: [
      { tone: "positive", author: "Munashe", text: "Looks ideal for a family lake trip." },
      { tone: "positive", author: "Kuda", text: "The pool and sunset view are strong." },
      { tone: "negative", author: "Linda", text: "Need full list of activity fees." },
    ],
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "victoria-falls-boutique-stay",
    category: "resort",
    type: "Visited by friends",
    title: "Victoria Falls boutique stay",
    price: "$160/night",
    poster: "Falls Travel Homes",
    initials: "FT",
    posterPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    agentRating: 4,
    agentLikes: 256,
    agentLiked: false,
    agentFollowed: false,
    agentReports: [],
    agentComments: [
      { tone: "positive", author: "Anesu", text: "Very helpful with local activity options." },
      { tone: "positive", author: "Tino", text: "Responded fast before the trip." },
      { tone: "negative", author: "Rudo", text: "Airport transfer details came late." },
    ],
    description: "Boutique resort stay close to Victoria Falls activities, restaurants, and guided tours.",
    likes: 612,
    liked: false,
    comments: 71,
    propertyVerified: false,
    propertyVerifiedAt: "",
    posterVerified: true,
    allowsWhatsapp: false,
    whatsappNumber: "",
    rooms: 16,
    bedrooms: 10,
    bathrooms: 10,
    dayTrip: false,
    accommodationProvided: true,
    activities: ["Falls tour", "Restaurant hopping", "Curio market", "Guided adventure bookings"],
    visitors: ["Tariro visited last holiday", "Brian shared a memory here", "Anesu wants to visit"],
    plannedCount: 14,
    hangoutCount: 6,
    userPlanned: false,
    userHangout: false,
    planTiming: "anytime",
    planDate: "",
    openToGroups: false,
    openToPartner: false,
    plannedVisitors: ["Anesu wants to visit soon", "Brian is planning for August", "Tariro is open to another trip"],
    planningPeople: [
      {
        name: "Anesu",
        type: "person",
        status: "planning",
        gender: "female",
        availability: "anytime",
        openFor: "partner",
        note: "Wants to visit soon and compare activity prices.",
        visitWhen: "Planning to visit soon",
        photos: ["https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=200&q=80"],
      },
      {
        name: "Brian",
        type: "person",
        status: "planning",
        gender: "male",
        availability: "august",
        openFor: "partner",
        note: "Planning for August.",
        visitWhen: "Planning for August",
        photos: ["https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"],
      },
      {
        name: "Tariro friends",
        type: "group",
        status: "hangout",
        gender: "mixed",
        availability: "soon",
        openFor: "group",
        note: "Open to another trip with a small travel group.",
        visitWhen: "Planning another trip soon",
        photos: [
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
        ],
      },
    ],
    postedAt: "Posted 6 days ago",
    views: 4102,
    historyNotes: ["Visitor memory posts detected", "Host profile verified", "Resort verification pending"],
    commentsList: [
      { tone: "positive", author: "Tariro", text: "Friends visited and loved the location." },
      { tone: "positive", author: "Brian", text: "Good option near activities." },
      { tone: "negative", author: "Ashley", text: "Please confirm airport pickup." },
    ],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

const listingsByCategory = {
  houses: propertyListings,
  resorts: resortListings,
};

const categoryFilters = {
  houses: ["Houses to rent", "Houses to buy", "Verified houses", "Newest", "Near me"],
  resorts: ["Lodges", "Holiday homes", "Visited by friends", "Family friendly", "Near me"],
  stands: ["Residential stands", "Commercial stands", "Serviced stands", "Verified stands", "Near me"],
  farms: ["Small farms", "Large farms", "Plots", "For sale", "For lease"],
  churches: ["Pentecostal", "Apostolic", "Catholic", "Near me", "Most visited"],
  schools: ["Primary", "Secondary", "Private", "Boarding", "Near me"],
  malls: ["Shopping centres", "Food courts", "Popular", "Near me", "Visited"],
  agents: ["Verified agents", "Top rated", "Rentals", "Sales", "Land specialists"],
};

function showPanel(panelName) {
  forms.forEach((form) => {
    form.classList.toggle("active", form.dataset.panel === panelName);
  });
}

function renderSubfilters(category) {
  const filters = categoryFilters[category] || [];
  subfilterStrip.innerHTML = filters
    .map((filter, index) => `<button class="subfilter-pill${index === 0 ? " active" : ""}" type="button">${filter}</button>`)
    .join("");
}

function renderListings(view = "home") {
  const categoryListings = listingsByCategory[activeCategory] || propertyListings;
  const allListings = Object.values(listingsByCategory).flat();
  const visibleListings = view === "likes" ? allListings.filter((listing) => listing.liked) : categoryListings;

  if (visibleListings.length === 0) {
    listingFeed.innerHTML = `
      <div class="empty-liked">
        ${iconHeart()}
        <strong>No liked items yet</strong>
        <span>Tap the heart on any property to save it here.</span>
      </div>`;
    return;
  }

  listingFeed.innerHTML = visibleListings
    .map((listing) => {
      const photos = listing.images
        .map(
          (image, index) => `
            <div class="property-photo" style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.5)), url('${image}')">
              ${
                index === 0
                  ? `<div class="image-summary">
                      <p>${listing.type}</p>
                      <h2>${listing.title}</h2>
                      <strong>${listing.price}</strong>
                    </div>
                    <div class="property-specs" aria-label="Property details">
                      ${renderListingSpecs(listing)}
                    </div>
                    <div class="image-actions" aria-label="Listing actions">
                      <button class="like-button ${listing.liked ? "liked" : ""}" type="button" data-detail="likes" data-liked="${listing.liked}" aria-label="Like property">${iconHeart()}<span>${listing.likes}</span></button>
                      <button type="button" data-detail="comments" aria-label="Open comments">${iconComment()}<span>${listing.comments}</span></button>
                      <button class="verify-chip icon-only ${listing.propertyVerified ? "verified" : "unverified"}" type="button" data-detail="property" aria-label="${listing.propertyVerified ? "Verified property" : "Unverified property"}">${iconVerifiedProperty()}</button>
                      <button class="agent-trigger ${listing.posterVerified ? "verified" : "unverified"}" type="button" data-detail="poster" aria-label="Open ${listing.poster} agent options"><span style="background-image: url('${listing.posterPhoto}')"></span></button>
                      <button class="icon-only" type="button" data-detail="history" aria-label="View property history">${iconHistory()}</button>
                      ${listing.allowsWhatsapp ? `<a class="whatsapp-chip icon-only" href="${whatsappLink(listing)}" target="_blank" rel="noopener" aria-label="Chat with ${listing.poster} on WhatsApp">${iconWhatsapp()}</a>` : ""}
                    </div>`
                  : ""
              }
            </div>`
        )
        .join("");

      return `
        <article class="property-card" data-listing-id="${listing.id}">
          <div class="property-gallery" aria-label="Property photos">${photos}</div>
          <div class="gallery-controls" aria-label="Photo controls">
            <button type="button" data-gallery-control="previous" aria-label="Previous photo">${iconChevronLeft()}</button>
            <button type="button" data-gallery-control="next" aria-label="Next photo">${iconChevronRight()}</button>
          </div>
          <div class="photo-dots" aria-label="Photo position">
            ${listing.images
              .map(
                (_image, index) =>
                  `<button class="${index === 0 ? "active" : ""}" type="button" data-photo-dot="${index}" aria-label="Show photo ${index + 1}"></button>`
              )
              .join("")}
          </div>
          <div class="agent-menu" hidden>
            <button class="agent-menu-close" type="button" data-agent-close aria-label="Close agent menu">x</button>
            <button class="agent-profile-open" type="button" data-agent-action="profile" aria-label="Open full profile for ${listing.poster}">
              <span class="agent-menu-photo" style="background-image: url('${listing.posterPhoto}')"></span>
            </button>
            <div class="agent-menu-meta">
              <strong>${listing.poster}</strong>
              <span>${listing.posterVerified ? "Verified agent" : "Unverified agent"}</span>
            </div>
            <button class="agent-rating" type="button" data-agent-action="rating" aria-label="${listing.agentRating} star agent rating">
              ${renderStars(listing.agentRating)}
            </button>
            ${
              listing.agentReports.length
                ? `<button class="agent-report-summary" type="button" data-agent-action="reports" aria-label="Read agent reports">${iconReport()}<span>${listing.agentReports.length}</span></button>`
                : ""
            }
            <div class="agent-menu-actions" aria-label="Agent actions">
              <button type="button" data-agent-action="postings" aria-label="View agent postings">${iconGrid()}</button>
              <button type="button" data-agent-action="chat" aria-label="Chat in app">${iconChat()}</button>
              <button class="${listing.agentFollowed ? "active" : ""}" type="button" data-agent-action="follow" data-following="${listing.agentFollowed}" aria-label="Follow agent">${iconFollow()}</button>
              <button class="${listing.agentLiked ? "active" : ""}" type="button" data-agent-action="like" data-liked="${listing.agentLiked}" aria-label="Like agent">${iconHeart()}<span>${listing.agentLikes}</span></button>
              <button type="button" data-agent-action="report" aria-label="Report agent">${iconReport()}</button>
            </div>
            <div class="agent-drawer" hidden></div>
          </div>
          <div class="comments-overlay" hidden>
            <div class="comments-header">
              <strong>Comments</strong>
              <button type="button" data-comments-close aria-label="Close comments">x</button>
            </div>
            <div class="comment-filters" aria-label="Comment filters">
              <button class="active" type="button" data-comment-filter="all">All</button>
              <button type="button" data-comment-filter="positive">Positive</button>
              <button type="button" data-comment-filter="negative">Negative</button>
            </div>
            <div class="comment-list">
              ${renderComments(listing.commentsList, "all")}
            </div>
          </div>
          <div class="verification-overlay" hidden></div>
          <div class="resort-overlay" hidden></div>
          <div class="planning-overlay" hidden></div>
          <div class="history-overlay" hidden></div>
          <div class="detail-panel" aria-live="polite" hidden></div>
        </article>`;
    })
    .join("");
  setupGalleryIndicators();
}

function listingFromCard(card) {
  const listingId = card?.dataset.listingId;
  return Object.values(listingsByCategory)
    .flat()
    .find((listing) => listing.id === listingId);
}

function renderListingSpecs(listing) {
  if (listing.category === "resort") {
    return `
      <span aria-label="${listing.dayTrip ? "Day trip available" : "Booking stay only"}">${iconSun()}${listing.dayTrip ? "Day trip" : "Stay only"}</span>
      <span aria-label="${listing.accommodationProvided ? "Accommodation provided" : "No accommodation"}">${iconBed()}${listing.accommodationProvided ? "Stay" : "No stay"}</span>
      <button type="button" data-detail="activities" aria-label="View resort activities">${iconActivity()}${listing.activities.length}</button>
      <button type="button" data-detail="visitors" aria-label="View people who visited">${iconVisitors()}${listing.visitors.length}</button>
      <button class="${listing.userPlanned ? "active" : ""}" type="button" data-detail="plan" aria-label="Plan to visit this resort">${iconPlan()}${listing.plannedCount}</button>`;
  }

  return `
    <span aria-label="${listing.rooms} rooms">${iconRooms()}${listing.rooms}</span>
    <span aria-label="${listing.bedrooms} bedrooms">${iconBed()}${listing.bedrooms}</span>
    <span aria-label="${listing.bathrooms} bathrooms">${iconBath()}${listing.bathrooms}</span>`;
}

function renderComments(comments, filter) {
  const visibleComments = filter === "all" ? comments : comments.filter((comment) => comment.tone === filter);
  return visibleComments
    .map(
      (comment) => `
        <article class="comment-item ${comment.tone}">
          <strong>${comment.author}</strong>
          <p>${comment.text}</p>
        </article>`
    )
    .join("");
}

function renderResortPanel(listing, panelType) {
  if (panelType === "plan" || panelType === "hangout") {
    return renderResortPlanPanel(listing);
  }

  const isActivities = panelType === "activities";
  const items = isActivities ? listing.activities : listing.visitors;
  return `
    <div class="resort-header">
      <strong>${isActivities ? "Activities" : "Visited before"}</strong>
      <button type="button" data-resort-close aria-label="Close ${isActivities ? "activities" : "visitors"}">x</button>
    </div>
    <div class="resort-list">
      ${items.map((item) => `<p>${isActivities ? iconActivity() : iconVisitors()}<span>${item}</span></p>`).join("")}
    </div>`;
}

function renderResortPlanPanel(listing) {
  return `
    <div class="resort-header">
      <strong>Plan this visit</strong>
      <button type="button" data-resort-close aria-label="Close visit plan">x</button>
    </div>
    <div class="plan-counts">
      <button type="button" data-plan-people="planning">${listing.plannedCount} planning</button>
      <button type="button" data-plan-people="hangout">${listing.hangoutCount} open to go together</button>
    </div>
    <div class="plan-options">
      <strong>Time period</strong>
      <div class="plan-option-group" aria-label="Trip timing">
        <button class="${listing.planTiming === "anytime" ? "active" : ""}" type="button" data-plan-time="anytime">Anytime</button>
        <button class="${listing.planTiming === "dates" ? "active" : ""}" type="button" data-plan-time="dates">Pick dates</button>
      </div>
      <input class="${listing.planTiming === "dates" ? "active" : ""}" type="date" data-plan-date value="${listing.planDate}" aria-label="Planned trip date" />
      <strong>I am open to go with:</strong>
      <div class="plan-option-group" aria-label="Trip openness">
        <button class="${listing.openToGroups ? "active" : ""}" type="button" data-plan-open="groups">Groups</button>
        <button class="${listing.openToPartner ? "active" : ""}" type="button" data-plan-open="partner">Partner</button>
      </div>
    </div>
    <div class="plan-counts">
      <span>${listing.planTiming === "dates" && listing.planDate ? listing.planDate : "Anytime"}</span>
    </div>`;
}

function renderPlanningOverlay(listing, filter = "planning", criteria = {}) {
  const activeFilters = criteria.activeFilters || [];
  const query = criteria.query || "";
  const safeQuery = escapeAttr(query);
  const people = filterPlanningPeople(getPlanningPeople(listing, filter), activeFilters, query);
  return `
    <div class="planning-backdrop" data-people-mode="${filter}">
      <div class="planning-header">
        <strong>${filter === "hangout" ? "Open to go together" : "Planning to go"}</strong>
        <button type="button" data-planning-close aria-label="Close planning people">x</button>
      </div>
      <div class="planning-tools">
        <label class="planning-search">
          ${iconSearch()}
          <input type="search" data-planning-search placeholder="Search name, date, trip..." value="${safeQuery}">
        </label>
        <div class="planning-filter-row" aria-label="Planning filters">
          ${renderPlanningFilterButton("all", "All", activeFilters)}
          ${renderPlanningFilterButton("female", "Females", activeFilters)}
          ${renderPlanningFilterButton("male", "Males", activeFilters)}
          ${renderPlanningFilterButton("anytime", "Anytime", activeFilters)}
          ${renderPlanningFilterButton("groups", "Groups", activeFilters)}
          ${renderPlanningFilterButton("partners", "Partners", activeFilters)}
        </div>
      </div>
      <div class="floating-people" aria-label="People planning this resort">
        ${people.length ? people.map((person, index) => renderFloatingPerson(person, index)).join("") : `<div class="planning-empty">No matches yet</div>`}
      </div>
      <div class="planning-profile" hidden></div>
    </div>`;
}

function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderPlanningFilterButton(value, label, activeFilters) {
  const isActive = value === "all" ? activeFilters.length === 0 : activeFilters.includes(value);
  return `<button class="${isActive ? "active" : ""}" type="button" data-planning-filter="${value}">${label}</button>`;
}

function getPlanningPeople(listing, filter = "planning") {
  const targetCount = filter === "hangout" ? listing.hangoutCount : listing.plannedCount;
  const sourcePeople = listing.planningPeople.filter((person) => person.status === filter);
  const people = [...sourcePeople];
  const fallbackPhotos = listing.planningPeople.flatMap((person) => person.photos);

  while (people.length < targetCount) {
    const index = people.length;
    const isGroup = index % 4 === 2;
    people.push({
      name: isGroup ? `Trip group ${index + 1}` : `Planner ${index + 1}`,
      type: isGroup ? "group" : "person",
      status: filter,
      gender: isGroup ? "mixed" : index % 2 === 0 ? "female" : "male",
      availability: index % 3 === 0 ? "anytime" : filter === "hangout" ? "soon" : "dates soon",
      openFor: isGroup ? "group" : "partner",
      note: isGroup ? "Planning as a small group and checking dates." : "Interested in this resort and watching the plan.",
      visitWhen: filter === "hangout" ? "Open to agree dates together" : "Planning dates soon",
      photos: isGroup ? fallbackPhotos.slice(0, 3) : [fallbackPhotos[index % fallbackPhotos.length]],
    });
  }

  return people.slice(0, targetCount);
}

function filterPlanningPeople(people, activeFilters = [], query = "") {
  const normalizedQuery = normalizePlanningSearch(query);
  return people.filter((person) => {
    const matchesFilter =
      activeFilters.length === 0 ||
      activeFilters.every((filter) => {
        return (
          (filter === "female" && person.gender === "female") ||
          (filter === "male" && person.gender === "male") ||
          (filter === "anytime" && person.availability === "anytime") ||
          (filter === "groups" && person.type === "group") ||
          (filter === "partners" && person.openFor === "partner")
        );
      });
    const haystack = getPlanningSearchText(person);
    return matchesFilter && (!normalizedQuery || haystack.includes(normalizedQuery));
  });
}

function normalizePlanningSearch(value) {
  return String(value).trim().toLowerCase();
}

function getPlanningSearchText(person) {
  const genderWords = {
    female: "female females woman women lady ladies",
    male: "male males man men guy guys",
    mixed: "mixed group groups people",
  };
  const typeWords = person.type === "group" ? "group groups family families team" : "person partner partners solo";
  const openWords = person.openFor === "group" ? "group groups" : "partner partners";
  return `${person.name} ${person.note} ${person.visitWhen} ${person.availability} ${person.openFor} ${person.gender} ${genderWords[person.gender] || ""} ${typeWords} ${openWords}`.toLowerCase();
}

function getPlanningCriteria(overlay) {
  return {
    activeFilters: Array.from(overlay.querySelectorAll("[data-planning-filter].active"))
      .map((button) => button.dataset.planningFilter)
      .filter((filter) => filter !== "all"),
    query: overlay.querySelector("[data-planning-search]")?.value || "",
  };
}

function renderFloatingPerson(person, index) {
  const photoMarkup = person.photos
    .slice(0, 3)
    .map((photo) => `<span style="background-image: url('${photo}')"></span>`)
    .join("");
  return `
    <button class="floating-person ${person.status} ${person.type}" type="button" data-floating-person="${index}" style="--float-delay: ${index * 1.15}s; --float-left: ${16 + ((index * 27) % 58)}%;">
      ${photoMarkup}
    </button>`;
}

function renderPlanningProfile(person) {
  const canJoin = person.status === "hangout";
  return `
    <button type="button" data-planning-profile-close aria-label="Close planning profile">x</button>
    <div class="planning-profile-images ${person.type}">
      ${person.photos
        .slice(0, 3)
        .map((photo) => `<span style="background-image: url('${photo}')"></span>`)
        .join("")}
    </div>
    <strong>${person.name}</strong>
    <p>${person.note}</p>
    <span class="planning-visit-time">${person.visitWhen || "Planning dates soon"}</span>
    <div class="planning-profile-actions">
      ${canJoin ? `<button type="button" data-request-join>${person.type === "group" ? "Request group" : "Request to join"}</button>` : ""}
      <button type="button" data-social-action="follow">Follow</button>
      <button type="button" data-social-action="friend">Friend</button>
    </div>`;
}

function renderStars(rating) {
  return Array.from({ length: 5 }, (_item, index) => `<span class="${index < rating ? "filled" : ""}">&#9733;</span>`).join("");
}

function renderHistory(listing) {
  if (!listing) return "";
  const positiveCount = listing.commentsList.filter((comment) => comment.tone === "positive").length;
  const negativeCount = listing.commentsList.filter((comment) => comment.tone === "negative").length;
  return `
    <div class="history-header">
      <strong>Property history</strong>
      <button type="button" data-history-close aria-label="Close history">x</button>
    </div>
    <div class="history-stats">
      <span>${iconHistory()}<strong>${listing.postedAt}</strong></span>
      <span>${iconEye()}<strong>${listing.views.toLocaleString()} views</strong></span>
      <span>${iconComment()}<strong>${positiveCount} positive</strong></span>
      <span>${iconReport()}<strong>${negativeCount} negative</strong></span>
    </div>
    <div class="history-list">
      ${listing.historyNotes.map((note) => `<p>${note}</p>`).join("")}
    </div>`;
}

function renderAgentChat(listing) {
  return `
    <div class="agent-chat">
      <div class="chat-thread">
        <p><strong>You</strong> Hi, is this property still available?</p>
        <p><strong>${listing.poster}</strong> Yes, you can ask me here.</p>
      </div>
      <form data-agent-chat-form>
        <input type="text" name="message" placeholder="Type message..." aria-label="Message ${listing.poster}" />
        <button type="submit" aria-label="Send message">${iconChat()}</button>
      </form>
    </div>`;
}

function renderAgentReports(listing) {
  return `
    <div class="agent-reports">
      ${listing.agentReports.length ? listing.agentReports.map((report) => `<p>${report}</p>`).join("") : "<p>No reports on this agent.</p>"}
    </div>`;
}

function renderAgentSentiment(listing) {
  const positive = listing.agentComments.filter((comment) => comment.tone === "positive").slice(0, 2);
  const negative = listing.agentComments.filter((comment) => comment.tone === "negative").slice(0, 2);
  return `
    <div class="agent-sentiment">
      <div>
        <strong>Top positive</strong>
        ${positive.map((comment) => `<p><b>${comment.author}</b> ${comment.text}</p>`).join("")}
      </div>
      <div>
        <strong>Top negative</strong>
        ${negative.map((comment) => `<p><b>${comment.author}</b> ${comment.text}</p>`).join("")}
      </div>
    </div>`;
}

function renderAgentReportForm() {
  return `
    <form class="agent-report-form" data-agent-report-form>
      <textarea name="report" placeholder="Write report..." aria-label="Write report"></textarea>
      <button type="submit">Submit</button>
    </form>`;
}

function renderVerification(listing) {
  if (!listing) return "";
  const statusText = listing.propertyVerified ? listing.propertyVerifiedAt : "Not verified yet";
  const note = listing.propertyVerified
    ? "Property documents and listing details were checked by FaraiConnect."
    : "This property is still waiting for FaraiConnect verification.";
  return `
    <div class="verification-header">
      <strong>Property verification</strong>
      <button type="button" data-verification-close aria-label="Close verification">x</button>
    </div>
    <div class="verification-status ${listing.propertyVerified ? "verified" : "unverified"}">
      ${iconVerifiedProperty()}
      <strong>${statusText}</strong>
    </div>
    <p>${note}</p>`;
}

function iconHeart() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 21.4 10.6 20C5.6 15.5 2.5 12.7 2.5 8.9A5.3 5.3 0 0 1 7.8 3.5c1.7 0 3.3.8 4.2 2.1.9-1.3 2.5-2.1 4.2-2.1a5.3 5.3 0 0 1 5.3 5.4c0 3.8-3.1 6.6-8.1 11.1L12 21.4Z" /></svg>`;
}

function iconComment() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 4h16v12H8.8L4 20.2V4Zm4 5v2h8V9H8Zm0 4v2h5v-2H8Z" /></svg>`;
}

function iconHouse() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 11.2 12 4l9 7.2V21h-6v-6H9v6H3v-9.8Z" /></svg>`;
}

function iconVerifiedProperty() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2.4 20 5.8v6.1c0 5.1-3.4 8.4-8 9.7-4.6-1.3-8-4.6-8-9.7V5.8l8-3.4Zm-1.2 12.1 5-5-1.5-1.5-3.5 3.5-1.4-1.4-1.5 1.5 2.9 2.9Z" /></svg>`;
}

function iconPerson() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.4 0-8 2.2-8 5v1h10.7A6.5 6.5 0 0 1 12 14Zm7.7 1.3 1.3 1.3-4.5 4.4-2.5-2.5 1.3-1.3 1.2 1.2 3.2-3.1Z" /></svg>`;
}

function iconFollow() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4 0-7 2.1-7 5v2h10.2a7 7 0 0 1 1.3-6.1A10.4 10.4 0 0 0 10 13Zm8-1h2v3h3v2h-3v3h-2v-3h-3v-2h3v-3Z" /></svg>`;
}

function iconGrid() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" /></svg>`;
}

function iconChat() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 4h16v12H8.8L4 20.2V4Zm4 5v2h8V9H8Zm0 4v2h5v-2H8Z" /></svg>`;
}

function iconReport() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M11 3h2v11h-2V3Zm0 14h2v2h-2v-2Zm1-15a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" /></svg>`;
}

function iconEye() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5c5 0 8.8 4.4 10 7-1.2 2.6-5 7-10 7S3.2 14.6 2 12c1.2-2.6 5-7 10-7Zm0 2.4c-3.4 0-6.2 2.7-7.4 4.6 1.2 1.9 4 4.6 7.4 4.6s6.2-2.7 7.4-4.6c-1.2-1.9-4-4.6-7.4-4.6Zm0 1.6a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" /></svg>`;
}

function iconHistory() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M13 3a9 9 0 1 1-8.3 5.5H2V6h6v6H5.5V9.9A6.7 6.7 0 1 0 13 5.3V3Zm-1 5h2v5l4 2-.9 1.7-5.1-2.6V8Z" /></svg>`;
}

function iconSun() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M11 2h2v3h-2V2Zm0 17h2v3h-2v-3ZM2 11h3v2H2v-2Zm17 0h3v2h-3v-2ZM4.2 5.6l1.4-1.4 2.1 2.1-1.4 1.4-2.1-2.1Zm12.1 12.1 1.4-1.4 2.1 2.1-1.4 1.4-2.1-2.1Zm2.1-13.5 1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1ZM6.3 16.3l1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" /></svg>`;
}

function iconSearch() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M10.8 4a6.8 6.8 0 0 1 5.4 10.9l3.4 3.4-1.4 1.4-3.4-3.4A6.8 6.8 0 1 1 10.8 4Zm0 2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Z" /></svg>`;
}

function iconActivity() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 17h3.2l2.2-5.8 3.2 8.8 2.5-6H20v2h-3.6l-4 7-3.1-8.6L8.6 19H4v-2ZM7 4h3l1.4 3.2L14 4h3l-4.6 5.6L17 15h-3l-2.6-3.2L8.8 15h-3l4.7-5.4L7 4Z" /></svg>`;
}

function iconVisitors() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8.2.3a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.5 20c.5-3.7 2.7-6.2 5.5-6.2s5 2.5 5.5 6.2h-11Zm10.7 0a8.8 8.8 0 0 0-1.5-3.9 5.5 5.5 0 0 1 4.5-2.1c2.6 0 4.7 2.4 5.3 6h-8.3Z" /></svg>`;
}

function iconPlan() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 2h2v3h6V2h2v3h3v17H4V5h3V2Zm11 8H6v10h12V10Zm-6 8-4-4 1.4-1.4 2.6 2.6 4.6-4.6L18 12l-6 6Z" /></svg>`;
}

function iconHangout() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.5 20c.5-3.5 2.7-5.8 5.5-5.8 1.8 0 3.3 1 4.3 2.6A6.2 6.2 0 0 1 16 15c2.7 0 4.8 2 5.5 5h-19Zm10.8-8.1 1.7 1.7 3.6-3.6 1.4 1.4-5 5-3.1-3.1 1.4-1.4Z" /></svg>`;
}

function iconChevronLeft() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m14.8 5 1.4 1.4L10.6 12l5.6 5.6-1.4 1.4-7-7 7-7Z" /></svg>`;
}

function iconChevronRight() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9.2 19-1.4-1.4 5.6-5.6-5.6-5.6L9.2 5l7 7-7 7Z" /></svg>`;
}

function iconWhatsapp() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2.8A9.1 9.1 0 0 0 4.2 16.6L3 21l4.5-1.2A9.1 9.1 0 1 0 12 2.8Zm0 1.8a7.3 7.3 0 0 1 6.2 11.1A7.3 7.3 0 0 1 8 18l-.3-.2-2.2.6.6-2.1-.2-.3A7.3 7.3 0 0 1 12 4.6Zm-3.1 3.8c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3l-1.7-.8c-.3-.1-.5-.1-.7.2l-.6.8c-.2.3-.4.3-.7.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.8c-.2-.4-.4-.4-.6-.4h-.5Z" /></svg>`;
}

function iconRooms() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4Zm2 2v5h5V6H6Zm7 0v5h5V6h-5Zm-7 7v5h5v-5H6Zm7 0v5h5v-5h-5Z" /></svg>`;
}

function iconBed() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5h2v7h14a3 3 0 0 1 3 3v5h-2v-3H6v3H4V5Zm4 2h5a3 3 0 0 1 3 3v2H8V7Z" /></svg>`;
}

function iconBath() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 4a3 3 0 0 1 6 0v1h2v2h-4V4a1 1 0 0 0-2 0v7h12v3a6 6 0 0 1-3 5.2V22h-2v-2H8v2H6v-2.8A6 6 0 0 1 3 14v-3h4V4Z" /></svg>`;
}

function whatsappLink(listing) {
  const message = encodeURIComponent(`Hi ${listing.poster}, I saw your ${listing.title} on FaraiConnect and would like to ask about it.`);
  return `https://wa.me/${listing.whatsappNumber}?text=${message}`;
}

function updatePhotoDots(card) {
  const gallery = card.querySelector(".property-gallery");
  const dots = [...card.querySelectorAll("[data-photo-dot]")];
  if (!gallery || dots.length === 0) return;
  const activeIndex = Math.round(gallery.scrollLeft / gallery.clientWidth);
  dots.forEach((dot, index) => dot.classList.toggle("active", index === activeIndex));
}

function setupGalleryIndicators() {
  document.querySelectorAll(".property-card").forEach((card) => {
    const gallery = card.querySelector(".property-gallery");
    if (!gallery) return;
    gallery.addEventListener("scroll", () => updatePhotoDots(card), { passive: true });
    updatePhotoDots(card);
  });
}

function openAgentDrawer(menu, html) {
  const drawer = menu.querySelector(".agent-drawer");
  menu.classList.add("compact");
  drawer.hidden = false;
  drawer.innerHTML = html;
}

function enterHomeScreen() {
  authScreen.hidden = true;
  homeScreen.hidden = false;
  document.title = "FaraiConnect | Home";
  activeHomeView = "home";
  activeCategory = "houses";
  renderSubfilters("houses");
  renderListings("home");
}

formSwitchButtons.forEach((button) => {
  button.addEventListener("click", () => showPanel(button.dataset.showForm));
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeHomeView = "home";
    activeCategory = button.dataset.category;
    navItems.forEach((navItem) => navItem.classList.toggle("active", navItem.dataset.homeView === "home"));
    categoryButtons.forEach((categoryButton) => categoryButton.classList.remove("active"));
    button.classList.add("active");
    renderSubfilters(button.dataset.category);
    renderListings("home");
  });
});

navItems.forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.homeView;
    activeHomeView = view;
    navItems.forEach((navItem) => navItem.classList.toggle("active", navItem === button));
    renderListings(view);
  });
});

subfilterStrip.addEventListener("click", (event) => {
  const button = event.target.closest(".subfilter-pill");
  if (!button) return;
  subfilterStrip.querySelectorAll(".subfilter-pill").forEach((filterButton) => filterButton.classList.remove("active"));
  button.classList.add("active");
});

document.addEventListener("click", (event) => {
  const galleryControl = event.target.closest("[data-gallery-control]");
  if (galleryControl) {
    const card = galleryControl.closest(".property-card");
    const gallery = card.querySelector(".property-gallery");
    const direction = galleryControl.dataset.galleryControl === "next" ? 1 : -1;
    gallery.scrollBy({ left: direction * gallery.clientWidth, behavior: "smooth" });
    return;
  }

  const photoDot = event.target.closest("[data-photo-dot]");
  if (photoDot) {
    const card = photoDot.closest(".property-card");
    const gallery = card.querySelector(".property-gallery");
    const index = Number(photoDot.dataset.photoDot);
    gallery.scrollTo({ left: index * gallery.clientWidth, behavior: "smooth" });
    updatePhotoDots(card);
    return;
  }

  const detailButton = event.target.closest("[data-detail]");
  if (!detailButton) return;
  const card = detailButton.closest(".property-card");
  const panel = card.querySelector(".detail-panel");
  const listing = listingFromCard(card);

  if (detailButton.dataset.detail === "likes") {
    const count = detailButton.querySelector("span");
    const isLiked = detailButton.dataset.liked === "true";
    const nextLiked = !isLiked;
    if (listing) {
      listing.liked = nextLiked;
      listing.likes += nextLiked ? 1 : -1;
    }
    detailButton.dataset.liked = String(nextLiked);
    detailButton.classList.toggle("liked", nextLiked);
    count.textContent = String(Number(count.textContent) + (nextLiked ? 1 : -1));
    if (activeHomeView === "likes" && !nextLiked) {
      renderListings("likes");
    }
    return;
  }

  if (detailButton.dataset.detail === "comments") {
    document.querySelectorAll(".comments-overlay").forEach((overlay) => {
      overlay.hidden = true;
    });
    const overlay = card.querySelector(".comments-overlay");
    overlay.hidden = false;
    card.querySelectorAll("[data-detail]").forEach((button) => button.classList.remove("active"));
    detailButton.classList.add("active");
    return;
  }

  if (detailButton.dataset.detail === "property") {
    document.querySelectorAll(".verification-overlay").forEach((overlay) => {
      overlay.hidden = true;
    });
    const overlay = card.querySelector(".verification-overlay");
    overlay.innerHTML = renderVerification(listing);
    overlay.hidden = false;
    card.querySelectorAll("[data-detail]").forEach((button) => button.classList.remove("active"));
    detailButton.classList.add("active");
    return;
  }

  if (["activities", "visitors", "plan", "hangout"].includes(detailButton.dataset.detail)) {
    document.querySelectorAll(".resort-overlay").forEach((overlay) => {
      overlay.hidden = true;
    });
    if (detailButton.dataset.detail === "plan" && listing && !listing.userPlanned) {
      listing.userPlanned = true;
      listing.plannedCount += 1;
    }
    if (detailButton.dataset.detail === "hangout" && listing) {
      if (!listing.userPlanned) {
        listing.userPlanned = true;
        listing.plannedCount += 1;
      }
      if (!listing.userHangout) {
        listing.userHangout = true;
        listing.openToPartner = true;
        listing.hangoutCount += 1;
      }
    }
    const overlay = card.querySelector(".resort-overlay");
    overlay.innerHTML = renderResortPanel(listing, detailButton.dataset.detail);
    overlay.hidden = false;
    card.querySelectorAll("[data-detail]").forEach((button) => button.classList.remove("active"));
    card.querySelector('[data-detail="plan"]')?.classList.toggle("active", Boolean(listing?.userPlanned));
    card.querySelector('[data-detail="hangout"]')?.classList.toggle("active", Boolean(listing?.userHangout));
    card.querySelector('[data-detail="plan"]').lastChild.textContent = String(listing?.plannedCount || 0);
    const hangoutButton = card.querySelector('[data-detail="hangout"]');
    if (hangoutButton) {
      hangoutButton.lastChild.textContent = String(listing?.hangoutCount || 0);
    }
    return;
  }

  if (detailButton.dataset.detail === "history") {
    document.querySelectorAll(".history-overlay").forEach((overlay) => {
      overlay.hidden = true;
    });
    const overlay = card.querySelector(".history-overlay");
    overlay.innerHTML = renderHistory(listing);
    overlay.hidden = false;
    card.querySelectorAll("[data-detail]").forEach((button) => button.classList.remove("active"));
    detailButton.classList.add("active");
    return;
  }

  if (detailButton.dataset.detail === "poster") {
    const agentMenu = card.querySelector(".agent-menu");
    const isHidden = agentMenu.hasAttribute("hidden");
    document.querySelectorAll(".agent-menu").forEach((menu) => {
      menu.setAttribute("hidden", "");
    });
    if (isHidden) {
      agentMenu.removeAttribute("hidden");
      agentMenu.classList.remove("compact");
      const drawer = agentMenu.querySelector(".agent-drawer");
      drawer.hidden = true;
      drawer.innerHTML = "";
    } else {
      agentMenu.setAttribute("hidden", "");
    }
    card.querySelectorAll("[data-detail]").forEach((button) => button.classList.remove("active"));
    detailButton.classList.toggle("active", isHidden);
    return;
  }

  const [title, text] = detailContent[detailButton.dataset.detail] || detailContent.property;
  card.querySelectorAll("[data-detail]").forEach((button) => button.classList.remove("active"));
  detailButton.classList.add("active");
  panel.hidden = false;
  panel.innerHTML = `<strong>${title}</strong><p>${text}</p>`;
});

document.addEventListener("click", (event) => {
  const closeButton = event.target.closest("[data-comments-close]");
  if (closeButton) {
    closeButton.closest(".comments-overlay").hidden = true;
    return;
  }

  const filterButton = event.target.closest("[data-comment-filter]");
  if (!filterButton) return;

  const overlay = filterButton.closest(".comments-overlay");
  const card = filterButton.closest(".property-card");
  const listing = listingFromCard(card);
  const filter = filterButton.dataset.commentFilter;

  overlay.querySelectorAll("[data-comment-filter]").forEach((button) => button.classList.remove("active"));
  filterButton.classList.add("active");
  overlay.querySelector(".comment-list").innerHTML = renderComments(listing?.commentsList || [], filter);
});

document.addEventListener("click", (event) => {
  const planPeopleButton = event.target.closest("[data-plan-people]");
  if (planPeopleButton) {
    const card = planPeopleButton.closest(".property-card");
    const listing = listingFromCard(card);
    const overlay = card.querySelector(".planning-overlay");
    overlay.innerHTML = renderPlanningOverlay(listing, planPeopleButton.dataset.planPeople);
    overlay.hidden = false;
    return;
  }

  const planningClose = event.target.closest("[data-planning-close]");
  if (planningClose) {
    planningClose.closest(".planning-overlay").hidden = true;
    return;
  }

  const planningProfileClose = event.target.closest("[data-planning-profile-close]");
  if (planningProfileClose) {
    planningProfileClose.closest(".planning-profile").hidden = true;
    return;
  }

  const floatingPerson = event.target.closest("[data-floating-person]");
  if (floatingPerson) {
    const card = floatingPerson.closest(".property-card");
    const listing = listingFromCard(card);
    const overlay = floatingPerson.closest(".planning-overlay");
    const filter = overlay.querySelector(".planning-backdrop").dataset.peopleMode || "planning";
    const criteria = getPlanningCriteria(overlay);
    const person = filterPlanningPeople(getPlanningPeople(listing, filter), criteria.activeFilters, criteria.query)[Number(floatingPerson.dataset.floatingPerson)];
    const profile = card.querySelector(".planning-profile");
    profile.innerHTML = renderPlanningProfile(person);
    profile.hidden = false;
    return;
  }

  const planningFilter = event.target.closest("[data-planning-filter]");
  if (planningFilter) {
    const overlay = planningFilter.closest(".planning-overlay");
    const card = planningFilter.closest(".property-card");
    const listing = listingFromCard(card);
    const filter = overlay.querySelector(".planning-backdrop").dataset.peopleMode || "planning";
    const criteria = getPlanningCriteria(overlay);
    const selectedFilter = planningFilter.dataset.planningFilter;
    if (selectedFilter === "all") {
      criteria.activeFilters = [];
    } else if (criteria.activeFilters.includes(selectedFilter)) {
      criteria.activeFilters = criteria.activeFilters.filter((filterName) => filterName !== selectedFilter);
    } else {
      criteria.activeFilters = [...criteria.activeFilters, selectedFilter];
    }
    overlay.innerHTML = renderPlanningOverlay(listing, filter, criteria);
    overlay.hidden = false;
    return;
  }

  const socialAction = event.target.closest("[data-social-action]");
  if (socialAction) {
    const isActive = socialAction.classList.toggle("active");
    const action = socialAction.dataset.socialAction;
    if (action === "follow") {
      socialAction.textContent = isActive ? "Follow request sent" : "Follow";
    } else {
      socialAction.textContent = isActive ? "Friend request sent" : "Friend";
    }
    return;
  }

  const requestJoin = event.target.closest("[data-request-join]");
  if (requestJoin) {
    requestJoin.textContent = "Request sent";
    requestJoin.classList.add("active");
    return;
  }

  const planChoice = event.target.closest("[data-plan-choice]");
  if (planChoice) {
    const card = planChoice.closest(".property-card");
    const listing = listingFromCard(card);
    if (!listing) return;

    if (!listing.userPlanned) {
      listing.userPlanned = true;
      listing.plannedCount += 1;
    }

    if (planChoice.dataset.planChoice === "hangout" && !listing.userHangout) {
      listing.userHangout = true;
      listing.openToPartner = true;
      listing.hangoutCount += 1;
    }

    card.querySelector('[data-detail="plan"]').classList.toggle("active", listing.userPlanned);
    card.querySelector('[data-detail="plan"]').lastChild.textContent = String(listing.plannedCount);
    const hangoutButton = card.querySelector('[data-detail="hangout"]');
    if (hangoutButton) {
      hangoutButton.classList.toggle("active", listing.userHangout);
      hangoutButton.lastChild.textContent = String(listing.hangoutCount);
    }
    card.querySelector(".resort-overlay").innerHTML = renderResortPlanPanel(listing);
    return;
  }

  const planTime = event.target.closest("[data-plan-time]");
  if (planTime) {
    const card = planTime.closest(".property-card");
    const listing = listingFromCard(card);
    if (!listing) return;
    listing.planTiming = planTime.dataset.planTime;
    card.querySelector(".resort-overlay").innerHTML = renderResortPlanPanel(listing);
    return;
  }

  const planOpen = event.target.closest("[data-plan-open]");
  if (planOpen) {
    const card = planOpen.closest(".property-card");
    const listing = listingFromCard(card);
    if (!listing) return;
    if (planOpen.dataset.planOpen === "groups") {
      listing.openToGroups = !listing.openToGroups;
    }
    if (planOpen.dataset.planOpen === "partner") {
      const nextPartner = !listing.openToPartner;
      if (nextPartner && !listing.userHangout) {
        listing.hangoutCount += 1;
      }
      if (!nextPartner && listing.userHangout) {
        listing.hangoutCount -= 1;
      }
      listing.openToPartner = nextPartner;
      listing.userHangout = nextPartner;
      const hangoutButton = card.querySelector('[data-detail="hangout"]');
      if (hangoutButton) {
        hangoutButton.classList.toggle("active", listing.userHangout);
        hangoutButton.lastChild.textContent = String(listing.hangoutCount);
      }
    }
    card.querySelector(".resort-overlay").innerHTML = renderResortPlanPanel(listing);
    return;
  }

  const pingButton = event.target.closest("[data-ping-person]");
  if (pingButton) {
    pingButton.textContent = "Sent";
    pingButton.classList.add("active");
    return;
  }

  const resortCloseButton = event.target.closest("[data-resort-close]");
  if (resortCloseButton) {
    resortCloseButton.closest(".resort-overlay").hidden = true;
    return;
  }

  const agentCloseButton = event.target.closest("[data-agent-close]");
  if (agentCloseButton) {
    const menu = agentCloseButton.closest(".agent-menu");
    menu.classList.remove("compact");
    menu.setAttribute("hidden", "");
    return;
  }

  const closeButton = event.target.closest("[data-verification-close]");
  if (!closeButton) return;
  closeButton.closest(".verification-overlay").hidden = true;
});

document.addEventListener("click", (event) => {
  const closeButton = event.target.closest("[data-history-close]");
  if (!closeButton) return;
  closeButton.closest(".history-overlay").hidden = true;
});

document.addEventListener("click", (event) => {
  const agentAction = event.target.closest("[data-agent-action]");
  if (!agentAction) return;
  const menu = agentAction.closest(".agent-menu");
  const card = agentAction.closest(".property-card");
  const listing = listingFromCard(card);

  if (agentAction.dataset.agentAction === "follow") {
    const isFollowing = agentAction.dataset.following === "true";
    const nextFollowing = !isFollowing;
    if (listing) {
      listing.agentFollowed = nextFollowing;
    }
    agentAction.dataset.following = String(nextFollowing);
    agentAction.setAttribute("aria-label", nextFollowing ? "Following agent" : "Follow agent");
    agentAction.classList.toggle("active", nextFollowing);
    return;
  }

  if (agentAction.dataset.agentAction === "like") {
    const isLiked = agentAction.dataset.liked === "true";
    const nextLiked = !isLiked;
    if (listing) {
      listing.agentLiked = nextLiked;
      listing.agentLikes += nextLiked ? 1 : -1;
    }
    agentAction.dataset.liked = String(nextLiked);
    agentAction.setAttribute("aria-label", nextLiked ? "Liked agent" : "Like agent");
    agentAction.classList.toggle("active", nextLiked);
    agentAction.querySelector("span").textContent = String(listing?.agentLikes || 0);
    return;
  }

  if (agentAction.dataset.agentAction === "rating") {
    openAgentDrawer(menu, renderAgentSentiment(listing));
    return;
  }

  if (agentAction.dataset.agentAction === "chat") {
    openAgentDrawer(menu, renderAgentChat(listing));
    return;
  }

  if (agentAction.dataset.agentAction === "report") {
    openAgentDrawer(menu, renderAgentReportForm());
    return;
  }

  if (agentAction.dataset.agentAction === "reports") {
    openAgentDrawer(menu, renderAgentReports(listing));
    return;
  }

  if (agentAction.dataset.agentAction === "postings") {
    openAgentDrawer(menu, `<div class="agent-reports"><p>${listing.poster} has ${listing.views.toLocaleString()} listing views across current posts.</p></div>`);
    return;
  }

  if (agentAction.dataset.agentAction === "profile") {
    menu.querySelector(".agent-menu-meta span").textContent = "Full profile will open here.";
  }
});

document.addEventListener("submit", (event) => {
  const chatForm = event.target.closest("[data-agent-chat-form]");
  if (chatForm) {
    event.preventDefault();
    const input = chatForm.querySelector("input");
    const message = input.value.trim();
    if (!message) return;
    const thread = chatForm.closest(".agent-chat").querySelector(".chat-thread");
    thread.insertAdjacentHTML("beforeend", `<p><strong>You</strong> ${message}</p>`);
    input.value = "";
    return;
  }

  const reportForm = event.target.closest("[data-agent-report-form]");
  if (!reportForm) return;
  event.preventDefault();
  const card = reportForm.closest(".property-card");
  const listing = listingFromCard(card);
  const textarea = reportForm.querySelector("textarea");
  const report = textarea.value.trim();
  if (!report || !listing) return;
  listing.agentReports.push(report);
  const summaryCount = card.querySelector(".agent-report-summary span");
  if (summaryCount) {
    summaryCount.textContent = String(listing.agentReports.length);
  }
  reportForm.outerHTML = `<div class="agent-reports"><p>Report submitted for review.</p></div>`;
});

document.addEventListener("change", (event) => {
  const planDate = event.target.closest("[data-plan-date]");
  if (!planDate) return;
  const card = planDate.closest(".property-card");
  const listing = listingFromCard(card);
  if (!listing) return;
  listing.planDate = planDate.value;
  listing.planTiming = "dates";
  card.querySelector(".resort-overlay").innerHTML = renderResortPlanPanel(listing);
});

document.addEventListener("input", (event) => {
  const planningSearch = event.target.closest("[data-planning-search]");
  if (!planningSearch) return;
  const overlay = planningSearch.closest(".planning-overlay");
  const card = planningSearch.closest(".property-card");
  const listing = listingFromCard(card);
  const filter = overlay.querySelector(".planning-backdrop").dataset.peopleMode || "planning";
  const criteria = getPlanningCriteria(overlay);
  overlay.innerHTML = renderPlanningOverlay(listing, filter, criteria);
  overlay.hidden = false;
  const refreshedSearch = overlay.querySelector("[data-planning-search]");
  refreshedSearch.focus();
  refreshedSearch.setSelectionRange(refreshedSearch.value.length, refreshedSearch.value.length);
});

googleLogin.addEventListener("click", () => {
  enterHomeScreen();
});

document.querySelector("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  enterHomeScreen();
});

document.querySelector("#register-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = document.querySelector("#register-message");
  const formData = new FormData(event.currentTarget);
  const username = String(formData.get("username") || "").trim();

  if (username.length < 3) {
    message.classList.add("error");
    message.textContent = "Username must be at least 3 characters.";
    return;
  }

  message.classList.remove("error");
  message.textContent = "Registration form is ready with contact details. Next step is saving this user profile.";
});
