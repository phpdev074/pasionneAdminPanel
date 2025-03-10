import { Helmet } from 'react-helmet-async';

import { ReportPropertyPage } from 'src/sections/reportProperty/view';
// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Report Property Page </title>
      </Helmet>

      <ReportPropertyPage />
    </>
  );
}
