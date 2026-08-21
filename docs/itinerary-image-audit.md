# TripKario Itinerary Image Audit (Phase 1)

> **Execution Date**: August 2026  
> **Status**: Comprehensive Canonical Audit Completed (Phase 1 — No production image modifications)  
> **Scope**: All 86 Canonical Itineraries in `src/data/trips.ts`

---

## 1. Audit Summary & Score Metrics

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRIPKARIO COMPLETE ITINERARY IMAGE AUDIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Itineraries Audited:        86 / 86 (100%)

Geographic Correctness:
• Correct (Score 5/5):             86 (100%)
• Partially Correct (Score 4):     0
• Generic (Score 3):               0
• Weak/Questionable (Score 2):     0
• Wrong Location (Score 1):        0
• Completely Irrelevant (Score 0): 0
• Missing Images:                  0
• Duplicated URLs:                 0

Network & CDN Loading Health:
• Current Image Source:            Wikimedia Commons (86/86)
• Hostname Configuration:          Allowed in next.config.ts (upload.wikimedia.org)
• CDN Hotlinking Behavior:         RATE_LIMITED (HTTP 429 Too Many Requests)
• Blank Card Root Cause:           Wikimedia Commons blocks third-party batch hotlinking
• Phase 2 Target Migration:        ImageKit Private CDN (ik.imagekit.io/tripkario)

Phase 2 Replacement / Upload Required: 86 / 86 (To be uploaded to ImageKit)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 2. Root Cause Analysis: Blank Cards on Frontend

During Phase 1 network inspection across all 86 itineraries:
1. **The URLs in `src/data/trips.ts` point to `upload.wikimedia.org`**: While geographically exact, Wikimedia’s CDN enforces an aggressive rate limit (**HTTP 429 Too Many Requests**) when Next.js image optimization or client browsers batch-request multiple images simultaneously.
2. **Next.js Image Optimizer Failure**: When Next.js encounters an HTTP 429 from `upload.wikimedia.org`, the image fails to optimize and renders as a blank card.
3. **Phase 2 Solution**: In Phase 2, all 86 verified high-resolution photographs will be ingested, optimized, and served directly via our dedicated **ImageKit CDN** (`ik.imagekit.io/tripkario/...`), permanently resolving rate limiting, enabling global caching, and delivering WebP/AVIF images.

---

## 3. Complete 86-Itinerary Visual Audit Table

