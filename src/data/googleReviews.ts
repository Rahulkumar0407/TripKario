export interface GoogleReview {
  id: string;
  name: string;
  location: string;
  date: string;
  rating: number;
  trip: string;
  avatar?: string;
  review: string;
  highlight?: string;
  verified: boolean;
}

export const googleReviews: GoogleReview[] = [
  {
    id: 'gr-1',
    name: 'Aakash Singhania',
    location: 'New Delhi',
    date: '2 weeks ago',
    rating: 5,
    trip: 'Kashmir Luxury Escape (6N/7D)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    highlight: 'Houseboat on Dal Lake & private cab were immaculate.',
    review:
      'Booked our Kashmir trip through Tripkario Delhi office. Everything from airport pickup to our houseboat on Dal Lake and Gulmarg Gondola Phase 2 tickets was pre-arranged seamlessly. Our driver Bashir was polite and knowledgeable. Outstanding coordination!',
    verified: true,
  },
  {
    id: 'gr-2',
    name: 'Dr. Meenakshi Sundaram',
    location: 'South Delhi / Gurgaon',
    date: '1 month ago',
    rating: 5,
    trip: 'Himachal Family Circuit (Shimla, Manali & Jibhi)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
    highlight: 'Paced perfectly for senior parents and kids.',
    review:
      'Traveling with senior citizens and toddlers can be stressful, but Tripkario planned very comfortable hotel stays and scenic driving breaks. The river-facing cottages in Jibhi were mesmerizing. 10/10 service and transparent pricing without hidden fees.',
    verified: true,
  },
  {
    id: 'gr-3',
    name: 'Rohan & Shreya Batra',
    location: 'Noida, NCR',
    date: '3 weeks ago',
    rating: 5,
    trip: 'Kerala Honeymoon (Munnar & Alleppey)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    highlight: 'Private chef on houseboat made authentic Karimeen!',
    review:
      'Tripkario organized our dream honeymoon in Kerala. Tea garden resort in Munnar and the luxury private houseboat in Alleppey were unbelievable. The 24/7 WhatsApp support team checked in on us daily to ensure our itinerary went smoothly.',
    verified: true,
  },
  {
    id: 'gr-4',
    name: 'Vikramaditya Roy',
    location: 'Connaught Place, New Delhi',
    date: '2 months ago',
    rating: 5,
    trip: 'Ladakh High-Pass Expedition (7N/8D)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    highlight: 'Oxygen cylinders and 4x4 vehicles provided as promised.',
    review:
      'Did the Leh-Nubra-Pangong bike & SUV combo. High-altitude acclimatization schedule recommended by Tripkario was spot on. Premium swiss tents near Pangong Lake with heated blankets. Very trustworthy agency in Delhi!',
    verified: true,
  },
  {
    id: 'gr-5',
    name: 'Pooja Kashyap',
    location: 'Dwarka, New Delhi',
    date: '1 month ago',
    rating: 5,
    trip: 'Royal Rajasthan Heritage Trail',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    highlight: 'Haveli stays & Sam dunes glamping were top notch.',
    review:
      'We visited Jaipur, Jodhpur, and Jaisalmer. The desert camp experience in Sam sand dunes with folk dance and dinner was unforgettable. Tripkario gave us verified hotel vouchers beforehand and our chauffeur was courteous and punctual.',
    verified: true,
  },
  {
    id: 'gr-6',
    name: 'Gaurav & Neha Malhotra',
    location: 'Greater Kailash, New Delhi',
    date: '3 weeks ago',
    rating: 5,
    trip: 'Meghalaya & Kaziranga Wildlife',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    highlight: 'Local Khasi guide arranged by Tripkario was phenomenal.',
    review:
      'Living root bridge trek in Cherrapunji and crystal clear waters of Dawki. Tripkario handled all permits and local cab bookings without a single delay. Best holiday planning experience we have ever had.',
    verified: true,
  },
  {
    id: 'gr-7',
    name: 'Siddharth Chadha',
    location: 'Vasant Kunj, New Delhi',
    date: '4 weeks ago',
    rating: 5,
    trip: 'Spiti Valley 4x4 Road Trip',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    highlight: 'Safety-first approach with backup vehicle support.',
    review:
      'Spiti is rugged and requires serious logistics. Tripkario’s team in Delhi mapped out homestays in Kaza, Tabo, and Chandratal with experienced mountain drivers. Felt 100% safe throughout the journey.',
    verified: true,
  },
  {
    id: 'gr-8',
    name: 'Ananya & Tushar Joshi',
    location: 'Lajpat Nagar, New Delhi',
    date: '2 months ago',
    rating: 5,
    trip: 'Goa Coastal Boutique Stay (4N/5D)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
    highlight: 'Private heritage villa in South Goa was breathtaking.',
    review:
      'Tripkario customized a relaxing Goa itinerary away from crowded tourist hubs. Private catamaran cruise, heritage Latin Quarter walk, and top-tier dining recommendations. Superb customer care!',
    verified: true,
  },
];
