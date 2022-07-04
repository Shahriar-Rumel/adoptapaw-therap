import React from 'react';
import DonationListCard from '../Components/DonationListCard';

export default function DonationPage() {
  return (
    <div className="lg:w-3/4 w-[90vw] mx-auto mt-[100px]">
      <h1 className="font-black text-primary text-[24px] text-left mb-12 tracking-tight">
        Ongoing Donations
      </h1>
      <DonationListCard />
    </div>
  );
}
