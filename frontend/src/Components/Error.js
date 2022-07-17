import React, { useEffect, useState } from 'react';

export default function Error({ message }) {
  const [show, setShow] = useState(true);

  const delay = 10;

  useEffect(() => {
    let timer1 = setTimeout(() => setShow(false), delay * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);
  return (
    <>
      {show && (
        <div className="bg-red bg-opacity-55 px-4 py-3 custom-round text-white">
          {message}
        </div>
      )}
    </>
  );
}
