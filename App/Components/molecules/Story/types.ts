import { faker } from '@faker-js/faker';

export type Story = {
  index: number;
  author: {
    avatar: string;
    first_name: string;
  };
  stories: {
    title: string;
    content: string;
    media: {
      type: 'image' | 'video';
      url: string;
    };
  }[];
};

const genetaratedData: () => Story[] = () => {
  return Array.from({ length: 15 }, (_, i) => ({
    index: i,
    stories: Array.from({ length: i + 1 }, (__) => ({
      title: faker.location.city(),
      content: faker.lorem.paragraph(),
      media: {
        type: 'image',
        url: faker.image.url(),
      },
    })),
    author: {
      first_name: faker.person.firstName(),
      avatar: faker.image.avatar(),
    },
  }));
};

const data = genetaratedData();
export default data;
