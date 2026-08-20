import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1B4947',
          borderRadius: '8px',
          color: '#FAF4E8',
          fontFamily: 'serif',
          fontWeight: 900,
          fontSize: '20px',
        }}
      >
        <span style={{ color: '#EE582C', marginRight: '1px' }}>T</span>
        <span style={{ color: '#FAF4E8' }}>K</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
