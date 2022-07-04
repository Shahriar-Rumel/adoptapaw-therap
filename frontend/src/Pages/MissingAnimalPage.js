import React from 'react';

import AdoptionHeader from '../Components/AdoptionHeader';
import CardList from '../Components/CardList';

export default function MissingAnimalPage() {
  return (
    <div className="lg:w-3/4 w-[90vw] mx-auto mt-[100px]">
      <AdoptionHeader link="/assets/Lost-dog.svg" header="Missing Animals" />
      <h1 className="font-extrabold tracking-tighter text-[24px] px-3 text-primary border-l-4 border-l-red">
        Paws Missing
      </h1>

      <CardList link={'missing'} buttonText={'Help Me'} />
    </div>
  );
}
