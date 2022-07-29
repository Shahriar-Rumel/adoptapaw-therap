// import gsap from 'gsap';
// import React, { useEffect } from 'react';
// import Button from '../Components/Button';
// import TextInput from '../Components/IO/TextInput';

// export default function MissingAnimalDataPage() {
//   useEffect(() => {
//     gsap.fromTo(
//       '.missing-data-animation',
//       { y: '+=60', autoAlpha: 0, stagger: 0.2 },
//       { y: '0', autoAlpha: 1, stagger: 0.2 }
//     );
//   }, []);
//   return (
//     <div className="lg:flex lg:justify-between lg:flex-row-reverse mx-auto lg:w-3/4 w-[90vw]  mt-[100px] lg:mt-[150px] mb-[100px]">
//       <img
//         src="/assets/DogBox.svg"
//         className="mx-auto lg:w-[400px] lg:pl-6 missing-data-animation"
//       ></img>
//       <div className="lg:w-[50%]">
//         <h1 className="font-extrabold text-[24px] missing-data-animation  text-primary tracking-tight  text-center lg:text-left w-[95%] lg:w-[100%] leading-6 ">
//           Do you have any information about Tommy?
//         </h1>
//         <p className="missing-data-animation text-[14px]  text-gray-light mb-5 mt-3 ">
//           Please fill in the form to let us know
//         </p>
//         <div className="missing-data-animation">
//           {' '}
//           <TextInput
//             label={'Location of doggy'}
//             placeholder={'Dhanmondi , Dhaka'}
//           />
//         </div>
//         <div className="missing-data-animation">
//           {' '}
//           <TextInput
//             label={'Please upload an image of doggy'}
//             placeholder={'Dhanmondi , Dhaka'}
//           />
//         </div>
//         <div className="missing-data-animation">
//           <TextInput
//             label={'Your Mobile Number / Email'}
//             placeholder={'demo@gmail.com'}
//           />
//         </div>
//         <div className="missing-data-animation">
//           <Button text="Send"></Button>
//         </div>
//       </div>
//     </div>
//   );
// }
