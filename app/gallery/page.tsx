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
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-neutral-950 md:text-4xl">Gallery</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 md:text-base">
              Browse albums by category.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                href={`/gallery/${category.id}`}
                key={category.id}
                className="group overflow-hidden rounded-lg border border-neutral-200 bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                  {category.coverImage ? (
                    <img
                      src={category.coverImage}
                      alt={category.title}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="p-4">
                  <div className="text-xs text-neutral-500">{category.albumCount} albums</div>
                  <h2 className="mt-2 text-lg font-medium text-neutral-950">{category.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">
                    {category.description}
                  </p>
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
