'use client';

export default function CarIcon({ isActive }: { isActive: boolean }) {
  const color = isActive ? 'ff7f1f' : '000000';
  return (
    <img
      width="33"
      height="33"
      src={`https://img.icons8.com/${color}/driving.png`}
      alt="driving"
    />
  );
}
