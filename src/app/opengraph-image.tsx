import { ImageResponse } from 'next/og';

export const alt = 'TripKario — Curated Tours & Travel Planning';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0F2524',
          backgroundImage: 'radial-gradient(circle at 50% 30%, #1B4947 0%, #0F2524 100%)',
          color: '#FAF4E8',
          position: 'relative',
          padding: '60px',
          fontFamily: 'serif',
        }}
      >
        {/* Decorative Hexagon Border Backdrop */}
        <div
          style={{
            position: 'absolute',
            inset: '30px',
            border: '2px solid rgba(238, 88, 44, 0.3)',
            borderRadius: '24px',
            pointerEvents: 'none',
          }}
        />

        {/* Brand Logo Badge SVG Representation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '120px',
            height: '120px',
            borderRadius: '28px',
            backgroundColor: '#FAF4E8',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              fontSize: '56px',
              fontWeight: 900,
              fontFamily: 'Times New Roman, serif',
              color: '#1B4947',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#EE582C' }}>T</span>
            <span>K</span>
          </div>
        </div>

        {/* Brand Name Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            letterSpacing: '-1px',
            color: '#FAF4E8',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          TripKario
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(250, 244, 232, 0.85)',
            fontFamily: 'sans-serif',
            fontWeight: 400,
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
            marginBottom: '36px',
          }}
        >
          Trips across India, planned around you.
        </div>

        {/* Feature Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            fontFamily: 'sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#EE582C',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          <span>Kashmir</span>
          <span style={{ color: 'rgba(250, 244, 232, 0.4)' }}>•</span>
          <span>Ladakh</span>
          <span style={{ color: 'rgba(250, 244, 232, 0.4)' }}>•</span>
          <span>Rajasthan</span>
          <span style={{ color: 'rgba(250, 244, 232, 0.4)' }}>•</span>
          <span>Kerala</span>
          <span style={{ color: 'rgba(250, 244, 232, 0.4)' }}>•</span>
          <span>Meghalaya</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
