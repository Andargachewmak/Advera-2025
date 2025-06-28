// pages/partner.tsx

import { useState } from "react";
import Image from "next/image";

const logos = [
  { src: "/Image/logo1.svg", alt: "Navan", width: 200, height: 50, partnerUrl: "#" },
  { src: "/Image/logo2.svg", alt: "Contentful", width: 200, height: 50 },
  { src: "/Image/logo3.svg", alt: "Unilever", width: 200, height: 50 },
  { src: "/Image/logo4.svg", alt: "Stack Overflow", width: 200, height: 50, partnerUrl: "/partners/stackoverflow" },
  { src: "/Image/logo5.svg", alt: "Riot Games", width: 200, height: 50 },
  { src: "/Image/logo6.svg", alt: "Nike", width: 200, height: 50 },
];

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  description?: string;
  partnerUrl?: string;
};

export default function PartnerPage() {
  const [activeLogo, setActiveLogo] = useState<Logo | null>(null);

  const handleLogoClick = (logo: Logo) => {
    if (logo.partnerUrl && logo.partnerUrl !== "#") {
      window.location.href = logo.partnerUrl;
    } else if (logo.partnerUrl === "#") {
      setActiveLogo(logo);
    } else {
      setActiveLogo(logo);
    }
  };

  return (
    <div className="relative z-10 w-full pt-8 pb-4 mb-12 mt-20 bg-gray-100 min-h-screen">
      <h1 className="text-center text-3xl font-bold mb-8">Our Partners</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 px-4">
        {logos.map((logo, idx) => (
          <div
            key={`${logo.alt}-${idx}`}
            className="flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer"
            onClick={() => handleLogoClick(logo)}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              draggable={false}
              className="h-[48px] sm:h-[60px] w-auto object-contain grayscale hover:grayscale-0"
            />
          </div>
        ))}
      </div>

      {activeLogo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 px-4"
          onClick={() => setActiveLogo(null)}
        >
          <div
            className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl"
              onClick={() => setActiveLogo(null)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <Image
              src={activeLogo.src}
              alt={activeLogo.alt}
              width={activeLogo.width}
              height={activeLogo.height}
              className="h-32 sm:h-40 w-auto mx-auto object-contain mb-4"
            />
            <h3 className="text-lg sm:text-xl font-bold">{activeLogo.alt}</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {activeLogo.description || "No description available."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
