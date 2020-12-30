import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export const useS3UrlFix = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
    if (path) {
      console.log(`replacing path: ${path}`);
      history.replace(path);
    }
  }, [location.hash, history]);
};
