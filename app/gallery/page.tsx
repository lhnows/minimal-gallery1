import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getAllCategories, getAlbumsByCategory, getCategoryInfo } from '../utils/config'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse all gallery categories',
}

export default function Gallery() {
  const categories = getAllCategories().map((category) => {
    const info = getCategoryInfo(category)
    const albums = getAlbumsByCategory(category)
    return {
      id: category,
      title: info?.title || category,
      description: info?.description || '',
      coverImage: albums[0]?.coverImage,
      albumCount: albums.length,
    }
  }).filter((category) => category.albumCount > 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-12">
        <div className="fixed inset-0 bg-gradient-to-b from-white via-yellow-50 to-yellow-100 opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto mb-10">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900">Gallery</h1>
            <p className="mt-3 text-gray-600 max-w-2xl">
              Browse photo collections by category.
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                href={`/gallery/${category.id}`}
                key={category.id}
                className="group block overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  {category.coverImage ? (
                    <img
                      src={category.coverImage}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="p-5">
                  <div className="text-sm text-gray-500">{category.albumCount} albums</div>
                  <h2 className="mt-1 text-2xl font-light text-gray-900">{category.title}</h2>
                  <p className="mt-2 text-gray-600 line-clamp-2">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
