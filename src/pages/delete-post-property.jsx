import { Helmet } from 'react-helmet-async';

import { DeletePostProperty } from 'src/sections/deleted-post-property/view';
// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Deleted Post Property  </title>
      </Helmet>

      <DeletePostProperty />
    </>
  );
}
