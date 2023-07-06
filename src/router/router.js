import { createBrowserRouter } from 'react-router-dom';

import { Apartments } from 'pages/ApartmentsPage';

const router = createBrowserRouter([
  {
    path: '/*',
    element: <Apartments />,
  },
]);
  
export default router;