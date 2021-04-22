import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import './styles/index.scss';

const App = (): React.ReactElement => <div className="container">
        <Main />
    </div>;

ReactDOM.render(<App />, document.getElementById('root'));
