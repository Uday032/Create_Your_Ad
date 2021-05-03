import './App.css';
import {Container} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//css
import 'bootstrap/dist/css/bootstrap.min.css';

//pages
import Index from './pages/Index'
import UploadData from './pages/UploadData'
import Search from './pages/Search'
import AddUniversity from './pages/AddUniversity'

function App() {
  return (
    <div>
      <Container>
        <section>
          <Router>
            <Switch>
              <Route path='/adduniversity' component={AddUniversity} />
              <Route path='/search' component={Search} />
              <Route path='/upload' component={UploadData} />
              <Route path='/' component={Index} />
            </Switch>
          </Router>
        </section>
      </Container>
    </div>
  );
}

export default App;
