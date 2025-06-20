// ./data/projects.ts

import { StaticImageData } from "next/image";

// import type { StaticImageData } from 'next/image';
export type Project = {
  id: number;
  title: string;
  client: string;
  category: string;
  contributors: string;
  summary: string;
  images: (string | StaticImageData)[];
};

export const PROJECTS = [
  //Web development
  {
    id: 1,
    title: 'Event Recap Reel',
    client: 'Global Fest',
    category: 'Web development',
    contributors: 'Studio Mix',
    summary: 'Edited an engaging highlight reel for a global music festival.',
    images: ['/image/graphic3.png'],
  },
  {
    id: 2,
    title: 'Product Promo Video',
    client: 'StartupX',
    category: 'Web development',
    contributors: 'Editor Pro',
    summary: 'Crafted a punchy promo video with animations and transitions.',
    images: ['/image/graphic4.png'],
  },
  {
    id: 3,
    title: 'Event Recap Reel',
    client: 'Global Fest',
    category: 'Web development',
    contributors: 'Studio Mix',
    summary: 'Edited an engaging highlight reel for a global music festival.',
    images: ['/image/graphic3.png'],
  },
  {
    id: 4,
    title: 'Product Promo Video',
    client: 'StartupX',
    category: 'Web development',
    contributors: 'Editor Pro',
    summary: 'Crafted a punchy promo video with animations and transitions.',
    images: ['/image/graphic4.png'],
  },
  {
    id: 5,
    title: 'Event Recap Reel',
    client: 'Global Fest',
    category: 'Web development',
    contributors: 'Studio Mix',
    summary: 'Edited an engaging highlight reel for a global music festival.',
    images: ['/image/graphic3.png'],
  },

  // Graphics (Logo, Poster)
  {
    id: 6,
    title: 'Modern Logo Design',
    client: 'GreenLeaf Agency',
    category: 'Graphics (Logo, Poster)',
    contributors: 'Design Team',
    summary: 'Created a fresh, minimalist logo for a sustainable brand.',
    images: ['/image/graphic2.png','/image/graphic1.png','/image/graphic3.png'],
  },
  {
    id: 7,
    title: 'Event Poster',
    client: 'Cultural Beats',
    category: 'Graphics (Logo, Poster)',
    contributors: 'Art Studio',
    summary: 'Designed a vibrant poster for a multicultural event.',
    images: ['/image/graphic1.png'],
  },
  {
    id: 8,
    title: 'Modern Logo Design',
    client: 'GreenLeaf Agency',
    category: 'Graphics (Logo, Poster)',
    contributors: 'Design Team',
    summary: 'Created a fresh, minimalist logo for a sustainable brand.',
    images: ['/image/graphic2.png'],
  },
  {
    id: 9,
    title: 'Event Poster',
    client: 'Cultural Beats',
    category: 'Graphics (Logo, Poster)',
    contributors: 'Art Studio',
    summary: 'Designed a vibrant poster for a multicultural event.',
    images: ['/image/graphic1.png'],
  },

  // Web development
  {
    id: 10,
    title: 'Facebook Ad Funnel',
    client: 'EcoBags Co.',
    category: 'UI/UX Design',
    contributors: 'Ad Wizards',
    summary: 'Generated 5x ROI through a multi-step Facebook ad funnel.',
    images: ['/image/graphic4.png'],
  },
  {
    id: 11,
    title: 'Instagram Story Ads',
    client: 'Urban Sneakers',
    category: 'UI/UX Design',
    contributors: 'SocialClicks',
    summary: 'Launched animated story ads with high conversion rates.',
    images: ['/image/graphic3.png'],
  },
  {
    id: 12,
    title: 'Facebook Ad Funnel',
    client: 'EcoBags Co.',
    category: 'UI/UX Design',
    contributors: 'Ad Wizards',
    summary: 'Generated 5x ROI through a multi-step Facebook ad funnel.',
    images: ['/image/graphic4.png'],
  },
  {
    id: 13,
    title: 'Instagram Story Ads',
    client: 'Urban Sneakers',
    category: 'UI/UX Design',
    contributors: 'SocialClicks',
    summary: 'Launched animated story ads with high conversion rates.',
    images: ['/image/graphic3.png'],
  },
   {
    id: 14,
    title: 'Facebook Ad Funnel',
    client: 'EcoBags Co.',
    category: 'UI/UX Design',
    contributors: 'Ad Wizards',
    summary: 'Generated 5x ROI through a multi-step Facebook ad funnel.',
    images: ['/image/graphic4.png'],
  },
  {
    id: 15,
    title: 'Instagram Story Ads',
    client: 'Urban Sneakers',
    category: 'UI/UX Design',
    contributors: 'SocialClicks',
    summary: 'Launched animated story ads with high conversion rates.',
    images: ['/image/graphic3.png'],
  },
];  