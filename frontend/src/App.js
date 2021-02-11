import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import './App.css';
import AddStaff from './components/AddStaff';
import ViewStaff from './components/viewStaff';
import AddStudent from './components/AddStudent';
import ViewStudent from './components/viewStudent';
import TeacherStudents from './components/teacherStudents';

function App() {
  return (
    <div className="App px-5">
      <Router className="mx-5">
      <div className='mt-5'>
      <Link to='/addStudent' className="text-white">
        <Button variant='info' className='mr-5 text-center'>
        Add Students
        </Button>
      </Link>
      <Link to='/students' className="text-white">
        <Button variant='info' className='mr-5 text-center'>
        View Students
        </Button>
      </Link>
      <Link to='/addStaff' className="text-white">
        <Button variant='info' className='mr-5 text-center'>
        Add Staff
        </Button>
      </Link>
      <Link to='/staff' className="text-white"><Button variant='info' className='mr-5 text-center'>
          View Staff
        </Button>
      </Link>
        
      </div>
        <Switch>
          <Route exact path='/addStaff' component={AddStaff} />
          <Route exact path='/addStudent' component={AddStudent} />
          <Route exact path='/staff' component={ViewStaff} />
          <Route exact path='/staff/:class_held' component={TeacherStudents} />
          <Route exact path='/students' component={ViewStudent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
