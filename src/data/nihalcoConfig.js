// NIHALCO Platform Defaults & Company Configuration
export const initialCompanyConfig = {
  companyName: "NIHALCO",
  companyTagline: "Stories, beautifully preserved.",
  heroHeadline: "NIHALCO",
  heroSubtitle: "A private digital media studio crafting cinematic wedding stories and eternal memory archives.",
  aboutText: "NIHALCO is a modern creative technology and visual storytelling company. We specialize in designing private, high-fashion digital magazines and luxury interactive photo archives for selective clients worldwide.",
  contactEmail: "contact@nihalco.com",
  contactPhone: "+91 98765 43210",
  location: "Kochi, Kerala & London, UK",
  whatsappNumber: "919876543210",
  instagramHandle: "@nihalco_official",
  websiteUrl: "https://nihalco.com",
  services: [
    {
      id: "srv-wedding",
      title: "Digital Wedding Magazines",
      description: "Private, editorial storybooks preserved forever with ultra-high-resolution photo archives.",
      icon: "Sparkles"
    },
    {
      id: "srv-reception",
      title: "Reception Gala Experiences",
      description: "Cinematic evening showcases celebrating toast moments, first dances, and grand galas.",
      icon: "Heart"
    },
    {
      id: "srv-engagement",
      title: "Engagement & Pre-Wedding",
      description: "Intimate chapter storybooks detailing the proposal and prelude to the wedding union.",
      icon: "Calendar"
    },
    {
      id: "srv-custom",
      title: "Custom Visual Storytelling",
      description: "Tailored multi-client memory archives crafted with luxury typography and motion design.",
      icon: "FileText"
    }
  ]
};

// Initial Sample Clients Database State for NIHALCO Platform
export const initialClientsList = [
  {
    id: "client-nihal-001",
    name: "Nihal & Fathima",
    serviceType: "Wedding",
    eventDate: "15 November 2026",
    location: "Kochi, Kerala",
    contactEmail: "nihal@example.com",
    contactPhone: "+91 98950 00000",
    status: "PUBLISHED", // DRAFT, PUBLISHED, UNPUBLISHED
    shareToken: "nih001x9a8b",
    isPasswordProtected: false,
    password: "",
    downloadsEnabled: true,
    coverPhoto: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop",
    invitationMessage: "Together with our families, we invite you to celebrate our union as we exchange our sacred vows under golden skies.",
    venueName: "Grand Hyatt Resort & Ballroom",
    venueAddress: "Bolgatty Island, Kochi, Kerala 682050",
    tagline: "THE BEGINNING OF FOREVER",
    introduction: "Welcome to our private digital wedding magazine. Preserved with eternal love.",
    dressCode: "Traditional Silk & Black Tie",
    rsvpDetails: "RSVP by 1st October to rsvp@nihal-wedding.com",
    photos: [
      {
        id: "n1",
        title: "The Editorial Mandap Moment",
        category: "CEREMONY",
        date: "15 Nov 2026",
        imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop",
        download: true,
        featured: true,
        aspectRatio: "portrait"
      },
      {
        id: "n2",
        title: "The Varmala Garland Exchange",
        category: "CEREMONY",
        date: "15 Nov 2026",
        imageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop",
        download: true,
        featured: true,
        aspectRatio: "landscape"
      },
      {
        id: "n3",
        title: "Sunset Serenade on the Lake",
        category: "PRE-WEDDING",
        date: "14 Nov 2026",
        imageUrl: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1600&auto=format&fit=crop",
        download: true,
        featured: true,
        aspectRatio: "portrait"
      }
    ],
    stories: [
      {
        id: "ns1",
        chapterNumber: "01",
        chapterTitle: "CHAPTER ONE",
        title: "The First Chapter",
        subtitle: "Lake Vembanad • 2026",
        quote: "Some moments are ordinary when they happen, but become unforgettable when we look back.",
        content: "Amidst tranquil backwaters and whispering palms, we gathered our closest loved ones to begin our journey.",
        imageLeft: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop",
        imageRight: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "client-ameen-002",
    name: "Ameen & Mariyam",
    serviceType: "Reception",
    eventDate: "20 December 2026",
    location: "London, UK",
    contactEmail: "ameen@example.com",
    contactPhone: "+44 20 7946 0912",
    status: "PUBLISHED",
    shareToken: "amn002z7y6",
    isPasswordProtected: false,
    password: "",
    downloadsEnabled: true,
    coverPhoto: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop",
    invitationMessage: "Join us for an enchanting evening of toasts, laughter, and grand celebration under a canopy of starlight.",
    venueName: "The Savoy Grand Ballroom",
    venueAddress: "Strand, London WC2R 0EZ, United Kingdom",
    tagline: "STARS & CELEBRATIONS",
    introduction: "Our grand reception storybook celebrating love across borders.",
    dressCode: "Black Tie Gala",
    rsvpDetails: "RSVP to ameen@savoy-reception.com",
    photos: [
      {
        id: "a1",
        title: "The First Dance Under Chandeliers",
        category: "RECEPTION",
        date: "20 Dec 2026",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop",
        download: true,
        featured: true,
        aspectRatio: "landscape"
      },
      {
        id: "a2",
        title: "Candlelight Floral Banquet",
        category: "DETAILS",
        date: "20 Dec 2026",
        imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1600&auto=format&fit=crop",
        download: true,
        featured: true,
        aspectRatio: "square"
      }
    ],
    stories: [
      {
        id: "as1",
        chapterNumber: "01",
        chapterTitle: "CHAPTER ONE",
        title: "The Starlit Reception Gala",
        subtitle: "London • December 2026",
        quote: "When the music swelled, the whole world dissolved except for us.",
        content: "Under thousands of crystal chandeliers and fairy lights, our reception night came alive with toasts and laughter.",
        imageLeft: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
        imageRight: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  }
];
