'use client';

import { useState } from 'react';
import ServicesModal from '@/component/ServicesModal';

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <main className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Services</h1>

      {/* Your page content here */}
      <p>Welcome to the services page. Click the button to see our services.</p>

      <button
        onClick={() => setModalOpen(true)}
        className="mt-6 px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
      >
        Show Services Modal
      </button>

      {modalOpen && <ServicesModal onClose={() => setModalOpen(false)} />}
    </main>
  );
}
