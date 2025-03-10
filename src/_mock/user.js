import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  email: sample(["A@yopmail.com","b@yopmail.com","c@yopmail.com","D@YOpmail.com","E@yopmail.com","F@yopmail.com"]),
  number:sample(["9988774455","8877445599","5522114477","6655447788","3366998855","7744558899"]),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Agent',
    'Buyer',
    'Builder',
    'Agent',
    'Buyer',
    'Builder',
    'Agent',
    'Buyer',
    'Builder',
    'Agent',
  ]),
}));
