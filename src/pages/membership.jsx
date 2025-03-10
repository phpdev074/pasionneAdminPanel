import { Helmet } from 'react-helmet-async';

import MembershipPage from 'src/sections/membership/view/membership-page';
// ----------------------------------------------------------------------

export default function MembershipPages() {
  return (
    <>
      <Helmet>
        <title> MemeberShip </title>
      </Helmet>

      <MembershipPage />
    </>
  );
}
