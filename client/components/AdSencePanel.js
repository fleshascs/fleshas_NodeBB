import React, { useEffect } from 'react';

const AdSencePanel = (slotId) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className='ad' style={{ textAlign: 'center' }}>
      <ins
        style={{ display: 'block' }}
        data-ad-client='ca-pub-8300648839719622'
        data-ad-slot={slotId}
        data-ad-format='auto'
        data-full-width-responsive='true'
      />
    </div>
  );
};
export default AdSencePanel;
