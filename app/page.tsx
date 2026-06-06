import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { getAlbumsByCategory } from './utils/config'

export const metadata: Metadata = {
  title: 'NextSmile Gallery',
  description: '爱智美 NextSmile 原始视觉素材相册',
}

export default function Home() {
  const albums = getAlbumsByCategory('nextsmile')

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold text-neutral-950 md:text-4xl">
              NextSmile Gallery
            </h1>
            <p className="mt-3 text-sm leading-6 text-neutral-600 md:text-base">
              爱智美 NextSmile 原始无文字视觉素材
            </p>
          </header>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <Link
                key={album.id}
                href={`/gallery/nextsmile/${album.id}`}
                className="group overflow-hidden rounded-lg border border-neutral-200 bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs text-neutral-500">
                    {album.createdAt} · {album.photoCount} photos
                  </div>
                  <h2 className="mt-2 text-lg font-medium leading-snug text-neutral-950">
                    {album.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">
                    {album.description}
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
