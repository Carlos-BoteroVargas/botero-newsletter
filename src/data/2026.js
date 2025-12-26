// https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png

export const TIMELINE_2026 = [
  { 
    month: 'January', 
    title: 'The Great Adventure Begins', 
    content: 'Our little girl is here, and we can\'t wait to show her around! Celebrating 15 years of marriage with the start of a new chapter as a family of six. Excited for the adventures that lie ahead in 2026! ', 
    type: 'text',
    imageUrl: 'https://res.cloudinary.com/dhuaoanpn/image/upload/v1766766750/Baby_cy0cuz.png',
    isPortrait: true // Optional: false
  },
  { 
    month: 'June', 
    title: 'Our very own Tour de France', 
    content: 'To celebrate our milestone, we took the girls on a great adventure in the land of Alexander Dumas, Victor Hugo, and Napoleon. From the lavender fields of Provence to the majestic châteaux of the Loire Valley, every moment was filled with wonder and discovery. Here\'s to many more journeys together as a family!', 
    type: 'trip', // ?? generates the map link!!
    imageUrl: 'https://res.cloudinary.com/dhuaoanpn/image/upload/v1766758726/1766758660141_tk1afq.png' 
  },
  { 
    month: 'October', 
    title: 'Berkshire Colors & Pumpkins', 
    content: 'Wating for the adventures.', 
    type: 'text',
    imageUrl: 'https://res.cloudinary.com/dhuaoanpn/image/upload/v1766758745/1766706743059_qhcxya.png',
    isPortrait: true 
  },
];

