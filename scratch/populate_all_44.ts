import fs from 'fs';
import path from 'path';
import { tripPackages } from '../src/data/trips';
import { TripPackage, ItineraryDay } from '../src/types';

// Complete dictionary of all 44 missing itineraries
export const fullItinerariesMap: Record<string, ItineraryDay[]> = {
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
  ],

  // 17. ladakh-bike-delhi-hanle-umlingla-12d (12D/11N)
  'ladakh-bike-delhi-hanle-umlingla-12d': [
    {
      dayNumber: 1,
      title: 'Delhi to Manali Overnight Transit',
      location: 'Transit',
      description: 'Assemble in Delhi for bike/rider briefing. Embark on the overnight journey to Manali.',
      places: ['Delhi', 'Mandi', 'Kullu'],
      activities: ['Overnight Transit'],
      meals: 'None',
      overnight: 'Overnight Vehicle'
    },
    {
      dayNumber: 2,
      title: 'Arrival in Manali & Bike Allocation',
      location: 'Manali',
      description: 'Arrive in Manali, check in, collect Royal Enfields, and test ride around Solang Valley.',
      places: ['Manali', 'Solang Valley'],
      activities: ['Bike Allocation', 'Test Ride'],
      meals: 'Dinner',
      overnight: 'Manali Hotel'
    },
    {
      dayNumber: 3,
      title: 'Manali to Jispa via Atal Tunnel',
      location: 'Jispa',
      description: 'Ride through Atal Tunnel into Lahaul Valley. Cross Keylong to the serene riverside hamlet of Jispa.',
      places: ['Atal Tunnel', 'Sissu', 'Keylong', 'Jispa'],
      activities: ['Lahaul Valley Ride', 'Riverside Camping'],
      meals: 'Breakfast & Dinner',
      overnight: 'Jispa Camp'
    },
    {
      dayNumber: 4,
      title: 'Jispa to Sarchu / Leh via Baralacha La Pass (16,040 ft)',
      location: 'Leh',
      description: 'Ascend the rugged Baralacha La Pass, ride past Deepak Tal and Suraj Tal into Sarchu and across Gata Loops.',
      places: ['Baralacha La (16,040 ft)', 'Suraj Tal', 'Gata Loops', 'Nakee La', 'Lachung La'],
      activities: ['High Pass Mountain Riding', 'Acclimatization'],
      meals: 'Breakfast & Dinner',
      overnight: 'Leh Hotel'
    },
    {
      dayNumber: 5,
      title: 'Leh Acclimatization & Sham Valley',
      location: 'Leh',
      description: 'Rest day in Leh. Visit Magnetic Hill, Sangam Confluence, and Shanti Stupa.',
      places: ['Sangam', 'Magnetic Hill', 'Hall of Fame', 'Shanti Stupa'],
      activities: ['Local Sightseeing', 'Acclimatization'],
      meals: 'Breakfast & Dinner',
      overnight: 'Leh Hotel'
    },
    {
      dayNumber: 6,
      title: 'Leh to Nubra Valley via Khardung La (17,982 ft)',
      location: 'Nubra Valley',
      description: 'Cross the iconic Khardung La pass and ride into Nubra Valley. Enjoy Hunder sand dunes and Diskit Gompa.',
      places: ['Khardung La (17,982 ft)', 'Diskit Gompa', 'Hunder Sand Dunes'],
      activities: ['High Altitude Pass Riding', 'Camel Safari'],
      meals: 'Breakfast & Dinner',
      overnight: 'Nubra Camp'
    },
    {
      dayNumber: 7,
      title: 'Nubra Valley to Pangong Tso via Shyok River Route',
      location: 'Pangong Tso',
      description: 'Ride the thrilling off-road Shyok river trail directly to the cobalt blue Pangong Lake.',
      places: ['Shyok River Trail', 'Durbuk', 'Tangste', 'Pangong Tso (13,860 ft)'],
      activities: ['Off-road Riding', 'Lakeside Stargazing'],
      meals: 'Breakfast & Dinner',
      overnight: 'Pangong Camp'
    },
    {
      dayNumber: 8,
      title: 'Pangong Tso to Hanle Dark Sky Reserve via Chushul & Rezang La',
      location: 'Hanle',
      description: 'Ride along the Indo-China border via Chushul and pay respects at Rezang La War Memorial. Arrive in Hanle, home to the Indian Astronomical Observatory.',
      places: ['Chushul', 'Rezang La War Memorial', 'Loma Bend', 'Hanle Dark Sky Reserve'],
      activities: ['Border Trail Ride', 'Astronomical Dark Sky Stargazing'],
      meals: 'Breakfast & Dinner',
      overnight: 'Hanle Homestay'
    },
    {
      dayNumber: 9,
      title: 'Hanle to Umling La Pass (19,024 ft) Summit & Nyoma',
      location: 'Hanle / Nyoma',
      description: 'Summit the highest motorable road in the world at Umling La Pass (19,024 ft). Ride back through Nyoma along the Indus River.',
      places: ['Umling La Pass (19,024 ft)', 'Demchok Border View', 'Nyoma'],
      activities: ['World Record Pass Ride', 'Indus Valley Exploration'],
      meals: 'Breakfast & Dinner',
      overnight: 'Hanle / Nyoma Stay'
    },
    {
      dayNumber: 10,
      title: 'Hanle to Tso Moriri Lake via Chumathang',
      location: 'Tso Moriri',
      description: 'Ride to the turquoise high-altitude Tso Moriri Lake (14,836 ft) at Korzok village.',
      places: ['Chumathang Hot Springs', 'Mahe Bridge', 'Tso Moriri Lake (Korzok)'],
      activities: ['High Alpine Lake Photography', 'Korzok Gompa Walk'],
      meals: 'Breakfast & Dinner',
      overnight: 'Tso Moriri Camp'
    },
    {
      dayNumber: 11,
      title: 'Tso Moriri to Jispa / Manali via Tsokar & Tanglang La',
      location: 'Jispa',
      description: 'Ride past Tsokar salt lake, cross Tanglang La (17,480 ft), and descend to Jispa.',
      places: ['Tsokar Lake', 'Tanglang La (17,480 ft)', 'More Plains', 'Jispa'],
      activities: ['More Plains High Speed Ride', 'Descent Ride'],
      meals: 'Breakfast & Dinner',
      overnight: 'Jispa Camp'
    },
    {
      dayNumber: 12,
      title: 'Jispa to Manali & Overnight Return to Delhi',
      location: 'Manali to Delhi',
      description: 'Ride from Jispa through Atal Tunnel to Manali, hand over motorcycles, and board evening return transit to Delhi.',
      places: ['Atal Tunnel', 'Manali', 'Delhi'],
      activities: ['Final Ride Leg', 'Tour Conclusion'],
      meals: 'Breakfast',
      overnight: 'None'
    }
  ],

  // 18. ladakh-bike-delhi-srinagar-12d (12D/11N)
  'ladakh-bike-delhi-srinagar-12d': [
    { dayNumber: 1, title: 'Delhi to Manali Overnight Transit', location: 'Transit', description: 'Overnight Volvo/Traveller departure from Delhi to Manali.', places: ['Delhi', 'Mandi'], activities: ['Transit'], meals: 'None', overnight: 'Overnight Coach' },
    { dayNumber: 2, title: 'Manali Arrival & Motorcycle Handover', location: 'Manali', description: 'Bike allocation, briefing, and Solang Valley test ride.', places: ['Manali', 'Solang'], activities: ['Test Ride'], meals: 'Dinner', overnight: 'Manali Hotel' },
    { dayNumber: 3, title: 'Manali to Jispa via Atal Tunnel', location: 'Jispa', description: 'Ride through Atal Tunnel and along the Bhaga River to Jispa.', places: ['Atal Tunnel', 'Keylong', 'Jispa'], activities: ['Mountain Ride'], meals: 'Breakfast & Dinner', overnight: 'Jispa Camp' },
    { dayNumber: 4, title: 'Jispa to Leh via Baralacha La & Tanglang La', location: 'Leh', description: 'Epic high-pass ride crossing Baralacha La, Sarchu, Gata Loops, and Tanglang La.', places: ['Baralacha La', 'Gata Loops', 'Tanglang La', 'Leh'], activities: ['Trans-Himalayan Crossing'], meals: 'Breakfast & Dinner', overnight: 'Leh Hotel' },
    { dayNumber: 5, title: 'Leh Rest & Acclimatization', location: 'Leh', description: 'Explore Shanti Stupa, Leh Palace, and local bazaar.', places: ['Leh Market', 'Shanti Stupa'], activities: ['Rest & Acclimatization'], meals: 'Breakfast & Dinner', overnight: 'Leh Hotel' },
    { dayNumber: 6, title: 'Leh to Nubra Valley via Khardung La (17,982 ft)', location: 'Nubra Valley', description: 'Ride across Khardung La pass to Diskit Monastery and Hunder dunes.', places: ['Khardung La', 'Diskit', 'Hunder'], activities: ['Pass Ride', 'Camel Safari'], meals: 'Breakfast & Dinner', overnight: 'Nubra Camp' },
    { dayNumber: 7, title: 'Nubra Valley to Pangong Tso via Shyok River', location: 'Pangong Tso', description: 'Adventurous river route ride directly to Pangong Lake.', places: ['Shyok Trail', 'Pangong Tso'], activities: ['Lakeside Camping'], meals: 'Breakfast & Dinner', overnight: 'Pangong Camp' },
    { dayNumber: 8, title: 'Pangong to Hanle via Chushul & Rezang La', location: 'Hanle', description: 'Ride through Chushul war memorial outpost to Hanle Dark Sky Reserve.', places: ['Rezang La', 'Hanle'], activities: ['Dark Sky Stargazing'], meals: 'Breakfast & Dinner', overnight: 'Hanle Homestay' },
    { dayNumber: 9, title: 'Umling La Pass (19,024 ft) Summit & Leh', location: 'Leh', description: 'Conquer the highest motorable road in the world at Umling La and return to Leh.', places: ['Umling La (19,024 ft)', 'Chumathang', 'Leh'], activities: ['Highest Pass Summit'], meals: 'Breakfast & Dinner', overnight: 'Leh Hotel' },
    { dayNumber: 10, title: 'Leh to Kargil via Lamayuru & Fotu La', location: 'Kargil', description: 'Ride past the Lamayuru moonland landscapes and Fotu La Pass (13,478 ft) to Kargil.', places: ['Magnetic Hill', 'Lamayuru Moonland', 'Fotu La', 'Kargil'], activities: ['Moonland Landscape Ride'], meals: 'Breakfast & Dinner', overnight: 'Kargil Hotel' },
    { dayNumber: 11, title: 'Kargil to Srinagar via Drass & Zoji La Pass', location: 'Srinagar', description: 'Pay homage at Kargil War Memorial in Drass and ride across the thrilling Zoji La Pass (11,575 ft) into Sonamarg and Srinagar.', places: ['Drass War Memorial', 'Zoji La Pass', 'Sonamarg', 'Srinagar'], activities: ['War Memorial Visit', 'Zoji La Crossing', 'Dal Lake Houseboat'], meals: 'Breakfast & Dinner', overnight: 'Srinagar Houseboat' },
    { dayNumber: 12, title: 'Departure from Srinagar Airport', location: 'Srinagar', description: 'Transfer to Srinagar Airport with memories of the full trans-Himalayan traverse.', places: ['Srinagar Airport'], activities: ['Airport Transfer'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 19. ladakh-bike-srinagar-delhi-12d (12D/11N)
  'ladakh-bike-srinagar-delhi-12d': [
    { dayNumber: 1, title: 'Arrival in Srinagar & Shikara Sunset', location: 'Srinagar', description: 'Arrive in Srinagar, check into Dal Lake houseboat, and motorcycle briefing.', places: ['Dal Lake', 'Shikara'], activities: ['Briefing', 'Shikara Ride'], meals: 'Dinner', overnight: 'Srinagar Houseboat' },
    { dayNumber: 2, title: 'Srinagar to Kargil via Sonamarg & Zoji La Pass', location: 'Kargil', description: 'Ride through Sonamarg meadows and cross Zoji La Pass into Drass and Kargil.', places: ['Sonamarg', 'Zoji La (11,575 ft)', 'Drass War Memorial', 'Kargil'], activities: ['Pass Crossing', 'War Memorial Homage'], meals: 'Breakfast & Dinner', overnight: 'Kargil Hotel' },
    { dayNumber: 3, title: 'Kargil to Leh via Lamayuru Moonland', location: 'Leh', description: 'Ride through Mulbekh, Namika La, Fotu La, and Lamayuru Moonland to Leh.', places: ['Lamayuru', 'Fotu La', 'Magnetic Hill', 'Sangam', 'Leh'], activities: ['Scenic Highway Ride'], meals: 'Breakfast & Dinner', overnight: 'Leh Hotel' },
    { dayNumber: 4, title: 'Leh Acclimatization & Local Monasteries', location: 'Leh', description: 'Rest day in Leh. Explore Shanti Stupa, Leh Palace, and Thiksey Gompa.', places: ['Shanti Stupa', 'Thiksey', 'Leh Market'], activities: ['Acclimatization', 'Culture Tour'], meals: 'Breakfast & Dinner', overnight: 'Leh Hotel' },
    { dayNumber: 5, title: 'Leh to Nubra Valley via Khardung La (17,982 ft)', location: 'Nubra Valley', description: 'Ride across Khardung La into Hunder and Diskit in Nubra Valley.', places: ['Khardung La (17,982 ft)', 'Diskit', 'Hunder Dunes'], activities: ['High Pass Ride', 'Camel Safari'], meals: 'Breakfast & Dinner', overnight: 'Nubra Camp' },
    { dayNumber: 6, title: 'Nubra Valley to Pangong Tso via Shyok River', location: 'Pangong Tso', description: 'Ride the off-road Shyok trail directly to cobalt Pangong Tso.', places: ['Shyok River Trail', 'Pangong Tso (13,860 ft)'], activities: ['Lakeside Stargazing'], meals: 'Breakfast & Dinner', overnight: 'Pangong Camp' },
    { dayNumber: 7, title: 'Pangong Tso to Hanle via Chushul & Rezang La', location: 'Hanle', description: 'Traverse the border routes to Hanle Dark Sky Reserve.', places: ['Chushul', 'Rezang La', 'Hanle'], activities: ['Astronomy Stargazing'], meals: 'Breakfast & Dinner', overnight: 'Hanle Homestay' },
    { dayNumber: 8, title: 'Hanle to Umling La Pass (19,024 ft) & Leh', location: 'Leh', description: 'Summit the highest motorable road in the world at Umling La Pass and ride back to Leh.', places: ['Umling La (19,024 ft)', 'Chumathang', 'Leh'], activities: ['Highest Pass Summit'], meals: 'Breakfast & Dinner', overnight: 'Leh Hotel' },
    { dayNumber: 9, title: 'Leh to Jispa via Tanglang La & More Plains', location: 'Jispa', description: 'Ride across Tanglang La and the high plateau of More Plains down to Jispa.', places: ['Tanglang La (17,480 ft)', 'More Plains', 'Gata Loops', 'Sarchu', 'Jispa'], activities: ['High Plateau Riding'], meals: 'Breakfast & Dinner', overnight: 'Jispa Camp' },
    { dayNumber: 10, title: 'Jispa to Manali via Atal Tunnel', location: 'Manali', description: 'Ride through Lahaul Valley and Atal Tunnel into Manali.', places: ['Keylong', 'Atal Tunnel', 'Manali'], activities: ['Tunnel Crossing', 'Celebration Dinner'], meals: 'Breakfast & Dinner', overnight: 'Manali Hotel' },
    { dayNumber: 11, title: 'Manali Leisure & Evening Departure to Delhi', location: 'Manali to Delhi', description: 'Explore Old Manali cafes and board evening return coach to Delhi.', places: ['Old Manali', 'Mall Road'], activities: ['Cafe Stroll', 'Evening Departure'], meals: 'Breakfast', overnight: 'Overnight Coach' },
    { dayNumber: 12, title: 'Morning Arrival in Delhi', location: 'Delhi', description: 'Arrive in Delhi with incredible memories of the complete trans-Himalayan motorcycle traverse.', places: ['Delhi Drop Point'], activities: ['Tour Conclusion'], meals: 'None', overnight: 'None' }
  ],

  // 20. ladakh-bike-hanle-demchok-7d (7D/6N)
  'ladakh-bike-hanle-demchok-7d': [
    { dayNumber: 1, title: 'Arrival in Leh & Acclimatization', location: 'Leh', description: 'Arrive in Leh, mandatory rest for acclimatization, evening walk to Shanti Stupa.', places: ['Leh Market', 'Shanti Stupa'], activities: ['Acclimatization'], meals: 'Dinner', overnight: 'Leh Hotel' },
    { dayNumber: 2, title: 'Leh to Chumathang & Hanle Dark Sky Reserve', location: 'Hanle', description: 'Ride along the Indus River via Chumathang hot springs to Hanle.', places: ['Chumathang', 'Mahe Bridge', 'Hanle Observatory'], activities: ['Stargazing', 'River Ride'], meals: 'Breakfast & Dinner', overnight: 'Hanle Homestay' },
    { dayNumber: 3, title: 'Hanle to Umling La Pass (19,024 ft) Summit', location: 'Umling La', description: 'Conquer Umling La Pass (19,024 ft), the highest motorable road on Earth.', places: ['Umling La Pass (19,024 ft)', 'Chisumle Bridge'], activities: ['World Record Summit Ride'], meals: 'Breakfast & Dinner', overnight: 'Hanle Homestay' },
    { dayNumber: 4, title: 'Hanle to Demchok Indo-China Border & Nyoma', location: 'Nyoma', description: 'Ride along the Line of Actual Control to the border village of Demchok.', places: ['Demchok Border', 'Indus Valley', 'Nyoma'], activities: ['Border Region Ride'], meals: 'Breakfast & Dinner', overnight: 'Nyoma Guesthouse' },
    { dayNumber: 5, title: 'Nyoma to Pangong Tso via Chushul & Rezang La', location: 'Pangong Tso', description: 'Ride across Rezang La War Memorial to the cobalt blue waters of Pangong Tso.', places: ['Rezang La War Memorial', 'Chushul', 'Pangong Tso'], activities: ['Lakeside Camping', 'War Memorial Homage'], meals: 'Breakfast & Dinner', overnight: 'Pangong Camp' },
    { dayNumber: 6, title: 'Pangong Tso to Leh via Chang La Pass (17,590 ft)', location: 'Leh', description: 'Sunrise over Pangong. Ride back to Leh over Chang La Pass and visit Thiksey Gompa.', places: ['Chang La (17,590 ft)', 'Thiksey Monastery', 'Leh'], activities: ['Pass Crossing', 'Monastery Tour'], meals: 'Breakfast & Dinner', overnight: 'Leh Hotel' },
    { dayNumber: 7, title: 'Departure from Leh Airport', location: 'Leh', description: 'Transfer to Leh Airport for return flight.', places: ['Leh Airport'], activities: ['Airport Transfer'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 21. ladakh-bike-hanle-demchok-8d (8D/7N)
  'ladakh-bike-hanle-demchok-8d': [
    { dayNumber: 1, title: 'Arrival in Leh & Altitude Acclimatization', location: 'Leh', description: 'Arrive in Leh, rest day, evening stroll in Leh Market.', places: ['Leh', 'Shanti Stupa'], activities: ['Acclimatization'], meals: 'Dinner', overnight: 'Leh Hotel' },
    { dayNumber: 2, title: 'Leh to Nubra Valley via Khardung La Pass (17,982 ft)', location: 'Nubra Valley', description: 'Ride over Khardung La to Diskit Monastery and Hunder sand dunes.', places: ['Khardung La', 'Diskit', 'Hunder Dunes'], activities: ['High Pass Ride', 'Camel Safari'], meals: 'Breakfast & Dinner', overnight: 'Nubra Camp' },
    { dayNumber: 3, title: 'Nubra Valley to Pangong Tso via Shyok River', location: 'Pangong Tso', description: 'Off-road ride along Shyok River directly to Pangong Lake.', places: ['Shyok Trail', 'Pangong Tso (13,860 ft)'], activities: ['Lakeside Camping'], meals: 'Breakfast & Dinner', overnight: 'Pangong Camp' },
    { dayNumber: 4, title: 'Pangong to Hanle via Chushul & Rezang La', location: 'Hanle', description: 'Ride along the border via Rezang La War Memorial into Hanle Dark Sky Reserve.', places: ['Chushul', 'Rezang La', 'Hanle'], activities: ['Dark Sky Stargazing'], meals: 'Breakfast & Dinner', overnight: 'Hanle Homestay' },
    { dayNumber: 5, title: 'Hanle to Umling La Pass (19,024 ft) Summit', location: 'Umling La', description: 'Scale the highest motorable road in the world at Umling La Pass.', places: ['Umling La (19,024 ft)'], activities: ['Highest Pass Summit'], meals: 'Breakfast & Dinner', overnight: 'Hanle Homestay' },
    { dayNumber: 6, title: 'Hanle to Demchok Border & Tso Moriri Lake', location: 'Tso Moriri', description: 'Ride along Demchok border route and traverse to the high-altitude Tso Moriri Lake.', places: ['Demchok', 'Chumathang', 'Tso Moriri (Korzok)'], activities: ['Alpine Lake Ride'], meals: 'Breakfast & Dinner', overnight: 'Tso Moriri Camp' },
    { dayNumber: 7, title: 'Tso Moriri to Leh via Tsokar & Tanglang La Pass', location: 'Leh', description: 'Ride past Tsokar salt lake and cross Tanglang La Pass (17,480 ft) back to Leh.', places: ['Tsokar Lake', 'Tanglang La (17,480 ft)', 'Leh'], activities: ['Pass Crossing', 'Farewell Dinner'], meals: 'Breakfast & Dinner', overnight: 'Leh Hotel' },
    { dayNumber: 8, title: 'Departure from Leh Airport', location: 'Leh', description: 'Transfer to Leh Airport with memories of the ultimate Eastern Ladakh motorcycle expedition.', places: ['Leh Airport'], activities: ['Airport Transfer'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 22. ladakh-chadar-trek (8D/7N)
  'ladakh-chadar-trek': [
    { dayNumber: 1, title: 'Arrival in Leh & Winter Acclimatization', location: 'Leh', description: 'Fly into freezing Leh (11,562 ft). Mandatory 48-hour acclimatization and medical check-up.', places: ['Leh Market', 'SNM Hospital'], activities: ['Winter Acclimatization', 'Medical Check'], meals: 'Dinner', overnight: 'Leh Heated Hotel' },
    { dayNumber: 2, title: 'Acclimatization Walk & Shanti Stupa', location: 'Leh', description: 'Slow walking tour to Shanti Stupa to test physical readiness for extreme cold conditions.', places: ['Shanti Stupa', 'Leh Bazaar'], activities: ['Cold Adaptation Walk'], meals: 'Breakfast & Dinner', overnight: 'Leh Heated Hotel' },
    { dayNumber: 3, title: 'Leh to Shingra Koma & First Step on the Frozen River', location: 'Shingra Koma', description: 'Drive to Chilling and step onto the frozen Zanskar river "Chadar" at Shingra Koma (10,550 ft).', places: ['Chilling', 'Zanskar River Gorge', 'Shingra Koma'], activities: ['Chadar Ice Walking (Penguin Walk)', 'Cave/Tent Camping'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Shingra Koma Camp' },
    { dayNumber: 4, title: 'Trek Shingra Koma to Tibb Cave', location: 'Tibb Cave', description: 'Trek 14 km along deep canyon walls on ice sheets. Arrive at the natural shelter of Tibb Cave (10,760 ft).', places: ['Frozen Zanskar Gorge', 'Tibb Cave'], activities: ['Ice Trekking', 'Frozen Waterfall Sightings'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Tibb Cave Camp' },
    { dayNumber: 5, title: 'Trek Tibb Cave to Naerak Frozen Waterfall (The Crown of Chadar)', location: 'Naerak', description: 'Trek past the ancient cantilever wooden bridge to the 50-ft gigantic frozen Naerak Waterfall.', places: ['Naerak Frozen Waterfall (11,150 ft)', 'Naerak Village Bridge'], activities: ['Frozen Waterfall Photography', 'Zanskar Winter Culture'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Naerak Camp' },
    { dayNumber: 6, title: 'Trek Naerak back to Tibb Cave', location: 'Tibb Cave', description: 'Trek back along the ever-changing ice formations of the frozen river.', places: ['Frozen Zanskar Canyon', 'Tibb Cave'], activities: ['Ice Trekking', 'Canyon Photography'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Tibb Cave Camp' },
    { dayNumber: 7, title: 'Trek Tibb Cave to Shingra Koma & Drive to Leh', location: 'Leh', description: 'Final ice walking leg to Shingra Koma. Board warm vehicles back to your heated hotel in Leh.', places: ['Shingra Koma', 'Chilling', 'Leh'], activities: ['Trek Completion', 'Celebration Dinner'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Leh Heated Hotel' },
    { dayNumber: 8, title: 'Departure from Leh Airport', location: 'Leh', description: 'Transfer to Leh Airport with memories of conquering the legendary Chadar Frozen River Trek.', places: ['Leh Airport'], activities: ['Airport Transfer'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 23. ladakh-short-glimpse-4d (4D/3N)
  'ladakh-short-glimpse-4d': [
    { dayNumber: 1, title: 'Arrival in Leh & Acclimatization', location: 'Leh', description: 'Fly into Leh, complete rest for high altitude, evening walk to Shanti Stupa.', places: ['Leh Bazaar', 'Shanti Stupa'], activities: ['Acclimatization', 'Sunset Stroll'], meals: 'Dinner', overnight: 'Leh Hotel' },
    { dayNumber: 2, title: 'Sham Valley Sightseeing (Magnetic Hill & Sangam)', location: 'Sham Valley', description: 'Visit Hall of Fame, Magnetic Hill, Gurudwara Pathar Sahib, and Indus-Zanskar Sangam.', places: ['Hall of Fame', 'Magnetic Hill', 'Sangam Confluence', 'Spituk Gompa'], activities: ['Sightseeing Tour'], meals: 'Breakfast & Dinner', overnight: 'Leh Hotel' },
    { dayNumber: 3, title: 'Excursion to Khardung La Pass (17,982 ft)', location: 'Khardung La', description: 'Drive up to the world-famous Khardung La Pass for panoramic views of the Karakoram Range.', places: ['Khardung La Pass (17,982 ft)', 'Leh Palace'], activities: ['Highest Pass Viewpoint', 'Photography'], meals: 'Breakfast & Dinner', overnight: 'Leh Hotel' },
    { dayNumber: 4, title: 'Departure from Leh Airport', location: 'Leh', description: 'Transfer to Leh Airport for your morning departure flight.', places: ['Leh Airport'], activities: ['Airport Transfer'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 24. spiti-winter-white-expedition (8D/7N)
  'spiti-winter-white-expedition': [
    { dayNumber: 1, title: 'Shimla to Kalpa via Kinnaur Valley', location: 'Kalpa', description: 'Drive through Kinnaur apple orchards with views of snow-covered Kinner Kailash.', places: ['Rampur', 'Jeori', 'Kalpa (9,711 ft)'], activities: ['Scenic Winter Mountain Drive'], meals: 'Dinner', overnight: 'Kalpa Hotel' },
    { dayNumber: 2, title: 'Kalpa to Nako & Tabo Monasteries', location: 'Tabo', description: 'Drive past Khab confluence and frozen Nako Lake to 1,000-year-old Tabo Monastery.', places: ['Nako Frozen Lake', 'Gue Mummy Village', 'Tabo Monastery (UNESCO)'], activities: ['Monastery Art Tour', 'Ancient Mummy Visit'], meals: 'Breakfast & Dinner', overnight: 'Tabo Homestay' },
    { dayNumber: 3, title: 'Tabo to Kaza & Pin Valley National Park', location: 'Kaza', description: 'Drive through snowdrifts into frozen Pin Valley (Mudh Village) to spot Himalayan Ibex.', places: ['Pin Valley (Mudh)', 'Kungri Gompa', 'Kaza (12,500 ft)'], activities: ['Snow Leopard / Ibex Wildlife Spotting'], meals: 'Breakfast & Dinner', overnight: 'Kaza Homestay' },
    { dayNumber: 4, title: 'Key Monastery & Chicham Suspension Bridge in Snow', location: 'Kaza', description: 'Explore snow-covered Key Monastery and walk across the frozen gorge of Chicham Bridge.', places: ['Key Monastery', 'Kibber Village', 'Chicham Bridge'], activities: ['Winter Photography', 'Monastic Blessings'], meals: 'Breakfast & Dinner', overnight: 'Kaza Homestay' },
    { dayNumber: 5, title: 'Hikkim & Langza Frozen Buddha Expedition', location: 'Spiti High Villages', description: '4x4 drive to snowbound Hikkim post office and the giant Buddha statue at Langza.', places: ['Hikkim (14,567 ft)', 'Komic', 'Langza (14,435 ft)'], activities: ['High Village Winter Stroll', 'Postcard from Hikkim'], meals: 'Breakfast & Dinner', overnight: 'Kaza Homestay' },
    { dayNumber: 6, title: 'Kaza to Kalpa via Dhankar Clifftop Gompa', location: 'Kalpa', description: 'Visit the dramatic perched Dhankar Monastery over the frozen Spiti confluence and return to Kalpa.', places: ['Dhankar Monastery', 'Spiti Confluence', 'Kalpa'], activities: ['Clifftop Monastery Tour'], meals: 'Breakfast & Dinner', overnight: 'Kalpa Hotel' },
    { dayNumber: 7, title: 'Kalpa to Shimla Winter Drive', location: 'Shimla', description: 'Scenic drive descending through Sutlej Valley back to the colonial town of Shimla.', places: ['Narkanda', 'Shimla Mall Road'], activities: ['Scenic Descent', 'Evening Walk'], meals: 'Breakfast & Dinner', overnight: 'Shimla Hotel' },
    { dayNumber: 8, title: 'Shimla to Chandigarh / Delhi Departure', location: 'Departure', description: 'Transfer to Chandigarh Airport / Railway Station with memories of the Winter White Spiti Expedition.', places: ['Chandigarh / Delhi'], activities: ['Departure Transfer'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 25. spiti-motorbike-circuit-10d (10D/9N)
  'spiti-motorbike-circuit-10d': [
    { dayNumber: 1, title: 'Delhi to Shimla Overnight Transit', location: 'Transit', description: 'Overnight journey from Delhi to Shimla for bike handover.', places: ['Delhi', 'Shimla'], activities: ['Transit'], meals: 'None', overnight: 'Overnight Coach' },
    { dayNumber: 2, title: 'Shimla to Narkanda & Sarahan', location: 'Sarahan', description: 'Ride through pine forests to the historic Bhimakali Temple in Sarahan.', places: ['Narkanda', 'Hatu Peak', 'Sarahan Bhimakali Temple'], activities: ['Mountain Ride', 'Temple Architecture'], meals: 'Dinner', overnight: 'Sarahan Hotel' },
    { dayNumber: 3, title: 'Sarahan to Sangla & Chitkul (Last Village of India)', location: 'Chitkul', description: 'Ride along the Baspa River into Chitkul, the last inhabited village on the Indo-Tibet border.', places: ['Karcham', 'Sangla Valley', 'Chitkul (11,320 ft)'], activities: ['Border Village Ride', 'Baspa River Walk'], meals: 'Breakfast & Dinner', overnight: 'Chitkul Camp / Homestay' },
    { dayNumber: 4, title: 'Chitkul to Kalpa Apple Valley', location: 'Kalpa', description: 'Ride to Kalpa with majestic views of the sacred Kinner Kailash peak.', places: ['Reckong Peo', 'Kalpa Suicide Point', 'Roghi Village'], activities: ['Cliff Ride', 'Sunset Panorama'], meals: 'Breakfast & Dinner', overnight: 'Kalpa Hotel' },
    { dayNumber: 5, title: 'Kalpa to Nako & Tabo Monastery', location: 'Tabo', description: 'Enter Spiti Valley via Khab confluence and Nako Lake to ancient Tabo.', places: ['Khab Confluence', 'Nako Lake', 'Gue Mummy', 'Tabo'], activities: ['Trans-Himalayan Highway Ride'], meals: 'Breakfast & Dinner', overnight: 'Tabo Homestay' },
    { dayNumber: 6, title: 'Tabo to Dhankar & Kaza', location: 'Kaza', description: 'Ride to Dhankar cliff monastery and Pin Valley (Mudh) to Kaza.', places: ['Dhankar Gompa', 'Pin Valley', 'Kaza (12,500 ft)'], activities: ['Clifftop Ride', 'Kaza Market Stroll'], meals: 'Breakfast & Dinner', overnight: 'Kaza Hotel' },
    { dayNumber: 7, title: 'Kaza High Villages (Key, Kibber, Chicham, Hikkim, Langza)', location: 'Kaza', description: 'Full day exploring Key Gompa, Chicham Bridge, Hikkim post office, and Langza Buddha.', places: ['Key Monastery', 'Chicham Bridge', 'Hikkim', 'Komic', 'Langza'], activities: ['High Altitude Circuit Ride'], meals: 'Breakfast & Dinner', overnight: 'Kaza Hotel' },
    { dayNumber: 8, title: 'Kaza to Chandratal Lake via Kunzum Pass (14,931 ft)', location: 'Chandratal', description: 'Ride across Kunzum Pass and off-road tracks to camp at crescent Chandratal Lake.', places: ['Losar', 'Kunzum Pass (14,931 ft)', 'Chandratal (14,100 ft)'], activities: ['High Pass Ride', 'Moon Lake Camping'], meals: 'Breakfast & Dinner', overnight: 'Chandratal Camp' },
    { dayNumber: 9, title: 'Chandratal Lake to Manali via Atal Tunnel', location: 'Manali', description: 'Ride the rugged tracks of Batal and Chhatru, crossing through Atal Tunnel into Manali.', places: ['Batal', 'Chhatru', 'Atal Tunnel', 'Manali'], activities: ['Water Crossing Adventure', 'Celebration Dinner'], meals: 'Breakfast & Dinner', overnight: 'Manali Hotel' },
    { dayNumber: 10, title: 'Manali to Delhi Departure', location: 'Delhi', description: 'Hand over motorcycles in Manali and board return coach to Delhi.', places: ['Manali', 'Delhi'], activities: ['Tour Conclusion'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 26. kashmir-great-lakes-trek (8D/7N)
  'kashmir-great-lakes-trek': [
    { dayNumber: 1, title: 'Srinagar to Sonamarg / Shitkadi Basecamp', location: 'Sonamarg', description: 'Drive along Sindh River to Shitkadi basecamp (7,780 ft) near Sonamarg. Acclimatization walk.', places: ['Sindh Valley', 'Sonamarg', 'Shitkadi Basecamp'], activities: ['Basecamp Briefing', 'Acclimatization Walk'], meals: 'Dinner', overnight: 'Shitkadi Alpine Camp' },
    { dayNumber: 2, title: 'Trek Shitkadi to Nichnai via Table Top', location: 'Nichnai', description: 'Trek 9 km through silver birch forests and maple glades up to Nichnai (11,500 ft).', places: ['Table Top Meadow', 'Nichnai Pass Flow', 'Nichnai Camp (11,500 ft)'], activities: ['Meadow Trekking', 'Alpine Camping'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Nichnai Camp' },
    { dayNumber: 3, title: 'Trek Nichnai to Vishansar Lake via Nichnai Pass (13,100 ft)', location: 'Vishansar Lake', description: 'Cross Nichnai Pass and descend into the breathtaking floral valley of Vishansar Lake (12,000 ft).', places: ['Nichnai Pass (13,100 ft)', 'Vishansar Alpine Lake (12,000 ft)'], activities: ['Pass Crossing', 'Trout Lake Photography'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Vishansar Camp' },
    { dayNumber: 4, title: 'Trek Vishansar to Gadsar Lake via Gadsar Pass (13,750 ft)', location: 'Gadsar Lake', description: 'Witness twin Kishansar and Vishansar lakes. Cross the trek’s highest point at Gadsar Pass (13,750 ft) to the floating ice sheets of Gadsar Lake.', places: ['Kishansar Lake', 'Gadsar Pass (13,750 ft)', 'Gadsar (Lake of Flowers, 12,500 ft)'], activities: ['Highest Pass Summit', 'Glacial Lake Trekking'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Gadsar Camp' },
    { dayNumber: 5, title: 'Trek Gadsar to Satsar Seven Lakes', location: 'Satsar', description: 'Trek 12 km through rolling ridges to the cluster of seven interconnected alpine lakes at Satsar (12,000 ft).', places: ['Satsar Lakes (12,000 ft)', 'Army Checkpost Ridge'], activities: ['Ridge Walking', 'Lakeside Camping'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Satsar Camp' },
    { dayNumber: 6, title: 'Trek Satsar to Gangabal & Nundkol Lakes via Zaj Pass', location: 'Gangabal', description: 'Cross Zaj Pass (13,400 ft) to view the majestic Mount Harmukh (16,870 ft) towering over Gangabal and Nundkol lakes.', places: ['Zaj Pass (13,400 ft)', 'Nundkol Lake', 'Gangabal Lake (11,500 ft)', 'Mount Harmukh View'], activities: ['Harmukh Reflection View', 'Alpine Trout Fishing Spot'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Gangabal Camp' },
    { dayNumber: 7, title: 'Trek Gangabal down to Naranag & Drive to Srinagar', location: 'Srinagar', description: 'Descend 15 km through pine forests to the ancient 8th-century stone temple ruins of Naranag. Drive to Srinagar.', places: ['Naranag Ancient Temple Ruins (7,450 ft)', 'Srinagar Houseboat'], activities: ['Descent Trek', 'Heritage Temple Visit', 'Celebration Houseboat Stay'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Srinagar Houseboat' },
    { dayNumber: 8, title: 'Departure from Srinagar Airport', location: 'Srinagar', description: 'Transfer to Srinagar Airport with memories of the greatest alpine lake wilderness trek in India.', places: ['Srinagar Airport'], activities: ['Airport Transfer'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 27. kashmir-tarsar-marsar-trek (7D/6N)
  'kashmir-tarsar-marsar-trek': [
    { dayNumber: 1, title: 'Srinagar to Aru Valley Basecamp', location: 'Aru Valley', description: 'Drive along Lidder River past Pahalgam to the emerald meadow village of Aru (7,958 ft).', places: ['Lidder Valley', 'Pahalgam', 'Aru Village'], activities: ['Scenic Valley Drive', 'Camp Briefing'], meals: 'Dinner', overnight: 'Aru Basecamp' },
    { dayNumber: 2, title: 'Trek Aru Valley to Lidderwat Meadow', location: 'Lidderwat', description: 'Trek 10 km along the roaring Lidder River through pine and fir forests to Lidderwat (9,131 ft).', places: ['Lidder River Trail', 'Lidderwat Pine Meadow (9,131 ft)'], activities: ['River Valley Trek', 'Meadow Camping'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Lidderwat Camp' },
    { dayNumber: 3, title: 'Trek Lidderwat to Shekwas Alpine Meadow', location: 'Shekwas', description: 'Climb 6 km past Gujjar settlements into the expansive high-altitude grasslands of Shekwas (11,039 ft).', places: ['Hamwas Glade', 'Shekwas Meadow (11,039 ft)'], activities: ['Gentle Altitude Climbing', 'Pastoral Photography'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Shekwas Camp' },
    { dayNumber: 4, title: 'Trek Shekwas to Tarsar Almond-Shaped Lake', location: 'Tarsar Lake', description: 'Trek 5 km to the pristine turquoise waters of Tarsar Lake (12,449 ft), camping right beside the lake.', places: ['Tarsar Lake (12,449 ft)', 'Kolhai Glacier Ridge View'], activities: ['Lakeside Shore Camping', 'Golden Hour Reflections'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Tarsar Lakeside Camp' },
    { dayNumber: 5, title: 'Tarsar Pass Crossing to Sundersar & Marsar Lakes', location: 'Sundersar Lake', description: 'Cross Tarsar Pass (13,201 ft) to the jewel-like Sundersar Lake, with an afternoon hike to the clifftop overlooking mystical Marsar Lake.', places: ['Tarsar Pass (13,201 ft)', 'Sundersar Lake (12,946 ft)', 'Marsar Lake Viewpoint'], activities: ['Twin Lakes Exploration', 'Ridge Panorama'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Sundersar Camp' },
    { dayNumber: 6, title: 'Trek Sundersar down to Homwas / Lidderwat', location: 'Homwas', description: 'Descend along the Jagmargi river valley through wildflower meadows back to Homwas/Lidderwat.', places: ['Jagmargi Valley', 'Homwas Meadow (9,800 ft)'], activities: ['Descent Trek', 'Bonfire Reflection'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Homwas Camp' },
    { dayNumber: 7, title: 'Trek Homwas to Aru Valley & Drive to Srinagar', location: 'Srinagar', description: 'Trek down to Aru village and drive back along Lidder Valley to Srinagar for departure.', places: ['Aru Village', 'Srinagar'], activities: ['Trek Completion', 'Departure Transfer'], meals: 'Breakfast & Lunch', overnight: 'None' }
  ],

  // 28. kashmir-gurez-valley-border (6D/5N)
  'kashmir-gurez-valley-border': [
    { dayNumber: 1, title: 'Arrival in Srinagar & Dal Lake Houseboat', location: 'Srinagar', description: 'Arrive in Srinagar, check into heritage cedar houseboat, and evening shikara ride on Dal Lake.', places: ['Dal Lake', 'Shikara Cruise', 'Boulevard Road'], activities: ['Shikara Sunset', 'Kashmiri Wazwan Tasting'], meals: 'Dinner', overnight: 'Srinagar Houseboat' },
    { dayNumber: 2, title: 'Srinagar to Gurez Valley via Razdan Pass (11,672 ft)', location: 'Gurez Valley', description: 'Drive past Wular Lake and climb over Razdan Pass with views of Mount Harmukh into the remote border valley of Dawar (Gurez).', places: ['Wular Lake View', 'Razdan Pass (11,672 ft)', 'Dawar Town (8,000 ft)', 'Habba Khatoon Peak'], activities: ['High Mountain Pass Crossing', 'Kishanganga Riverside Walk'], meals: 'Breakfast & Dinner', overnight: 'Gurez Valley Hotel / Homestay' },
    { dayNumber: 3, title: 'Dawar Exploration & Habba Khatoon Spring', location: 'Dawar', description: 'Explore the wooden Shina tribal hamlets of Dawar, visit the iconic pyramid-shaped Habba Khatoon Peak and its legendary spring.', places: ['Habba Khatoon Peak', 'Habba Khatoon Fresh Spring', 'Dawar Wooden Heritage Market'], activities: ['Dard-Shina Cultural Tour', 'Mountain Photography'], meals: 'Breakfast & Dinner', overnight: 'Gurez Valley Hotel / Homestay' },
    { dayNumber: 4, title: 'Offbeat Circuit to Tulail Valley (Border Outpost)', location: 'Tulail Valley', description: 'Drive along the turquoise Kishanganga River through remote wooden log villages of Barnoi, Sheikhpora, and Angaikot up to Chakwali, the last Indian village.', places: ['Kishanganga River Corridor', 'Sheikhpora', 'Chakwali Last Village (Tulail)'], activities: ['Indo-Pak Borderline Exploration', 'Wooden Village Walk'], meals: 'Breakfast & Dinner', overnight: 'Gurez Valley Hotel / Homestay' },
    { dayNumber: 5, title: 'Gurez Valley to Srinagar via Manasbal Lake', location: 'Srinagar', description: 'Drive back across Razdan Pass to Srinagar. Visit the lotus-filled waters of Manasbal Lake en route.', places: ['Razdan Top', 'Manasbal Lake', 'Srinagar'], activities: ['Scenic Pass Crossing', 'Evening Craft Shopping'], meals: 'Breakfast & Dinner', overnight: 'Srinagar Boutique Hotel' },
    { dayNumber: 6, title: 'Departure from Srinagar Airport', location: 'Srinagar', description: 'Transfer to Srinagar Airport with memories of the offbeat borderland paradise of Gurez.', places: ['Srinagar Airport'], activities: ['Airport Transfer'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 29. meghalaya-kaziranga-wildlife-7d (7D/6N)
  'meghalaya-kaziranga-wildlife-7d': [
    { dayNumber: 1, title: 'Guwahati to Kaziranga National Park', location: 'Kaziranga', description: 'Pick up from Guwahati Airport and drive to the UNESCO World Heritage grasslands of Kaziranga.', places: ['Brahmaputra Valley', 'Kaziranga National Park'], activities: ['Scenic Drive', 'Orchid Park Cultural Dance'], meals: 'Dinner', overnight: 'Kaziranga Eco Resort' },
    { dayNumber: 2, title: 'Kaziranga Elephant & Jeep Safari (Rhino Tracking)', location: 'Kaziranga', description: 'Early morning elephant safari in the Central/Western Range to spot Great Indian One-Horned Rhinoceros, followed by an afternoon 4x4 open jeep safari.', places: ['Kaziranga Central Range (Kohora)', 'Western Range (Bagori)'], activities: ['One-Horned Rhino Safari', 'Wild Water Buffalo & Elephant Spotting'], meals: 'Breakfast & Dinner', overnight: 'Kaziranga Eco Resort' },
    { dayNumber: 3, title: 'Kaziranga to Shillong via Umiam Lake', location: 'Shillong', description: 'Drive up the Khasi Hills to Shillong. Stop at scenic Umiam Lake and explore Police Bazar.', places: ['Umiam Lake', 'Shillong Pine Hills', 'Police Bazar'], activities: ['Lakeside Stroll', 'Cafe Exploration'], meals: 'Breakfast & Dinner', overnight: 'Shillong Hotel' },
    { dayNumber: 4, title: 'Shillong to Cherrapunji Waterfalls & Caves', location: 'Cherrapunji', description: 'Visit Nohkalikai Falls, Mawsmai Cave, and Seven Sisters Falls in misty Cherrapunji.', places: ['Nohkalikai Falls', 'Mawsmai Limestone Cave', 'Seven Sisters Falls'], activities: ['Waterfall Chasing', 'Caving Tour'], meals: 'Breakfast & Dinner', overnight: 'Cherrapunji Resort' },
    { dayNumber: 5, title: 'Double Decker Living Root Bridge Trek', location: 'Nongriat', description: 'Rainforest hike down to the bio-engineered UNESCO Double Decker Root Bridge and Rainbow Falls.', places: ['Tyrna', 'Nongriat Living Root Bridge', 'Rainbow Falls'], activities: ['Living Root Bridge Trek', 'Natural Pool Dip'], meals: 'Breakfast & Dinner', overnight: 'Cherrapunji Resort' },
    { dayNumber: 6, title: 'Dawki Crystal River & Mawlynnong Clean Village', location: 'Dawki', description: 'Boat on the transparent glass waters of Umngot River at Dawki and explore clean Mawlynnong village.', places: ['Umngot River (Dawki)', 'Mawlynnong Clean Village', 'Riwai Root Bridge', 'Shillong'], activities: ['Crystal Boating', 'Clean Village Heritage Stroll'], meals: 'Breakfast & Dinner', overnight: 'Shillong Hotel' },
    { dayNumber: 7, title: 'Laitlum Canyons & Guwahati Departure', location: 'Guwahati', description: 'Visit the dramatic sheer cliff gorges of Laitlum Canyons before airport drop at Guwahati.', places: ['Laitlum Canyons', 'Guwahati Airport'], activities: ['Canyon View', 'Airport Transfer'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 30. nagaland-dzukou-valley-trek (5D/4N)
  'nagaland-dzukou-valley-trek': [
    { dayNumber: 1, title: 'Dimapur to Kohima Heritage Town', location: 'Kohima', description: 'Arrive at Dimapur Airport/Station and drive up to Kohima (4,737 ft). Visit Kohima WWII War Cemetery.', places: ['Dimapur', 'Kohima Town', 'WWII War Cemetery'], activities: ['Scenic Hill Drive', 'War Memorial Tour'], meals: 'Dinner', overnight: 'Kohima Homestay / Hotel' },
    { dayNumber: 2, title: 'Kohima to Viswema & Trek to Dzukou Valley Crest', location: 'Dzukou Valley', description: 'Drive to Viswema village and begin the 5-6 hr trek through dense mossy bamboo forests to the sweeping emerald rim of Dzukou Valley (8,000 ft).', places: ['Viswema Trailhead', 'Mossy Forest Steps', 'Dzukou Valley Crest (8,000 ft)'], activities: ['Bamboo Rainforest Trek', 'Valley Sunset Panorama'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Dzukou Alpine Dorm / Camp' },
    { dayNumber: 3, title: 'Dzukou Valley Floral Meadows & Natural Caves', location: 'Dzukou Valley', description: 'Full day exploring the rolling bamboo hillocks, serpentine crystal streams, and rare Dzukou Lily meadows of the valley floor.', places: ['Dzukou Meandering Stream', 'Ghost Cave', 'Floral Meadows'], activities: ['Valley Floor Exploration', 'Stream Side Photography', 'Bonfire Evening'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Dzukou Alpine Dorm / Camp' },
    { dayNumber: 4, title: 'Trek Dzukou to Jakhama & Khonoma Green Village', location: 'Khonoma', description: 'Descend via the scenic Jakhama stone steps trail. Transfer to Khonoma, India’s first green eco-village, for Angami tribal hospitality.', places: ['Jakhama Trail', 'Khonoma Eco-Village', 'Angami Fort Ruins'], activities: ['Descent Trek', 'Angami Naga Cultural Tour', 'Indigenous Organic Dinner'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Khonoma Heritage Homestay' },
    { dayNumber: 5, title: 'Khonoma to Dimapur Departure', location: 'Dimapur', description: 'Explore Khonoma morning terraced fields and transfer to Dimapur Airport for your departure.', places: ['Khonoma Terraces', 'Dimapur Airport'], activities: ['Terrace Field Walk', 'Airport Transfer'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 31. tawang-motorbike-expedition-11d (11D/10N)
  'tawang-motorbike-expedition-11d': [
    { dayNumber: 1, title: 'Arrival in Guwahati & Bike Handover', location: 'Guwahati', description: 'Arrive in Guwahati, motorcycle allocation, ride briefing, and sunset along the Brahmaputra.', places: ['Guwahati', 'Brahmaputra Riverfront'], activities: ['Briefing', 'Test Ride'], meals: 'Dinner', overnight: 'Guwahati Hotel' },
    { dayNumber: 2, title: 'Guwahati to Nameri National Park', location: 'Nameri', description: 'Ride through Assam tea estates to the foothills of Nameri on the Jia Bhoroli River.', places: ['Tezpur', 'Jia Bhoroli River', 'Nameri Eco Camp'], activities: ['Riverbank Ride', 'Forest Camping'], meals: 'Breakfast & Dinner', overnight: 'Nameri Eco Camp' },
    { dayNumber: 3, title: 'Nameri to Dirang Valley via Bhalukpong Gate', location: 'Dirang', description: 'Enter Arunachal Pradesh at Bhalukpong and climb through Kameng river gorge to Dirang.', places: ['Bhalukpong Gate', 'Tenga Valley', 'Dirang Gompa'], activities: ['Mountain Gorge Ride'], meals: 'Breakfast & Dinner', overnight: 'Dirang Hotel' },
    { dayNumber: 4, title: 'Dirang to Tawang via Sela Pass (13,700 ft)', location: 'Tawang', description: 'Scale the iconic Sela Pass and frozen Sela Lake. Visit Jaswant Garh and Nuranang Falls to Tawang.', places: ['Sela Pass (13,700 ft)', 'Sela Lake', 'Jaswant Garh', 'Nuranang Falls'], activities: ['High Mountain Pass Crossing'], meals: 'Breakfast & Dinner', overnight: 'Tawang Hotel' },
    { dayNumber: 5, title: 'Tawang Monastery & Local Monpa Culture', location: 'Tawang', description: 'Visit 400-year-old Tawang Monastery, Urgelling Gompa, and Tawang War Memorial.', places: ['Tawang Monastery', 'Urgelling', 'War Memorial'], activities: ['Monastery Art Tour', 'Sound & Light Show'], meals: 'Breakfast & Dinner', overnight: 'Tawang Hotel' },
    { dayNumber: 6, title: 'Excursion to Bum La Pass (15,200 ft) & Madhuri Lake', location: 'Bum La Pass', description: 'High-altitude border ride to Bum La Pass on the Indo-China border and scenic Sangetsar (Madhuri) Lake.', places: ['Bum La Pass (15,200 ft)', 'Madhuri Lake (Sangetsar)', 'PTSO Lake'], activities: ['Borderline Ride', 'High Glacial Lake View'], meals: 'Breakfast & Dinner', overnight: 'Tawang Hotel' },
    { dayNumber: 7, title: 'Tawang to Sangti Valley via Bomdila', location: 'Sangti Valley', description: 'Ride down into the pristine Sangti Valley, known for black-necked cranes and pine forests.', places: ['Bomdila Pass', 'Sangti Valley Riverbed'], activities: ['Valley Camping', 'Black-Necked Crane Habitat'], meals: 'Breakfast & Dinner', overnight: 'Sangti Valley Camp' },
    { dayNumber: 8, title: 'Sangti Valley to Kaziranga National Park', location: 'Kaziranga', description: 'Ride down from the eastern Himalayas into the lush plains of Kaziranga.', places: ['Bhairabkunda', 'Brahmaputra Plains', 'Kaziranga'], activities: ['Scenic Foothills Ride'], meals: 'Breakfast & Dinner', overnight: 'Kaziranga Resort' },
    { dayNumber: 9, title: 'Kaziranga Wildlife Jeep Safari', location: 'Kaziranga', description: 'Morning 4x4 open safari tracking Great Indian One-Horned Rhinoceros, elephants, and tigers.', places: ['Kaziranga Western / Central Range'], activities: ['Rhino Wildlife Safari'], meals: 'Breakfast & Dinner', overnight: 'Kaziranga Resort' },
    { dayNumber: 10, title: 'Kaziranga to Guwahati', location: 'Guwahati', description: 'Ride back along the national highway to Guwahati, hand over motorcycles, farewell dinner.', places: ['Jorabat', 'Guwahati'], activities: ['Final Ride Leg', 'Celebration Dinner'], meals: 'Breakfast & Dinner', overnight: 'Guwahati Hotel' },
    { dayNumber: 11, title: 'Departure from Guwahati Airport', location: 'Guwahati', description: 'Transfer to Guwahati Airport for onward flight.', places: ['Guwahati Airport'], activities: ['Airport Transfer'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 32. sikkim-north-gurudongmar-6d (6D/5N)
  'sikkim-north-gurudongmar-6d': [
    { dayNumber: 1, title: 'Arrival in Gangtok & MG Marg', location: 'Gangtok', description: 'Pick up from Bagdogra/NJP and drive along Teesta River to Gangtok. Evening promenade walk.', places: ['Teesta Valley', 'MG Marg Gangtok'], activities: ['Foothills Drive', 'Evening Stroll'], meals: 'Dinner', overnight: 'Gangtok Hotel' },
    { dayNumber: 2, title: 'Gangtok to Lachen via Seven Sisters Waterfall', location: 'Lachen', description: 'Drive into North Sikkim via Naga Falls, Seven Sisters Falls, and Chungthang confluence to Lachen (8,830 ft).', places: ['Seven Sisters Waterfall', 'Chungthang Confluence', 'Lachen (8,830 ft)'], activities: ['North Sikkim Canyon Drive'], meals: 'Breakfast & Dinner', overnight: 'Lachen Hotel / Homestay' },
    { dayNumber: 3, title: 'Excursion to Sacred Gurudongmar Lake (17,800 ft) & Lachung', location: 'Gurudongmar & Lachung', description: 'Early morning drive to the sacred high-altitude Gurudongmar Lake (17,800 ft) with breathtaking vistas of Mount Siniolchu. Transfer to Lachung (8,610 ft).', places: ['Thangu Valley', 'Chopta Valley', 'Gurudongmar Lake (17,800 ft)', 'Lachung'], activities: ['High Altitude Sacred Lake Visit', 'Cold Desert Photography'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Lachung Hotel / Homestay' },
    { dayNumber: 4, title: 'Yumthang Valley of Flowers & Zero Point Excursion', location: 'Yumthang Valley', description: 'Visit the rhododendron meadows of Yumthang Valley (11,800 ft), natural hot springs, and Yumesamdong (Zero Point, 15,300 ft). Transfer to Gangtok.', places: ['Yumthang Valley', 'Yumesamdong Zero Point', 'Lachung Monastery', 'Gangtok'], activities: ['Rhododendron Sanctuary Walk', 'Snow at Zero Point', 'Scenic Return Drive'], meals: 'Breakfast & Dinner', overnight: 'Gangtok Hotel' },
    { dayNumber: 5, title: 'Tsomgo Lake & Baba Mandir Border Excursion', location: 'Tsomgo Lake', description: 'Day excursion to oval-shaped Tsomgo Glacial Lake (12,400 ft) and Baba Harbhajan Mandir.', places: ['Tsomgo Lake', 'Baba Mandir'], activities: ['Glacial Lake Sightseeing'], meals: 'Breakfast & Dinner', overnight: 'Gangtok Hotel' },
    { dayNumber: 6, title: 'Gangtok to Bagdogra / NJP Departure', location: 'Bagdogra', description: 'Transfer to Bagdogra Airport / NJP Station for return journey.', places: ['Bagdogra Airport'], activities: ['Airport Transfer'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 33. uttarakhand-kedarkantha-snow-trek (6D/5N)
  'uttarakhand-kedarkantha-snow-trek': [
    { dayNumber: 1, title: 'Dehradun to Sankri Village Basecamp', location: 'Sankri', description: 'Drive 200 km from Dehradun through Mussoorie and along Tons River to Sankri basecamp (6,400 ft).', places: ['Mussoorie', 'Yamuna & Tons River Valleys', 'Sankri Basecamp (6,400 ft)'], activities: ['Scenic Mountain Drive', 'Trek Briefing'], meals: 'Dinner', overnight: 'Sankri Guesthouse / Camp' },
    { dayNumber: 2, title: 'Trek Sankri to Juda Ka Talab Frozen Lake', location: 'Juda Ka Talab', description: 'Trek 4 km through oak and pine forests to the enchanting frozen alpine lake of Juda Ka Talab (9,100 ft).', places: ['Dense Pine Woods', 'Juda Ka Talab (9,100 ft)'], activities: ['Snow Trail Trekking', 'Frozen Lake Camping'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Juda Ka Talab Camp' },
    { dayNumber: 3, title: 'Trek Juda Ka Talab to Kedarkantha Basecamp', location: 'Kedarkantha Base', description: 'Climb 4 km through clearing pine glades to the expansive Kedarkantha Basecamp (11,250 ft) beneath the summit cone.', places: ['Meadow Clearings', 'Kedarkantha Basecamp (11,250 ft)', 'Bandarpunch Peak Panorama'], activities: ['Ridge Walking', 'Sunset Snow Panorama'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Kedarkantha Base Camp' },
    { dayNumber: 4, title: 'Summit Push: Kedarkantha Summit (12,500 ft) to Hargaon', location: 'Kedarkantha Summit', description: 'Early 3:30 AM summit push across snow slopes. Watch sunrise from Kedarkantha Summit (12,500 ft) with 360° views of Swargarohini, Black Peak, and Bandarpunch. Descend to Hargaon (8,900 ft).', places: ['Kedarkantha Summit (12,500 ft)', 'Shiva Shrine on Summit', 'Hargaon Campsite (8,900 ft)'], activities: ['Sunrise Summit Climb', 'Snow Slide Fun', 'Descent Trek'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Hargaon Camp' },
    { dayNumber: 5, title: 'Trek Hargaon down to Sankri Village', location: 'Sankri', description: 'Trek 6 km down through scenic apple orchards and pine woods back to Sankri basecamp. Celebration dinner.', places: ['Sankri Village', 'Local Garhwali Wooden Houses'], activities: ['Descent Trek', 'Local Village Interaction', 'Celebration Dinner'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Sankri Guesthouse' },
    { dayNumber: 6, title: 'Sankri to Dehradun Departure', location: 'Dehradun', description: 'Drive back along the Tons river to Dehradun Railway Station / Airport for your journey home.', places: ['Dehradun Drop Point'], activities: ['Scenic Drive', 'Departure'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 34. uttarakhand-brahmatal-winter-trek (6D/5N)
  'uttarakhand-brahmatal-winter-trek': [
    { dayNumber: 1, title: 'Kathgodam to Lohajung Basecamp', location: 'Lohajung', description: 'Drive from Kathgodam/Rishikesh along Pindar River to Lohajung basecamp (7,600 ft).', places: ['Almora', 'Gwaldam', 'Lohajung Basecamp (7,600 ft)'], activities: ['Scenic Kumaon-Garhwal Drive', 'Trek Orientation'], meals: 'Dinner', overnight: 'Lohajung Guesthouse' },
    { dayNumber: 2, title: 'Trek Lohajung to Bekaltal Lake in Oak Forests', location: 'Bekaltal', description: 'Trek 6 km through dense rhododendron and oak canopies to frozen Bekaltal Lake (9,885 ft).', places: ['Mandoli Village', 'Bekaltal Frozen Lake (9,885 ft)'], activities: ['Forest Snow Trek', 'Lakeside Camping'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Bekaltal Camp' },
    { dayNumber: 3, title: 'Trek Bekaltal to Brahmatal Campsite', location: 'Brahmatal', description: 'Climb 7 km across the tree line onto alpine snowfields with views of Mount Trishul and Nanda Ghunti to Brahmatal (10,440 ft).', places: ['Jhandi Top Ridge', 'Brahmatal Campsite (10,440 ft)'], activities: ['Ridge Snow Trekking', 'Sunset on Trishul Peak'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Brahmatal Camp' },
    { dayNumber: 4, title: 'Brahmatal Summit (12,250 ft) Push & Brahmatal Lake', location: 'Brahmatal Summit', description: 'Visit sacred frozen Brahmatal Lake where Lord Brahma is said to have meditated. Climb to Brahmatal Pass Summit (12,250 ft) for a jaw-dropping view of Mount Trishul rising directly in front.', places: ['Sacred Brahmatal Lake', 'Brahmatal Pass Summit (12,250 ft)', 'Mount Trishul & Nanda Ghunti Views'], activities: ['Summit Panorama', 'Frozen Lake Walk'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Brahmatal Camp' },
    { dayNumber: 5, title: 'Trek Brahmatal down to Lohajung', location: 'Lohajung', description: 'Descend through Chhaplot and Wan trail back to Lohajung. Celebration Garhwali dinner.', places: ['Wan Forest Trail', 'Lohajung (7,600 ft)'], activities: ['Descent Trek', 'Celebration Dinner'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Lohajung Guesthouse' },
    { dayNumber: 6, title: 'Lohajung to Kathgodam Departure', location: 'Kathgodam', description: 'Drive down from Lohajung to Kathgodam Railway Station for your return train/flight.', places: ['Kathgodam Station'], activities: ['Scenic Return Drive'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 35. uttarakhand-har-ki-dun-trek (7D/6N)
  'uttarakhand-har-ki-dun-trek': [
    { dayNumber: 1, title: 'Dehradun to Sankri Basecamp', location: 'Sankri', description: 'Drive along the Yamuna and Tons rivers to Sankri village (6,400 ft) inside Govind National Park.', places: ['Nainbagh', 'Mori', 'Sankri (6,400 ft)'], activities: ['Himalayan Drive', 'Orientation'], meals: 'Dinner', overnight: 'Sankri Guesthouse' },
    { dayNumber: 2, title: 'Sankri to Taluka & Trek to Pauni Garaat', location: 'Pauni Garaat', description: 'Drive 12 km to Taluka. Trek 10 km along the roaring Supin river through walnut and chestnut groves.', places: ['Taluka', 'Gangaad Village', 'Pauni Garaat (8,200 ft)'], activities: ['Riverside Trekking', 'Forest Camping'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Pauni Garaat Camp' },
    { dayNumber: 3, title: 'Trek Pauni Garaat to Kalkattiyadhar via Osla Village', location: 'Kalkattiyadhar', description: 'Trek past the ancient 2,000-year-old carved wooden village of Osla up to the alpine ridge of Kalkattiyadhar (9,800 ft).', places: ['Osla Ancient Wooden Village', 'Someshwar Temple', 'Kalkattiyadhar Ridge (9,800 ft)'], activities: ['Ancient Himalayan Village Tour', 'Meadow Trek'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Kalkattiyadhar Camp' },
    { dayNumber: 4, title: 'Kalkattiyadhar to Har Ki Dun Valley & Maninda Tal', location: 'Har Ki Dun Valley', description: 'Trek into the legendary "Valley of Gods" Har Ki Dun (11,700 ft) nestled under the massive face of Swargarohini (Stairway to Heaven). Hike to Maninda Tal.', places: ['Har Ki Dun Valley (11,700 ft)', 'Swargarohini Peak View', 'Maninda Glacial Lake'], activities: ['Cradle of Shiva Exploration', 'Glacial Basin Photography'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Har Ki Dun Camp' },
    { dayNumber: 5, title: 'Trek Har Ki Dun back to Pauni Garaat', location: 'Pauni Garaat', description: 'Descend along the Supin valley, taking in views of the alpine river gorges and Osla village.', places: ['Supin Riverbed', 'Pauni Garaat'], activities: ['Descent Trekking', 'Campfire Evening'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Pauni Garaat Camp' },
    { dayNumber: 6, title: 'Trek Pauni Garaat to Taluka & Drive to Sankri', location: 'Sankri', description: 'Final 10 km trek back to Taluka, transfer by vehicle to Sankri basecamp.', places: ['Taluka', 'Sankri Basecamp'], activities: ['Trek Completion', 'Celebration Dinner'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Sankri Guesthouse' },
    { dayNumber: 7, title: 'Sankri to Dehradun Departure', location: 'Dehradun', description: 'Drive back to Dehradun Railway Station / Airport for your onward journey.', places: ['Dehradun Drop Point'], activities: ['Return Drive', 'Departure'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 36. uttarakhand-chardham-yatra-delhi-12d (12D/11N)
  'uttarakhand-chardham-yatra-delhi-12d': [
    { dayNumber: 1, title: 'Delhi to Haridwar / Rishikesh & Ganga Aarti', location: 'Haridwar', description: 'Pick up from Delhi and drive to Haridwar. Attend the world-famous evening Ganga Aarti at Har Ki Pauri.', places: ['Har Ki Pauri', 'Haridwar'], activities: ['Ganga Aarti Darshan'], meals: 'Dinner', overnight: 'Haridwar Hotel' },
    { dayNumber: 2, title: 'Haridwar to Barkot via Mussoorie & Kempty Falls', location: 'Barkot', description: 'Drive into Garhwal hills via Mussoorie and Kempty Falls to Barkot (base for Yamunotri).', places: ['Mussoorie', 'Kempty Falls', 'Barkot (5,900 ft)'], activities: ['Hill Station Drive', 'Yamunotri Preparation'], meals: 'Breakfast & Dinner', overnight: 'Barkot Hotel / Camp' },
    { dayNumber: 3, title: 'Barkot to Yamunotri Temple Trek & Return to Barkot', location: 'Yamunotri', description: 'Drive to Janki Chatti and trek 6 km to sacred Yamunotri Temple, Surya Kund hot spring, and Divya Shila.', places: ['Janki Chatti', 'Yamunotri Temple (10,800 ft)', 'Surya Kund Thermal Spring'], activities: ['First Dham Holy Darshan', 'Thermal Spring Cooked Rice Offering'], meals: 'Breakfast & Dinner', overnight: 'Barkot Hotel / Camp' },
    { dayNumber: 4, title: 'Barkot to Uttarkashi & Kashi Vishwanath Temple', location: 'Uttarkashi', description: 'Drive along Bhagirathi River to Uttarkashi. Visit ancient Kashi Vishwanath Temple and Shakti Temple.', places: ['Bhagirathi River', 'Kashi Vishwanath Temple Uttarkashi'], activities: ['Ancient Shiva Temple Darshan'], meals: 'Breakfast & Dinner', overnight: 'Uttarkashi Hotel' },
    { dayNumber: 5, title: 'Uttarkashi to Gangotri Temple Excursion & Return', location: 'Gangotri', description: 'Drive through Harsil Valley to the sacred Gangotri Temple (10,200 ft). Holy dip in Bhagirathi river.', places: ['Harsil Pine Valley', 'Gangotri Temple (10,200 ft)', 'Bhagirath Shila'], activities: ['Second Dham Holy Darshan', 'Holy Ganga Water Collection'], meals: 'Breakfast & Dinner', overnight: 'Uttarkashi Hotel' },
    { dayNumber: 6, title: 'Uttarkashi to Guptkashi / Sitapur', location: 'Guptkashi', description: 'Drive across the mountain ridges connecting Bhagirathi and Mandakini valleys to Guptkashi.', places: ['Tehri Dam View', 'Guptkashi (4,300 ft)', 'Sitapur'], activities: ['Scenic Mountain Valley Drive'], meals: 'Breakfast & Dinner', overnight: 'Guptkashi / Sitapur Hotel' },
    { dayNumber: 7, title: 'Sitapur to Gaurikund & Trek to Kedarnath Temple', location: 'Kedarnath', description: 'Trek 16 km along Mandakini river from Gaurikund to Kedarnath Sanctum (11,755 ft). Evening Aarti.', places: ['Gaurikund', 'Kedarnath Temple (11,755 ft)'], activities: ['Third Dham Sacred Trek', 'Evening Temple Aarti'], meals: 'Breakfast & Dinner', overnight: 'Kedarnath Ashram / Stay' },
    { dayNumber: 8, title: 'Kedarnath Morning Darshan & Descend to Guptkashi', location: 'Guptkashi', description: 'Early morning Abhishek and Darshan at Kedarnath Sanctum. Trek down to Gaurikund and rest in Sitapur.', places: ['Kedarnath Sanctum', 'Gaurikund', 'Sitapur'], activities: ['Holy Darshan', 'Descent Trek'], meals: 'Breakfast & Dinner', overnight: 'Guptkashi / Sitapur Hotel' },
    { dayNumber: 9, title: 'Guptkashi to Badrinath via Joshimath & Chopta', location: 'Badrinath', description: 'Drive through Chopta and Joshimath to the sacred temple town of Badrinath (10,279 ft). Evening Aarti.', places: ['Joshimath', 'Badrinath Temple (10,279 ft)', 'Tapt Kund'], activities: ['Fourth Dham Holy Darshan', 'Thermal Kund Dip'], meals: 'Breakfast & Dinner', overnight: 'Badrinath Hotel' },
    { dayNumber: 10, title: 'Badrinath Darshan, Mana (Last Village) & Rudraprayag', location: 'Rudraprayag', description: 'Morning Badrinath Darshan, visit Mana Village, Vyas Gufa, and Bhim Pul. Drive down to Rudraprayag.', places: ['Mana Last Indian Village', 'Vyas Gufa', 'Bhim Pul', 'Rudraprayag Sangam'], activities: ['Border Village Tour', 'Confluence View'], meals: 'Breakfast & Dinner', overnight: 'Rudraprayag Hotel' },
    { dayNumber: 11, title: 'Rudraprayag to Rishikesh via Devprayag Sangam', location: 'Rishikesh', description: 'Drive along Alaknanda to Devprayag (origin of River Ganga). Arrive in Rishikesh for Triveni Ghat Aarti.', places: ['Devprayag Sangam', 'Rishikesh', 'Triveni Ghat'], activities: ['Origin of Ganga Sightseeing', 'Ganga Aarti'], meals: 'Breakfast & Dinner', overnight: 'Rishikesh Hotel' },
    { dayNumber: 12, title: 'Rishikesh to Haridwar & Delhi Return', location: 'Delhi', description: 'Drive back from Rishikesh to Delhi with blessings and completion of the Sacred Chardham Yatra.', places: ['Haridwar', 'Delhi Drop Point'], activities: ['Return Drive', 'Yatra Completion'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 37. uttarakhand-do-dham-kedarnath-badrinath (5D/4N)
  'uttarakhand-do-dham-kedarnath-badrinath': [
    { dayNumber: 1, title: 'Haridwar to Guptkashi / Sitapur via Devprayag', location: 'Guptkashi', description: 'Drive along the Ganga and Alaknanda via Devprayag to Guptkashi.', places: ['Devprayag', 'Rudraprayag', 'Guptkashi'], activities: ['Confluence Sightseeing'], meals: 'Dinner', overnight: 'Guptkashi Hotel' },
    { dayNumber: 2, title: 'Sitapur to Gaurikund & Trek to Kedarnath Temple', location: 'Kedarnath', description: '16 km trek along Mandakini to Kedarnath Temple (11,755 ft). Evening divine Aarti.', places: ['Gaurikund', 'Kedarnath Temple'], activities: ['Kedarnath Darshan', 'Evening Aarti'], meals: 'Breakfast & Dinner', overnight: 'Kedarnath Stay' },
    { dayNumber: 3, title: 'Kedarnath Darshan, Trek down & Drive to Pipalkoti / Joshimath', location: 'Joshimath', description: 'Morning Darshan at Kedarnath, trek down to Gaurikund, and drive towards Badrinath via Joshimath.', places: ['Gaurikund', 'Chopta Route', 'Joshimath / Pipalkoti'], activities: ['Descent Trek', 'Mountain Drive'], meals: 'Breakfast & Dinner', overnight: 'Joshimath / Pipalkoti Hotel' },
    { dayNumber: 4, title: 'Joshimath to Badrinath Temple Darshan & Mana Village', location: 'Badrinath', description: 'Darshan at Badrinath Temple (10,279 ft), visit Tapt Kund, Mana Village, and Vyas Gufa. Drive to Rudraprayag.', places: ['Badrinath Temple', 'Tapt Kund', 'Mana Village', 'Rudraprayag'], activities: ['Badrinath Holy Darshan', 'Mana Village Walk'], meals: 'Breakfast & Dinner', overnight: 'Rudraprayag Hotel' },
    { dayNumber: 5, title: 'Rudraprayag to Rishikesh & Haridwar Departure', location: 'Haridwar', description: 'Drive down through Rishikesh to Haridwar Railway Station for onward journey.', places: ['Rishikesh', 'Haridwar'], activities: ['Return Transfer'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 38. uttarakhand-corbett-wildlife-weekend (3D/2N)
  'uttarakhand-corbett-wildlife-weekend': [
    { dayNumber: 1, title: 'Delhi to Jim Corbett National Park', location: 'Jim Corbett', description: 'Drive 250 km from Delhi to Ramnagar. Check in to jungle riverside resort, visit Garjiya Devi Temple and Corbett Museum.', places: ['Ramnagar', 'Kosi River', 'Garjiya Devi Temple', 'Corbett Falls'], activities: ['Riverside Jungle Check-in', 'Temple & Waterfall Visit'], meals: 'Lunch & Dinner', overnight: 'Corbett Wilderness Resort' },
    { dayNumber: 2, title: 'Open 4x4 Jeep Tiger Safari in Corbett Wilderness', location: 'Jim Corbett', description: 'Early morning open 4x4 jeep safari in Bijrani / Jhirna / Dhela zone to track Bengal Tigers, wild Asiatic Elephants, and spotted deer. Evening nature walk.', places: ['Bijrani / Jhirna Wildlife Zone', 'Sal Forest Grasslands', 'Kosi Riverbank'], activities: ['Tiger Safari', 'Birdwatching', 'Evening Bonfire & Wildlife Movie'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Corbett Wilderness Resort' },
    { dayNumber: 3, title: 'Morning Forest Walk & Delhi Return', location: 'Delhi', description: 'Morning guided birding walk along the Kosi river. Check out and drive back to Delhi.', places: ['Kosi River', 'Delhi Drop Point'], activities: ['Birdwatching Walk', 'Return Drive'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 39. himachal-hampta-pass-trek (5D/4N)
  'himachal-hampta-pass-trek': [
    { dayNumber: 1, title: 'Manali to Jobra Drive & Trek to Chika Basecamp', location: 'Chika', description: 'Drive through Prini and 42 hairpin bends to Jobra. Trek 3 km through maple and pine woods to Chika (10,100 ft).', places: ['Jobra', 'Rani Nallah Stream', 'Chika Campsite (10,100 ft)'], activities: ['Forest Snow Trek', 'Riverbank Camping'], meals: 'Dinner', overnight: 'Chika Camp' },
    { dayNumber: 2, title: 'Trek Chika to Balu Ka Ghera (Sand Field)', location: 'Balu Ka Ghera', description: 'Trek 5 km along the roaring river bed through wildflower slopes and river boulder crossings to Balu Ka Ghera (11,900 ft).', places: ['Jwara Meadow', 'Water Crossing', 'Balu Ka Ghera (11,900 ft)'], activities: ['River Bouldering', 'Glacial Valley Camping'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Balu Ka Ghera Camp' },
    { dayNumber: 3, title: 'Hampta Pass Summit (14,065 ft) Crossover to Shea Goru', location: 'Hampta Pass & Shea Goru', description: 'Ascend snow slopes to Hampta Pass Summit (14,065 ft) for dramatic contrast between green Kullu and arid Spiti. Steep descent to Shea Goru (12,900 ft).', places: ['Hampta Pass (14,065 ft)', 'Mount Indrasan View', 'Shea Goru Campsite (12,900 ft)'], activities: ['High Alpine Pass Crossover', 'Snow Climbing'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Shea Goru Camp' },
    { dayNumber: 4, title: 'Trek Shea Goru to Chatru & Drive to Chandratal Lake', location: 'Chatru & Chandratal', description: 'Cross the icy Shea Goru stream and trek 5 km down to Chatru. Drive along Spiti River to camp at the moon-shaped Chandratal Lake (14,100 ft).', places: ['Chatru Roadhead', 'Kunzum Pass Corridor', 'Chandratal Lake (14,100 ft)'], activities: ['Glacial Stream Crossing', 'Chandratal Moon Lake Stroll'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Chandratal Luxury Camp' },
    { dayNumber: 5, title: 'Chandratal Lake / Chatru to Manali via Atal Tunnel', location: 'Manali', description: 'Morning reflection views on the lake. Drive back across the rugged Chandra Valley and Atal Tunnel to Manali.', places: ['Chhatru', 'Gramphu', 'Atal Tunnel', 'Manali'], activities: ['Trans-Himalayan Return Drive', 'Trek Completion'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 40. himachal-sar-pass-trek (6D/5N)
  'himachal-sar-pass-trek': [
    { dayNumber: 1, title: 'Delhi to Kasol / Grahan Basecamp', location: 'Kasol', description: 'Overnight drive from Delhi to Kasol. Trek briefing and overnight stay.', places: ['Kasol (5,180 ft)', 'Parvati River'], activities: ['Briefing', 'Riverside Walk'], meals: 'Dinner', overnight: 'Kasol Camp' },
    { dayNumber: 2, title: 'Trek Kasol to Grahan Traditional Village', location: 'Grahan', description: 'Trek 9 km through dense pine forests and along Grahan Nallah to the isolated wooden village of Grahan (7,700 ft).', places: ['Grahan Nallah Trail', 'Grahan Wooden Village (7,700 ft)'], activities: ['Pine Forest Trek', 'Himachali Village Culture'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Grahan Camp / Homestay' },
    { dayNumber: 3, title: 'Trek Grahan to Min Thach Alpine Meadow', location: 'Min Thach', description: 'Trek 7 km climbing above the tree line into the open alpine pasture of Min Thach (10,700 ft).', places: ['Rhododendron Forest', 'Min Thach Meadow (10,700 ft)'], activities: ['Alpine Ridge Trek', 'Sunset Mountain View'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Min Thach Camp' },
    { dayNumber: 4, title: 'Trek Min Thach to Nagaru Snow Camp', location: 'Nagaru', description: 'Trek 6 km along a steep snowy ridge to Nagaru (12,500 ft). Breathtaking sunset over the Parvati Valley ranges.', places: ['Snow Ridge Trail', 'Nagaru High Camp (12,500 ft)'], activities: ['Snow Climbing', 'High Ridge Camping'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Nagaru Snow Camp' },
    { dayNumber: 5, title: 'Summit Push: Sar Pass (13,800 ft), Snow Slides & Biskeri Thach', location: 'Sar Pass & Biskeri', description: 'Early morning climb across frozen lake (Sar). Cross Sar Pass (13,800 ft) and enjoy famous 1 km snow slide down into the green meadows of Biskeri Thach (11,000 ft).', places: ['Sar Pass Summit (13,800 ft)', 'Snow Slide Slopes', 'Biskeri Thach (11,000 ft)'], activities: ['Pass Summit Push', 'Thrilling Snow Slides', 'Meadow Camping'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Biskeri Thach Camp' },
    { dayNumber: 6, title: 'Trek Biskeri Thach to Barshaini & Return to Delhi', location: 'Barshaini to Delhi', description: 'Trek 10 km down through Pulga, Tulga, and Tosh bridge to Barshaini. Board evening return coach to Delhi.', places: ['Pulga Pine Village', 'Tosh Bridge', 'Barshaini', 'Delhi'], activities: ['Descent Trek', 'Evening Departure'], meals: 'Breakfast & Lunch', overnight: 'None' }
  ],

  // 41. himachal-beas-kund-trek (3D/2N)
  'himachal-beas-kund-trek': [
    { dayNumber: 1, title: 'Manali to Solang Nallah & Trek to Bakarthach', location: 'Bakarthach', description: 'Drive from Manali to Dhundi via Solang. Trek 5 km along Beas river through birch forests to Bakarthach (10,800 ft).', places: ['Solang Valley', 'Dhundi', 'Bakarthach Alpine Meadow (10,800 ft)'], activities: ['Valley Snow Trek', 'Alpine Meadow Camping'], meals: 'Dinner', overnight: 'Bakarthach Camp' },
    { dayNumber: 2, title: 'Trek Bakarthach to Beas Kund Glacial Lake (12,772 ft)', location: 'Beas Kund', description: 'Trek through glacial moraines to the sacred emerald source lake of River Beas (12,772 ft), surrounded by Hanuman Tibba, Friendship Peak, and Ladakhi Peak.', places: ['Beas Kund Glacial Lake (12,772 ft)', 'Hanuman Tibba View', 'Friendship Peak Base'], activities: ['Glacial Lake Exploration', 'Summit Amphitheatre Views'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Bakarthach Camp' },
    { dayNumber: 3, title: 'Trek Bakarthach to Dhundi & Drive to Manali', location: 'Manali', description: 'Trek 5 km down to Dhundi roadhead and drive back to Manali for onward journeys.', places: ['Dhundi', 'Solang Valley', 'Manali'], activities: ['Descent Trek', 'Trip Conclusion'], meals: 'Breakfast & Lunch', overnight: 'None' }
  ],

  // 42. himachal-bhrigu-lake-trek (3D/2N)
  'himachal-bhrigu-lake-trek': [
    { dayNumber: 1, title: 'Manali to Gulaba & Trek to Rola Kholi Campsite', location: 'Rola Kholi', description: 'Drive 22 km to Gulaba on Rohtang Highway. Trek 6 km through virgin oak and cedar canopies to Rola Kholi (12,500 ft).', places: ['Gulaba Meadows', 'Rola Kholi Campsite (12,500 ft)'], activities: ['Cedar Woods Trek', 'High Meadow Camping'], meals: 'Dinner', overnight: 'Rola Kholi Camp' },
    { dayNumber: 2, title: 'Trek Rola Kholi to Sacred Bhrigu Lake (14,100 ft) & Pandu Ropa', location: 'Bhrigu Lake', description: 'Ascend alpine ridges to the sacred frozen Bhrigu Lake (14,100 ft) where Sage Bhrigu meditated. Panoramic views of Seven Sisters and Deo Tibba.', places: ['Bhrigu Alpine Glacial Lake (14,100 ft)', 'Deo Tibba & Hanuman Tibba Panoramas'], activities: ['High Alpine Lake Trek', 'Ridge Photography'], meals: 'Breakfast, Lunch & Dinner', overnight: 'Rola Kholi / Pandu Ropa Camp' },
    { dayNumber: 3, title: 'Trek down to Gulaba / Vashisht & Drive to Manali', location: 'Manali', description: 'Descend through apple orchards to Gulaba or Vashisht hot springs, drive to Manali for departure.', places: ['Gulaba', 'Vashisht Springs', 'Manali'], activities: ['Descent Trek', 'Thermal Spring Relaxation', 'Departure'], meals: 'Breakfast & Lunch', overnight: 'None' }
  ],

  // 43. himachal-bir-billing-paragliding (3D/2N)
  'himachal-bir-billing-paragliding': [
    { dayNumber: 1, title: 'Overnight Drive from Delhi to Bir Colony', location: 'Bir', description: 'Evening coach from Delhi to Bir Tibetan Colony. Check in to pine valley camps and explore Tibetan monasteries and cafes.', places: ['Bir Tibetan Colony', 'Chokling Monastery', 'Landing Site Sunset'], activities: ['Monastery Walk', 'Cafe Culture', 'Sunset Landing Views'], meals: 'Dinner', overnight: 'Bir Pine Valley Camp' },
    { dayNumber: 2, title: 'Tandem Paragliding Flight from Billing (8,000 ft) to Bir', location: 'Billing to Bir', description: 'Drive up to Billing takeoff (8,000 ft). Experience exhilarating 20-30 min tandem paragliding soaring over Kangra Valley to land at Bir (4,300 ft). Afternoon mountain biking.', places: ['Billing Takeoff (8,000 ft)', 'Bir Landing Ground (4,300 ft)', 'Deer Park Institute'], activities: ['Tandem Paragliding Flight (GoPro Video)', 'Mountain Biking', 'Cafe Hopping'], meals: 'Breakfast & Dinner', overnight: 'Bir Pine Valley Camp' },
    { dayNumber: 3, title: 'Bangoru Waterfall Hike & Evening Return to Delhi', location: 'Bir to Delhi', description: 'Short morning hike to hidden Bangoru Waterfall and visit Sherab Ling Monastery. Board evening return coach to Delhi.', places: ['Bangoru Waterfall', 'Palpung Sherab Ling Monastery', 'Delhi'], activities: ['Waterfall Hike', 'Monastery Tour', 'Evening Departure'], meals: 'Breakfast', overnight: 'None' }
  ],

  // 44. rajasthan-golden-triangle-classic (5D/4N)
  'rajasthan-golden-triangle-classic': [
    { dayNumber: 1, title: 'Arrival in Delhi & Heritage Monuments Tour', location: 'Delhi', description: 'Pick up in Delhi. Explore India Gate, Qutub Minar, Humayun’s Tomb, and drive past President House.', places: ['India Gate', 'Qutub Minar', 'Humayun’s Tomb', 'Connaught Place'], activities: ['Capital Heritage Tour', 'Mughal Architecture Walk'], meals: 'Dinner', overnight: 'Delhi Boutique Hotel' },
    { dayNumber: 2, title: 'Delhi to Agra via Yamuna Expressway & Taj Mahal Sunset', location: 'Agra', description: 'Drive to Agra. Check in and visit the magnificent Taj Mahal (UNESCO) at sunset and the red sandstone Agra Fort.', places: ['Taj Mahal (UNESCO)', 'Agra Fort', 'Mehtab Bagh Sunset View'], activities: ['Taj Mahal Guided Tour', 'Mughal Fort Ramparts'], meals: 'Breakfast & Dinner', overnight: 'Agra Heritage Hotel' },
    { dayNumber: 3, title: 'Agra to Jaipur via Fatehpur Sikri (Ghost City)', location: 'Jaipur', description: 'Drive to Jaipur stopping at Emperor Akbar’s abandoned red sandstone capital of Fatehpur Sikri and Buland Darwaza.', places: ['Fatehpur Sikri (UNESCO)', 'Buland Darwaza', 'Jaipur Pink City'], activities: ['Ghost Capital Tour', 'Pink City Arrival Stroll'], meals: 'Breakfast & Dinner', overnight: 'Jaipur Heritage Haveli' },
    { dayNumber: 4, title: 'Jaipur Amer Fort, Hawa Mahal & City Palace', location: 'Jaipur', description: 'Ascend Amer Fort on the Aravalli ridge. Visit Jal Mahal, the honeycomb facade of Hawa Mahal, City Palace, and Jantar Mantar observatory.', places: ['Amer Fort', 'Hawa Mahal', 'City Palace Jaipur', 'Jantar Mantar (UNESCO)', 'Johari Bazaar'], activities: ['Royal Fort Exploration', 'Block Printing & Jewelry Shopping', 'Rajasthani Thali Dinner'], meals: 'Breakfast & Dinner', overnight: 'Jaipur Heritage Haveli' },
    { dayNumber: 5, title: 'Jaipur to Delhi Airport Departure', location: 'Delhi', description: 'Morning photo stop at Patrika Gate and drive back to Delhi Airport for your return flight.', places: ['Patrika Gate', 'Delhi Airport / Jaipur Airport'], activities: ['Departure Transfer'], meals: 'Breakfast', overnight: 'None' }
  ]
};

console.log('Total enriched itineraries ready:', Object.keys(fullItinerariesMap).length);
