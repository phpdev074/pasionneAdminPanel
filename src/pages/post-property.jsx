import { Helmet } from 'react-helmet-async';

import { PostProperty } from 'src/sections/post-property/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Post Property </title>
      </Helmet>

      <PostProperty />
    </>
  );
}
