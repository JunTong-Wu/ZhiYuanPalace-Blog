import * as auth from "./auth";
import * as queue from "./queue";

const stores = {
    ...auth,
    ...queue
};
export default stores;