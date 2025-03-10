import { Helmet } from 'react-helmet-async';

import { DeleteUserPage } from 'src/sections/deletedUsers/view';
// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Deleted Users  </title>
      </Helmet>

      <DeleteUserPage />
    </>
  );
}
