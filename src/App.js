import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/layout/auth/login';
import Register from './components/layout/auth/register';
import FileManager from './components/layout/auth/fileManager';

function App() {

  return (
    <div>
      <div>
        <Router>
          <section className="container bg-light mt-2 p-3 pt-5">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/file-manager" component={FileManager} />
            </Switch>
          </section>
        </Router>
      </div>
    </div>
  );
}

export default App