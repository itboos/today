import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/CommentApp';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
