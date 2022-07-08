import React from 'react';

export default function FeaturesCol({ title, value }) {
  return (
    <div>
      <h1 className="text-primary font-[600]">{title}</h1>
      <h1 className="text-gray-light text-[14px] font-[500]">{value}</h1>
    </div>
  );
}