// TODO: Transfer the coordinates from the maps
// !! There is a limit of 25 entries in the map!!!
export const FRANCE_STOPS = [
  {
    coords: [7.21014, 43.66752], // NICE: Lng, Lat
    title: "Nice Airport (Arrival)",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766758745/1766706743059_qhcxya.png",
    description: "The 15-year milestone journey begins!"
  },
  // {
  //   coords: [7.1221, 43.6967],
  //   title: "St Paul de Vence",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Exploring the medieval walled village and art galleries."
  // },
  // {
  //   coords: [6.92249, 43.6606],
  //   title: "Grasse",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Hidden in tthe mountains"
  // },
  // {
  //   coords: [6.7527, 43.74104], //43.74104, 6.7527
  //   title: "Cascade De Clars",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Hidden in tthe mountains"
  // },
  // {
  //   coords: [6.22148, 43.84568], //43.84568, 6.22148
  //   title: "Moustiers-Sainte-Marie",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Hidden in tthe mountains"
  // },
  {
    coords: [6.17458, 43.73427],
    title: "Bauduen (Overnight)",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "Our first overnight base by the Sainte-Croix Lake."
  },
  // {
  //   coords: [5.93158, 43.81263],
  //   title: "Valensole Lavender Fields",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The iconic purple plateaus of Provence."
  // },
  // {
  //   coords: [5.42909, 43.8634], //43.8634, 5.42909
  //   title: "Saignon Bourg",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The iconic purple plateaus of Provence."
  // },
  // {
  //   coords: [5.2931, 43.9022],
  //   title: "Roussillon (Ochre Trail)",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Vibrant red cliffs of the Sentier des Ocres."
  // },
  // {
  //   coords: [5.2008, 43.9113],
  //   title: "Gordes",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Hilltop village and the nearby Sénanque Abbey."
  // },
  // {
  //   coords: [5.18674, 43.92798], //43.92798, 5.18674
  //   title: "Abbaye Notre-Dame de Sénanque",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Hilltop village and the nearby Sénanque Abbey."
  // },
  {
    coords: [5.0515, 43.9194],
    title: "L'Isle-sur-la-Sorgue (Overnight)",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The 'Venice of Provence' known for its canals."
  },
  // {
  //   coords: [4.8075, 43.9507],
  //   title: "Avignon - Palais des Papes",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Visiting the monumental Papal Palace."
  // },
  {
    coords: [4.5350, 43.9476],
    title: "Pont du Gard",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The massive Roman aqueduct crossing the Gardon, made 2000 years ago.",
    icon: "aqueduct"
  },
  // {
  //   coords: [4.35961, 43.8349], //43.8349, 4.35961
  //   title: "Nîmes Arena",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Hilltop village and the nearby Sénanque Abbey."
  // },
  {
    coords: [2.3631, 43.20705], //43.20705, 2.3631
    title: "Château Comtal, Carcassonne",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The legendary fortified citadel."
  },
  // {
  //   coords: [2.13845, 43.70726], //43.70726, 2.13845
  //   title: "Lautrec",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The village that sits 'above the clouds'."
  // },
  // {
  //   coords: [2.14826, 43.92663], //43.92663, 2.14826
  //   title: "Albi",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The village that sits 'above the clouds'."
  // },
  {
    coords: [1.9536, 44.0639],
    title: "Cordes-sur-Ciel",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The village that sits 'above the clouds'."
  },
  // {
  //   coords: [1.97842, 44.21953], //44.21953, 1.97842
  //   title: "Najac",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The village that sits 'above the clouds'."
  // },
  // {
  //   coords: [2.03448, 44.60972], //44.60972, 2.03448
  //   title: "Musée Champollion - Les Écritures du Monde",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The village that sits 'above the clouds'."
  // },
  {
    coords: [1.62725, 44.80694],
    title: "Rocamadour",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The cliffside sanctuary and pilgrimage site."
  },
  // {
  //   coords: [1.56601, 45.42633], //45.42633, 1.56601
  //   title: "Uzeche",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The cliffside sanctuary and pilgrimage site."
  // },
  {
    coords: [1.2611, 45.83361], //45.83361, 1.2611
    title: "Limoges",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The pottery capital",
    icon: "pottery"
  },
  // {
  //   coords: [1.0620, 47.3304],
  //   title: "Chisseaux",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Base for exploring the grand Châteaux of the Loire."
  // },
  {
    coords: [1.0703, 47.32486], //47.32486, 1.0703
    title: "Château de Chenonceau",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The Great Castle over the River."
  },
  {
    coords: [1.14294, 47.50867], //47.50867, 1.14294
    title: "Les Hauts de Loire",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The official 15th Anniversary Dinner, in an ancient Hunting Lodge, 2 Michelin Stars."
  },
  {
    coords: [0.51483, 47.3402], //47.3402, 0.51483
    title: "Château de Villandry",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The Great Castle over the River."
  },
  // {
  //   coords: [1.51691, 47.6158], //47.6158, 1.51691
  //   title: "Château de Chambord",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The Great Castle over the River."
  // },
  // {
  //   coords: [1.18326, 47.47655], //47.47655, 1.18326
  //   title: "Domaine de Chaumont-sur-Loire",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The Great Castle over the River."
  // },
  {
    coords: [-0.55182, 47.47116], //47.47116, -0.55182
    title: "Angers",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The ancient gate to Normandy."
  },
  {
    coords: [-1.20906, 48.35463], //48.35463, -1.20906
    title: "Château de Fougères",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "Largest and Oldest Medieval Castle in France."
  },
  {
    coords: [-1.51145, 48.63606], // MONT SAINT-MICHEL: Lng is Negative (West) || 48.61778, -1.51033
    title: "Mont Saint-Michel",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "Magical morning tour of the island abbey.",
    icon: "abbey"
  },
  {
    coords: [-2.02359, 48.65096], // 48.65096, -2.02359
    title: "Saint-Malo (Intra-Muros)",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "Old city walls, ou Westen-most point in the trip."
  },
  // {
  //   coords: [-1.67163, 48.10374], // 48.10374, -1.67163
  //   title: "Rennes",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The heart of the Languedoc Region."
  // }
  {
    coords: [2.2945, 48.8584],
    title: "Tour Eiffel",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The Iron Lady: first greeting of the trip.",
    icon: "eiffel"
  },
];

