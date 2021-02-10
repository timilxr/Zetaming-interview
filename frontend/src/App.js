import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import AddStaff from './components/AddStaff';
import ViewStaff from './components/viewStaff';
import AddStudent from './components/AddStudent';
import ViewStudent from './components/viewStudent';

function App() {
  return (
    <div className="App px-5">
      <Router className="mx-5">
        <Switch>
          <Route exact path='/addStaff' component={AddStaff} />
          <Route exact path='/addStudent' component={AddStudent} />
          <Route exact path='/staff' component={ViewStaff} />
          <Route exact path='/students' component={ViewStudent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
