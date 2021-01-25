
import ReactDOM from 'react-dom';
import './index.css';
import Pages from './client/Pages';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import  { Provider } from 'react-redux';
import rootReducer from './client/rootReducer';

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><Pages/></Provider>, document.getElementById('root'));





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();