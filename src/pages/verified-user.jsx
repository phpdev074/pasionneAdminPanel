import { Helmet } from 'react-helmet-async';

import VerifyUserPage from 'src/sections/verifiedUser/view/verify-user-page';
// ----------------------------------------------------------------------

export default function VerifyUserPages() {
  return (
    <>
      <Helmet>
        <title> Verify User </title>
      </Helmet>

      <VerifyUserPage />
    </>
  );
}
