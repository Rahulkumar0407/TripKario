import fs from 'fs';
import path from 'path';
import { tripPackages } from '../src/data/trips';
import { TripPackage, ItineraryDay } from '../src/types';

// Accurate, factual day-by-day itinerary data for all 44 packages
const itinerariesMap: Record<string, ItineraryDay[]> = {
  // 1. ladakh-bike-circuit (7D/6N)
  'ladakh-bike-circuit': [
    {
      dayNumber: 1,
      title: 'Arrival in Leh & Acclimatization',
      location: 'Leh',
      description: 'Fly into Leh Kushok Bakula Rimpochee Airport (11,562 ft). Take a mandatory rest day for high-altitude acclimatization, followed by an evening sunset walk to Shanti Stupa and Leh Main Bazaar.',
      places: ['Leh Market', 'Shanti Stupa', 'Leh Palace'],
      activities: ['Altitude Acclimatization', 'Sunset Photography', 'Evening Market Stroll'],
      meals: 'Dinner',
      overnight: 'Leh Boutique Hotel'
    },
    {
      dayNumber: 2,
      title: 'Sham Valley Exploration & Bike Handover',
      location: 'Sham Valley',
      description: 'Test ride your Royal Enfield towards Sham Valley. Visit the confluence of Indus and Zanskar rivers at Sangam, experience the gravitational optical illusion at Magnetic Hill, and visit Gurudwara Pathar Sahib.',
      places: ['Sangam Confluence', 'Magnetic Hill', 'Gurudwara Pathar Sahib', 'Hall of Fame'],
      activities: ['Motorcycle Briefing & Test Ride', 'Confluence View', 'Heritage Tour'],
      meals: 'Breakfast & Dinner',
      overnight: 'Leh Boutique Hotel'
    },
    {
      dayNumber: 3,
      title: 'Leh to Nubra Valley via Khardung La Pass',
      location: 'Nubra Valley',
      description: 'Ride across Khardung La (17,982 ft), one of the highest motorable passes in the world. Descend into the picturesque Nubra Valley, visit the towering Maitreya Buddha at Diskit Monastery, and ride double-humped Bactrian camels on the Hunder white sand dunes.',
      places: ['Khardung La Pass (17,982 ft)', 'Diskit Monastery', 'Hunder Sand Dunes'],
      activities: ['High Pass Mountain Ride', 'Double-Humped Camel Safari', 'Monastery Visit'],
      meals: 'Breakfast & Dinner',
      overnight: 'Nubra Deluxe Camp / Cottage'
    },
    {
      dayNumber: 4,
      title: 'Excursion to Turtuk Indo-Pak Border Village',
      location: 'Turtuk',
      description: 'Ride along the roaring Shyok River to Turtuk, the northernmost village in India opened to tourists. Explore the Balti heritage museum, walk through apricot orchards, and experience unique Indo-Aryan Balti culture.',
      places: ['Turtuk Village', 'Balti Heritage Museum', 'Apricot Orchards', 'Tyakshi Border Viewpoint'],
      activities: ['Border Village Walk', 'Balti Cultural Interaction', 'Apricot Garden Stroll'],
      meals: 'Breakfast & Dinner',
      overnight: 'Nubra Deluxe Camp / Cottage'
    },
    {
      dayNumber: 5,
      title: 'Nubra Valley to Pangong Tso via Shyok River',
      location: 'Pangong Tso',
      description: 'Embark on an adventurous off-road ride along the rugged Shyok River route connecting Nubra directly to Pangong Tso. Arrive at the mesmerizing cobalt blue lake (13,860 ft) for an unforgettable sunset and Milky Way stargazing.',
      places: ['Shyok Valley River Route', 'Durbuk', 'Tangste', 'Pangong Tso Lake (13,860 ft)'],
      activities: ['Off-Road Adventure Ride', 'Cobalt Lake Stargazing', 'Lakeside Camping'],
      meals: 'Breakfast & Dinner',
      overnight: 'Pangong Lakeside Luxury Camp'
    },
    {
      dayNumber: 6,
      title: 'Pangong Tso to Leh via Chang La Pass',
      location: 'Leh',
      description: 'Witness sunrise over Pangong Tso lake. Ride back to Leh over the snow-covered Chang La Pass (17,590 ft). En route, explore the dramatic clifftop Thiksey Monastery and the royal Shey Palace.',
      places: ['Chang La Pass (17,590 ft)', 'Thiksey Monastery', 'Shey Palace', 'Sindhu Ghat'],
      activities: ['Pass Crossing Ride', 'Tibetan Monastery Architecture', 'Farewell Dinner'],
      meals: 'Breakfast & Dinner',
      overnight: 'Leh Boutique Hotel'
    },
    {
      dayNumber: 7,
      title: 'Departure from Leh Airport',
      location: 'Leh',
      description: 'Transfer to Leh Airport with cherished memories of high Himalayan passes, rugged river valleys, and starlit alpine lakes.',
      places: ['Leh Airport'],
      activities: ['Airport Transfer', 'Departure'],
      meals: 'Breakfast',
      overnight: 'None'
    }
  ],

  // 2. spiti-short-escape (5D/4N)
  'spiti-short-escape': [
    {
      dayNumber: 1,
      title: 'Manali to Kaza via Atal Tunnel & Kunzum Pass',
      location: 'Kaza',
      description: 'Early morning start from Manali through the engineering marvel of Atal Tunnel. Traverse the rugged Chandra Valley and cross the formidable Kunzum Pass (14,931 ft) to reach Kaza, the sub-divisional capital of Spiti.',
      places: ['Atal Tunnel', 'Gramphu', 'Batal', 'Kunzum Pass (14,931 ft)', 'Losar', 'Kaza'],
      activities: ['Trans-Himalayan Road Trip', 'Kunzum Temple Blessings', 'River Valley Drive'],
      meals: 'Dinner',
      overnight: 'Kaza Homestay / Hotel'
    },
    {
      dayNumber: 2,
      title: 'Key Monastery & Kibber High Altitude Village',
      location: 'Kaza',
      description: 'Visit the iconic 1,000-year-old Key Monastery perched like a fortress on a conical hill. Continue up to Kibber (14,200 ft) and ride across the thrilling Chicham Bridge, the highest suspension bridge in Asia.',
      places: ['Key Monastery', 'Kibber Village', 'Chicham Bridge', 'Kaza Local Market'],
      activities: ['Monastic Prayer Hall Tour', 'Highest Suspension Bridge Walk', 'Local Spitian Tea'],
      meals: 'Breakfast & Dinner',
      overnight: 'Kaza Homestay / Hotel'
    },
    {
      dayNumber: 3,
      title: 'Hikkim, Komic & Langza Fossil Village Circuit',
      location: 'Spiti High Villages',
      description: 'Ascend to Hikkim (14,567 ft) to post postcards from the world’s highest post office. Visit Komic (15,027 ft), one of the world’s highest motorable villages, and marvel at the giant Buddha statue watching over the prehistoric marine fossil beds in Langza.',
      places: ['Hikkim World’s Highest Post Office', 'Komic Village & Lundup Tsemo Gompa', 'Langza Buddha Statue & Fossil Beds'],
      activities: ['Mailing Postcards from Hikkim', 'Marine Fossil Exploration', 'High Village Stroll'],
      meals: 'Breakfast & Dinner',
      overnight: 'Kaza Homestay / Hotel'
    },
    {
      dayNumber: 4,
      title: 'Kaza to Chandratal Lake Camping',
      location: 'Chandratal',
      description: 'Drive along the Spiti River back towards Losar and ascend to the legendary moon-shaped Chandratal Lake (14,100 ft). Take a scenic 1 km walk around the crystal-clear alpine waters with panoramic reflections of the CB range.',
      places: ['Losar Valley', 'Kunzum Top', 'Chandratal Lake (14,100 ft)'],
      activities: ['Alpine Lake Trekking', 'High Altitude Stargazing', 'Moon Lake Camping'],
      meals: 'Breakfast & Dinner',
      overnight: 'Chandratal Luxury Dome Camp'
    },
    {
      dayNumber: 5,
      title: 'Chandratal Lake to Manali via Rohtang / Atal Tunnel',
      location: 'Manali',
      description: 'Early morning sunrise reflection over the lake. Drive through the wild off-road tracks of Batal and Chhatru, crossing back through the Atal Tunnel to arrive in Manali for onward departures.',
      places: ['Chhatru', 'Gramphu', 'Atal Tunnel', 'Manali'],
      activities: ['Scenic Mountain Drive', 'Manali Drop-off'],
      meals: 'Breakfast',
      overnight: 'None'
    }
  ],

  // 3. meghalaya-delight (5D/4N)
  'meghalaya-delight': [
    {
      dayNumber: 1,
      title: 'Guwahati to Shillong via Umiam Lake',
      location: 'Shillong',
      description: 'Arrive at Guwahati Airport and drive up the lush Khasi Hills to Shillong, the "Scotland of the East". Stop at the sprawling Umiam Lake for scenic waterside viewpoints and spend the evening exploring vibrant Police Bazar.',
      places: ['Umiam Lake Viewpoint', 'Shillong Golf Course', 'Police Bazar'],
      activities: ['Lakeside Stroll', 'Local Pine Ridge Drive', 'Street Food & Cafe Exploration'],
      meals: 'Dinner',
      overnight: 'Shillong Boutique Stay'
    },
    {
      dayNumber: 2,
      title: 'Shillong to Cherrapunji (Sohra) Waterfalls & Caves',
      location: 'Cherrapunji',
      description: 'Drive through misty canyons to Cherrapunji. Stand in awe of the towering Nohkalikai Falls, walk through the limestone corridors of Mawsmai Cave, and capture the roaring Seven Sisters Falls and Garden of Caves.',
      places: ['Nohkalikai Falls', 'Mawsmai Limestone Cave', 'Seven Sisters Falls', 'Garden of Caves'],
      activities: ['Waterfall Chasing', 'Limestone Cave Caving', 'Canyon Rim Photography'],
      meals: 'Breakfast & Dinner',
      overnight: 'Cherrapunji Eco Resort'
    },
    {
      dayNumber: 3,
      title: 'Double Decker Living Root Bridge Trek',
      location: 'Nongriat',
      description: 'Descend through dense rainforest stairways from Tyrna to the UNESCO-listed Double Decker Living Root Bridge in Nongriat. Swim in the natural turquoise plunge pools of Rainbow Falls before trekking back.',
      places: ['Tyrna Village', 'Nongriat Double Decker Root Bridge', 'Rainbow Falls', 'Natural Blue Lagoon Pools'],
      activities: ['Rainforest Bio-Engineering Trek', 'Natural Pool Swimming', 'Indigenous Khasi Culture'],
      meals: 'Breakfast & Dinner',
      overnight: 'Cherrapunji Eco Resort'
    },
    {
      dayNumber: 4,
      title: 'Dawki Umngot River & Mawlynnong Clean Village',
      location: 'Dawki & Mawlynnong',
      description: 'Head to Dawki at the Indo-Bangladesh border to boat on the glass-transparent waters of the Umngot River. Continue to Mawlynnong, celebrated as Asia’s cleanest village, and explore its Single Root Bridge and skywalk balance rock.',
      places: ['Umngot River (Dawki)', 'Jaflong Border Point', 'Mawlynnong Clean Village', 'Riwai Single Root Bridge'],
      activities: ['Crystal Boat Cruise', 'Clean Village Heritage Walk', 'Indo-Bangla Border View'],
      meals: 'Breakfast & Dinner',
      overnight: 'Shillong Boutique Stay'
    },
    {
      dayNumber: 5,
      title: 'Laitlum Grand Canyons & Guwahati Departure',
      location: 'Guwahati',
      description: 'Visit the dramatic sheer cliff drop-offs at Laitlum Canyons for sweeping views of green gorges. Drive down to Guwahati Airport for your flight home.',
      places: ['Laitlum Canyons', 'Guwahati Airport'],
      activities: ['Canyon Panorama', 'Airport Transfer'],
      meals: 'Breakfast',
      overnight: 'None'
    }
  ],

  // 4. tawang-short-escape (5D/4N)
  'tawang-short-escape': [
    {
      dayNumber: 1,
      title: 'Guwahati to Bhalukpong & Dirang Valley',
      location: 'Dirang',
      description: 'Arrive at Guwahati Airport and enter Arunachal Pradesh through the lush sub-tropical forests of Bhalukpong. Ascend the scenic Kameng river valley into Dirang.',
      places: ['Kameng River Valley', 'Bhalukpong Gate', 'Dirang Monastery (Thupsung Dhargye Ling)'],
      activities: ['Scenic Hill Drive', 'Monastery Architecture', 'Mountain Valley Check-in'],
      meals: 'Dinner',
      overnight: 'Dirang Valley Hotel'
    },
    {
      dayNumber: 2,
      title: 'Dirang to Tawang via Sela Pass (13,700 ft)',
      location: 'Tawang',
      description: 'Drive up to the frozen Sela Pass (13,700 ft) and witness the sacred Sela Lake. Pay tribute at the historic Jaswant Garh War Memorial and view the cascading Nuranang (Jung) Falls on the way to Tawang.',
      places: ['Sela Pass (13,700 ft)', 'Sela Lake', 'Jaswant Garh War Memorial', 'Nuranang (Jung) Falls'],
      activities: ['High Mountain Pass Crossing', 'War Memorial Homage', 'Waterfall Photography'],
      meals: 'Breakfast & Dinner',
      overnight: 'Tawang Boutique Hotel'
    },
    {
      dayNumber: 3,
      title: 'Tawang Monastery & War Memorial Exploration',
      location: 'Tawang',
      description: 'Explore the 400-year-old Tawang Monastery (Gaden Namgyal Lhatse), the largest Buddhist monastery in India. Visit the birthplace of the 6th Dalai Lama at Urgelling Monastery and attend the light & sound show at Tawang War Memorial.',
      places: ['Tawang Monastery', 'Urgelling Gompa', 'Ani Gompa (Nunnery)', 'Tawang War Memorial'],
      activities: ['Monastic Library & Prayer Halls', 'Sound & Light Show', 'Monpa Tribal Craft Market'],
      meals: 'Breakfast & Dinner',
      overnight: 'Tawang Boutique Hotel'
    },
    {
      dayNumber: 4,
      title: 'Tawang to Bomdila Apple Valley',
      location: 'Bomdila',
      description: 'Descend through rhododendron hills back towards Bomdila. Visit Bomdila Monastery (Gentse Gaden Rabgyel Lling) and take in sunset views over the snow-capped Kangto and Gorichen peaks.',
      places: ['Bomdila Monastery', 'Bomdila Viewpoint', 'Local Apple Orchards'],
      activities: ['Panoramic Peak View', 'Monastery Walk', 'Local Handicrafts Shopping'],
      meals: 'Breakfast & Dinner',
      overnight: 'Bomdila Mountain Resort'
    },
    {
      dayNumber: 5,
      title: 'Bomdila to Guwahati Departure',
      location: 'Guwahati',
      description: 'Drive down from the eastern Himalayas to Guwahati Airport with unforgettable memories of Arunachal’s spiritual monasteries and rugged passes.',
      places: ['Guwahati Airport'],
      activities: ['Scenic Descent', 'Airport Transfer'],
      meals: 'Breakfast',
      overnight: 'None'
    }
  ],

  // 5. sikkim-gangtok-weekend (4D/3N)
  'sikkim-gangtok-weekend': [
    {
      dayNumber: 1,
      title: 'Bagdogra / NJP to Gangtok & MG Marg',
      location: 'Gangtok',
      description: 'Arrive at Bagdogra Airport or NJP Railway Station and drive along the roaring Teesta River to Gangtok (5,500 ft). Spend a relaxed evening walking along the pedestrian-only, European-style MG Marg.',
      places: ['Teesta River Valley', 'MG Marg Promenade', 'Gangtok Town'],
      activities: ['Scenic Foothills Drive', 'Evening Promenade Walk', 'Local Sikkimese Momos & Thukpa'],
      meals: 'Dinner',
      overnight: 'Gangtok Premium Hotel'
    },
    {
      dayNumber: 2,
      title: 'Tsomgo Glacial Lake & Baba Mandir Excursion',
      location: 'Tsomgo Lake',
      description: 'Take a high-altitude drive towards the Indo-China border to visit the sacred, oval-shaped Tsomgo Lake (12,400 ft), surrounded by snow-covered ridges. Continue to Baba Harbhajan Singh Memorial Temple.',
      places: ['Tsomgo (Changu) Lake (12,400 ft)', 'Baba Mandir', 'Yak Ride Viewpoints'],
      activities: ['High Altitude Lake Excursion', 'Yak Riding (Optional)', 'Border Outpost Panorama'],
      meals: 'Breakfast & Dinner',
      overnight: 'Gangtok Premium Hotel'
    },
    {
      dayNumber: 3,
      title: 'Gangtok Monasteries & Scenic Waterfalls',
      location: 'Gangtok',
      description: 'Full day sightseeing covering Rumtek Monastery (Seat of the Karmapa), Ban Jhakri Waterfalls, Do Drul Chorten Stupa, Namgyal Institute of Tibetology, and the Ropeway Cable Car.',
      places: ['Rumtek Monastery', 'Ban Jhakri Falls & Energy Park', 'Do Drul Chorten', 'Tibetology Institute', 'Gangtok Ropeway'],
      activities: ['Monastery Art & History', 'Waterfall Nature Walk', 'Cable Car Aerial View'],
      meals: 'Breakfast & Dinner',
      overnight: 'Gangtok Premium Hotel'
    },
    {
      dayNumber: 4,
      title: 'Gangtok to Bagdogra / NJP Departure',
      location: 'Bagdogra',
      description: 'Check out after breakfast and drive down through tea estates back to Bagdogra Airport or NJP Station for your return flight or train.',
      places: ['Bagdogra Airport / NJP Station'],
      activities: ['Scenic Tea Garden Drive', 'Departure'],
      meals: 'Breakfast',
      overnight: 'None'
    }
  ],

  // 6. kerala-short-weekend (3D/2N)
  'kerala-short-weekend': [
    {
      dayNumber: 1,
      title: 'Kochi to Munnar Tea Garden Hills',
      location: 'Munnar',
      description: 'Arrive at Kochi Airport and drive through rolling misty hills to Munnar (5,200 ft). Stop at Cheeyappara and Valara Waterfalls en route, check into your plantation stay, and stroll through emerald tea estates.',
      places: ['Cheeyappara Falls', 'Valara Falls', 'Munnar Tea Plantations'],
      activities: ['Waterfalls Sightseeing', 'Tea Estate Walk', 'Evening Spice Garden Visit'],
      meals: 'Dinner',
      overnight: 'Munnar Plantation Resort'
    },
    {
      dayNumber: 2,
      title: 'Munnar Sightseeing to Alleppey Houseboat Cruise',
      location: 'Alleppey',
      description: 'Visit Eravikulam National Park to spot the endangered Nilgiri Tahr and Mattupetty Dam. Drive down to Alleppey and board a private traditional Kettuvallam houseboat to cruise through palm-fringed backwaters.',
      places: ['Eravikulam National Park', 'Mattupetty Dam', 'Alleppey Backwaters (Vembanad Lake)'],
      activities: ['Wildlife Spotting', 'Private Houseboat Cruise', 'Sunset over Backwater Canals'],
      meals: 'Breakfast, Lunch & Dinner',
      overnight: 'Private Alleppey Houseboat'
    },
    {
      dayNumber: 3,
      title: 'Alleppey Backwaters to Kochi Departure',
      location: 'Kochi',
      description: 'Enjoy a serene morning backwater sunrise cruise over breakfast. Disembark at Alleppey and transfer to Kochi Airport or Ernakulam Railway Station with brief stops at Fort Kochi Chinese Fishing Nets.',
      places: ['Alleppey Canals', 'Fort Kochi Chinese Fishing Nets', 'Kochi Airport'],
      activities: ['Morning Backwater Drift', 'Heritage Fishing Nets View', 'Airport Transfer'],
      meals: 'Breakfast',
      overnight: 'None'
    }
  ],

  // 7. himachal-manali-snow (5D/4N)
  'himachal-manali-snow': [
    {
      dayNumber: 1,
      title: 'Overnight Volvo Journey from Delhi to Manali',
      location: 'Transit',
      description: 'Board a comfortable AC Volvo coach from Delhi in the evening. Relax on an overnight scenic drive climbing through the Shiwaliks and Beas Valley.',
      places: ['Majnu Ka Tilla / RK Ashram Delhi', 'Chandigarh Highway'],
      activities: ['Overnight Coach Transit', 'Rest & Relaxation'],
      meals: 'None',
      overnight: 'Overnight Volvo Coach'
    },
    {
      dayNumber: 2,
      title: 'Arrival in Manali, Hadimba Temple & Vashisht Springs',
      location: 'Manali',
      description: 'Arrive in Manali, check in, and refresh. Visit the ancient wooden Hadimba Devi Temple in the Dhungri cedar forest, dip in the natural hot sulphur springs of Vashisht, and explore the cafes of Old Manali.',
      places: ['Hadimba Devi Temple', 'Vashisht Hot Water Springs', 'Old Manali Cafes', 'Mall Road'],
      activities: ['Ancient Temple Walk', 'Thermal Spring Dip', 'Evening Cafe Exploration'],
      meals: 'Dinner',
      overnight: 'Manali Boutique Hotel'
    },
    {
      dayNumber: 3,
      title: 'Solang Valley Snow Adventure & Atal Tunnel to Sissu',
      location: 'Solang & Sissu',
      description: 'Head to Solang Valley for snow sports and ropeway rides. Drive through the 9.02 km Atal Tunnel to emerge into the breathtaking snowscapes and frozen waterfalls of Sissu in Lahaul Valley.',
      places: ['Solang Valley', 'Atal Tunnel (9.02 km)', 'Sissu Waterfall (Lahaul Valley)'],
      activities: ['Snow Activities & Ropeway', 'Trans-Himalayan Tunnel Drive', 'Frozen Waterfall Sightseeing'],
      meals: 'Breakfast & Dinner',
      overnight: 'Manali Boutique Hotel'
    },
    {
      dayNumber: 4,
      title: 'Jogini Waterfall Trek & Evening Departure',
      location: 'Manali',
      description: 'Take a short, refreshing forest hike to the cascading Jogini Waterfalls near Vashisht. Spend the afternoon shopping for Himalayan woolens and apricots on Mall Road before boarding the evening return Volvo.',
      places: ['Jogini Waterfall', 'Vashisht Cedar Woods', 'Manali Mall Road'],
      activities: ['Short Nature Hike', 'Souvenir & Handicrafts Shopping', 'Evening Departure'],
      meals: 'Breakfast',
      overnight: 'Overnight Volvo Coach'
    },
    {
      dayNumber: 5,
      title: 'Early Morning Arrival in Delhi',
      location: 'Delhi',
      description: 'Arrive in Delhi early morning with refreshed spirits and memorable memories of pine forests and snowy Himalayan slopes.',
      places: ['Delhi Drop Point'],
      activities: ['Trip Conclusion'],
      meals: 'None',
      overnight: 'None'
    }
  ],

  // 8. himachal-parvati-kheerganga (4D/3N)
  'himachal-parvati-kheerganga': [
    {
      dayNumber: 1,
      title: 'Overnight Drive from Delhi to Kasol',
      location: 'Transit',
      description: 'Depart from Delhi in the evening by AC Volvo/Traveller towards the Parvati Valley. Enjoy the scenic night highway climb into Himachal Pradesh.',
      places: ['Delhi Pickup Point', 'Chandigarh-Mandi Route'],
      activities: ['Overnight Transit'],
      meals: 'None',
      overnight: 'Overnight Vehicle'
    },
    {
      dayNumber: 2,
      title: 'Kasol Riverside Cafes & Chalal Village Walk',
      location: 'Kasol',
      description: 'Arrive in Kasol by morning. Check into riverside riverside camps, take a scenic pine forest trail to Chalal village, and spend the evening enjoying Israeli delicacies and riverside acoustics.',
      places: ['Kasol Town', 'Parvati Riverbank', 'Chalal Village Trail', 'Manikaran Sahib Gurudwara'],
      activities: ['Pine Forest Riverside Trail', 'Cafe Hopping', 'Manikaran Hot Springs Visit'],
      meals: 'Dinner',
      overnight: 'Kasol Riverside Camp / Stay'
    },
    {
      dayNumber: 3,
      title: 'Trek to Kheerganga Top & Hot Sulphur Spring Bath',
      location: 'Kheerganga',
      description: 'Drive to Barshaini and commence the 12 km trek through Nakthan village and Rudranag waterfalls up to the high meadow of Kheerganga (9,711 ft). Soak in the natural open-air hot sulphur pool under starry Himalayan skies.',
      places: ['Barshaini', 'Nakthan Village', 'Rudranag Waterfall & Temple', 'Kheerganga Top (9,711 ft)'],
      activities: ['Alpine Meadow Trek', 'Natural Thermal Spring Bathing', 'Starlit Mountain Camping'],
      meals: 'Breakfast & Dinner',
      overnight: 'Kheerganga Alpine Camp'
    },
    {
      dayNumber: 4,
      title: 'Descend to Barshaini & Evening Return to Delhi',
      location: 'Barshaini to Delhi',
      description: 'Catch sunrise over the Parvati peaks. Descend back to Barshaini, transfer to Kasol for freshening up and farewell cafes, and board the evening coach back to Delhi.',
      places: ['Kheerganga Descent', 'Barshaini', 'Kasol Market'],
      activities: ['Morning Mountain Sunrise', 'Descent Trek', 'Evening Departure'],
      meals: 'Breakfast',
      overnight: 'Overnight Transit'
    }
  ],

  // 9. uttarakhand-kedarnath-yatra (5D/4N)
  'uttarakhand-kedarnath-yatra': [
    {
      dayNumber: 1,
      title: 'Haridwar to Guptkashi / Sitapur via Devprayag',
      location: 'Guptkashi',
      description: 'Early morning departure from Haridwar/Rishikesh. Drive along the holy Ganga and Alaknanda rivers, stopping at the sacred Devprayag confluence (Bhagirathi + Alaknanda) and Rudraprayag to reach Guptkashi.',
      places: ['Haridwar', 'Devprayag Sangam', 'Rudraprayag', 'Guptkashi / Sitapur'],
      activities: ['Holy Rivers Confluence Views', 'Garhwal Valley Drive'],
      meals: 'Dinner',
      overnight: 'Guptkashi / Sitapur Hotel'
    },
    {
      dayNumber: 2,
      title: 'Sitapur to Gaurikund & Trek to Kedarnath Temple',
      location: 'Kedarnath',
      description: 'Transfer to Sonprayag and Gaurikund. Begin the 16 km sacred trek along the roaring Mandakini river via Jungle Chatti, Bheembali, and Lincholi up to Kedarnath Sanctum (11,755 ft). Attend the divine evening Aarti.',
      places: ['Gaurikund', 'Jungle Chatti', 'Bheembali', 'Lincholi', 'Kedarnath Temple (11,755 ft)'],
      activities: ['Sacred Himalayan Trek', 'Evening Temple Aarti', 'Darshan at Kedarnath Sanctum'],
      meals: 'Breakfast & Dinner',
      overnight: 'Kedarnath Ashram / Guesthouse'
    },
    {
      dayNumber: 3,
      title: 'Kedarnath Morning Darshan & Descend to Guptkashi',
      location: 'Guptkashi',
      description: 'Attend the peaceful early morning Maha Abhishek / Darshan against the towering snow-clad Kedarnath peak. Trek down to Gaurikund and drive back to your hotel in Sitapur/Guptkashi for a well-deserved rest.',
      places: ['Kedarnath Peak View', 'Gaurikund', 'Sonprayag', 'Sitapur'],
      activities: ['Morning Darshan', 'Descent Trek', 'Rest & Reflection'],
      meals: 'Breakfast & Dinner',
      overnight: 'Guptkashi / Sitapur Hotel'
    },
    {
      dayNumber: 4,
      title: 'Guptkashi to Rishikesh & Ganga Aarti',
      location: 'Rishikesh',
      description: 'Drive along the Mandakini and Alaknanda rivers to the spiritual yoga capital of Rishikesh. Visit Ram Jhula, Laxman Jhula, and participate in the stirring evening Maha Aarti at Triveni Ghat.',
      places: ['Rishikesh', 'Ram Jhula', 'Laxman Jhula', 'Triveni Ghat Ganga Aarti'],
      activities: ['Spiritual River Aarti', 'Rishikesh Cafe & Ashram Stroll'],
      meals: 'Breakfast & Dinner',
      overnight: 'Rishikesh Hotel / Resort'
    },
    {
      dayNumber: 5,
      title: 'Rishikesh to Haridwar Departure',
      location: 'Haridwar',
      description: 'Morning yoga or optional river rafting on the holy Ganges. Transfer to Haridwar Railway Station / Dehradun Airport for your onward journey.',
      places: ['Haridwar Station / Dehradun Airport'],
      activities: ['Morning Ganga Meditation', 'Departure Transfer'],
      meals: 'Breakfast',
      overnight: 'None'
    }
  ],

  // 10. uttarakhand-valley-of-flowers (6D/5N)
  'uttarakhand-valley-of-flowers': [
    {
      dayNumber: 1,
      title: 'Rishikesh to Govindghat / Joshimath',
      location: 'Govindghat',
      description: 'Drive along the spectacular mountain routes following the five holy prayags (confluences) of the Ganges: Devprayag, Rudraprayag, Karnaprayag, Nandaprayag, and Vishnuprayag to Govindghat.',
      places: ['Panch Prayag Confluences', 'Alaknanda Gorge', 'Govindghat (6,000 ft)'],
      activities: ['Himalayan River Drive', 'Confluence Sightseeing'],
      meals: 'Dinner',
      overnight: 'Govindghat / Joshimath Hotel'
    },
    {
      dayNumber: 2,
      title: 'Govindghat to Ghangaria Basecamp Trek',
      location: 'Ghangaria',
      description: 'Drive 4 km to Pulna and begin the 10 km scenic trek along the gushing Pushpawati River through fragrant pine and rhododendron woods to Ghangaria (9,800 ft), the base for the valley.',
      places: ['Pulna', 'Pushpawati River Trail', 'Ghangaria Basecamp (9,800 ft)'],
      activities: ['Pine Forest Trekking', 'Basecamp Check-in'],
      meals: 'Breakfast & Dinner',
      overnight: 'Ghangaria Guesthouse / Lodge'
    },
    {
      dayNumber: 3,
      title: 'Ghangaria to Valley of Flowers National Park',
      location: 'Valley of Flowers',
      description: 'Enter the UNESCO World Heritage Valley of Flowers National Park (11,500 ft). Walk amidst hundreds of blooming alpine species like Blue Poppy, Brahma Kamal, and Cobra Lily surrounded by snow peaks.',
      places: ['Valley of Flowers UNESCO Park', 'Joan Margaret Legge Memorial Grave', 'Pushpawati River Bed'],
      activities: ['Botanical Alpine Floral Meadow Walk', 'Macro Photography', 'Glacial Stream Crossing'],
      meals: 'Breakfast & Dinner',
      overnight: 'Ghangaria Guesthouse / Lodge'
    },
    {
      dayNumber: 4,
      title: 'Ghangaria to Hemkund Sahib Sacred Alpine Lake',
      location: 'Hemkund Sahib',
      description: 'Trek up 6 km along a steep zig-zag path to the sacred Gurudwara Shri Hemkund Sahib (14,200 ft). Marvel at the pristine glacial lake surrounded by seven snow-capped peaks and blooming Brahma Kamal.',
      places: ['Hemkund Sahib (14,200 ft)', 'Glacial Lake', 'Brahma Kamal Habitat'],
      activities: ['High Altitude Pilgrimage Trek', 'Hot Langar & Tea', 'Lake Reflection Photography'],
      meals: 'Breakfast & Dinner',
      overnight: 'Ghangaria Guesthouse / Lodge'
    },
    {
      dayNumber: 5,
      title: 'Ghangaria to Govindghat Trek & Drive to Rudraprayag',
      location: 'Rudraprayag',
      description: 'Trek down from Ghangaria to Pulna/Govindghat. Board vehicles and drive down to Joshimath/Rudraprayag along the Alaknanda river for an evening of relaxation.',
      places: ['Pulna', 'Govindghat', 'Joshimath', 'Rudraprayag Confluence'],
      activities: ['Descent Trek', 'Scenic River Valley Drive'],
      meals: 'Breakfast & Dinner',
      overnight: 'Rudraprayag Riverside Resort'
    },
    {
      dayNumber: 6,
      title: 'Rudraprayag to Rishikesh & Haridwar Departure',
      location: 'Rishikesh',
      description: 'Drive down through Rishikesh to Haridwar Railway Station / Dehradun Airport with incredible memories of Himalayan blooms and sacred glacial lakes.',
      places: ['Rishikesh', 'Haridwar Station'],
      activities: ['Return Drive', 'Departure'],
      meals: 'Breakfast',
      overnight: 'None'
    }
  ],

  // 11. himachal-jibhi-tirthan (5D/4N)
  'himachal-jibhi-tirthan': [
    {
      dayNumber: 1,
      title: 'Overnight Drive from Delhi to Aut & Jibhi',
      location: 'Transit',
      description: 'Board an evening AC coach from Delhi. Traverse through Mandi and the Banjar Valley to arrive in the quiet cedar hamlet of Jibhi by morning.',
      places: ['Delhi Pickup', 'Aut Tunnel', 'Banjar Valley'],
      activities: ['Overnight Transit'],
      meals: 'None',
      overnight: 'Overnight Coach'
    },
    {
      dayNumber: 2,
      title: 'Arrival in Jibhi, Jibhi Waterfall & Cedar Woods',
      location: 'Jibhi',
      description: 'Check in to cozy wooden riverside cottages in Jibhi. Take a short walk through dense deodar forests to Jibhi Waterfall over wooden bridges and enjoy quiet evening acoustic cafes.',
      places: ['Jibhi Pine Forest', 'Jibhi Waterfall', 'Local Wooden Bridges', 'Village Cafes'],
      activities: ['Forest Nature Walk', 'Waterfall Relaxation', 'Himachali Cuisine Tasting'],
      meals: 'Dinner',
      overnight: 'Jibhi Riverside Wooden Chalet'
    },
    {
      dayNumber: 3,
      title: 'Jalori Pass & Serolsar Lake Alpine Trek',
      location: 'Jalori Pass',
      description: 'Drive up to Jalori Pass (10,800 ft). Embark on a gentle 5 km forest trek through ancient oak and rhododendron canopies to the sacred emerald waters of Serolsar Lake and Buddhi Nagin Temple.',
      places: ['Jalori Pass (10,800 ft)', 'Serolsar Lake', 'Buddhi Nagin Temple', 'Raghupur Fort Viewpoint'],
      activities: ['High Ridge Trekking', 'Emerald Lake Stroll', '360° Himalayan Mountain Views'],
      meals: 'Breakfast & Dinner',
      overnight: 'Jibhi Riverside Wooden Chalet'
    },
    {
      dayNumber: 4,
      title: 'Tirthan Valley, Chhoie Waterfall & Great Himalayan Park',
      location: 'Tirthan Valley',
      description: 'Explore the pristine Tirthan Valley along the crystal-clear Tirthan river. Hike to Chhoie Waterfall, visit the UNESCO Great Himalayan National Park eco-zone, and try trout angling before the evening return drive.',
      places: ['Tirthan River', 'Chhoie Waterfall', 'GHNP Eco-Zone', 'Gushaini'],
      activities: ['River Trout Viewing', 'Waterfall Hike', 'Evening Departure Transit'],
      meals: 'Breakfast',
      overnight: 'Overnight Coach'
    },
    {
      dayNumber: 5,
      title: 'Morning Arrival in Delhi',
      location: 'Delhi',
      description: 'Arrive in Delhi early morning with refreshed memories of crystal mountain rivers and pine-scented forest trails.',
      places: ['Delhi Drop Point'],
      activities: ['Trip Conclusion'],
      meals: 'None',
      overnight: 'None'
    }
  ],

  // 12. uttarakhand-rishikesh-chopta (5D/4N)
  'uttarakhand-rishikesh-chopta': [
    {
      dayNumber: 1,
      title: 'Delhi to Rishikesh & Ganga Aarti',
      location: 'Rishikesh',
      description: 'Drive from Delhi to the yoga capital of Rishikesh. Check in to your riverside resort, explore the cafes around Laxman Jhula, and experience the evening Ganga Aarti at Triveni Ghat.',
      places: ['Rishikesh', 'Laxman Jhula', 'Triveni Ghat', 'Beatles Ashram Exterior'],
      activities: ['Spiritual River Aarti', 'Cafe Culture Walk'],
      meals: 'Dinner',
      overnight: 'Rishikesh Riverside Resort'
    },
    {
      dayNumber: 2,
      title: 'Rishikesh to Chopta ("Mini Switzerland")',
      location: 'Chopta',
      description: 'Drive into the high Garhwal hills via the confluence of Devprayag and Rudraprayag. Arrive at the breathtaking alpine meadow of Chopta (8,790 ft), surrounded by dense oak and rhododendron forests.',
      places: ['Devprayag Sangam', 'Ukhimath', 'Chopta Alpine Meadows (8,790 ft)'],
      activities: ['Scenic Confluence Sightseeing', 'Meadow Stroll', 'Sunset Stargazing'],
      meals: 'Breakfast & Dinner',
      overnight: 'Chopta Swiss Alpine Camp'
    },
    {
      dayNumber: 3,
      title: 'Trek to Tungnath Temple & Chandrashila Peak (13,000 ft)',
      location: 'Tungnath & Chandrashila',
      description: 'Trek 3.5 km to Tungnath (12,073 ft), the highest Shiva temple in the world. Continue 1.5 km up to the Chandrashila Summit (13,000 ft) for a jaw-dropping 360-degree panorama of Nanda Devi, Trishul, and Chaukhamba peaks.',
      places: ['Tungnath Temple (12,073 ft)', 'Chandrashila Summit (13,000 ft)', 'Chaukhamba & Nanda Devi Panoramas'],
      activities: ['Summit Sunrise Trek', 'Highest Shiva Temple Darshan', '360° Mountain Photography'],
      meals: 'Breakfast & Dinner',
      overnight: 'Chopta Swiss Alpine Camp'
    },
    {
      dayNumber: 4,
      title: 'Chopta to Rishikesh via Deoria Tal Trek',
      location: 'Rishikesh',
      description: 'Take a short morning trail to the mirror-like Deoria Tal lake with crystal reflections of Chaukhamba peaks. Drive back down to Rishikesh for riverside camping and bonfire.',
      places: ['Sari Village', 'Deoria Tal Reflection Lake', 'Rishikesh River Camps'],
      activities: ['Mirror Lake Trek', 'Riverside Bonfire & Music'],
      meals: 'Breakfast & Dinner',
      overnight: 'Rishikesh Riverside Camp / Stay'
    },
    {
      dayNumber: 5,
      title: 'White Water Rafting & Delhi Return',
      location: 'Delhi',
      description: 'Experience exhilarating 16 km white water rafting through the rapids of Shivpuri to Rishikesh. Board return vehicles for Delhi.',
      places: ['Shivpuri', 'Ganges Rafting Rapids', 'Delhi'],
      activities: ['White Water Rafting (Optional)', 'Cliff Jumping', 'Return Drive to Delhi'],
      meals: 'Breakfast',
      overnight: 'None'
    }
  ],

  // 13. rajasthan-udaipur-mountabu (5D/4N)
  'rajasthan-udaipur-mountabu': [
    {
      dayNumber: 1,
      title: 'Arrival in Udaipur & Lake Pichola Boat Cruise',
      location: 'Udaipur',
      description: 'Arrive at Udaipur Airport/Station and check in to your heritage hotel. Visit City Palace overlooking Lake Pichola and enjoy a sunset boat ride around Jag Mandir palace.',
      places: ['City Palace Udaipur', 'Lake Pichola', 'Jag Mandir Palace', 'Ambrai Ghat'],
      activities: ['Royal Palace Architecture', 'Sunset Boat Ride', 'Lakeside Heritage Dinner'],
      meals: 'Dinner',
      overnight: 'Udaipur Heritage Hotel'
    },
    {
      dayNumber: 2,
      title: 'Udaipur Heritage Forts, Gardens & Cultural Show',
      location: 'Udaipur',
      description: 'Explore the fountains of Saheliyon Ki Bari, the hilltop Sajjangarh (Monsoon Palace), and attend the traditional Rajasthani Dharohar folk dance show at Bagore Ki Haveli.',
      places: ['Saheliyon Ki Bari', 'Sajjangarh Monsoon Palace', 'Bagore Ki Haveli', 'Fateh Sagar Lake'],
      activities: ['Folk Dance & Puppet Show', 'Sunset Mountain View', 'Art & Miniature Painting Walk'],
      meals: 'Breakfast & Dinner',
      overnight: 'Udaipur Heritage Hotel'
    },
    {
      dayNumber: 3,
      title: 'Udaipur to Mount Abu via Kumbhalgarh Fort Great Wall',
      location: 'Mount Abu',
      description: 'Drive through the Aravallis to Kumbhalgarh Fort, famous for having the second-longest continuous stone wall in the world. Continue up to Mount Abu, Rajasthan’s only hill station.',
      places: ['Kumbhalgarh Fort (Great Wall of India)', 'Aravalli Hills', 'Mount Abu Hill Station'],
      activities: ['Great Wall Walk', 'Fort Ramparts Photography', 'Hill Station Drive'],
      meals: 'Breakfast & Dinner',
      overnight: 'Mount Abu Boutique Resort'
    },
    {
      dayNumber: 4,
      title: 'Mount Abu Dilwara Temples, Nakki Lake & Sunset Point',
      location: 'Mount Abu',
      description: 'Marvel at the world-renowned intricate marble stone carvings at the 11th-century Dilwara Jain Temples. Enjoy pedal boating on Nakki Lake and view the sunset from Honeymoon Point.',
      places: ['Dilwara Marble Temples', 'Nakki Lake', 'Toad Rock', 'Sunset Point Mount Abu'],
      activities: ['Intricate Marble Heritage Tour', 'Boating on Nakki Lake', 'Sunset Viewpoint'],
      meals: 'Breakfast & Dinner',
      overnight: 'Mount Abu Boutique Resort'
    },
    {
      dayNumber: 5,
      title: 'Mount Abu to Udaipur / Ahmedabad Departure',
      location: 'Udaipur',
      description: 'Check out after breakfast and transfer to Udaipur Airport or Abu Road Railway Station for your onward journey.',
      places: ['Udaipur Airport / Abu Road Station'],
      activities: ['Departure Transfer'],
      meals: 'Breakfast',
      overnight: 'None'
    }
  ],

  // 14. goa-slow-coastal (5D/4N)
  'goa-slow-coastal': [
    {
      dayNumber: 1,
      title: 'Arrival in Goa & Fontainhas Latin Quarter',
      location: 'Panjim',
      description: 'Arrive at Goa MOPA / Dabolim Airport. Transfer to your heritage Portuguese villa in Fontainhas, Panjim. Spend the evening walking past pastel-colored colonial mansions and art galleries.',
      places: ['Fontainhas Latin Quarter', 'Our Lady of the Immaculate Conception Church', 'Mandovi Riverfront'],
      activities: ['Portuguese Heritage Walk', 'Pastel Mansion Photography', 'Goan Bakery Treats'],
      meals: 'Dinner',
      overnight: 'Fontainhas Boutique Heritage Stay'
    },
    {
      dayNumber: 2,
      title: 'Old Goa UNESCO Cathedrals & Spice Plantation Tour',
      location: 'Old Goa',
      description: 'Visit the historic Basilica of Bom Jesus and Se Cathedral in Old Goa. Head to an organic Sahakari spice plantation for a guided tour and traditional Goan lunch served on banana leaves.',
      places: ['Basilica of Bom Jesus', 'Se Cathedral', 'Sahakari Spice Farm', 'Miramar Sunset Beach'],
      activities: ['UNESCO Architecture Tour', 'Organic Spice Tasting', 'Traditional Goan Feast'],
      meals: 'Breakfast, Lunch & Dinner',
      overnight: 'Fontainhas Boutique Heritage Stay'
    },
    {
      dayNumber: 3,
      title: 'Panjim to South Goa & Cabo de Rama Cliff Fort',
      location: 'South Goa',
      description: 'Drive south to the rugged coastal cliffs of Cabo de Rama Fort with sweeping ocean views. Check into a beachfront resort near Palolem and enjoy sunset over the Arabian Sea.',
      places: ['Cabo de Rama Fort', 'Cabo de Rama Secret Beach', 'Palolem Beach'],
      activities: ['Cliff Fort Panoramic Ocean View', 'Beach Sunset', 'Fresh Seafood Dinner'],
      meals: 'Breakfast & Dinner',
      overnight: 'South Goa Beachfront Eco-Resort'
    },
    {
      dayNumber: 4,
      title: 'Palolem Kayaking, Butterfly Beach & Agonda Sands',
      location: 'Palolem & Agonda',
      description: 'Morning sea kayaking in the calm waters of Palolem or boat trip to Butterfly Beach cove. Spend a serene afternoon on the golden sands of Agonda Beach and attend evening live acoustic music.',
      places: ['Palolem Bay', 'Butterfly Island Cove', 'Agonda Beach Shacks', 'Cola Beach Lagoon'],
      activities: ['Sea Kayaking', 'Secret Cove Boat Ride', 'Beach Shacks & Live Music'],
      meals: 'Breakfast & Dinner',
      overnight: 'South Goa Beachfront Eco-Resort'
    },
    {
      dayNumber: 5,
      title: 'South Goa Leisure & Airport Departure',
      location: 'Goa Airport',
      description: 'Enjoy a leisurely breakfast on the beach before transferring to Goa Airport for your flight home.',
      places: ['Goa Airport (GOI/GOX)'],
      activities: ['Beach Walk', 'Airport Transfer'],
      meals: 'Breakfast',
      overnight: 'None'
    }
  ],

  // 15. south-coorg-wayanad (5D/4N)
  'south-coorg-wayanad': [
    {
      dayNumber: 1,
      title: 'Bangalore to Coorg via Bylakuppe Golden Temple',
      location: 'Coorg',
      description: 'Pick up from Bangalore and drive towards Coorg. Stop at Bylakuppe to visit Namdroling Monastery (Golden Temple), the largest Tibetan settlement in South India, before arriving in Madikeri.',
      places: ['Bylakuppe Golden Temple (Namdroling)', 'Madikeri Hills', 'Coffee Estates'],
      activities: ['Tibetan Buddhist Art & Prayer Halls', 'Scenic Western Ghats Drive'],
      meals: 'Dinner',
      overnight: 'Coorg Coffee Plantation Stay'
    },
    {
      dayNumber: 2,
      title: 'Coorg Coffee Plantation Trail, Abbey Falls & Raja’s Seat',
      location: 'Coorg',
      description: 'Take a guided morning walk through fragrant coffee and cardamom plantations. Visit Abbey Falls cascading through dense spice estates and watch the sunset from Raja’s Seat view gardens.',
      places: ['Abbey Falls', 'Coffee & Pepper Plantation', 'Madikeri Fort', 'Raja’s Seat Viewpoint'],
      activities: ['Coffee Cupping & Plantation Walk', 'Waterfall Photography', 'Sunset Valley Panorama'],
      meals: 'Breakfast & Dinner',
      overnight: 'Coorg Coffee Plantation Stay'
    },
    {
      dayNumber: 3,
      title: 'Coorg to Wayanad via Nagarhole Safari & Edakkal Caves',
      location: 'Wayanad',
      description: 'Drive across the Karnataka-Kerala border through the dense forests of Nagarhole. Enter Wayanad and hike up to the prehistoric Neolithic petroglyphs at Edakkal Caves.',
      places: ['Nagarhole Forest Corridor', 'Edakkal Caves (Ambikuthi Hills)', 'Sultan Bathery'],
      activities: ['Forest Wildlife Drive', 'Prehistoric Cave Exploration', 'Spice Valley Check-in'],
      meals: 'Breakfast & Dinner',
      overnight: 'Wayanad Rainforest Resort'
    },
    {
      dayNumber: 4,
      title: 'Wayanad Lakes, Waterfalls & Banasura Sagar Dam',
      location: 'Wayanad',
      description: 'Visit Banasura Sagar Dam, the largest earthen dam in India, set against misty green peaks. Enjoy pedal boating at Pookode Lake and walk to the multi-tiered Soochipara Waterfalls.',
      places: ['Banasura Sagar Dam', 'Pookode Lake', 'Soochipara Waterfalls', 'Lakkidi View Point'],
      activities: ['Speedboating / Pedal Boating', 'Rainforest Waterfall Trail', 'Mist Viewpoint Walk'],
      meals: 'Breakfast & Dinner',
      overnight: 'Wayanad Rainforest Resort'
    },
    {
      dayNumber: 5,
      title: 'Wayanad to Calicut / Bangalore Departure',
      location: 'Departure',
      description: 'Check out after breakfast and drive through the famous Thamarassery Churam mountain pass to Calicut Airport (CCJ) or back to Bangalore for your return journey.',
      places: ['Thamarassery Ghat Pass', 'Calicut Airport / Bangalore'],
      activities: ['Ghat Mountain Views', 'Departure Transfer'],
      meals: 'Breakfast',
      overnight: 'None'
    }
  ],

  // 16. south-ooty-kodaikanal (6D/5N)
  'south-ooty-kodaikanal': [
    {
      dayNumber: 1,
      title: 'Coimbatore to Ooty (Queen of Nilgiris)',
      location: 'Ooty',
      description: 'Pick up from Coimbatore Airport/Station. Drive up the hairpin bends of the Nilgiri hills through tea estates to Ooty (7,350 ft). Visit the lush Government Botanical Gardens and stroll along Ooty Lake.',
      places: ['Nilgiri Mountain Foothills', 'Government Botanical Gardens', 'Ooty Lake'],
      activities: ['Scenic Hill Climb', 'Botanical Flora Walk', 'Lakeside Stroll'],
      meals: 'Dinner',
      overnight: 'Ooty Heritage Colonial Resort'
    },
    {
      dayNumber: 2,
      title: 'Doddabetta Peak & UNESCO Nilgiri Toy Train to Coonoor',
      location: 'Ooty & Coonoor',
      description: 'Ascend Doddabetta Peak (8,650 ft) for sweeping views of the Nilgiri Biosphere. Board the historic UNESCO steam toy train to Coonoor to visit Sim’s Park, Dolphin’s Nose, and tea factory gardens.',
      places: ['Doddabetta Peak', 'Nilgiri Mountain Railway (Toy Train)', 'Sim’s Park (Coonoor)', 'Dolphin’s Nose'],
      activities: ['Heritage Steam Toy Train Ride', 'Highest Nilgiri Peak Panorama', 'Fresh Tea Factory Tasting'],
      meals: 'Breakfast & Dinner',
      overnight: 'Ooty Heritage Colonial Resort'
    },
    {
      dayNumber: 3,
      title: 'Ooty to Kodaikanal (Princess of Hill Stations)',
      location: 'Kodaikanal',
      description: 'Drive across the scenic Palani Hills corridor down through valleys and climb back up to misty Kodaikanal (6,990 ft). Enjoy a tranquil evening boat ride on star-shaped Kodai Lake.',
      places: ['Palani Foothills', 'Silver Cascade Waterfalls', 'Kodai Star Lake'],
      activities: ['Western Ghats Mountain Drive', 'Lake Boating', 'Evening Lakeside Promenade'],
      meals: 'Breakfast & Dinner',
      overnight: 'Kodaikanal Pine Valley Resort'
    },
    {
      dayNumber: 4,
      title: 'Kodaikanal Pine Forests, Pillar Rocks & Coaker’s Walk',
      location: 'Kodaikanal',
      description: 'Take a scenic morning walk along Coaker’s Walk overlooking cloud-filled valleys. Visit the dramatic 400-ft vertical Pillar Rocks, the mysterious Guna Caves, and the dense pine forest plantations.',
      places: ['Coaker’s Walk', 'Pillar Rocks', 'Guna Caves', 'Pine Forest Grove', 'Bryant Park'],
      activities: ['Cliffside Walk', 'Pine Forest Photography', 'Floral Gardens Stroll'],
      meals: 'Breakfast & Dinner',
      overnight: 'Kodaikanal Pine Valley Resort'
    },
    {
      dayNumber: 5,
      title: 'Kodaikanal Offbeat Viewpoints & Dolphin’s Nose Hike',
      location: 'Kodaikanal',
      description: 'Hike to the thrilling flat rock cliff of Dolphin’s Nose and Echo Point at Vattakanal. Visit Kurinji Andavar Temple and spend a relaxed afternoon shopping for homemade chocolates and eucalyptus oils.',
      places: ['Vattakanal Village', 'Dolphin’s Nose Kodai', 'Echo Rock', 'Kurinji Andavar Temple'],
      activities: ['Cliff Edge Hike', 'Local Homemade Chocolate Shopping', 'Cafe Relaxation'],
      meals: 'Breakfast & Dinner',
      overnight: 'Kodaikanal Pine Valley Resort'
    },
    {
      dayNumber: 6,
      title: 'Kodaikanal to Madurai / Coimbatore Departure',
      location: 'Departure',
      description: 'Descend the Palani Hills to Madurai Airport / Railway Station or Coimbatore for your return flight.',
      places: ['Madurai / Coimbatore Airport'],
      activities: ['Descent Drive', 'Departure Transfer'],
      meals: 'Breakfast',
      overnight: 'None'
    }
  ]
};

// Now process the rest of the 44 packages
console.log('Keys configured:', Object.keys(itinerariesMap).length);
