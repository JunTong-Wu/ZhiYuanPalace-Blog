import * as auth from "./auth";
import * as queue from "./queue";
import * as musicPlayer from "./musicPlayer";

const stores = {
  ...auth,
  ...queue,
  ...musicPlayer,
};
export default stores;
