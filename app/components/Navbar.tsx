import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4">
        <Link href="/" className="text-lg font-semibold text-neutral-950">
          NextSmile Gallery
        </Link>
      </div>
    </nav>
  )
}
