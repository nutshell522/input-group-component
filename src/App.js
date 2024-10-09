import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Container } from 'react-bootstrap';
import AgeGroupPriceList from './components/settings/AgeGroupPriceList';

function App() {
  return (
    <div className="App">
      <Container>
        <AgeGroupPriceList onChange={(result) => console.log(result)} />
      </Container>
    </div>
  );
}

export default App;
