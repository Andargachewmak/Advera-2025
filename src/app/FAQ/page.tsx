'use client';

import FAQModal from '@/component/faqmodal';
import { useRouter } from 'next/navigation';

export default function FAQPage() {
  const router = useRouter();

  return (
    <FAQModal
      isOpen={true}
      onClose={() => router.back()} // or router.push('/') if you prefer
    />
  );
}
