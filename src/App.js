import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import BarGraph from './Component/Bargraph';
import HomePage from './Component/HomePage';
import Navigationbar from './Component/Navigationbar';
import TableComponent from './Component/TableComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <Navigationbar/>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/bargraph" component={BarGraph}/>
    </BrowserRouter>
    </div>
  );
}
export default App;