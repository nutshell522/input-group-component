import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfoInputGroup from './components/InfoInputGroup';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <InfoInputGroup index="1" />
      </Container>
    </div>
  );
}

export default App;
