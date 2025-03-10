import { Helmet } from 'react-helmet-async';

import TestimonialPage from 'src/sections/testimonials/view/testimonial-page';
// ----------------------------------------------------------------------

export default function FaqPage() {
  return (
    <>
      <Helmet>
        <title> Testimonial </title>
      </Helmet>

      <TestimonialPage />
    </>
  );
}
