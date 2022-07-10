import React from 'react';
import { features } from '../../Data/adoption';
import FeaturesCol from '../FeaturesCol';
import FeaturesRow from '../FeaturesRow';

export default function ({ data }) {
  return (
    <div className="description-animation missing-animation flex mt-[30px]  lg:mt-[0px] lg:mb-5 justify-between items-center  mx-auto bg-primary-light py-3 px-5 custom-round">
      <div>
        <FeaturesCol title={'Breed'} value={data.breed} />
      </div>
      <div className={'border-l-brand border-l-2 pl-3'}>
        <FeaturesCol title={'Training'} value={data.training} />
      </div>
      <div className={'border-l-brand border-l-2 pl-3'}>
        <FeaturesCol title={'Vaccinated'} value={data.vaccine} />
      </div>
      <div className={'border-l-brand border-l-2 pl-3'}>
        <FeaturesCol title={'Color'} value={data.color} />
      </div>
    </div>
  );
}
