import React from 'react';
import { aditionalFeatures } from '../Data/adoption';
import FeaturesRow from './FeaturesRow';
export default function AdditionalFeatures({ data }) {
  let count = 1;
  return (
    <div className="description-animation  bg-shadow py-6 px-4 mt-5 custom-round ">
      {/* {Array.apply(null, { length: 5 }).map((item, i) => {
        return (
          <FeaturesRow
            title={'Physical Condition'}
            value={data.physicalcondition}
          />
        );
      })} */}

      <FeaturesRow
        title={'Physical Condition'}
        value={data.physicalcondition}
      />
      <FeaturesRow title={'Location'} value={data.location} />
      <FeaturesRow title={'Behaviour'} value={data.behaviour} />
      <FeaturesRow title={'Food Habits'} value={data.food} />
      <FeaturesRow title={'Gender'} value={data.gender} />
    </div>
  );
}
