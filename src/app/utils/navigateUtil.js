import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const navigateUtil = createBrowserHistory();
export default navigateUtil

export const CustomRouter = ({
   basename,
   children,
   navigateUtil,
}) => {
   const [state, setState] = React.useState({
      action: navigateUtil.action,
      location: navigateUtil.location,
   });

   React.useLayoutEffect(() => navigateUtil.listen(setState), [navigateUtil]);

   return (
      <Router
         basename={basename}
         children={children}
         location={state.location}
         navigationType={state.action}
         navigator={navigateUtil}
      />
   );
};

