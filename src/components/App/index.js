import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WithAuth from '../HOC/WithAuth';
import Login from '../Login';
import Posts from '../../features/Posts';
import PostPage from '../../components/PostPage';
import './app.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          exact
          element={
            <WithAuth>
              <Posts />
            </WithAuth>
          }
        />
        <Route
          path='/post/add'
          exact
          element={
            <WithAuth>
              <PostPage />
            </WithAuth>
          }
        />
        <Route path='/login' exact element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
