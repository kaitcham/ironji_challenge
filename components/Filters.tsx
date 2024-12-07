'use client';

import FilterOption from './FilterOption';

interface FiltersProps<T> {
  name: string;
  target: string;
  initialData: T[];
  options: string[];
  selectedOption: string;
  SetItemToEdit: () => void;
  SetSelectedOption: (option: string) => void;
}

export default function Filters<T>({
  name,
  target,
  options,
  initialData,
  selectedOption,
  SetItemToEdit,
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
          number={getNumber(option)}
          isActive={selectedOption === option}
          action={() => SetSelectedOption(option)}
        />
      ))}
      <div className="filter__btn">
        <button onClick={SetItemToEdit} popoverTarget={`${target}-form`}>
          <span>+</span>
          <span>New {name}</span>
        </button>
      </div>
    </div>
  );
}
