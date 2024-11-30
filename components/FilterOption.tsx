'use client';

interface FilterOptionProps {
  text: string;
  number: number;
  isActive: boolean;
  action?: () => void;
}

export default function FilterOption({
  text,
  number,
  action,
  isActive,
}: FilterOptionProps) {
  return (
    <button className={`filter__btn ${isActive && 'active'}`} onClick={action}>
      <span>{text}</span>
      <span className={`number ${isActive && 'active'}`}>{number}</span>
    </button>
  );
}
