// Phase 2 ImageKit Migration Upload Manifest
// Prepared during Phase 1 Audit — Ready for ingestion in Phase 2

export interface ManifestGalleryItem {
  location: string;
  status: 'NEEDS_SOURCE' | 'READY_FOR_UPLOAD' | 'UPLOADED';
  targetFilename?: string;
  uploadedUrl?: string;
}

export interface ManifestTripItem {
  tripId: string;
  tripName: string;
  destination: string;
  imageKitFolder: string;
  hero: {
    requiredLocation: string;
    recommendedSubject: string;
    replacementCategory: 'EXACT_LANDMARK' | 'EXACT_CITY' | 'EXACT_REGION' | 'ROUTE_REPRESENTATIVE' | 'GENERIC_DESTINATION';
    sourceUrl: string;
    status: 'NEEDS_UPLOAD' | 'UPLOADED';
    uploadedUrl?: string;
  };
  gallery: ManifestGalleryItem[];
}

export const itineraryImageManifest: ManifestTripItem[] = [
  {
    "tripId": "kashmir-signature",
    "tripName": "The Great Kashmir Escape",
    "destination": "Kashmir",
    "imageKitFolder": "tripkario/itineraries/kashmir/kashmir-signature",
    "hero": {
      "requiredLocation": "Dal Lake / Srinagar / Gulmarg / Pahalgam",
      "recommendedSubject": "Srinagar Dal Lake morning shikara cruise with cedar houseboats",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg/3840px-Dal_Lake_Hazratbal_Srinagar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Srinagar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Srinagar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Gulmarg",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "kashmir-backpacking",
    "tripName": "Kashmir Valley & Meadow Trails",
    "destination": "Kashmir",
    "imageKitFolder": "tripkario/itineraries/kashmir/kashmir-backpacking",
    "hero": {
      "requiredLocation": "Doodhpathri / Budgam / Srinagar / Pahalgam",
      "recommendedSubject": "Doodhpathri alpine pine meadow and Shaliganga mountain stream",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/a/ae/A_bench_with_scenic_view_Doodhpathri_southwest_Jammu_Kashmir_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Srinagar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Doodhpathri",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Gulmarg",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "ladakh-high-passes",
    "tripName": "High Passes & Monastery Chants",
    "destination": "Ladakh",
    "imageKitFolder": "tripkario/itineraries/ladakh/ladakh-high-passes",
    "hero": {
      "requiredLocation": "Pangong Tso / Leh / Nubra Valley / Khardung La",
      "recommendedSubject": "Cobalt blue Pangong Tso lake reflecting barren Ladakh peaks",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/ISS054-E-7809_-_View_of_Earth_%28cropped%29.jpg/3840px-ISS054-E-7809_-_View_of_Earth_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Leh",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Sham Valley",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Nubra Valley",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "ladakh-bike-circuit",
    "tripName": "Leh to Pangong Himalayan Circuit",
    "destination": "Ladakh",
    "imageKitFolder": "tripkario/itineraries/ladakh/ladakh-bike-circuit",
    "hero": {
      "requiredLocation": "Khardung La Pass / Leh / Hunder Sand Dunes / Diskit",
      "recommendedSubject": "Khardung La Pass (17,982 ft) with prayer flags and mountain road",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/5/53/Khardung_La_Pass_Ladakh.jpg",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Leh",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Sham Valley",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Nubra Valley",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "spiti-circuit",
    "tripName": "Spiti Valley High-Altitude Circuit",
    "destination": "Spiti Valley",
    "imageKitFolder": "tripkario/itineraries/spiti/spiti-circuit",
    "hero": {
      "requiredLocation": "Key Monastery / Kaza / Chandratal / Hikkim",
      "recommendedSubject": "1,000-year-old Key Monastery perched on conical hill in Spiti",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/1000_Year_loop.jpg/3840px-1000_Year_loop.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Narkanda",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kalpa",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Tabo",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "spiti-short-escape",
    "tripName": "Spiti Valley Quick Explorer",
    "destination": "Spiti Valley",
    "imageKitFolder": "tripkario/itineraries/spiti/spiti-short-escape",
    "hero": {
      "requiredLocation": "Dhankar Gompa / Tabo / Kaza / Pin Valley",
      "recommendedSubject": "Ancient Dhankar Gompa cliff fortress above Spiti-Pin confluence",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/3/35/Dhankar_Gompa_and_village.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Kaza",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kaza",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Spiti High Villages",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "meghalaya-cloud-trails",
    "tripName": "Living Roots & Sacred Rainforests",
    "destination": "Meghalaya",
    "imageKitFolder": "tripkario/itineraries/meghalaya/meghalaya-cloud-trails",
    "hero": {
      "requiredLocation": "Nongriat / Cherrapunji / Dawki / Shillong",
      "recommendedSubject": "Double Decker Living Root Bridge bio-engineered across jungle river in Nongriat",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg/3840px-Living_root_bridges%2C_Nongriat_village%2C_Meghalaya2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Shillong",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Cherrapunji",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Nongriat",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "meghalaya-delight",
    "tripName": "Meghalaya Waterfalls & Caves Getaway",
    "destination": "Meghalaya",
    "imageKitFolder": "tripkario/itineraries/meghalaya/meghalaya-delight",
    "hero": {
      "requiredLocation": "Nohkalikai Falls / Cherrapunji / Mawsmai Cave / Shillong",
      "recommendedSubject": "Nohkalikai Falls plunging 1,115 ft into turquoise lagoon in Sohra",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/NohKaLikai_Falls_V2_Wiki.jpg/3840px-NohKaLikai_Falls_V2_Wiki.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Shillong",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Cherrapunji",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Nongriat",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "tawang-monasteries",
    "tripName": "Tawang High Pass & Monastery Circuit",
    "destination": "Tawang & Arunachal",
    "imageKitFolder": "tripkario/itineraries/tawang/tawang-monasteries",
    "hero": {
      "requiredLocation": "Tawang Monastery / Sela Pass / Dirang / Bum La",
      "recommendedSubject": "400-year-old Galden Namgey Lhatse Tawang Monastery overlooking valley",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/9/92/TawangMonastery.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Bhalukpong",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Dirang",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Tawang",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "tawang-short-escape",
    "tripName": "Glimpse of Arunachal & Tawang",
    "destination": "Tawang & Arunachal",
    "imageKitFolder": "tripkario/itineraries/tawang/tawang-short-escape",
    "hero": {
      "requiredLocation": "Sela Pass / Sela Lake / Tawang / Bomdila",
      "recommendedSubject": "Frozen sacred Sela Lake and mountain pass gateway at 13,700 ft",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Tawang_Gate.jpg/3840px-Tawang_Gate.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Dirang",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Tawang",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Tawang",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "sikkim-darjeeling-classic",
    "tripName": "Darjeeling Tea Slopes & Gangtok High Lake",
    "destination": "Sikkim & Darjeeling",
    "imageKitFolder": "tripkario/itineraries/sikkim/sikkim-darjeeling-classic",
    "hero": {
      "requiredLocation": "Happy Valley Tea Estate / Darjeeling / Kanchenjunga / Tiger Hill",
      "recommendedSubject": "Rolling green tea bushes of Darjeeling estate with snow peaks of Mt Kanchenjunga",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Happy_Valley_Tea_Estate%2C_Darjeeling.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Darjeeling",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Darjeeling",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Gangtok",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "sikkim-gangtok-weekend",
    "tripName": "Gangtok Monastery & Alpine Lake Escape",
    "destination": "Sikkim & Darjeeling",
    "imageKitFolder": "tripkario/itineraries/sikkim/sikkim-gangtok-weekend",
    "hero": {
      "requiredLocation": "Tsomgo Lake / Gangtok / Nathula Pass / Rumtek",
      "recommendedSubject": "Sacred glacial Tsomgo Changu Lake with colorful prayer flags in East Sikkim",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Tsongmo_Lake_or_Changu_Lake_-_East_Sikkim.jpg/3840px-Tsongmo_Lake_or_Changu_Lake_-_East_Sikkim.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Gangtok",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Tsomgo Lake",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Gangtok",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "kerala-backwaters",
    "tripName": "Emerald Waters & Spice Hills",
    "destination": "Kerala",
    "imageKitFolder": "tripkario/itineraries/kerala/kerala-backwaters",
    "hero": {
      "requiredLocation": "Alleppey Backwaters / Vembanad Lake / Munnar / Thekkady",
      "recommendedSubject": "Traditional thatched wooden Kettuvallam houseboat cruising along calm palm backwaters",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e4/Alappuzha_Boat_Beauty_W.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Munnar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Munnar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Thekkady",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "kerala-short-weekend",
    "tripName": "Munnar Tea Gardens & Alleppey Cruise",
    "destination": "Kerala",
    "imageKitFolder": "tripkario/itineraries/kerala/kerala-short-weekend",
    "hero": {
      "requiredLocation": "Munnar Tea Plantations / Mattupetty / Idukki / Eravikulam",
      "recommendedSubject": "Rolling emerald green carpet of tea gardens in morning mist across Munnar hills",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/3840px-Munnar_Overview.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Munnar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Alleppey",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kochi",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "andaman-island-escape",
    "tripName": "Andaman Coral Reefs & Coastal Havens",
    "destination": "Andaman Islands",
    "imageKitFolder": "tripkario/itineraries/andaman/andaman-island-escape",
    "hero": {
      "requiredLocation": "Radhanagar Beach No. 7 / Havelock Island / Neil Island / Port Blair",
      "recommendedSubject": "Pristine turquoise waters and powdery white sands of Radhanagar Beach No. 7 in Havelock",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Radha_Nagar_beach%2C_Havelock_Island%2C_Andamn%2C_India-_Sun_set_view.jpg/3840px-Radha_Nagar_beach%2C_Havelock_Island%2C_Andamn%2C_India-_Sun_set_view.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Port Blair",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Havelock",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Havelock",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "himachal-manali-snow",
    "tripName": "Manali Cedar Woods & Solang Snow Trails",
    "destination": "Himachal Pradesh",
    "imageKitFolder": "tripkario/itineraries/himachal/himachal-manali-snow",
    "hero": {
      "requiredLocation": "Solang Valley / Manali / Atal Tunnel / Rohtang Pass",
      "recommendedSubject": "Snow covered pine slopes and ski trails in Solang Valley near Manali",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Solang_Valley_%2CManali%2C_Himachal_Pardes%2C_India.JPG/3840px-Solang_Valley_%2CManali%2C_Himachal_Pardes%2C_India.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Transit",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Manali",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Solang & Sissu",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "himachal-parvati-kheerganga",
    "tripName": "Kasol & Parvati Valley Hot Springs",
    "destination": "Himachal Pradesh",
    "imageKitFolder": "tripkario/itineraries/himachal/himachal-parvati-kheerganga",
    "hero": {
      "requiredLocation": "Tosh Village / Kasol / Kheerganga / Parvati Valley",
      "recommendedSubject": "Rustic wooden mountain chalets of Tosh village overlooking Parvati river gorge",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Tosh_in_Monsoon%2C_July_2017.jpg/3840px-Tosh_in_Monsoon%2C_July_2017.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Transit",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kasol",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kheerganga",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "uttarakhand-kedarnath-yatra",
    "tripName": "Kedarnath Sanctum & Mandakini Trail",
    "destination": "Uttarakhand",
    "imageKitFolder": "tripkario/itineraries/uttarakhand/uttarakhand-kedarnath-yatra",
    "hero": {
      "requiredLocation": "Kedarnath Temple / Gaurikund / Mandakini River / Guptkashi",
      "recommendedSubject": "Ancient stone Kedarnath temple standing grand against snow-clad Kedar Dome massif",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kedarnath_Temple_in_Rainy_season.jpg/3840px-Kedarnath_Temple_in_Rainy_season.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Guptkashi",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kedarnath",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Guptkashi",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "uttarakhand-valley-of-flowers",
    "tripName": "Valley of Flowers & Hemkund Sahib Trek",
    "destination": "Uttarakhand",
    "imageKitFolder": "tripkario/itineraries/uttarakhand/uttarakhand-valley-of-flowers",
    "hero": {
      "requiredLocation": "Valley of Flowers / Ghangaria / Hemkund Sahib / Govindghat",
      "recommendedSubject": "Vibrant alpine wildflowers blooming in lush Bhyundar Valley under Garhwal peaks",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Valley_of_flowers_national_park%2C_Uttarakhand%2C_India_03_%28edit%29.jpg/3840px-Valley_of_flowers_national_park%2C_Uttarakhand%2C_India_03_%28edit%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Govindghat",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Ghangaria",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Valley of Flowers",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "himachal-jibhi-tirthan",
    "tripName": "Tirthan River & Jibhi Pine Glades",
    "destination": "Himachal Pradesh",
    "imageKitFolder": "tripkario/itineraries/himachal/himachal-jibhi-tirthan",
    "hero": {
      "requiredLocation": "Jibhi / Tirthan Valley / Jalori Pass / Serolsar Lake",
      "recommendedSubject": "Traditional wooden Kathkuni cottage nestled in dense deodar forest of Jibhi valley",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/a/af/Tirthan_Valley_Himachal.jpg",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Transit",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Jibhi",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Jalori Pass",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "uttarakhand-rishikesh-chopta",
    "tripName": "Chopta Tungnath & Rishikesh Ganga Trail",
    "destination": "Uttarakhand",
    "imageKitFolder": "tripkario/itineraries/uttarakhand/uttarakhand-rishikesh-chopta",
    "hero": {
      "requiredLocation": "Tungnath Temple / Chandrashila Peak / Chopta / Rishikesh",
      "recommendedSubject": "Highest Shiva temple Tungnath and Chandrashila 360-degree Himalayan summit",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Tungnath_temple.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Rishikesh",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Chopta",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Tungnath & Chandrashila",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "rajasthan-heritage",
    "tripName": "Royal Citadels & Desert Dunes",
    "destination": "Rajasthan",
    "imageKitFolder": "tripkario/itineraries/rajasthan/rajasthan-heritage",
    "hero": {
      "requiredLocation": "Amber Fort / Jaipur / Jodhpur / Jaisalmer",
      "recommendedSubject": "Yellow sandstone ramparts and courtyards of Amber Fort overlooking Maota Lake",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/3840px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Jaipur",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Jaipur",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Jodhpur",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "rajasthan-udaipur-mountabu",
    "tripName": "Udaipur Lake Palaces & Mount Abu Hills",
    "destination": "Rajasthan",
    "imageKitFolder": "tripkario/itineraries/rajasthan/rajasthan-udaipur-mountabu",
    "hero": {
      "requiredLocation": "Lake Pichola / City Palace Udaipur / Mount Abu / Dilwara Temples",
      "recommendedSubject": "White marble Lake Palace and City Palace glowing golden on Lake Pichola in Udaipur",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Udaipur_Lake_India.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Udaipur",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Udaipur",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Mount Abu",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "goa-slow-coastal",
    "tripName": "South Goa Portuguese Quarters & Hidden Coves",
    "destination": "Goa",
    "imageKitFolder": "tripkario/itineraries/goa/goa-slow-coastal",
    "hero": {
      "requiredLocation": "Fontainhas Latin Quarter / Panjim / Palolem / Agonda",
      "recommendedSubject": "Charming pastel yellow and terracotta Portuguese colonial villas in Fontainhas",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Fontainhas_Panjim_Goa.jpg",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Panjim",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Old Goa",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "South Goa",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "south-coorg-wayanad",
    "tripName": "Coffee Plantations & Rainforest Streams",
    "destination": "South India Hills",
    "imageKitFolder": "tripkario/itineraries/south-india/south-coorg-wayanad",
    "hero": {
      "requiredLocation": "Madikeri Coffee Estates / Tadiandamol Peak / Wayanad / Coorg",
      "recommendedSubject": "Lush green coffee and spice plantations shrouded in morning mist in Madikeri Coorg",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Tadiandamol_Valley%2C_Western_Ghats.jpg/3840px-Tadiandamol_Valley%2C_Western_Ghats.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Coorg",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Coorg",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Wayanad",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "south-ooty-kodaikanal",
    "tripName": "Nilgiri Blue Hills & Misty Pine Lakes",
    "destination": "South India Hills",
    "imageKitFolder": "tripkario/itineraries/south-india/south-ooty-kodaikanal",
    "hero": {
      "requiredLocation": "Nilgiri Mountain Railway / Ooty / Kodaikanal / Coonoor",
      "recommendedSubject": "Historic UNESCO Nilgiri Mountain Toy Train steaming across stone viaduct bridge in blue hills",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/4/41/NMR_train_at_Ketti_05-02-26_75.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Ooty",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Ooty & Coonoor",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kodaikanal",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "ladakh-bike-delhi-hanle-umlingla-12d",
    "tripName": "Delhi to Umling La & Hanle Trans-Himalayan Bike Expedition",
    "destination": "Ladakh",
    "imageKitFolder": "tripkario/itineraries/ladakh/ladakh-bike-delhi-hanle-umlingla-12d",
    "hero": {
      "requiredLocation": "Umling La Pass / Hanle / Chushul / Nyoma",
      "recommendedSubject": "World highest motorable pass road at Umling La (19,024 ft)",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Umling_La_Summit_-_Rickshaws.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Transit",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Manali",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Jispa",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "ladakh-bike-delhi-srinagar-12d",
    "tripName": "Delhi to Srinagar via Umling La & Hanle Motorcycle Traverse",
    "destination": "Ladakh",
    "imageKitFolder": "tripkario/itineraries/ladakh/ladakh-bike-delhi-srinagar-12d",
    "hero": {
      "requiredLocation": "Zoji La Pass / Drass / Kargil / Sonamarg",
      "recommendedSubject": "Winding mountain highway cutting through rugged cliffs of Zoji La Pass",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Zojila_Road.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Transit",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Manali",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Jispa",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "ladakh-bike-srinagar-delhi-12d",
    "tripName": "Srinagar to Manali & Leh Trans-Himalayan Motorcycle Circuit",
    "destination": "Ladakh",
    "imageKitFolder": "tripkario/itineraries/ladakh/ladakh-bike-srinagar-delhi-12d",
    "hero": {
      "requiredLocation": "Lamayuru Moonland / Fotu La Pass / Kargil / Leh",
      "recommendedSubject": "Ancient Lamayuru Gompa perched over moonland geological terrain",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Lamayuru_Monastery%2C_Ladakh%2C_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Srinagar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kargil",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Leh",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "ladakh-bike-hanle-demchok-7d",
    "tripName": "Hanle, Umling La & Demchok Border Motorcycle Circuit",
    "destination": "Ladakh",
    "imageKitFolder": "tripkario/itineraries/ladakh/ladakh-bike-hanle-demchok-7d",
    "hero": {
      "requiredLocation": "Changthang Plateau / Nyoma / Hanle / Tsaga La",
      "recommendedSubject": "Vast high-altitude plains of Changthang plateau with Tibetan wildlife",
      "replacementCategory": "EXACT_REGION",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/1/15/Changpas_nomadic_people_-_Changtang_-_Tibet.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Leh",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Hanle",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Umling La",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "ladakh-bike-hanle-demchok-8d",
    "tripName": "Complete Eastern Ladakh, Nubra & Demchok Motorcycle Expedition",
    "destination": "Ladakh",
    "imageKitFolder": "tripkario/itineraries/ladakh/ladakh-bike-hanle-demchok-8d",
    "hero": {
      "requiredLocation": "Indian Astronomical Observatory / Hanle / Changthang",
      "recommendedSubject": "Himalayan Chandra Telescope dome in Hanle Dark Sky Reserve",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Himalayan_chandra_telescope.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Leh",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Nubra Valley",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Pangong Tso",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "ladakh-chadar-trek",
    "tripName": "Chadar Frozen Zanskar River Winter Expedition",
    "destination": "Ladakh",
    "imageKitFolder": "tripkario/itineraries/ladakh/ladakh-chadar-trek",
    "hero": {
      "requiredLocation": "Zanskar River Canyon / Tilat Sumdo / Chilling / Naerak",
      "recommendedSubject": "Trekkers walking on frozen ice sheet of Zanskar river gorge",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Chadar-Zanskar.jpg/3840px-Chadar-Zanskar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Leh",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Leh",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Shingra Koma",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "ladakh-short-glimpse-4d",
    "tripName": "Leh High-Altitude Weekend Glimpse",
    "destination": "Ladakh",
    "imageKitFolder": "tripkario/itineraries/ladakh/ladakh-short-glimpse-4d",
    "hero": {
      "requiredLocation": "Thiksey Monastery / Leh Palace / Shanti Stupa / Indus Valley",
      "recommendedSubject": "Twelve-tiered whitewashed gompa of Thiksey Monastery in Indus Valley",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Thikse_Monastery_.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Leh",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Sham Valley",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Khardung La",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "spiti-winter-white-expedition",
    "tripName": "Winter Spiti 4x4 White Expedition",
    "destination": "Spiti Valley",
    "imageKitFolder": "tripkario/itineraries/spiti/spiti-winter-white-expedition",
    "hero": {
      "requiredLocation": "Langza Village / Komic / Kaza / Chau Chau Kang Nilda",
      "recommendedSubject": "Golden Buddha statue at Langza village overlooking frozen white peaks",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Langza_Village%2C_Himachal_Pradesh.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Kalpa",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Tabo",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kaza",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "spiti-motorbike-circuit-10d",
    "tripName": "Spiti Valley High Mountain Motorbike Circuit",
    "destination": "Spiti Valley",
    "imageKitFolder": "tripkario/itineraries/spiti/spiti-motorbike-circuit-10d",
    "hero": {
      "requiredLocation": "Kunzum Pass / Chitkul / Kalpa / Kaza / Chandratal",
      "recommendedSubject": "Kunzum Pass (14,931 ft) stupa and colorful Buddhist prayer flags",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/4/46/Kunzum_Pass_between_Lahaul_%26_Spiti_28-6-04.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Transit",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Sarahan",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Chitkul",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "kashmir-great-lakes-trek",
    "tripName": "Kashmir Great Lakes Alpine Wilderness Trek",
    "destination": "Kashmir",
    "imageKitFolder": "tripkario/itineraries/kashmir/kashmir-great-lakes-trek",
    "hero": {
      "requiredLocation": "Vishansar Lake / Kishansar Lake / Gadsar / Sonamarg",
      "recommendedSubject": "Vishansar alpine lake with wildflower meadows in Sonamarg",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Vishansar_Lake.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Sonamarg",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Nichnai",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Vishansar Lake",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "kashmir-tarsar-marsar-trek",
    "tripName": "Tarsar Marsar Twin Alpine Lakes Trek",
    "destination": "Kashmir",
    "imageKitFolder": "tripkario/itineraries/kashmir/kashmir-tarsar-marsar-trek",
    "hero": {
      "requiredLocation": "Tarsar Lake / Marsar Lake / Aru Valley / Pahalgam",
      "recommendedSubject": "Tarsar high-altitude almond-shaped alpine glacial lake",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/5/55/Tarsar_lake_Aru.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Aru Valley",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Lidderwat",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Shekwas",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "kashmir-gurez-valley-border",
    "tripName": "Gurez Valley & Kishanganga River Border Circuit",
    "destination": "Kashmir",
    "imageKitFolder": "tripkario/itineraries/kashmir/kashmir-gurez-valley-border",
    "hero": {
      "requiredLocation": "Dawar / Habba Khatoon Peak / Kishanganga River / Gurez Valley",
      "recommendedSubject": "Pyramidal Habba Khatoon peak rising over Kishanganga river in Dawar",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/7/76/Habba_Khatoon.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Srinagar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Gurez Valley",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Dawar",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "meghalaya-kaziranga-wildlife-7d",
    "tripName": "Kaziranga Safari & Meghalaya Rainforest Trails",
    "destination": "Meghalaya",
    "imageKitFolder": "tripkario/itineraries/meghalaya/meghalaya-kaziranga-wildlife-7d",
    "hero": {
      "requiredLocation": "Kaziranga National Park / Shillong / Brahmaputra",
      "recommendedSubject": "One-horned rhinoceros grazing in tall elephant grass of Kaziranga",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Beauty_of_Kaziranga_National_Park.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Kaziranga",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kaziranga",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Shillong",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "nagaland-dzukou-valley-trek",
    "tripName": "Dzukou Valley Floral Meadow & Hornbill Trail",
    "destination": "Nagaland",
    "imageKitFolder": "tripkario/itineraries/nagaland/nagaland-dzukou-valley-trek",
    "hero": {
      "requiredLocation": "Dzukou Valley / Viswema / Jakhama / Kohima",
      "recommendedSubject": "Surreal undulating velvet emerald green valleys of Dzukou under dramatic monsoon skies",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Breathtaking_beauty_of_Dzukou_Valley_in_Manipur-Nagaland_border_%28edit%29.jpg/3840px-Breathtaking_beauty_of_Dzukou_Valley_in_Manipur-Nagaland_border_%28edit%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Kohima",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Dzukou Valley",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Dzukou Valley",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "tawang-motorbike-expedition-11d",
    "tripName": "Western Arunachal & Tawang Motorbike Expedition",
    "destination": "Tawang & Arunachal",
    "imageKitFolder": "tripkario/itineraries/tawang/tawang-motorbike-expedition-11d",
    "hero": {
      "requiredLocation": "Sangti Valley / Dirang / Tawang / Bum La Pass",
      "recommendedSubject": "Picturesque pine valley of Sangti with crystal river and kiwi orchards",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Dirang_Valley.jpg/3840px-Dirang_Valley.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Guwahati",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Nameri",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Dirang",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "sikkim-north-gurudongmar-6d",
    "tripName": "North Sikkim Gurudongmar & Yumthang Alpine Valley",
    "destination": "Sikkim & Darjeeling",
    "imageKitFolder": "tripkario/itineraries/sikkim/sikkim-north-gurudongmar-6d",
    "hero": {
      "requiredLocation": "Gurudongmar Lake / Lachen / Lachung / Yumthang Valley",
      "recommendedSubject": "Pristine azure waters of Gurudongmar Lake at 17,800 ft surrounded by snow massifs",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Gurudongmar_Lake_Sikkim%2C_India_%28edit%29.jpg/3840px-Gurudongmar_Lake_Sikkim%2C_India_%28edit%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Gangtok",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Lachen",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Gurudongmar & Lachung",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "uttarakhand-kedarkantha-snow-trek",
    "tripName": "Kedarkantha Winter Snow Summit Trek",
    "destination": "Uttarakhand",
    "imageKitFolder": "tripkario/itineraries/uttarakhand/uttarakhand-kedarkantha-snow-trek",
    "hero": {
      "requiredLocation": "Kedarkantha Summit / Sankri / Juda Ka Talab / Govind Pashu Vihar",
      "recommendedSubject": "Sunrise from snow covered peak of Kedarkantha Summit with Trishul marker",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Kedarkantha_Peak.jpg/3840px-Kedarkantha_Peak.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Sankri",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Juda Ka Talab",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kedarkantha Base",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "uttarakhand-brahmatal-winter-trek",
    "tripName": "Brahmatal Alpine Snow Lake Trek",
    "destination": "Uttarakhand",
    "imageKitFolder": "tripkario/itineraries/uttarakhand/uttarakhand-brahmatal-winter-trek",
    "hero": {
      "requiredLocation": "Brahmatal Lake / Lohajung / Bekaltal / Mt Trishul View",
      "recommendedSubject": "Frozen high altitude Brahmatal lake reflecting the snow pyramid of Mount Trishul",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/4/41/Brahmatal_Lake_Uttarakhand.jpg",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Lohajung",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Bekaltal",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Brahmatal",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "uttarakhand-har-ki-dun-trek",
    "tripName": "Har Ki Dun Ancient Valley Trail",
    "destination": "Uttarakhand",
    "imageKitFolder": "tripkario/itineraries/uttarakhand/uttarakhand-har-ki-dun-trek",
    "hero": {
      "requiredLocation": "Har Ki Dun Valley / Swargarohini Peak / Osla / Sankri",
      "recommendedSubject": "Cradle-shaped green valley of Har Ki Dun with snowbound Swargarohini peaks",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7b/SWARGAROHINI_MOUNTAIN.2.jpg",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Sankri",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Pauni Garaat",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kalkattiyadhar",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "uttarakhand-chardham-yatra-delhi-12d",
    "tripName": "Complete Sacred Chardham Yatra Circuit",
    "destination": "Uttarakhand",
    "imageKitFolder": "tripkario/itineraries/uttarakhand/uttarakhand-chardham-yatra-delhi-12d",
    "hero": {
      "requiredLocation": "Badrinath Temple / Kedarnath / Gangotri / Yamunotri",
      "recommendedSubject": "Sacred Badrinath Temple colorful facade standing by Alaknanda River",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Badrinath_Temple_%2C_Uttarakhand.jpg/3840px-Badrinath_Temple_%2C_Uttarakhand.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Haridwar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Barkot",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Yamunotri",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "uttarakhand-do-dham-kedarnath-badrinath",
    "tripName": "Do Dham Yatra (Kedarnath & Badrinath)",
    "destination": "Uttarakhand",
    "imageKitFolder": "tripkario/itineraries/uttarakhand/uttarakhand-do-dham-kedarnath-badrinath",
    "hero": {
      "requiredLocation": "Devprayag Sangam / Alaknanda / Bhagirathi / Kedarnath / Badrinath",
      "recommendedSubject": "Sacred confluence of Alaknanda and Bhagirathi forming holy Ganga at Devprayag",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/4/49/AjitHota_BirthPlaceOfGanges.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Guptkashi",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kedarnath",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Joshimath",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "uttarakhand-corbett-wildlife-weekend",
    "tripName": "Jim Corbett Tiger Safari Weekend Escape",
    "destination": "Uttarakhand",
    "imageKitFolder": "tripkario/itineraries/uttarakhand/uttarakhand-corbett-wildlife-weekend",
    "hero": {
      "requiredLocation": "Jim Corbett National Park / Dhikala Zone / Ramnagar / Kosi River",
      "recommendedSubject": "Golden sal forests and wildlife safari trails in Jim Corbett Dhikala zone",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/7/78/Bengal-Tiger_Corbett_Uttarakhand_Dec-2013.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Jim Corbett",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Jim Corbett",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Delhi",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "himachal-hampta-pass-trek",
    "tripName": "Hampta Pass & Chandratal Crossover Alpine Trek",
    "destination": "Himachal Pradesh",
    "imageKitFolder": "tripkario/itineraries/himachal/himachal-hampta-pass-trek",
    "hero": {
      "requiredLocation": "Hampta Pass / Jobra / Chattru / Kullu / Lahaul",
      "recommendedSubject": "Dramatic scree pass of Hampta crossing from green Kullu meadows into barren Lahaul",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Hampta_Pass_Trek.jpg",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Chika",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Balu Ka Ghera",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Hampta Pass & Shea Goru",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "himachal-sar-pass-trek",
    "tripName": "Sar Pass Snow Slide & Alpine Meadow Trek",
    "destination": "Himachal Pradesh",
    "imageKitFolder": "tripkario/itineraries/himachal/himachal-sar-pass-trek",
    "hero": {
      "requiredLocation": "Sar Pass / Kasol / Grahan / Biskeri Thach",
      "recommendedSubject": "High snow ridge of Sar Pass with panoramic views of snowbound Parvati peaks",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Sar-lake.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Kasol",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Grahan",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Min Thach",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "himachal-beas-kund-trek",
    "tripName": "Beas Kund Glacial Source Trek",
    "destination": "Himachal Pradesh",
    "imageKitFolder": "tripkario/itineraries/himachal/himachal-beas-kund-trek",
    "hero": {
      "requiredLocation": "Beas Kund / Dhundi / Solang / Hanuman Tibba",
      "recommendedSubject": "High alpine tarn Beas Kund at the foot of Hanuman Tibba peak in Manali",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Beas_Kund_Lake.jpg",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Bakarthach",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Beas Kund",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Manali",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "himachal-bhrigu-lake-trek",
    "tripName": "Bhrigu Lake High Alpine Ridge Trek",
    "destination": "Himachal Pradesh",
    "imageKitFolder": "tripkario/itineraries/himachal/himachal-bhrigu-lake-trek",
    "hero": {
      "requiredLocation": "Bhrigu Lake / Gulaba / Rola Kholi / Manali",
      "recommendedSubject": "High-altitude glacial tarn Bhrigu Lake at 14,100 ft overlooking Pir Panjal",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Brighu_Lake.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Rola Kholi",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Bhrigu Lake",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Manali",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "himachal-bir-billing-paragliding",
    "tripName": "Bir Billing Paragliding Flight & Pine Valley Camping",
    "destination": "Himachal Pradesh",
    "imageKitFolder": "tripkario/itineraries/himachal/himachal-bir-billing-paragliding",
    "hero": {
      "requiredLocation": "Billing Takeoff / Bir Colony / Dhauladhar / Baijnath",
      "recommendedSubject": "Paragliders soaring above the Dhauladhar foothills and Bir tea gardens",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/An_aerial_view_of_Bir%2C_Kangra_valley_sights_nature_culture_Himachal_Pradesh_India_2015.jpg/3840px-An_aerial_view_of_Bir%2C_Kangra_valley_sights_nature_culture_Himachal_Pradesh_India_2015.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Bir",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Billing to Bir",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Bir to Delhi",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "rajasthan-golden-triangle-classic",
    "tripName": "Golden Triangle Heritage Circuit (Delhi, Agra & Jaipur)",
    "destination": "Rajasthan",
    "imageKitFolder": "tripkario/itineraries/rajasthan/rajasthan-golden-triangle-classic",
    "hero": {
      "requiredLocation": "Taj Mahal / Agra Fort / Jaipur City Palace / Hawa Mahal",
      "recommendedSubject": "Taj Mahal white marble dome reflecting in calm lotus pool at sunrise",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Delhi",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Agra",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Jaipur",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "kashmir-paradise-4d",
    "tripName": "Paradise of Kashmir Short Getaway",
    "destination": "Kashmir",
    "imageKitFolder": "tripkario/itineraries/kashmir/kashmir-paradise-4d",
    "hero": {
      "requiredLocation": "Nigeen Lake / Dal Lake / Srinagar / Gulmarg",
      "recommendedSubject": "Nigeen Lake tranquil waters and cedar wood carved houseboats",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Nagin_Lake_%28Srinagar%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Srinagar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Gulmarg",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Srinagar",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "kashmir-awesome-6d",
    "tripName": "Awesome Kashmir Valley Circuit",
    "destination": "Kashmir",
    "imageKitFolder": "tripkario/itineraries/kashmir/kashmir-awesome-6d",
    "hero": {
      "requiredLocation": "Gulmarg Gondola / Mount Apharwat / Srinagar / Pahalgam",
      "recommendedSubject": "Gulmarg Gondola cable car ascending to Mount Apharwat snow bowl",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Gulmarg_gondola.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Srinagar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Pahalgam",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Pahalgam",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "kashmir-circle-6d",
    "tripName": "Kashmir Grand Scenic Circle",
    "destination": "Kashmir",
    "imageKitFolder": "tripkario/itineraries/kashmir/kashmir-circle-6d",
    "hero": {
      "requiredLocation": "Yusmarg / Doodhganga / Nilnag Lake / Badgam",
      "recommendedSubject": "Rolling green pastures and pine ridges of Yusmarg meadow",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Yousmarg.jpg/3840px-Yousmarg.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Srinagar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Yusmarg",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Pahalgam",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "kashmir-triangle-5d",
    "tripName": "Kashmir Golden Triangle Express",
    "destination": "Kashmir",
    "imageKitFolder": "tripkario/itineraries/kashmir/kashmir-triangle-5d",
    "hero": {
      "requiredLocation": "Betaab Valley / Lidder River / Aru Valley / Pahalgam",
      "recommendedSubject": "Lidder River mountain rapids flowing through Betaab Valley, Pahalgam",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Betaab_Valley.jpg/3840px-Betaab_Valley.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Srinagar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Gulmarg",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Pahalgam",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "ladakh-turtuk-siachen-9d",
    "tripName": "Ladakh with Turtuk & Siachen Base Camp",
    "destination": "Ladakh",
    "imageKitFolder": "tripkario/itineraries/ladakh/ladakh-turtuk-siachen-9d",
    "hero": {
      "requiredLocation": "Turtuk / Shyok River / Hunder / Nubra Valley",
      "recommendedSubject": "Green apricot orchards and ancient Balti stone village of Turtuk",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/River_Shyok%2C_Turtuk_Village%2C_Ladakh.JPG/3840px-River_Shyok%2C_Turtuk_Village%2C_Ladakh.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Leh",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Leh",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Nubra Valley",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "ladakh-zanskar-shinkula-10d",
    "tripName": "Zanskar Valley & Shinku La Expedition",
    "destination": "Ladakh",
    "imageKitFolder": "tripkario/itineraries/ladakh/ladakh-zanskar-shinkula-10d",
    "hero": {
      "requiredLocation": "Phuktal Gompa / Padum / Shinku La Pass / Zanskar Valley",
      "recommendedSubject": "Miraculous Phuktal cave monastery built into vertical limestone cliff",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Cave_Buildings_Phuktal_Gompa_Oct22_A7C_04465.jpg/3840px-Cave_Buildings_Phuktal_Gompa_Oct22_A7C_04465.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Jispa",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Purne",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Phugtal",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "spiti-pin-valley-mudh-9d",
    "tripName": "Spiti Valley with Pin Valley & Mudh Village",
    "destination": "Spiti Valley",
    "imageKitFolder": "tripkario/itineraries/spiti/spiti-pin-valley-mudh-9d",
    "hero": {
      "requiredLocation": "Mudh Village / Pin Valley National Park / Kungri Gompa",
      "recommendedSubject": "Emerald barley fields of Mudh village under purple shale cliffs in Pin Valley",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Morning_scene_in_Thuskeo_Dhar.jpg/3840px-Morning_scene_in_Thuskeo_Dhar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Sarahan",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kalpa",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Tabo",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "meghalaya-caving-adventure-6d",
    "tripName": "Meghalaya Caving & Extreme Waterfalls",
    "destination": "Meghalaya",
    "imageKitFolder": "tripkario/itineraries/meghalaya/meghalaya-caving-adventure-6d",
    "hero": {
      "requiredLocation": "Wei Sawdong Falls / Krem Mawmluh / Cherrapunji",
      "recommendedSubject": "Three-tiered emerald stepped waterfalls of Wei Sawdong in rainforest canyon",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Wei_Sawdong_Waterfall_3.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Shillong",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Cherrapunji",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Nongriat",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "tawang-kaziranga-circuit-8d",
    "tripName": "Tawang High Passes & Kaziranga Safari Circuit",
    "destination": "Tawang & Arunachal",
    "imageKitFolder": "tripkario/itineraries/tawang/tawang-kaziranga-circuit-8d",
    "hero": {
      "requiredLocation": "Nuranang Falls / Jung / Tawang / Kaziranga",
      "recommendedSubject": "100-meter roaring cascade of Nuranang (Jung) Falls crashing down granite cliffs",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Nuranang_Waterfall.jpg/3840px-Nuranang_Waterfall.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Kaziranga",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Bhalukpong",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Dirang",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "himachal-hampta-chandratal-6d",
    "tripName": "Hampta Pass & Chandratal Glacial Trek",
    "destination": "Himachal Pradesh",
    "imageKitFolder": "tripkario/itineraries/himachal/himachal-hampta-chandratal-6d",
    "hero": {
      "requiredLocation": "Chandratal Lake / Hampta Pass / Chattru / Spiti",
      "recommendedSubject": "Crescent shaped turquoise glacial waters of Chandratal lake in Spiti Valley",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Chandratal_1.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Chika",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Balu Ka Ghera",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Hampta Pass",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "himachal-malana-magic-valley-4d",
    "tripName": "Malana & Magic Valley Alpine Trek",
    "destination": "Himachal Pradesh",
    "imageKitFolder": "tripkario/itineraries/himachal/himachal-malana-magic-valley-4d",
    "hero": {
      "requiredLocation": "Waichin Valley / Malana / Jari / Parvati",
      "recommendedSubject": "Hidden mountain amphitheater and chalets of Waichin Valley above Malana",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Malana_Village_during_sunset.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Kasol",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Magic Valley",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Malana",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "south-india-delights-10d",
    "tripName": "South India Delights Grand Circuit",
    "destination": "South India",
    "imageKitFolder": "tripkario/itineraries/south-india/south-india-delights-10d",
    "hero": {
      "requiredLocation": "Meenakshi Amman Temple / Madurai / Tanjore / Trichy",
      "recommendedSubject": "Towering multi-colored sculptural gopurams of historic Meenakshi Amman Temple in Madurai",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg/3840px-An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Bangalore",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Tirupati",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Mysore",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "south-colors-of-south-10d",
    "tripName": "Colors of South India Circuit",
    "destination": "South India",
    "imageKitFolder": "tripkario/itineraries/south-india/south-colors-of-south-10d",
    "hero": {
      "requiredLocation": "Mysore Palace / Chamundi Hill / Bangalore / Ooty",
      "recommendedSubject": "Illuminated golden facade of grand Mysore Palace with thousands of bulbs at night",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mysore_Palace_Morning.jpg/3840px-Mysore_Palace_Morning.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Bangalore",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Coorg",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Coorg",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "south-culture-cum-beach-7d",
    "tripName": "South Indian Culture & Beach Tour",
    "destination": "South India",
    "imageKitFolder": "tripkario/itineraries/south-india/south-culture-cum-beach-7d",
    "hero": {
      "requiredLocation": "Vivekananda Rock Memorial / Thiruvalluvar Statue / Kanyakumari / Rameshwaram",
      "recommendedSubject": "Vivekananda Rock Memorial and Thiruvalluvar Statue standing in the sea at Kanyakumari",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b6/RockMemorial.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Madurai",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Rameshwaram",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kanyakumari",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "south-vacation-to-south-8d",
    "tripName": "A Vacation to South India",
    "destination": "South India",
    "imageKitFolder": "tripkario/itineraries/south-india/south-vacation-to-south-8d",
    "hero": {
      "requiredLocation": "Pillar Rocks / Kodaikanal Lake / Coaker Walk / Kodaikanal",
      "recommendedSubject": "Dramatic towering Pillar Rocks rising through silver mountain mist in Kodaikanal",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/8/87/Mist_and_valley_1.jpg",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Mysore",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Coorg",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Coorg",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "south-beautiful-journey-9d",
    "tripName": "A Beautiful Journey to South",
    "destination": "South India",
    "imageKitFolder": "tripkario/itineraries/south-india/south-beautiful-journey-9d",
    "hero": {
      "requiredLocation": "Dolphin Nose Viewpoint / Catherine Falls / Coonoor / Ooty",
      "recommendedSubject": "Sweeping view of Catherine Falls and Nilgiri tea valleys from Dolphin Nose in Coonoor",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/5/52/Dolphins_Nose_Coonoor.jpg",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Bangalore",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Coorg",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Coorg",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "south-bangalore-ooty-5d",
    "tripName": "Bangalore & Ooty Nilgiri Getaway",
    "destination": "South India",
    "imageKitFolder": "tripkario/itineraries/south-india/south-bangalore-ooty-5d",
    "hero": {
      "requiredLocation": "Pykara Lake & Falls / Ooty Lake / Doddabetta / Bangalore",
      "recommendedSubject": "Serene Pykara waterfalls cascading into pine forested mountain lake near Ooty",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/2/29/Pykara_Temple.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Bangalore",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Ooty",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Ooty",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "south-mysore-ooty-6d",
    "tripName": "Mysore Palace & Ooty Mountain Escape",
    "destination": "South India",
    "imageKitFolder": "tripkario/itineraries/south-india/south-mysore-ooty-6d",
    "hero": {
      "requiredLocation": "Chamundi Hill Viewpoint / Mysore Palace / Ooty / Bandipur",
      "recommendedSubject": "Panoramic vista from Chamundi Hill viewpoint overlooking Mysore heritage city",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/5/59/J.C.Nagar_Welcome_Board_to_Chamundi_Hills.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Mysore",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Mysore",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Ooty",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "south-coorg-mysore-ooty-6d",
    "tripName": "Coorg, Mysore & Ooty Golden Triangle",
    "destination": "South India",
    "imageKitFolder": "tripkario/itineraries/south-india/south-coorg-mysore-ooty-6d",
    "hero": {
      "requiredLocation": "Abbey Falls / Madikeri / Mysore Palace / Ooty",
      "recommendedSubject": "Abbey Falls cascading violently through dense cardamom and coffee plantations in Coorg",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Abbey_Falls_New.jpg/3840px-Abbey_Falls_New.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Coorg",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Coorg",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Mysore",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "south-bangalore-mysore-coorg-5d",
    "tripName": "Bangalore, Mysore & Coorg Heritage Trail",
    "destination": "South India",
    "imageKitFolder": "tripkario/itineraries/south-india/south-bangalore-mysore-coorg-5d",
    "hero": {
      "requiredLocation": "Bangalore Palace / Mysore Palace / Coorg Coffee Estates / Bylakuppe",
      "recommendedSubject": "Tudor style architecture and fortified battlements of historic Bangalore Palace",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Bangalore_Mysore_Maharaja_Palace.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Mysore",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Coorg",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Coorg",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "kerala-honeymoon-special-5d",
    "tripName": "Kerala Honeymoon Special with Private Houseboat",
    "destination": "Kerala",
    "imageKitFolder": "tripkario/itineraries/kerala/kerala-honeymoon-special-5d",
    "hero": {
      "requiredLocation": "Vembanad Lake / Kumarakom / Alleppey / Kochi",
      "recommendedSubject": "Sunset over coconut lagoons and serene waters of Vembanad Lake from private houseboat",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Kumarkom.jpg/3840px-Kumarkom.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Munnar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Munnar",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Thekkady",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "goa-honeymoon-beach-4d",
    "tripName": "Goa Honeymoon Beach Escape",
    "destination": "Goa",
    "imageKitFolder": "tripkario/itineraries/goa/goa-honeymoon-beach-4d",
    "hero": {
      "requiredLocation": "Cabo de Rama Fort / Agonda Beach / Palolem Beach / South Goa",
      "recommendedSubject": "Secluded clifftop ocean viewpoint overlooking turquoise Arabian Sea at Cabo de Rama",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Cabo_de_Rama_Entrance.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "South Goa",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Panjim",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Palolem",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "uttarakhand-chardham-haridwar-10d",
    "tripName": "Chardham Sacred Yatra from Haridwar",
    "destination": "Uttarakhand",
    "imageKitFolder": "tripkario/itineraries/uttarakhand/uttarakhand-chardham-haridwar-10d",
    "hero": {
      "requiredLocation": "Har Ki Pauri / Haridwar / Rishikesh / Chardham Ghats",
      "recommendedSubject": "Grand evening Ganga Aarti with thousands of floating brass lamps at Har Ki Pauri ghats",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Evening_view_of_Har-ki-Pauri%2C_Haridwar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Barkot",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Yamunotri",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Uttarkashi",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "uttarakhand-nainital-mussoorie-corbett-6d",
    "tripName": "Nainital, Mussoorie & Corbett Wildlife Tour",
    "destination": "Uttarakhand",
    "imageKitFolder": "tripkario/itineraries/uttarakhand/uttarakhand-nainital-mussoorie-corbett-6d",
    "hero": {
      "requiredLocation": "Naini Lake / Nainital / Mussoorie / Corbett",
      "recommendedSubject": "Crescent-shaped Naini Lake with colorful sailing boats surrounded by Kumaon hills",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/2/28/The_Boat_and_The_Lake.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Nainital",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Nainital",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Corbett",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "uttarakhand-kumaon-hills-kausani-6d",
    "tripName": "The Best of Kumaon Hills & Kausani",
    "destination": "Uttarakhand",
    "imageKitFolder": "tripkario/itineraries/uttarakhand/uttarakhand-kumaon-hills-kausani-6d",
    "hero": {
      "requiredLocation": "Kausani Viewpoint / Nanda Devi View / Trishul Peak / Bageshwar",
      "recommendedSubject": "Grand 300-km Himalayan panorama of Trishul and Nanda Devi peaks from Kausani",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Sunrise_from_Kausani%2C_Almora%2C_Uttarakhand%2C_India.jpg/3840px-Sunrise_from_Kausani%2C_Almora%2C_Uttarakhand%2C_India.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Nainital",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Nainital",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kausani",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "uttarakhand-auli-snow-skiing-5d",
    "tripName": "Winter Auli Snow & Skiing Tour",
    "destination": "Uttarakhand",
    "imageKitFolder": "tripkario/itineraries/uttarakhand/uttarakhand-auli-snow-skiing-5d",
    "hero": {
      "requiredLocation": "Auli Ski Slopes / Joshimath / Nanda Devi / Gorson Bugyal",
      "recommendedSubject": "Snow draped ski slopes of Auli with majestic view of Mount Nanda Devi",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Auli_Ski_Resort_Uttarakhand.jpg",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Joshimath",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Auli",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Auli",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "uttarakhand-nainital-lake-escape-4d",
    "tripName": "03 Nights in Nainital Lake Escape",
    "destination": "Uttarakhand",
    "imageKitFolder": "tripkario/itineraries/uttarakhand/uttarakhand-nainital-lake-escape-4d",
    "hero": {
      "requiredLocation": "Bhimtal Lake / Sattal / Nainital / Naukuchiatal",
      "recommendedSubject": "Serene blue waters of Bhimtal lake with emerald green hills and central island",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lake_Bhimtal.jpg/3840px-Lake_Bhimtal.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Nainital",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Nainital",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Nainital",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "rajasthan-royal-forts-desert-8d",
    "tripName": "Royal Rajasthan Grand Forts & Desert Circuit",
    "destination": "Rajasthan",
    "imageKitFolder": "tripkario/itineraries/rajasthan/rajasthan-royal-forts-desert-8d",
    "hero": {
      "requiredLocation": "Jaisalmer Fort / Sam Sand Dunes / Mehrangarh Fort / Jodhpur",
      "recommendedSubject": "Golden Jaisalmer Fort rising above the undulating dunes of Thar Desert with camels",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/4/47/Jaisalmer_forteresse.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Jaipur",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Jaipur",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Jodhpur",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "rajasthan-golden-triangle-ranthambore-6d",
    "tripName": "Golden Triangle with Ranthambore Tiger Safari",
    "destination": "Rajasthan",
    "imageKitFolder": "tripkario/itineraries/rajasthan/rajasthan-golden-triangle-ranthambore-6d",
    "hero": {
      "requiredLocation": "Ranthambore Tiger Reserve / Padam Talao / Jaipur / Agra",
      "recommendedSubject": "Royal Bengal Tiger walking past ancient banyan tree roots near Padam Talao in Ranthambore",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Ranthambore_National_Park.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Agra",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Ranthambore",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Ranthambore",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "andaman-exotic-beach-scuba-6d",
    "tripName": "Andaman Exotic Beach & Scuba Expedition",
    "destination": "Andaman",
    "imageKitFolder": "tripkario/itineraries/andaman/andaman-exotic-beach-scuba-6d",
    "hero": {
      "requiredLocation": "Elephant Beach Coral Reef / Havelock Island / Neil Island / Baratang",
      "recommendedSubject": "Vibrant tropical coral reef and marine life in turquoise waters of Havelock",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Havelock%2C_Andaman_%26_Nicobar_Islands.JPG/3840px-Havelock%2C_Andaman_%26_Nicobar_Islands.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Port Blair",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Havelock",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Havelock",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "northeast-kaziranga-majuli-5d",
    "tripName": "Kaziranga Rhino Safari & Majuli Island Culture",
    "destination": "Northeast",
    "imageKitFolder": "tripkario/itineraries/northeast/northeast-kaziranga-majuli-5d",
    "hero": {
      "requiredLocation": "Majuli River Island / Brahmaputra River / Kaziranga / Jorhat",
      "recommendedSubject": "Tranquil Brahmaputra river sunset with country boats at Majuli cultural river island",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Doriya_River_of_Majuli.jpg/3840px-Doriya_River_of_Majuli.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Kaziranga",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kaziranga",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Majuli",
        "status": "NEEDS_SOURCE"
      }
    ]
  },
  {
    "tripId": "bengal-sundarbans-mangrove-safari-3d",
    "tripName": "Sundarbans Mangrove Royal Bengal Tiger Safari",
    "destination": "West Bengal",
    "imageKitFolder": "tripkario/itineraries/bengal/bengal-sundarbans-mangrove-safari-3d",
    "hero": {
      "requiredLocation": "Sajnekhali Watchtower / Sundarbans Delta / Dobanki / Kolkata",
      "recommendedSubject": "Dense tidal mangrove channels and wildlife watchtower deep inside Sundarbans Delta",
      "replacementCategory": "EXACT_LANDMARK",
      "sourceUrl": "https://upload.wikimedia.org/wikipedia/commons/2/23/Sundarban_Tiger.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
      "status": "NEEDS_UPLOAD"
    },
    "gallery": [
      {
        "location": "Sundarbans",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Sundarbans",
        "status": "NEEDS_SOURCE"
      },
      {
        "location": "Kolkata",
        "status": "NEEDS_SOURCE"
      }
    ]
  }
];
