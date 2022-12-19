import { ApplicationRouter } from '../Routes/Route.Index';
import letUsersLogin from './Login';
import UserCreation from './Register';
import router from '../server';
import { openApiInstance } from '../openApi';
import { OpenApi, textPlain } from 'ts-openapi';

// ApplicationRouter(router, letUsersLogin)

export { letUsersLogin, UserCreation };
