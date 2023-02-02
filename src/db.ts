import { Post, User } from './types';

interface Db {
  users: User[];
  posts: Post[];
}

export const db: Db = {
  users: [
    {
      id: 1,
      name: 'Clark',
      password: '',
      alias: 'santa661',
      hidden: false,
      country: '',
      birthDate: '',
      createdAt: '',
    },
    { id: 2, name: 'tttty', password: '', alias: '', hidden: false, country: '', birthDate: '', createdAt: '' },
    { id: 3, name: 'h1dd3nUs3r99', password: '1', alias: '', hidden: true, country: '', birthDate: '', createdAt: '' },
  ],
  posts: [
    {
      id: 1,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Cras adipiscing enim eu turpis egestas. Dui nunc mattis enim ut tellus. Congue eu consequat ac felis donec et odio pellentesque diam. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Magna eget est lorem ipsum dolor sit amet consectetur. Quis commodo odio aenean sed adipiscing diam. A erat nam at lectus urna duis convallis. A arcu cursus vitae congue mauris. Nunc sed velit dignissim sodales ut eu sem integer. Ornare massa eget egestas purus viverra accumsan. Dictum fusce ut placerat orci nulla pellentesque dignissim. In arcu cursus euismod quis viverra. Ut venenatis tellus in metus vulputate. Senectus et netus et malesuada fames ac.',
      userId: 1,
      createdAt: '2023-02-01T04:42:45.449Z',
      likes: 0,
    },
  ],
};
