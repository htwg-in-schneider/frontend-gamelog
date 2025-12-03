// src/data.js

export const games = [
  {
    id: 1,
    title: "Silent Hill 2",
    price: "59.99€",
    description: "Psychological horror game released in 2001.",
    image: new URL('./assets/silent_hill_2_cover.jpg', import.meta.url).href,
  },
  {
    id: 2,
    title: "Hades 2",
    price: "49.99€",
    description: "Action roguelike with great gameplay and soundtrack.",
    image: new URL('./assets/Hades_2_cover.jpeg', import.meta.url).href,
  },
  {
    id: 3,
    title: "Omori",
    price: "29.99€",
    description: "Indie RPG with unique art style and story.",
    image: new URL('./assets/Omori_cover.jpg', import.meta.url).href,
  },
  {
    id: 4,
    title: "Fortnite",
    price: "Free",
    description: "Popular battle royale game.",
    image: new URL('./assets/fortnite.jpg', import.meta.url).href,
  },
   {
    id: 5,
    title: "Celeste",
    price: "Free",
    description: "Popular battle royale game.",
    image: new URL('./assets/Celeste_cover.png', import.meta.url).href,
   },
];
