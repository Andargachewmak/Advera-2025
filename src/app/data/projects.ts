// ./data/projects.ts

import { StaticImageData } from "next/image";

export type Testimonial = {
  quote: string;
  clientName: string;
  clientTitle: string;
  clientImage: string; // string path
};

export type Project = {
  id: number;
  title: string;
  client: string;
  category: string;
  contributors: string;
  summary: string;
  images: (string | StaticImageData)[];
  testimonials?: Testimonial[]; // <-- New
};
export const PROJECTS: Project[] = [  //Web development
  {
    id: 1,
    title: 'Web develope',
    client: 'Global Fest',
    category: 'Web development',
    contributors: 'Studio Mix',
    summary: 'Edited an engaging highlight reel for a global music festival.',
    images: ['/Image/graphic3.png'],
    
    testimonials: [
      {
        quote: "Captured the event’s essence beautifully!",
        clientName: "Hanna Tekle",
        clientTitle: "Event Organizer, Global Fest",
        clientImage: "/Image/client1.jpg",
      },
     
  
    ],
  },
  // Graphics (Logo, Poster)
   {
    id: 2,
    title: 'Web development',
    client: 'StartupX',
    category: 'Web development',
    contributors: 'Editor Pro',
    summary: 'Crafted a punchy promo video with animations and transitions.',
    images: ['/Image/graphic4.png'],
    testimonials: [
      {
        quote: "Slick, modern and super effective. Loved it!",
        clientName: "Laura Kim",
        clientTitle: "CEO, StartupX",
        clientImage: "/Image/client3.jpg",
      },
    ],
  },
  {
    id: 7,
    title: 'Event Poster',
    client: 'Cultural Beats',
    category: 'Graphics (Logo, Poster)',
    contributors: 'Art Studio',
    summary: 'Designed a vibrant poster for a multicultural event.',
    images: ['/Image/graphic1.png'],
    testimonials: [
      {
        quote: "Captured the event’s essence beautifully!",
        clientName: "Hanna Tekle",
        clientTitle: "Event Organizer, Global Fest",
        clientImage: "/Image/client1.jpg",
      },
     
  
    ],
  },
  {
    id: 8,
    title: 'Modern Logo Design',
    client: 'GreenLeaf Agency',
    category: 'Graphics (Logo, Poster)',
    contributors: 'Design Team',
    summary: 'Created a fresh, minimalist logo for a sustainable brand.',
    images: ['/Image/graphic2.png'],
    testimonials: [
      {
        quote: "Captured the event’s essence beautifully!",
        clientName: "Hanna Tekle",
        clientTitle: "Event Organizer, Global Fest",
        clientImage: "/Image/client1.jpg",
      },
      
  
    ],
  },
  {
    id: 9,
    title: 'Event Poster',
    client: 'Cultural Beats',
    category: 'Graphics (Logo, Poster)',
    contributors: 'Art Studio',
    summary: 'Designed a vibrant poster for a multicultural event.',
    images: ['/Image/graphic1.png'],
    testimonials: [
      {
        quote: "Captured the event’s essence beautifully!",
        clientName: "Hanna Tekle",
        clientTitle: "Event Organizer, Global Fest",
        clientImage: "/Image/client1.jpg",
      },
     
  
    ],
  },

  // Web development
  {
    id: 10,
    title: 'Facebook Ad Funnel',
    client: 'EcoBags Co.',
    category: 'UI/UX Design',
    contributors: 'Ad Wizards',
    summary: 'Generated 5x ROI through a multi-step Facebook ad funnel.',
    images: ['/Image/graphic4.png'],
    testimonials: [
      {
        quote: "Captured the event’s essence beautifully!",
        clientName: "Hanna Tekle",
        clientTitle: "Event Organizer, Global Fest",
        clientImage: "/Image/client1.jpg",
      },
     
  
    ],
  },
  {
    id: 11,
    title: 'Instagram Story Ads',
    client: 'Urban Sneakers',
    category: 'UI/UX Design',
    contributors: 'SocialClicks',
    summary: 'Launched animated story ads with high conversion rates.',
    images: ['/Image/graphic3.png'],
    testimonials: [
      {
        quote: "Captured the event’s essence beautifully!",
        clientName: "Hanna Tekle",
        clientTitle: "Event Organizer, Global Fest",
        clientImage: "/Image/client1.jpg",
      },
     
  
    ],
  },
  {
    id: 12,
    title: 'Facebook Ad Funnel',
    client: 'EcoBags Co.',
    category: 'UI/UX Design',
    contributors: 'Ad Wizards',
    summary: 'Generated 5x ROI through a multi-step Facebook ad funnel.',
    images: ['/Image/graphic4.png'],
    testimonials: [
      {
        quote: "Captured the event’s essence beautifully!",
        clientName: "Hanna Tekle",
        clientTitle: "Event Organizer, Global Fest",
        clientImage: "/Image/client1.jpg",
      },
     
  
    ],
  },
  {
    id: 13,
    title: 'Instagram Story Ads',
    client: 'Urban Sneakers',
    category: 'UI/UX Design',
    contributors: 'SocialClicks',
    summary: 'Launched animated story ads with high conversion rates.',
    images: ['/Image/graphic3.png'],
    testimonials: [
      {
        quote: "Captured the event’s essence beautifully!",
        clientName: "Hanna Tekle",
        clientTitle: "Event Organizer, Global Fest",
        clientImage: "/Image/client1.jpg",
      },
      
  
    ],
  },
   {
    id: 14,
    title: 'Facebook Ad Funnel',
    client: 'EcoBags Co.',
    category: 'UI/UX Design',
    contributors: 'Ad Wizards',
    summary: 'Generated 5x ROI through a multi-step Facebook ad funnel.',
    images: ['/Image/graphic4.png'],
    testimonials: [
      {
        quote: "Captured the event’s essence beautifully!",
        clientName: "Hanna Tekle",
        clientTitle: "Event Organizer, Global Fest",
        clientImage: "/Image/client1.jpg",
      },
     
  
    ],
  },
  {
    id: 15,
    title: 'Instagram Story Ads',
    client: 'Urban Sneakers',
    category: 'UI/UX Design',
    contributors: 'SocialClicks',
    summary: 'Launched animated story ads with high conversion rates.',
    images: ['/Image/graphic3.png'],
    testimonials: [
      {
        quote: "Captured the event’s essence beautifully!",
        clientName: "Hanna Tekle",
        clientTitle: "Event Organizer, Global Fest",
        clientImage: "/Image/client1.jpg",
      },
      
  
    ],
  },
    {
    id: 16,
    title: 'Event Poster',
    client: 'Cultural Beats',
    category: 'Graphics (Logo, Poster)',
    contributors: 'Art Studio',
    summary: 'Designed a vibrant poster for a multicultural event.',
    images: ['/Image/graphic1.png'],
    testimonials: [
      {
        quote: "Captured the event’s essence beautifully!",
        clientName: "Hanna Tekle",
        clientTitle: "Event Organizer, Global Fest",
        clientImage: "/Image/client1.jpg",
      },
     
  
    ],
  },

];  