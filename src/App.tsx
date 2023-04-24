import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import Search from './Search';
import Repo from './Repo';

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" Component={Search} />
            <Route path="/:repo/:owner/:repo" Component={Repo} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default App;