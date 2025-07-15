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
    contributors: 'Studio Mix',
summary: 'Edited an engaging highlight reel and branded recap (BR) for a global music festival. Showcased key performances, audience moments, and high-energy visuals to capture the event’s essence.',
    images: ['/Image/abela4.jpg','/Image/abela2.jpg','/Image/abela1.jpg','/Image/graphic.png'],
    
    testimonials: [
      {
        quote: "Captured the event’s essence beautifully!",
        clientName: "Hanna Tekle",
        clientTitle: "Event Organizer, Global Fest",
        clientImage: "/Image/abela2.jpg",
      },
     
  
    ],
  },
  // Graphics (Logo, Poster)
   {
    id: 2,
    title: 'Web development',
    client: 'StartupX',
    contributors: 'Editor Pro',
    summary: 'Crafted a punchy promo video with animations and transitions.',
    images: ['/Image/abela1.jpg','/Image/abela4.jpg','/Image/abela2.jpg','/Image/graphic.png'],
    testimonials: [
      {
        quote: "Slick, modern and super effective. Loved it!",
        clientName: "Laura Kim",
        clientTitle: "CEO, StartupX",
        clientImage: "/Image/client3.jpg,",
      },
    ],
  },
  {
    id: 7,
    title: 'Event Poster',
    client: 'Cultural Beats',
    contributors: 'Art Studio',
    summary: 'Designed a vibrant poster for a multicultural event.',
    images: ['/Image/abela2.jpg'],
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