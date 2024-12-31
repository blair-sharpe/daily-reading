import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from './pages/NotFound.page';
import { ReadingPlanPage } from './pages/ReadingPlan.page';
import { ServerErrorPage } from './pages/ServerError.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ReadingPlanPage />,
  },
  {
    path: '/error',
    element: <ServerErrorPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
