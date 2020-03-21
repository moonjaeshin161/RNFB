import { createStore } from 'redux';
import rootReducer from '../reducer/rootReducer';
import AuthReducer from '../../views/authentication/redux/reducer';

const store = createStore(
    rootReducer

)

export default store;