export const PARIS_STOPS = [
  // --- ARRIVAL & BASE ---
  // {
  //   coords: [2.2965, 48.8546],
  //   title: "1st Airbnb (Base Camp)",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Settling into our first home in the 15th Arrondissement."
  // },
  {
    coords: [2.2945, 48.8584],
    title: "Tour Eiffel",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The Iron Lady—first greeting of the trip."
  },
  {
    coords: [2.3060, 48.8575],
    title: "Rue Cler",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "Market street strolls for our first Parisian supplies."
  },

  // --- PARIS DAY 1: THE ISLANDS & MONTMARTRE ---
  // {
  //   coords: [2.3508, 48.8497],
  //   title: "Luggage Drop (Rive Gauche)",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Dropping bags to start the exploration of the Latin Quarter."
  // },
  {
    coords: [2.3499, 48.8530],
    title: "Notre Dame Cathedral",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The historic heart of Paris on the Île de la Cité."
  },
  {
    coords: [2.3450, 48.8554],
    title: "Sainte-Chapelle",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "A jewel box of 13th-century stained glass."
  },
  // {
  //   coords: [2.3578, 48.8519],
  //   title: "Musée Vivant du Fromage",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "A cheesy dive into French culinary history on Saint-Louis en l'Île."
  // },
  {
    coords: [2.3316, 48.8720],
    title: "Palais Garnier",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The architectural masterpiece of the Opera."
  },
  // {
  //   coords: [2.3126, 48.8661],
  //   title: "Grand Palais",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Iconic glass roof and Beaux-Arts architecture."
  // },
  // {
  //   coords: [2.3126, 48.8639],
  //   title: "Pont Alexandre III",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The most ornate bridge in the city, connecting the Invalides to the Grand Palais."
  // },
  {
    coords: [2.3266, 48.8599],
    title: "Musée d'Orsay",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "Impressionist masterpieces in an old train station."
  },
  // {
  //   coords: [2.3392, 48.8858],
  //   title: "Montmartre Airbnb",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Our temporary home in the village on the hill."
  // },
  {
    coords: [2.3431, 48.8867],
    title: "Sacre Coeur Basilica",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "Sweeping sunset views over the entire city."
  },
  // {
  //   coords: [2.3414, 48.8848],
  //   title: "Signature Montmartre",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "A cozy dinner in the winding streets of the 18th."
  // },

  // --- VERSAILLES DAY ---
  {
    coords: [2.1204, 48.8049],
    title: "Château de Versailles",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The Hall of Mirrors and royal grandeur."
  },
  // {
  //   coords: [2.1054, 48.8147],
  //   title: "The Trianon",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Marie Antoinette's private escape on the palace grounds."
  // },
  // {
  //   coords: [2.3372, 48.8462],
  //   title: "Jardin du Luxembourg",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "A classic Parisian afternoon in the Senate's gardens."
  // },
  // {
  //   coords: [2.3481, 48.8465],
  //   title: "Église Saint-Étienne-du-Mont",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The famous 'Midnight in Paris' steps."
  // },

  // --- PARIS DAY 2: MUSEUMS & PASSAGES ---
  // {
  //   coords: [2.3270, 48.8635],
  //   title: "Tuileries Garden",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Walking from the Place de la Concorde toward the Louvre."
  // },
  {
    coords: [2.3376, 48.8606],
    title: "Louvre Museum",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "A date with the Mona Lisa and the pyramids."
  },
  {
    coords: [2.2950, 48.8738],
    title: "Arc de Triomphe",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "Standing at the center of the world's most famous roundabout."
  },
  // {
  //   coords: [2.3502, 48.8592],
  //   title: "Benoit Paris",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Historic Alain Ducasse bistro for a traditional French lunch."
  // },
  // {
  //   coords: [2.3547, 48.8635],
  //   title: "Rue de Montmorency",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Passing by the oldest house in Paris (Nicolas Flamel)."
  // },
  // {
  //   coords: [2.3468, 48.8647],
  //   title: "Rue Montorgueil",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The ultimate foodie street for afternoon pastries."
  // },
  // {
  //   coords: [2.3423, 48.8637],
  //   title: "E. Dehillerin",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The famous copper-cookware sanctuary for the kitchen."
  // },
  {
    coords: [2.3372, 48.8648],
    title: "Jardin du Palais Royal",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "Peaceful courtyards and striped columns."
  },
  // {
  //   coords: [2.3394, 48.8665],
  //   title: "Galerie Vivienne",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "The most beautiful of the 19th-century covered passages."
  // },

  // --- BALLET & BASTILLE ---
  {
    coords: [2.3732, 48.8488],
    title: "Hotel Alba Bastille",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "Relocating to the Bastille district for the finale."
  },
  // {
  //   coords: [2.3731, 48.8448],
  //   title: "Le Train Bleu",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "Belle Époque dining inside the Gare de Lyon."
  // },
  // {
  //   coords: [2.3688, 48.8687],
  //   title: "Café Pli",
  //   imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
  //   description: "A trendy coffee stop in the 11th."
  // },
  {
    coords: [2.3704, 48.8533],
    title: "Opéra Bastille",
    imageId: "https://res.cloudinary.com/dhuaoanpn/image/upload/v1766691914/paris_qggkfe.png",
    description: "The modern home of the ballet to close out our journey."
  }
];
