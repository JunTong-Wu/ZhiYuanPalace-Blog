import * as auth from './auth';
import * as queue from './queue';
import * as musicPlayer from './musicPlayer';
import * as post from './post';

export const store = {
  ...auth,
  ...queue,
  ...musicPlayer,
  ...post,
};
