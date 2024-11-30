import FilterOption from './FilterOption';

interface Filter {
  title: string;
  filters: Array<object>;
}

export default function AllTrucksFilters() {
  return (
    <div className="rightside__content__body__filters">
      <FilterOption text="All Trucks" number={30} isActive={true} />
      <FilterOption text="All Trucks" number={30} isActive={false} />
      <FilterOption text="All Trucks" number={30} isActive={false} />

      <div className="filter__btn">
        <button>
          <span>+</span>
          <span>New truck</span>
        </button>
      </div>
    </div>
  );
}
