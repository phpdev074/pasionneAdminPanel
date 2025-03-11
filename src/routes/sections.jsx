/* eslint-disable */
import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { AuthProvider } from 'src/hooks/AuthContext';

import DashboardLayout from 'src/layouts/dashboard';
 
// import PostPage from 'src/sections/post-listing/view/post-view';
export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const BasicTabs = lazy(()=> import('src/pages/tabs'));
export const PostPropertyNav = lazy(()=> import('src/pages/post-property'))
export const UserPage = lazy(() => import('src/pages/user'));
export const FaqPage = lazy(()=> import('src/pages/faq'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const FeedBackPage = lazy(()=> import('src/pages/feedback'));
export const ReportPropertyPage = lazy (()=> import('src/pages/reportProperty'))
export const DeletePostProperty = lazy(()=>import('src/pages/delete-post-property'))
export const NotificationPage = lazy(()=> import('src/pages/notifications'))
export const DeleteUserPage = lazy(()=> import('src/pages/deleteUsers'))
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ContactUsPage = lazy(()=> import('src/pages/contactusView'))
export const TestimonialPage = lazy(()=> import('src/pages/testimonial'))
export const MemeberShipPage = lazy(()=> import('src/pages/membership'))
export const UnverifiedUsers = lazy(()=> import('src/pages/unVerifiedUser'))
export const VerifyUsers = lazy(()=> import('src/pages/verified-user'))

export default function Router() {

  const isAuthenticated = () => localStorage.getItem('token') !== null;
  
  const PrivateRoute = ({ children }) => (
    isAuthenticated() ? children : <Navigate to="/login" />
  );

  PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const routes = useRoutes([
    {
      element: (
        <AuthProvider>
          <PrivateRoute>
            <DashboardLayout>
              <Suspense >
                <Outlet />
              </Suspense>
            </DashboardLayout>
          </PrivateRoute>
        </AuthProvider>
      ),
      children: [
        { path: 'admin/dashboard', element: <IndexPage /> },
        { path: 'admin/user', element: <UserPage /> },
        { path: 'admin/notification', element: <NotificationPage /> },
        { path: 'admin/feedback', element: <FeedBackPage /> },
        { path: 'admin/deletedUsers', element: <DeleteUserPage /> },
        { path: 'admin/reportProperty', element: <ReportPropertyPage /> },
        { path: 'admin/post', element: <DeletePostProperty /> },
        { path: 'admin/deletedPostProperty', element: <PostPropertyNav /> },
        { path: 'admin/tabs', element: <BasicTabs /> },
        { path: 'admin/products', element: <ProductsPage /> },
        { path: 'admin/blog', element: <BlogPage /> },
        { path: 'admin/faq', element: <FaqPage /> },
        { path: 'admin/contact-us', element: <ContactUsPage/>},
        { path: 'admin/testimonial', element: <TestimonialPage/>},
        { path: 'admin/membership', element: <MemeberShipPage/>},
        { path: 'admin/unverified-user', element: <UnverifiedUsers/>},
        { path: 'admin/verified-user', element: <VerifyUsers/>}
      ],
    },
    {
      path: '/admin',
      element: isAuthenticated() ? <Navigate to="/admin/dashboard" /> : <LoginPage />,
      index: true,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/admin" replace />,
    },
  ]);

  return routes;
}
