import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import { HashRouter } from 'react-router-dom'

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

serviceWorker.unregister();
