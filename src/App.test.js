import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// eslint-disable-next-line jest/expect-expect
it('renders without crashing', () => {
  const div = document.createElement('div'); // eslint-disable-line
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
