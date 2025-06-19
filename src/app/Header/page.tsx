'use client';

import Sidebar from "@/component/sidebar";


export default function HeaderPage() {
  const handleSectionClick = (key: string) => {
    const section = document.getElementById(key);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFAQClick = () => {
    // You can use a router or modal logic here
    alert('Open FAQ Modal or Navigate to FAQ Page');
  };

  return (
    <div>
      <Sidebar onSectionClick={handleSectionClick} onFAQClick={handleFAQClick} />
    </div>
  );
}
