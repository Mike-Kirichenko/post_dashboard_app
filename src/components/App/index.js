import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WithAuth from '../HOC/WithAuth';
import Login from '../Login';
import Posts from '../Posts';
import './app.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Posts />} />
        <Route path='/login' exact element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
