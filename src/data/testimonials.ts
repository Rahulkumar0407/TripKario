export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  date?: string;
  rating: number;
  trip?: string;
  tripName?: string;
  tripDestination?: string;
  quote: string;
  comment?: string;
  avatar?: string;
  image?: string; // Only provided when traveler actually attached a photo
  highlight?: string;
  travelerType?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't-abhishek-goswami',
    name: 'ABHISHEK Goswami',
    location: 'New Delhi',
    date: '5 months ago',
    rating: 5,
    trip: 'Kashmir Valley Tour',
    tripDestination: 'Kashmir',
    quote:
      'This travel agency is the best I was able to visit kashmir in very less money.',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    image: '/reviews/abhishek-goswami.png',
    highlight: 'Visited Kashmir with best budget and flawless planning.',
  },
  {
    id: 't-aditya-kanojia',
    name: 'Aditya Kanojia',
    location: 'New Delhi',
    date: '4 months ago',
    rating: 5,
    trip: 'Himachal & Snow Mountains',
    tripDestination: 'Himachal',
    quote:
      'This is a very perfect company maza aagaya bhai mast arrangement mast guide maza karwa dete hai',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    image: '/reviews/aditya-kanojia.png',
    highlight: 'Mast arrangement & guide — super fun experience.',
  },
  {
    id: 't-bhairo-parmar',
    name: 'Bhairo Parmar',
    location: 'New Delhi',
    date: '5 months ago',
    rating: 5,
    trip: 'Kerala & Munnar Sightseeing',
    tripDestination: 'Kerala',
    quote:
      'We booked our Kerala tour through Tripkario and had an amazing experience. Our tour guide Tushar Gupta was extremely helpful and professional throughout the trip. He managed everything smoothly—from hotel check-ins to sightseeing in Munnar.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    highlight: 'Smooth hotel check-ins & expert guide support.',
  },
  {
    id: 't-babalu-yadav',
    name: 'Babalu Yadav',
    location: 'New Delhi',
    date: '5 months ago',
    rating: 5,
    trip: 'Manali & Solang Valley',
    tripDestination: 'Himachal',
    quote:
      'We had an amazing trip to Manali with Tripkario.com. The whole tour was perfectly planned, and everything from transport to hotel stay was very comfortable. The beautiful views of the mountains, snow in Solang Valley, and peaceful environment made it memorable.',
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop',
    highlight: 'Comfortable hotel stays, transport & mountain snow views.',
  },
  {
    id: 't-yashika',
    name: 'Yashika',
    location: 'Local Guide',
    date: '5 months ago',
    rating: 5,
    trip: 'Custom Holiday Gateway',
    tripDestination: 'Custom Trip',
    quote:
      'I had a wonderful time visiting this destination. The atmosphere was vibrant yet relaxing, and there were plenty of activities to enjoy. The place was clean, well organized, and tourist friendly. It’s definitely worth visiting with friends or family.',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
    highlight: 'Clean, well-organized, and family friendly getaway.',
  },
  {
    id: 't-vipul-giri',
    name: 'Vipul Giri',
    location: 'New Delhi',
    date: '4 months ago',
    rating: 5,
    trip: 'Affordable Custom Packages',
    tripDestination: 'India Tours',
    quote:
      'I have booked trips with this company it provides best of the packages on very affordable prices 😀',
    avatar:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop',
    highlight: 'Best packages on very affordable prices.',
  },
  {
    id: 't-sameer-priyanka',
    name: 'Sameer & Priyanka Khanna',
    location: 'Mumbai',
    date: 'January 2025',
    rating: 5,
    trip: 'Kashmir Houseboat & Gondola',
    tripDestination: 'Kashmir',
    quote:
      'Tripkario turned our Kashmir trip into something we’ll talk about for years. The private houseboat stay on Nigeen lake and having our gondola tickets already arranged saved us hours of stress.',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    highlight: 'Private Nigeen lake houseboat & pre-booked gondola.',
  },
  {
    id: 't-dr-rajesh',
    name: 'Dr. Rajesh Deshmukh',
    location: 'Pune',
    date: 'December 2024',
    rating: 5,
    trip: 'Royal Rajasthan Forts & Glamping',
    tripDestination: 'Rajasthan',
    quote:
      'Traveling with parents and kids can be demanding, but Tripkario paced the journey perfectly. The desert glamping at Sam dunes was luxurious, clean, and authentic.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    highlight: 'Paced perfectly for family members of all ages.',
  },
  {
    id: 't-tanvi-saxena',
    name: 'Tanvi Saxena',
    location: 'Bengaluru',
    date: 'November 2024',
    rating: 5,
    trip: 'Meghalaya Living Root Bridges',
    tripDestination: 'Meghalaya',
    quote:
      'As a solo female traveler venturing to the Northeast, safety and local knowledge were key. Tripkario connected me with an incredible local Khasi guide. Boating on Dawki was pure magic.',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
    highlight: 'Incredible Khasi guide & Dawki river boating.',
  },
];
