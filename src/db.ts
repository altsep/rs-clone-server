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
      alias: 'santa661',
    },
    { id: 2, name: 'tttty', alias: '' },
  ],
  posts: [
    {
      id: 1,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum. Cras adipiscing enim eu turpis egestas. Dui nunc mattis enim ut tellus. Congue eu consequat ac felis donec et odio pellentesque diam. Molestie a iaculis at erat pellentesque adipiscing commodo elit at. Magna eget est lorem ipsum dolor sit amet consectetur. Quis commodo odio aenean sed adipiscing diam. A erat nam at lectus urna duis convallis. A arcu cursus vitae congue mauris. Nunc sed velit dignissim sodales ut eu sem integer. Ornare massa eget egestas purus viverra accumsan. Dictum fusce ut placerat orci nulla pellentesque dignissim. In arcu cursus euismod quis viverra. Ut venenatis tellus in metus vulputate. Senectus et netus et malesuada fames ac.',
      userId: 1,
      createdAt: 1675226565449,
      likes: 0,
    },
  ],
};
