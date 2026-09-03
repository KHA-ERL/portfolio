import { ImageResponse } from 'next/og'

export const alt = 'Michael Paul - Software Engineer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#f6f1e8',
          color: '#171717',
          padding: 72,
          fontFamily: 'Arial',
        }}
      >
        <div style={{ fontSize: 28, color: '#7c3f2c', marginBottom: 32 }}>
          Software Engineer / DevOps / Technical Writer
        </div>
        <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1 }}>
          Michael Paul
        </div>
        <div style={{ fontSize: 34, color: '#4b5563', marginTop: 28, maxWidth: 860 }}>
          Backend systems, cloud infrastructure, Linux, and AI-powered product engineering.
        </div>
      </div>
    ),
    size
  )
}
