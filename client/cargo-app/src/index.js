import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {createStore} from "redux";
import {Provider} from "react-redux";

import rootReducer from "./reducers/index";

import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./components/Material-UI/theme"

const store = createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App /> 
        </ThemeProvider>
    </Provider>
, document.getElementById('root')
);