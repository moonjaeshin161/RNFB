import { combineReducers } from 'redux';
import AuthReducer from '../../views/authentication/redux/reducer'
import UserReducer from '../../views/user/redux/reducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
});

export default rootReducer;