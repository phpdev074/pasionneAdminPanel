import { Helmet } from 'react-helmet-async';

import UnVerifiedUser from 'src/sections/unVerifiedUser/view/un-verified-user';
// ----------------------------------------------------------------------

export default function UnVerifiedUsers() {
  return (
    <>
      <Helmet>
        <title> UnVerified Users </title>
      </Helmet>

      <UnVerifiedUser />
    </>
  );
}