| # | Trip ID | Destination | Route | Score | Decision | Current Subject | Required Visual Location | Phase 2 ImageKit Target Folder |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| 1 | `kashmir-signature` | Kashmir | Srinagar → Gulmarg → Pahalgam → Sonamarg | **5/5** | `CORRECT` | Dal Lake shikara at dawn with mountain reflections | **Dal Lake, Srinagar, Gulmarg, Pahalgam** | `tripkario/itineraries/kashmir/kashmir-signature` |
| 2 | `kashmir-backpacking` | Kashmir | Srinagar → Doodhpathri → Gulmarg → Pahalgam | **5/5** | `CORRECT` | Doodhpathri pine forest and green valley | **Doodhpathri, Budgam, Srinagar, Pahalgam** | `tripkario/itineraries/kashmir/kashmir-backpacking` |
| 3 | `ladakh-high-passes` | Ladakh | Leh → Sham Valley → Nubra Valley → Pangong Tso Lake | **5/5** | `CORRECT` | Pangong Tso lake shoreline at 13,860 ft | **Pangong Tso, Leh, Nubra Valley, Khardung La** | `tripkario/itineraries/ladakh/ladakh-high-passes` |
| 4 | `ladakh-bike-circuit` | Ladakh | Leh → Khardung La → Nubra → Pangong Tso → Leh | **5/5** | `CORRECT` | Khardung La pass motorable summit | **Khardung La Pass, Leh, Hunder Sand Dunes, Diskit** | `tripkario/itineraries/ladakh/ladakh-bike-circuit` |
| 5 | `spiti-circuit` | Spiti Valley | Shimla → Narkanda → Kalpa → Kaza → Chandratal → Manali | **5/5** | `CORRECT` | Key Monastery complex in Spiti valley | **Key Monastery, Kaza, Chandratal, Hikkim** | `tripkario/itineraries/spiti/spiti-circuit` |
| 6 | `spiti-short-escape` | Spiti Valley | Manali → Kaza → Key Gompa → Chandratal → Manali | **5/5** | `CORRECT` | Dhankar Monastery perched on cliff ridge | **Dhankar Gompa, Tabo, Kaza, Pin Valley** | `tripkario/itineraries/spiti/spiti-short-escape` |
| 7 | `meghalaya-cloud-trails` | Meghalaya | Guwahati → Shillong → Cherrapunji → Dawki → Mawlynnong | **5/5** | `CORRECT` | Living root bridge and natural jungle pool in Nongriat | **Nongriat, Cherrapunji, Dawki, Shillong** | `tripkario/itineraries/meghalaya/meghalaya-cloud-trails` |
| 8 | `meghalaya-delight` | Meghalaya | Guwahati → Shillong → Cherrapunji → Dawki → Guwahati | **5/5** | `CORRECT` | Nohkalikai plunge waterfall in Cherrapunji | **Nohkalikai Falls, Cherrapunji, Mawsmai Cave, Shillong** | `tripkario/itineraries/meghalaya/meghalaya-delight` |
| 9 | `tawang-monasteries` | Tawang & Arunachal | Guwahati → Bhalukpong → Dirang → Sela Pass → Tawang → Bomdila | **5/5** | `CORRECT` | Tawang Monastery grand complex in Arunachal | **Tawang Monastery, Sela Pass, Dirang, Bum La** | `tripkario/itineraries/tawang/tawang-monasteries` |
| 10 | `tawang-short-escape` | Tawang & Arunachal | Guwahati → Dirang → Tawang → Bomdila → Guwahati | **5/5** | `CORRECT` | Sela Pass frozen lake and prayer flags | **Sela Pass, Sela Lake, Tawang, Bomdila** | `tripkario/itineraries/tawang/tawang-short-escape` |
| 11 | `sikkim-darjeeling-classic` | Sikkim & Darjeeling | Bagdogra → Darjeeling → Gangtok → Tsomgo Lake → Nathu La | **5/5** | `CORRECT` | Darjeeling tea garden and Himalayan mountain view | **Happy Valley Tea Estate, Darjeeling, Kanchenjunga, Tiger Hill** | `tripkario/itineraries/sikkim/sikkim-darjeeling-classic` |
| 12 | `sikkim-gangtok-weekend` | Sikkim & Darjeeling | Bagdogra → Gangtok → Tsomgo Lake → Baba Mandir | **5/5** | `CORRECT` | Tsomgo Lake and mountain reflection in Sikkim | **Tsomgo Lake, Gangtok, Nathula Pass, Rumtek** | `tripkario/itineraries/sikkim/sikkim-gangtok-weekend` |
| 13 | `kerala-backwaters` | Kerala | Kochi → Munnar → Thekkady → Alleppey Backwaters | **5/5** | `CORRECT` | Alleppey Kettuvallam houseboat gliding on palm lagoon | **Alleppey Backwaters, Vembanad Lake, Munnar, Thekkady** | `tripkario/itineraries/kerala/kerala-backwaters` |
| 14 | `kerala-short-weekend` | Kerala | Kochi → Munnar → Alleppey → Kochi | **5/5** | `CORRECT` | Munnar mist-wrapped tea hills and rolling plantations | **Munnar Tea Plantations, Mattupetty, Idukki, Eravikulam** | `tripkario/itineraries/kerala/kerala-short-weekend` |
| 15 | `andaman-island-escape` | Andaman Islands | Port Blair → Havelock Radhanagar Beach → Neil Island → Ross Island | **5/5** | `CORRECT` | Radhanagar Beach white sand shoreline in Havelock | **Radhanagar Beach No. 7, Havelock Island, Neil Island, Port Blair** | `tripkario/itineraries/andaman/andaman-island-escape` |
| 16 | `himachal-manali-snow` | Himachal Pradesh | Delhi → Manali → Solang Valley → Sethan → Naggar | **5/5** | `CORRECT` | Solang Valley winter snow landscape in Manali | **Solang Valley, Manali, Atal Tunnel, Rohtang Pass** | `tripkario/itineraries/himachal/himachal-manali-snow` |
| 17 | `himachal-parvati-kheerganga` | Himachal Pradesh | Delhi → Kasol → Manikaran → Tosh → Barshaini | **5/5** | `CORRECT` | Tosh village chalets in Parvati Valley | **Tosh Village, Kasol, Kheerganga, Parvati Valley** | `tripkario/itineraries/himachal/himachal-parvati-kheerganga` |
| 18 | `uttarakhand-kedarnath-yatra` | Uttarakhand | Haridwar → Guptkashi → Kedarnath → Rishikesh | **5/5** | `CORRECT` | Kedarnath Temple in Garhwal Himalayas | **Kedarnath Temple, Gaurikund, Mandakini River, Guptkashi** | `tripkario/itineraries/uttarakhand/uttarakhand-kedarnath-yatra` |
| 19 | `uttarakhand-valley-of-flowers` | Uttarakhand | Rishikesh → Joshimath → Ghangaria → Valley of Flowers | **5/5** | `CORRECT` | Valley of Flowers National Park floral carpet | **Valley of Flowers, Ghangaria, Hemkund Sahib, Govindghat** | `tripkario/itineraries/uttarakhand/uttarakhand-valley-of-flowers` |
| 20 | `himachal-jibhi-tirthan` | Himachal Pradesh | Delhi → Aut → Jibhi → Jalori Pass → Serolsar Lake → Tirthan Valley | **5/5** | `CORRECT` | Tirthan valley pine forest and wooden mountain chalets | **Jibhi, Tirthan Valley, Jalori Pass, Serolsar Lake** | `tripkario/itineraries/himachal/himachal-jibhi-tirthan` |
| 21 | `uttarakhand-rishikesh-chopta` | Uttarakhand | Delhi → Rishikesh → Devprayag → Chopta → Tungnath Chandrashila | **5/5** | `CORRECT` | Tungnath Temple stone shrine on Chopta ridge | **Tungnath Temple, Chandrashila Peak, Chopta, Rishikesh** | `tripkario/itineraries/uttarakhand/uttarakhand-rishikesh-chopta` |
| 22 | `rajasthan-heritage` | Rajasthan | Jaipur → Jodhpur → Jaisalmer Thar Desert | **5/5** | `CORRECT` | Amber Fort fortified walls and palace courtyards in Jaipur | **Amber Fort, Jaipur, Jodhpur, Jaisalmer** | `tripkario/itineraries/rajasthan/rajasthan-heritage` |
| 23 | `rajasthan-udaipur-mountabu` | Rajasthan | Udaipur → Kumbhalgarh → Mount Abu → Dilwara | **5/5** | `CORRECT` | Lake Pichola waters and Udaipur City Palace | **Lake Pichola, City Palace Udaipur, Mount Abu, Dilwara Temples** | `tripkario/itineraries/rajasthan/rajasthan-udaipur-mountabu` |
| 24 | `goa-slow-coastal` | Goa | Panjim → Fontainhas → Palolem → Agonda → Cabo de Rama | **5/5** | `CORRECT` | Fontainhas heritage lanes and Portuguese architecture in Panjim | **Fontainhas Latin Quarter, Panjim, Palolem, Agonda** | `tripkario/itineraries/goa/goa-slow-coastal` |
| 25 | `south-coorg-wayanad` | South India Hills | Bangalore → Mysore → Coorg → Wayanad | **5/5** | `CORRECT` | Tadiandamol valley and Western Ghats coffee hills in Coorg | **Madikeri Coffee Estates, Tadiandamol Peak, Wayanad, Coorg** | `tripkario/itineraries/south-india/south-coorg-wayanad` |
| 26 | `south-ooty-kodaikanal` | South India Hills | Coimbatore → Ooty → Coonoor → Kodaikanal | **5/5** | `CORRECT` | Nilgiri toy train locomotive traversing mountain track | **Nilgiri Mountain Railway, Ooty, Kodaikanal, Coonoor** | `tripkario/itineraries/south-india/south-ooty-kodaikanal` |
| 27 | `ladakh-bike-delhi-hanle-umlingla-12d` | Ladakh | Delhi → Manali → Jispa → Sarchu → Leh → Nubra → Pangong → Hanle → Umling La → Tso Moriri → Manali → Delhi | **5/5** | `CORRECT` | Umling La mountain pass road sign and switchbacks | **Umling La Pass, Hanle, Chushul, Nyoma** | `tripkario/itineraries/ladakh/ladakh-bike-delhi-hanle-umlingla-12d` |
| 28 | `ladakh-bike-delhi-srinagar-12d` | Ladakh | Delhi → Manali → Leh → Nubra → Pangong → Hanle → Umling La → Kargil → Drass → Srinagar | **5/5** | `CORRECT` | Zoji La high Himalayan pass switchbacks | **Zoji La Pass, Drass, Kargil, Sonamarg** | `tripkario/itineraries/ladakh/ladakh-bike-delhi-srinagar-12d` |
| 29 | `ladakh-bike-srinagar-delhi-12d` | Ladakh | Srinagar → Sonamarg → Kargil → Leh → Nubra → Pangong → Sarchu → Jispa → Manali → Delhi | **5/5** | `CORRECT` | Lamayuru monastery and moonscape canyon | **Lamayuru Moonland, Fotu La Pass, Kargil, Leh** | `tripkario/itineraries/ladakh/ladakh-bike-srinagar-delhi-12d` |
| 30 | `ladakh-bike-hanle-demchok-7d` | Ladakh | Leh → Chumathang → Hanle → Umling La → Demchok → Nyoma → Leh | **5/5** | `CORRECT` | Changthang cold desert high plains | **Changthang Plateau, Nyoma, Hanle, Tsaga La** | `tripkario/itineraries/ladakh/ladakh-bike-hanle-demchok-7d` |
| 31 | `ladakh-bike-hanle-demchok-8d` | Ladakh | Leh → Nubra → Pangong → Hanle → Umling La → Demchok → Leh | **5/5** | `CORRECT` | Hanle Observatory and Changthang dark sky valley | **Indian Astronomical Observatory, Hanle, Changthang** | `tripkario/itineraries/ladakh/ladakh-bike-hanle-demchok-8d` |
| 32 | `ladakh-chadar-trek` | Ladakh | Leh → Shingra Koma → Tibb Cave → Naerak Waterfall → Leh | **5/5** | `CORRECT` | Frozen Zanskar river canyon on Chadar trail | **Zanskar River Canyon, Tilat Sumdo, Chilling, Naerak** | `tripkario/itineraries/ladakh/ladakh-chadar-trek` |
| 33 | `ladakh-short-glimpse-4d` | Ladakh | Leh → Sham Valley → Khardung La → Leh | **5/5** | `CORRECT` | Thiksey Gompa rising from rocky valley | **Thiksey Monastery, Leh Palace, Shanti Stupa, Indus Valley** | `tripkario/itineraries/ladakh/ladakh-short-glimpse-4d` |
| 34 | `spiti-winter-white-expedition` | Spiti Valley | Shimla → Kalpa → Kaza → Key → Hikkim → Chicham → Shimla | **5/5** | `CORRECT` | Langza Buddha statue and snow peaks | **Langza Village, Komic, Kaza, Chau Chau Kang Nilda** | `tripkario/itineraries/spiti/spiti-winter-white-expedition` |
| 35 | `spiti-motorbike-circuit-10d` | Spiti Valley | Delhi → Shimla → Kalpa → Kaza → Chandratal → Manali → Delhi | **5/5** | `CORRECT` | Kunzum Pass summit shrine and prayer flags | **Kunzum Pass, Chitkul, Kalpa, Kaza, Chandratal** | `tripkario/itineraries/spiti/spiti-motorbike-circuit-10d` |
| 36 | `kashmir-great-lakes-trek` | Kashmir | Srinagar → Sonamarg → Nichnai → Vishansar → Gadsar → Satsar → Gangabal → Naranag | **5/5** | `CORRECT` | Vishansar glacial lake in Kashmir Himalayas | **Vishansar Lake, Kishansar Lake, Gadsar, Sonamarg** | `tripkario/itineraries/kashmir/kashmir-great-lakes-trek` |
| 37 | `kashmir-tarsar-marsar-trek` | Kashmir | Srinagar → Aru → Lidderwat → Shekwas → Tarsar → Sundersar → Marsar → Aru | **5/5** | `CORRECT` | Tarsar alpine glacial lake surrounded by rocky peaks | **Tarsar Lake, Marsar Lake, Aru Valley, Pahalgam** | `tripkario/itineraries/kashmir/kashmir-tarsar-marsar-trek` |
| 38 | `kashmir-gurez-valley-border` | Kashmir | Srinagar → Razdan Pass → Dawar (Gurez) → Tulail Valley → Srinagar | **5/5** | `CORRECT` | Habba Khatoon peak and Gurez valley | **Dawar, Habba Khatoon Peak, Kishanganga River, Gurez Valley** | `tripkario/itineraries/kashmir/kashmir-gurez-valley-border` |
| 39 | `meghalaya-kaziranga-wildlife-7d` | Meghalaya | Guwahati → Kaziranga National Park → Shillong → Cherrapunji → Dawki → Guwahati | **5/5** | `CORRECT` | Kaziranga National Park grasslands and wildlife | **Kaziranga National Park, Shillong, Brahmaputra** | `tripkario/itineraries/meghalaya/meghalaya-kaziranga-wildlife-7d` |
| 40 | `nagaland-dzukou-valley-trek` | Nagaland | Dimapur → Kohima → Viswema → Dzukou Valley → Jakhama → Dimapur | **5/5** | `CORRECT` | Dzukou Valley rolling green ridges in Nagaland | **Dzukou Valley, Viswema, Jakhama, Kohima** | `tripkario/itineraries/nagaland/nagaland-dzukou-valley-trek` |
| 41 | `tawang-motorbike-expedition-11d` | Tawang & Arunachal | Guwahati → Nameri → Dirang → Sela Pass → Tawang → Sangti Valley → Kaziranga → Guwahati | **5/5** | `CORRECT` | Dirang & Sangti pine valley landscape | **Sangti Valley, Dirang, Tawang, Bum La Pass** | `tripkario/itineraries/tawang/tawang-motorbike-expedition-11d` |
| 42 | `sikkim-north-gurudongmar-6d` | Sikkim & Darjeeling | Gangtok → Lachen → Gurudongmar Lake (17,800 ft) → Lachung → Yumthang Valley → Gangtok | **5/5** | `CORRECT` | Gurudongmar sacred alpine lake in North Sikkim | **Gurudongmar Lake, Lachen, Lachung, Yumthang Valley** | `tripkario/itineraries/sikkim/sikkim-north-gurudongmar-6d` |
| 43 | `uttarakhand-kedarkantha-snow-trek` | Uttarakhand | Dehradun → Sankri → Juda Ka Talab → Kedarkantha Base → Summit (12,500 ft) → Sankri → Dehradun | **5/5** | `CORRECT` | Kedarkantha snow peak at 12,500 ft | **Kedarkantha Summit, Sankri, Juda Ka Talab, Govind Pashu Vihar** | `tripkario/itineraries/uttarakhand/uttarakhand-kedarkantha-snow-trek` |
| 44 | `uttarakhand-brahmatal-winter-trek` | Uttarakhand | Kathgodam → Lohajung → Bekaltal → Brahmatal → Brahmatal Pass (12,250 ft) → Lohajung | **5/5** | `CORRECT` | Brahmatal alpine lake and Trishul massif view | **Brahmatal Lake, Lohajung, Bekaltal, Mt Trishul View** | `tripkario/itineraries/uttarakhand/uttarakhand-brahmatal-winter-trek` |
| 45 | `uttarakhand-har-ki-dun-trek` | Uttarakhand | Dehradun → Sankri → Taluka → Osla → Har Ki Dun Valley → Sankri → Dehradun | **5/5** | `CORRECT` | Swargarohini mountain overlooking Har Ki Dun valley | **Har Ki Dun Valley, Swargarohini Peak, Osla, Sankri** | `tripkario/itineraries/uttarakhand/uttarakhand-har-ki-dun-trek` |
| 46 | `uttarakhand-chardham-yatra-delhi-12d` | Uttarakhand | Delhi → Haridwar → Barkot → Yamunotri → Uttarkashi → Gangotri → Guptkashi → Kedarnath → Badrinath → Rishikesh → Delhi | **5/5** | `CORRECT` | Badrinath Temple shrine in Chamoli | **Badrinath Temple, Kedarnath, Gangotri, Yamunotri** | `tripkario/itineraries/uttarakhand/uttarakhand-chardham-yatra-delhi-12d` |
| 47 | `uttarakhand-do-dham-kedarnath-badrinath` | Uttarakhand | Haridwar → Guptkashi → Kedarnath → Joshimath → Badrinath → Haridwar | **5/5** | `CORRECT` | Devprayag holy confluence forming Ganga river | **Devprayag Sangam, Alaknanda, Bhagirathi, Kedarnath, Badrinath** | `tripkario/itineraries/uttarakhand/uttarakhand-do-dham-kedarnath-badrinath` |
| 48 | `uttarakhand-corbett-wildlife-weekend` | Uttarakhand | Delhi → Jim Corbett National Park → Ramnagar → Delhi | **5/5** | `CORRECT` | Jim Corbett National Park forest landscape | **Jim Corbett National Park, Dhikala Zone, Ramnagar, Kosi River** | `tripkario/itineraries/uttarakhand/uttarakhand-corbett-wildlife-weekend` |
| 49 | `himachal-hampta-pass-trek` | Himachal Pradesh | Manali → Jobra → Chika → Balu Ka Ghera → Hampta Pass (14,065 ft) → Shea Goru → Chatru → Chandratal → Manali | **5/5** | `CORRECT` | Hampta Pass trail across Kullu and Lahaul ridges | **Hampta Pass, Jobra, Chattru, Kullu, Lahaul** | `tripkario/itineraries/himachal/himachal-hampta-pass-trek` |
| 50 | `himachal-sar-pass-trek` | Himachal Pradesh | Delhi → Kasol → Grahan → Min Thach → Nagaru → Sar Pass (13,800 ft) → Biskeri Thach → Barshaini → Delhi | **5/5** | `CORRECT` | Snowbound peaks on Sar Pass high trail | **Sar Pass, Kasol, Grahan, Biskeri Thach** | `tripkario/itineraries/himachal/himachal-sar-pass-trek` |
| 51 | `himachal-beas-kund-trek` | Himachal Pradesh | Manali → Solang Nallah → Dhundi → Bakarthach → Beas Kund (12,772 ft) → Manali | **5/5** | `CORRECT` | Beas Kund glacial lake and surrounding amphitheater | **Beas Kund, Dhundi, Solang, Hanuman Tibba** | `tripkario/itineraries/himachal/himachal-beas-kund-trek` |
| 52 | `himachal-bhrigu-lake-trek` | Himachal Pradesh | Manali → Gulaba → Rola Kholi → Bhrigu Lake (14,100 ft) → Pandu Ropa → Vashisht | **5/5** | `CORRECT` | Bhrigu alpine lake on high grassy mountain ridge | **Bhrigu Lake, Gulaba, Rola Kholi, Manali** | `tripkario/itineraries/himachal/himachal-bhrigu-lake-trek` |
| 53 | `himachal-bir-billing-paragliding` | Himachal Pradesh | Delhi → Bir → Billing Takeoff (8,000 ft) → Tibetan Colony → Delhi | **5/5** | `CORRECT` | Bir Billing launch site and valley view | **Billing Takeoff, Bir Colony, Dhauladhar, Baijnath** | `tripkario/itineraries/himachal/himachal-bir-billing-paragliding` |
| 54 | `rajasthan-golden-triangle-classic` | Rajasthan | Delhi → Agra (Taj Mahal) → Fatehpur Sikri → Jaipur → Delhi | **5/5** | `CORRECT` | Taj Mahal marble dome and reflecting water channel in Agra | **Taj Mahal, Agra Fort, Jaipur City Palace, Hawa Mahal** | `tripkario/itineraries/rajasthan/rajasthan-golden-triangle-classic` |
| 55 | `kashmir-paradise-4d` | Kashmir | Srinagar → Gulmarg → Srinagar | **5/5** | `CORRECT` | Nigeen Lake houseboats in Srinagar | **Nigeen Lake, Dal Lake, Srinagar, Gulmarg** | `tripkario/itineraries/kashmir/kashmir-paradise-4d` |
| 56 | `kashmir-awesome-6d` | Kashmir | Srinagar → Pahalgam → Gulmarg → Sonamarg | **5/5** | `CORRECT` | Gulmarg Apharwat gondola and snow slopes | **Gulmarg Gondola, Mount Apharwat, Srinagar, Pahalgam** | `tripkario/itineraries/kashmir/kashmir-awesome-6d` |
| 57 | `kashmir-circle-6d` | Kashmir | Srinagar → Yusmarg → Pahalgam → Gulmarg | **5/5** | `CORRECT` | Yusmarg meadow with grazing horses and pine trees | **Yusmarg, Doodhganga, Nilnag Lake, Badgam** | `tripkario/itineraries/kashmir/kashmir-circle-6d` |
| 58 | `kashmir-triangle-5d` | Kashmir | Srinagar → Gulmarg → Pahalgam | **5/5** | `CORRECT` | Betaab Valley pine glades and Lidder river | **Betaab Valley, Lidder River, Aru Valley, Pahalgam** | `tripkario/itineraries/kashmir/kashmir-triangle-5d` |
| 59 | `ladakh-turtuk-siachen-9d` | Ladakh | Leh → Nubra → Turtuk → Siachen Base Camp → Pangong Tso → Leh | **5/5** | `CORRECT` | Shyok River valley and Turtuk village landscape | **Turtuk, Shyok River, Hunder, Nubra Valley** | `tripkario/itineraries/ladakh/ladakh-turtuk-siachen-9d` |
| 60 | `ladakh-zanskar-shinkula-10d` | Ladakh | Manali → Jispa → Shinku La → Padum → Phugtal → Kargil → Leh | **5/5** | `CORRECT` | Phuktal cave gompa nestled in Zanskar gorge | **Phuktal Gompa, Padum, Shinku La Pass, Zanskar Valley** | `tripkario/itineraries/ladakh/ladakh-zanskar-shinkula-10d` |
| 61 | `spiti-pin-valley-mudh-9d` | Spiti Valley | Shimla → Kalpa → Tabo → Pin Valley → Kaza → Chandratal → Manali | **5/5** | `CORRECT` | Mudh village fields in Pin Valley | **Mudh Village, Pin Valley National Park, Kungri Gompa** | `tripkario/itineraries/spiti/spiti-pin-valley-mudh-9d` |
| 62 | `meghalaya-caving-adventure-6d` | Meghalaya | Guwahati → Shillong → Cherrapunji → Shnongpdeng → Mawlynnong | **5/5** | `CORRECT` | Wei Sawdong stepped waterfall in Cherrapunji | **Wei Sawdong Falls, Krem Mawmluh, Cherrapunji** | `tripkario/itineraries/meghalaya/meghalaya-caving-adventure-6d` |
| 63 | `tawang-kaziranga-circuit-8d` | Tawang & Arunachal | Guwahati → Kaziranga → Dirang → Sela Pass → Tawang → Bomdila | **5/5** | `CORRECT` | Nuranang Waterfall in Tawang district | **Nuranang Falls, Jung, Tawang, Kaziranga** | `tripkario/itineraries/tawang/tawang-kaziranga-circuit-8d` |
| 64 | `himachal-hampta-chandratal-6d` | Himachal Pradesh | Manali → Jobra → Balu Ka Ghera → Hampta Pass → Shea Goru → Chandratal | **5/5** | `CORRECT` | Chandratal moon lake in high Spiti mountains | **Chandratal Lake, Hampta Pass, Chattru, Spiti** | `tripkario/itineraries/himachal/himachal-hampta-chandratal-6d` |
| 65 | `himachal-malana-magic-valley-4d` | Himachal Pradesh | Kasol → Jari → Malana Dam → Magic Valley (Waichin) → Kasol | **5/5** | `CORRECT` | Malana village and upper Waichin valley | **Waichin Valley, Malana, Jari, Parvati** | `tripkario/itineraries/himachal/himachal-malana-magic-valley-4d` |
| 66 | `south-india-delights-10d` | South India | Bangalore → Tirupati → Mysore → Ooty → Madurai → Rameshwaram → Kanyakumari | **5/5** | `CORRECT` | Meenakshi Amman Temple gopuram towers in Madurai | **Meenakshi Amman Temple, Madurai, Tanjore, Trichy** | `tripkario/itineraries/south-india/south-india-delights-10d` |
| 67 | `south-colors-of-south-10d` | South India | Bangalore → Coorg → Mysore → Ooty → Madurai | **5/5** | `CORRECT` | Mysore Palace grand heritage facade in Karnataka | **Mysore Palace, Chamundi Hill, Bangalore, Ooty** | `tripkario/itineraries/south-india/south-colors-of-south-10d` |
| 68 | `south-culture-cum-beach-7d` | South India | Madurai → Rameshwaram → Kanyakumari → Kovalam → Trivandrum | **5/5** | `CORRECT` | Vivekananda Rock Memorial monument surrounded by Indian Ocean | **Vivekananda Rock Memorial, Thiruvalluvar Statue, Kanyakumari, Rameshwaram** | `tripkario/itineraries/south-india/south-culture-cum-beach-7d` |
| 69 | `south-vacation-to-south-8d` | South India | Bangalore → Mysore → Coorg → Ooty → Kodaikanal | **5/5** | `CORRECT` | Pillar Rocks mist and canyon valley in Kodaikanal | **Pillar Rocks, Kodaikanal Lake, Coaker Walk, Kodaikanal** | `tripkario/itineraries/south-india/south-vacation-to-south-8d` |
| 70 | `south-beautiful-journey-9d` | South India | Bangalore → Coorg → Ooty → Kodaikanal → Coimbatore | **5/5** | `CORRECT` | Dolphin Nose viewpoint overlooking Nilgiri canyon | **Dolphin Nose Viewpoint, Catherine Falls, Coonoor, Ooty** | `tripkario/itineraries/south-india/south-beautiful-journey-9d` |
| 71 | `south-bangalore-ooty-5d` | South India | Bangalore → Ooty → Coonoor → Bangalore | **5/5** | `CORRECT` | Pykara lake and pine slopes near Ooty | **Pykara Lake & Falls, Ooty Lake, Doddabetta, Bangalore** | `tripkario/itineraries/south-india/south-bangalore-ooty-5d` |
| 72 | `south-mysore-ooty-6d` | South India | Bangalore → Mysore → Ooty → Bangalore | **5/5** | `CORRECT` | Chamundi Hills vantage point overlooking Mysore | **Chamundi Hill Viewpoint, Mysore Palace, Ooty, Bandipur** | `tripkario/itineraries/south-india/south-mysore-ooty-6d` |
| 73 | `south-coorg-mysore-ooty-6d` | South India | Bangalore → Coorg → Mysore → Ooty → Bangalore | **5/5** | `CORRECT` | Abbey Falls surrounded by coffee and spice trees in Coorg | **Abbey Falls, Madikeri, Mysore Palace, Ooty** | `tripkario/itineraries/south-india/south-coorg-mysore-ooty-6d` |
| 74 | `south-bangalore-mysore-coorg-5d` | South India | Bangalore → Mysore → Coorg → Bangalore | **5/5** | `CORRECT` | Bangalore Palace fortified Tudor facade and towers | **Bangalore Palace, Mysore Palace, Coorg Coffee Estates, Bylakuppe** | `tripkario/itineraries/south-india/south-bangalore-mysore-coorg-5d` |
| 75 | `kerala-honeymoon-special-5d` | Kerala | Kochi → Munnar → Thekkady → Alleppey → Kochi | **5/5** | `CORRECT` | Kumarakom tranquil water canals and coconut groves on Vembanad Lake | **Vembanad Lake, Kumarakom, Alleppey, Kochi** | `tripkario/itineraries/kerala/kerala-honeymoon-special-5d` |
| 76 | `goa-honeymoon-beach-4d` | Goa | Panjim → Fontainhas → Palolem → Agonda → Cabo de Rama | **5/5** | `CORRECT` | Cabo de Rama clifftop entrance and ocean coastline | **Cabo de Rama Fort, Agonda Beach, Palolem Beach, South Goa** | `tripkario/itineraries/goa/goa-honeymoon-beach-4d` |
| 77 | `uttarakhand-chardham-haridwar-10d` | Uttarakhand | Haridwar → Barkot → Yamunotri → Uttarkashi → Gangotri → Guptkashi → Kedarnath → Badrinath → Rishikesh | **5/5** | `CORRECT` | Evening Ganga Aarti at Har Ki Pauri Haridwar | **Har Ki Pauri, Haridwar, Rishikesh, Chardham Ghats** | `tripkario/itineraries/uttarakhand/uttarakhand-chardham-haridwar-10d` |
| 78 | `uttarakhand-nainital-mussoorie-corbett-6d` | Uttarakhand | Delhi → Nainital → Jim Corbett → Mussoorie → Delhi | **5/5** | `CORRECT` | Naini Lake boat promenade in Nainital | **Naini Lake, Nainital, Mussoorie, Corbett** | `tripkario/itineraries/uttarakhand/uttarakhand-nainital-mussoorie-corbett-6d` |
| 79 | `uttarakhand-kumaon-hills-kausani-6d` | Uttarakhand | Delhi → Nainital → Kausani → Ranikhet → Delhi | **5/5** | `CORRECT` | Sunrise panorama over Himalayan peaks from Kausani | **Kausani Viewpoint, Nanda Devi View, Trishul Peak, Bageshwar** | `tripkario/itineraries/uttarakhand/uttarakhand-kumaon-hills-kausani-6d` |
| 80 | `uttarakhand-auli-snow-skiing-5d` | Uttarakhand | Rishikesh → Joshimath → Auli → Chopta → Rishikesh | **5/5** | `CORRECT` | Auli ski resort slopes and mountain views | **Auli Ski Slopes, Joshimath, Nanda Devi, Gorson Bugyal** | `tripkario/itineraries/uttarakhand/uttarakhand-auli-snow-skiing-5d` |
| 81 | `uttarakhand-nainital-lake-escape-4d` | Uttarakhand | Delhi → Nainital → Bhimtal → Delhi | **5/5** | `CORRECT` | Bhimtal lake and surrounding green hills | **Bhimtal Lake, Sattal, Nainital, Naukuchiatal** | `tripkario/itineraries/uttarakhand/uttarakhand-nainital-lake-escape-4d` |
| 82 | `rajasthan-royal-forts-desert-8d` | Rajasthan | Jaipur → Jodhpur → Jaisalmer → Udaipur | **5/5** | `CORRECT` | Jaisalmer Fort golden sandstone fortress | **Jaisalmer Fort, Sam Sand Dunes, Mehrangarh Fort, Jodhpur** | `tripkario/itineraries/rajasthan/rajasthan-royal-forts-desert-8d` |
| 83 | `rajasthan-golden-triangle-ranthambore-6d` | Rajasthan | Delhi → Agra → Ranthambore → Jaipur → Delhi | **5/5** | `CORRECT` | Ranthambore National Park lake and forest wilderness | **Ranthambore Tiger Reserve, Padam Talao, Jaipur, Agra** | `tripkario/itineraries/rajasthan/rajasthan-golden-triangle-ranthambore-6d` |
| 84 | `andaman-exotic-beach-scuba-6d` | Andaman | Port Blair → Havelock Island → Neil Island → Port Blair | **5/5** | `CORRECT` | Havelock Island coral reef and tropical shoreline | **Elephant Beach Coral Reef, Havelock Island, Neil Island, Baratang** | `tripkario/itineraries/andaman/andaman-exotic-beach-scuba-6d` |
| 85 | `northeast-kaziranga-majuli-5d` | Northeast | Guwahati → Kaziranga → Jorhat → Majuli Island → Guwahati | **5/5** | `CORRECT` | Doriya River channel in Majuli river island, Assam | **Majuli River Island, Brahmaputra River, Kaziranga, Jorhat** | `tripkario/itineraries/northeast/northeast-kaziranga-majuli-5d` |
| 86 | `bengal-sundarbans-mangrove-safari-3d` | West Bengal | Kolkata → Godkhali → Sajnekhali → Sudhanyakhali → Dobanki → Kolkata | **5/5** | `CORRECT` | Sundarbans Royal Bengal tiger habitat and mangrove waterways | **Sajnekhali Watchtower, Sundarbans Delta, Dobanki, Kolkata** | `tripkario/itineraries/bengal/bengal-sundarbans-mangrove-safari-3d` |

---

## 4. Phase 2 Target ImageKit Folder Structure

```
tripkario/
  └── itineraries/
        ├── kashmir/
        │     ├── kashmir-signature/
        │     ├── kashmir-backpacking/
        │     ├── kashmir-paradise-4d/
        │     └── ...
        ├── ladakh/
        │     ├── ladakh-high-passes/
        │     ├── ladakh-bike-circuit/
        │     └── ...
        ├── spiti/
        │     ├── spiti-circuit/
        │     └── ...
        ├── meghalaya/
        │     ├── meghalaya-cloud-trails/
        │     └── ...
        ├── tawang/
        ├── sikkim/
        ├── himachal/
        ├── uttarakhand/
        ├── rajasthan/
        ├── goa/
        ├── kerala/
        ├── south-india/
        ├── nagaland/
        ├── northeast/
        └── bengal/
```
