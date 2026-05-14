import { PageContent } from '../content'

export async function preloadAllMedia(
  pages: PageContent[],
  onProgress: (pct: number) => void,
): Promise<void> {
  let loaded = 0
  const total = pages.length

  const tick = () => {
    loaded++
    onProgress(Math.round((loaded / total) * 100))
  }

  const jobs = pages.map((page) => {
    if (page.media.type === 'image') {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.onload = () => { tick(); resolve() }
        img.onerror = () => { tick(); resolve() }
        img.src = page.media.src
      })
    }

    return new Promise<void>((resolve) => {
      const video = document.createElement('video')
      video.preload = 'auto'
      video.muted = true
      video.playsInline = true

      const done = () => { tick(); resolve() }
      video.addEventListener('canplaythrough', done, { once: true })
      video.addEventListener('error', done, { once: true })
      // Safari sometimes never fires canplaythrough — bail after 4s
      const timeout = setTimeout(done, 4000)
      video.addEventListener('canplaythrough', () => clearTimeout(timeout), { once: true })
      video.src = page.media.src
      video.load()
    })
  })

  await Promise.all(jobs)
}
