import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const repoRoot = process.cwd()
const defaultOutputsRoot = '/Users/liuhao/Documents/Projects/NextSmile/LOGO/outputs'

function usage() {
  console.log('Usage: npm run import:nextsmile -- [source-output-dir]')
  console.log(`Default source: newest daily-* directory under ${defaultOutputsRoot}`)
}

function newestDailyDir() {
  if (!fs.existsSync(defaultOutputsRoot)) {
    throw new Error(`Default outputs root not found: ${defaultOutputsRoot}`)
  }

  const dirs = fs.readdirSync(defaultOutputsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^daily-\d{8}-social/.test(entry.name))
    .map((entry) => path.join(defaultOutputsRoot, entry.name))
    .sort()

  if (dirs.length === 0) {
    throw new Error(`No daily output directories found under ${defaultOutputsRoot}`)
  }

  return dirs[dirs.length - 1]
}

function parseSource(sourceDir) {
  const base = path.basename(sourceDir)
  const match = base.match(/^daily-(\d{8})-social(?:-(\d+))?$/)
  if (!match) {
    throw new Error(`Source directory must look like daily-YYYYMMDD-social or daily-YYYYMMDD-social-02: ${base}`)
  }

  const ymd = match[1]
  const group = match[2] || ''
  const date = `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`
  const idSuffix = group ? `-${group}` : ''
  const folderSuffix = group ? `-${group}` : ''

  return {
    base,
    ymd,
    date,
    group,
    albumId: `nextsmile-${ymd}${idSuffix}`,
    destFolder: `${ymd}${folderSuffix}`,
  }
}

function readTheme(sourceDir) {
  const readme = path.join(sourceDir, 'README.md')
  if (!fs.existsSync(readme)) {
    return {
      title: 'NextSmile 每日宣传素材',
      description: '爱智美 NextSmile 每日宣传图片',
    }
  }

  const content = fs.readFileSync(readme, 'utf8')
  const lines = content.split(/\r?\n/)
  const themeIndex = lines.findIndex((line) => line.trim() === '## 今日主题')
  const title = themeIndex >= 0
    ? lines.slice(themeIndex + 1).find((line) => line.trim())?.trim()
    : undefined

  const descriptionLine = lines.find((line) => line.startsWith('主题说明：'))
  return {
    title: title || 'NextSmile 每日宣传素材',
    description: descriptionLine?.replace('主题说明：', '').trim() || '爱智美 NextSmile 每日宣传图片',
  }
}

function copyPhotos(sourceDir, destFolder) {
  const photos = [
    {
      file: '01-wechat-moments-square.png',
      title: '朋友圈 / 微博方图',
      description: 'NextSmile 宣传方图',
    },
    {
      file: '02-douyin-cover-vertical.png',
      title: '抖音竖版封面',
      description: 'NextSmile 宣传竖版封面',
    },
    {
      file: '03-weibo-wide-banner.png',
      title: '微博横版 / 视频开场图',
      description: 'NextSmile 宣传横版图片',
    },
  ]

  const destDir = path.join(repoRoot, 'public/images/gallery/nextsmile', destFolder)
  fs.mkdirSync(destDir, { recursive: true })

  return photos.map((photo, index) => {
    const source = path.join(sourceDir, photo.file)
    if (!fs.existsSync(source)) {
      throw new Error(`Required image not found: ${source}`)
    }

    const dest = path.join(destDir, photo.file)
    fs.copyFileSync(source, dest)

    return {
      ...photo,
      index: index + 1,
      url: `/images/gallery/nextsmile/${destFolder}/${photo.file}`,
    }
  })
}

function updateGalleryConfig({ albumId, date, theme, copiedPhotos }) {
  const configPath = path.join(repoRoot, 'app/config/gallery.json')
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

  if (!config.categories.nextsmile) {
    config.categories.nextsmile = {
      title: 'NextSmile 宣传素材',
      description: '爱智美 NextSmile 每日宣传图片',
      detail: 'AI 正畸筛查报告、专家会诊支持、门诊沟通转化与口腔美学咨询相关宣传素材。',
      albums: [],
    }
  }

  const category = config.categories.nextsmile
  const existingIndex = category.albums.findIndex((album) => album.id === albumId)
  const album = {
    id: albumId,
    title: theme.title,
    description: theme.description,
    detail: theme.description,
    coverImage: copiedPhotos[0].url,
    photoCount: copiedPhotos.length,
    createdAt: date,
    photos: copiedPhotos.map((photo) => ({
      id: `${albumId}-${photo.index}`,
      url: photo.url,
      title: photo.title,
      description: photo.description,
    })),
  }

  if (existingIndex >= 0) {
    category.albums[existingIndex] = album
  } else {
    category.albums.unshift(album)
  }

  fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`)
}

function main() {
  const args = process.argv.slice(2)
  if (args.includes('--help') || args.includes('-h')) {
    usage()
    return
  }

  const sourceDir = path.resolve(args[0] || newestDailyDir())
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory not found: ${sourceDir}`)
  }

  const parsed = parseSource(sourceDir)
  const theme = readTheme(sourceDir)
  const copiedPhotos = copyPhotos(sourceDir, parsed.destFolder)
  updateGalleryConfig({
    albumId: parsed.albumId,
    date: parsed.date,
    theme,
    copiedPhotos,
  })

  console.log(`Imported ${copiedPhotos.length} images from ${sourceDir}`)
  console.log(`Album: ${parsed.albumId}`)
  console.log(`Gallery URL: /gallery/nextsmile/${parsed.albumId}`)
}

main()
