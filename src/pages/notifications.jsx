import { Helmet } from 'react-helmet-async';

import { NotificationPage } from 'src/sections/Notifications/view';
// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <NotificationPage />
    </>
  );
}
