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
  image?: string; // High-resolution traveler photograph
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
    image:
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=90&w=1200&auto=format&fit=crop',
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
    image:
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?q=90&w=1200&auto=format&fit=crop',
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
    image:
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=90&w=1200&auto=format&fit=crop',
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
    image:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=90&w=1200&auto=format&fit=crop',
    highlight: 'Comfortable hotel stays, transport & mountain snow views.',
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
    image:
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=90&w=1200&auto=format&fit=crop',
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
    image:
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=90&w=1200&auto=format&fit=crop',
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
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=90&w=1200&auto=format&fit=crop',
    highlight: 'Incredible Khasi guide & Dawki river boating.',
  },
];
