import Link from 'next/link'
import { getAllCategories, getCategoryInfo } from '@/app/utils/config'

export default function Navbar() {
  const categories = getAllCategories()

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 overflow-x-auto px-4">
        <Link href="/" className="shrink-0 text-lg font-semibold text-neutral-950">
          图片素材库
        </Link>
        <div className="flex items-center gap-4">
          {categories.map((category) => {
            const info = getCategoryInfo(category)

            return info ? (
              <Link
                key={category}
                href={`/gallery/${category}`}
                className="shrink-0 text-sm text-neutral-600 hover:text-neutral-950"
              >
                {info.title}
              </Link>
            ) : null
          })}
        </div>
      </div>
    </nav>
  )
}
