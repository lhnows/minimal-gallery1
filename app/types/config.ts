export interface Category {
  title: string
  description: string
  detail?: string
  albums: Album[]
}

export interface Album {
  id: string
  title: string
  description: string
  detail?: string
  coverImage: string
  photoCount: number
  createdAt: string
  photos: Photo[]
}

export interface Photo {
  id: string
  url: string
  alt?: string
  title: string
  description: string
}

export interface GalleryConfig {
  categories: {
    [key: string]: Category
  }
}
