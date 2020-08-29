import React, { useMemo, useEffect } from 'react';
import { Box } from 'ui';

const FaceBookPanel = () => {
  useEffect(() => {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        FB.XFBML.parse(); // https://developers.facebook.com/docs/reference/javascript/FB.XFBML.parse/
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_EN/sdk.js#xfbml=1&version=v2.5';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  const panel = useMemo(() => {
    return (
      <Box headerText='FaceBook' className='mt-3'>
        <div
          className='fb-page'
          data-href='https://www.facebook.com/Fleshaslt-1662329690717676'
          data-width='1000'
          data-hide-cover='false'
          data-show-facepile='false'
        ></div>
      </Box>
    );
  }, []);

  return panel;
};

export default FaceBookPanel;
