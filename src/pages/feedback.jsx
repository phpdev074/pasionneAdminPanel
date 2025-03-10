import { Helmet } from 'react-helmet-async';

import { FeedBackPage } from 'src/sections/feedback/view';
// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Feedback </title>
      </Helmet>

      <FeedBackPage />
    </>
  );
}
