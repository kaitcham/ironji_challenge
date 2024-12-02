'use client';
import { useState } from 'react';
import AllTrucksFilters from '@/components/Filters';

export default function page() {
  const [selectedOption, SetSelectedOption] = useState('All Orders');
  const options = ['All Orders', 'Pending', 'In Progress', 'Completed'];
  return (
    <div className="rightside__content__body__header">
      <h1>Orders</h1>
      <AllTrucksFilters
        name="Order"
        initialData={[]}
        options={options}
        selectedOption={selectedOption}
        SetSelectedOption={SetSelectedOption}
      />
    </div>
  );
}
