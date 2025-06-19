'use client'

import { useState } from 'react'
import FAQModal from '../component/faqmodal'

export default function FAQPage() {
  const [isOpen, setIsOpen] = useState(true) // or false initially, and toggle as needed

  return (
    <>
      {/* Some UI to open FAQ */}
      <button onClick={() => setIsOpen(true)}>Open FAQ</button>

      <FAQModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
