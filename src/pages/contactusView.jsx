import { Helmet } from 'react-helmet-async';

import ContactUsPage from 'src/sections/contactus/view/contactus-view-page';
// ----------------------------------------------------------------------

export default function FaqPage() {
  return (
    <>
      <Helmet>
        <title> FAQ </title>
      </Helmet>

      <ContactUsPage />
    </>
  );
}
