/* eslint-disable @next/next/no-html-link-for-pages */
// import Link from "next/link"

export const Sidebar = () => {
  return( 
<aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
  <h2 className="text-xl font-bold mb-6">My App</h2>
  <nav>
    <ul>
      <li>
        <a href="/" className="block py-2 px-4 rounded bg-gray-700">Home</a>
      </li>
      <li>
        <a href="/about" className="block py-2 px-4 rounded hover:bg-gray-700">About</a>
      </li>
      <li>
        <a href="/contact" className="block py-2 px-4 rounded hover:bg-gray-700">Contact</a>
      </li>
    </ul>
  </nav>
</aside>  )
} 