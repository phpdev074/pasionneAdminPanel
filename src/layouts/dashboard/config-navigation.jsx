import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'All User',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Unverified User',
    path: 'admin/unverified-user',
    icon: icon('ic_user'),
  },
  {
    title: 'Verified User',
    path: 'admin/verified-user',
    icon: icon('ic_user'),
  },
  {
    title: 'blogs',
    path: '/admin/blog',
    icon: icon('ic_user'),
  },
  {
    title: 'faq',
    path: '/admin/faq',
    icon: icon('ic_user'),
  },
  {
    title: 'Contact Us',
    path: '/admin/contact-us',
    icon: icon('ic_user'),
  },
  {
    title: 'Testimonial',
    path: '/admin/testimonial',
    icon: icon('ic_user'),
  },
  {
    title: ' Membership',
    path: '/admin/membership',
    icon: icon('ic_user'),
  },
];

export default navConfig;
