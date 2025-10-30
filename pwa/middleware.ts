import { stackMiddlewares } from './middlewares/stackMiddlewares';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { notAuthenticated } from './middlewares/notAuthenticated';
import { notSetup } from './middlewares/notSetup';
import { isAdmin } from './middlewares/isAdmin';

export default stackMiddlewares([
  isAuthenticated,
  notAuthenticated,
  notSetup,
  isAdmin,
]);
