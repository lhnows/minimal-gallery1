import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import { getAlbumsByCategory } from '@/app/utils/config'

interface GalleryContentProps {
  category: string
  info: {
    title: string
    description: string
  }
}

export default function GalleryContent({ category, info }: GalleryContentProps) {
  const albums = getAlbumsByCategory(category)

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mb-8">
            <Link href="/gallery" className="text-sm text-neutral-500 hover:text-neutral-900">
              Gallery
            </Link>
            <h1 className="mt-3 text-3xl font-semibold text-neutral-950 md:text-4xl">{info.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 md:text-base">
              {info.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <Link
                key={album.id}
                href={`/gallery/${category}/${album.id}`}
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
