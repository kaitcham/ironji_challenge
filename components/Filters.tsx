'use client';
import { useTrucks } from '@/context/TruckContext';
import FilterOption from './FilterOption';

interface FiltersProps<T> {
  name: string;
  initialData: T[];
  options: string[];
  selectedOption: string;
  SetSelectedOption: (option: string) => void;
}

export default function AllTrucksFilters<T>({
  name,
  options,
  initialData,
  selectedOption,
  SetSelectedOption,
}: FiltersProps<T>) {
  const getNumber = (option: string) =>
    option === `All ${name}s`
      ? initialData.length
      : initialData.filter((data: any) => data.status === option).length;

  return (
    <div className="rightside__content__body__header__filters">
      {options?.map((option) => (
        <FilterOption
          key={option}
          text={option}
          action={() => SetSelectedOption(option)}
          isActive={selectedOption === option}
          number={getNumber(option)}
        />
      ))}
      <div className="filter__btn">
        <button popoverTarget="truck-form">
          <span>+</span>
          <span>New {name}</span>
        </button>
      </div>
    </div>
  );
}
