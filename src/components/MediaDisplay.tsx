import { useRef, useEffect, useState } from 'react'

interface Props {
  type: 'image' | 'video'
  src: string
  alt?: string
  isActive: boolean
}

export function MediaDisplay({ type, src, alt, isActive }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [imgKey] = useState(() => src)

  // Image fallback for failed videos: same basename, .jpg
  const fallbackSrc = src.replace(/\.[^.]+$/, '.jpg')

  useEffect(() => {
    if (type !== 'video' || !videoRef.current) return
    const v = videoRef.current
    if (isActive) {
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [isActive, type])

  const wrapStyle: React.CSSProperties = {
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 8px 40px rgba(139,44,78,0.12), 0 2px 12px rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    position: 'relative',
  }

  if (type === 'video' && !videoError) {
    return (
      <div style={wrapStyle}>
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    )
  }

  // Image (or video fallback)
  const imageSrc = videoError ? fallbackSrc : src

  return (
    <div style={wrapStyle}>
      <img
        key={imgKey}
        src={imageSrc}
        alt={alt ?? ''}
        className={isActive ? 'ken-burns' : ''}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
