import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { getAlbumsByCategory, getAllCategories, getCategoryInfo } from './utils/config'

export const metadata: Metadata = {
  title: '爱智美图片素材库',
  description: 'NextSmile 视觉素材与口腔正畸科普图片',
}

export default function Home() {
  const categories = getAllCategories()

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold text-neutral-950 md:text-4xl">
              爱智美图片素材库
            </h1>
            <p className="mt-3 text-sm leading-6 text-neutral-600 md:text-base">
              NextSmile 视觉素材与口腔正畸科普图片
            </p>
          </header>

          <div className="space-y-12">
            {categories.map((category) => {
              const info = getCategoryInfo(category)
              const albums = getAlbumsByCategory(category)

              if (!info || albums.length === 0) {
                return null
              }

              return (
                <section key={category}>
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-neutral-950">{info.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-neutral-600">{info.description}</p>
                    </div>
                    <Link
                      href={`/gallery/${category}`}
                      className="shrink-0 text-sm font-medium text-neutral-700 hover:text-neutral-950"
                    >
                      查看全部
                    </Link>
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
                          <h3 className="mt-2 text-lg font-medium leading-snug text-neutral-950">
                            {album.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">
                            {album.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
