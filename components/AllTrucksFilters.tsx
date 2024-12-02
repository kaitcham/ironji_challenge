'use client';
import { useTrucks } from '@/app/context/TruckContext';
import FilterOption from './FilterOption';

export default function AllTrucksFilters() {
  const { initialData, selectedOption, SetSelectedOption } = useTrucks();
  const options = ['All Trucks', ...new Set(initialData.map((t) => t.status))];

  const getNumber = (option: string) =>
    option === 'All Trucks'
      ? initialData.length
      : initialData.filter((t) => t.status === option).length;

  return (
    <div className="rightside__content__body__header__filters">
      {options.map((option) => (
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
          <span>New truck</span>
        </button>
      </div>
    </div>
  );
}
