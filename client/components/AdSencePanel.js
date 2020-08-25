import React, { useEffect } from 'react';

// const AdSencePanel = ({ slotId }) => {
//   useEffect(() => {
//     try {
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     } catch (error) {
//       console.error('adSence error', error);
//     }
//   }, []);

//   return (
//     <div className='ad' style={{ textAlign: 'center' }}>
//       <ins
//         style={{ display: 'block' }}
//         data-ad-client='ca-pub-8300648839719622'
//         data-ad-slot={slotId}
//         data-ad-format='auto'
//         data-full-width-responsive='true'
//       />
//     </div>
//   );
// };

const AdSencePanel = ({ slotId }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('adSence error', error);
    }
  }, []);

  return (
    <ins
      className='adsbygoogle mt-3'
      style={{ display: 'inline-block', width: `100%`, height: `400px`, textAlign: 'center' }}
      data-ad-client='ca-pub-8300648839719622'
      data-ad-slot={slotId}
    />
  );
};

export default AdSencePanel;
