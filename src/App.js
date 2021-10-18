import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Landing from './pages/Landing';
import Results from './pages/Results';
import './App.css';
import JSON_DATA from './data/data.json';

function App() {
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(JSON_DATA));
  }, []);

  return (
    <Switch>
      <Route path="/" component={Landing} exact />
      <Route path="/results/:page" component={Results} />
      <Redirect path="*" to="/" />
    </Switch>
  );
}

export default App;
