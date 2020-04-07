import { combineReducers } from 'redux';
import AuthReducer from '../../views/authentication/redux/reducer'
import UserReducer from '../../views/user/redux/reducer';
import { MessageReducer } from '../../views/message/redux/reducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    message: MessageReducer
});

export default rootReducer;