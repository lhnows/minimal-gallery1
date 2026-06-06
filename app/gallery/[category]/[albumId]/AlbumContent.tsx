import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import { Album } from '@/app/types/config'

interface AlbumContentProps {
  albumData: Album
  category: string
}

export default function AlbumContent({ albumData, category }: AlbumContentProps) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mb-8">
            <Link href={`/gallery/${category}`} className="text-sm text-neutral-500 hover:text-neutral-900">
              Back to albums
            </Link>
            <h1 className="mt-3 text-3xl font-semibold text-neutral-950 md:text-4xl">
              {albumData.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-600 md:text-base">
              {albumData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {albumData.photos.map((photo) => (
              <a
                key={photo.id}
                href={photo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-lg border border-neutral-200 bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                  <img
                    src={photo.url}
                    alt={photo.alt || photo.title}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-base font-medium text-neutral-950">{photo.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">{photo.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
