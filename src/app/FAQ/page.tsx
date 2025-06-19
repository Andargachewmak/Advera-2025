 'use client';

import FAQModal from "../../component/faqmodal";


type FAQPageProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FAQPage({ isOpen, onClose }: FAQPageProps) {
  return (
    <FAQModal isOpen={isOpen} onClose={onClose} />
  );
}  