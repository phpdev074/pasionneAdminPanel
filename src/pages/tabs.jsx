import { Helmet } from 'react-helmet-async';

import BasicTabs from 'src/sections/tabs/tabs';

// ----------------------------------------------------------------------

export default function BasicTab() {
  return (
    <>
      <Helmet>
        <title> Blog </title>
      </Helmet>

      <BasicTabs />
    </>
  );
}