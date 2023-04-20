import Layout from './components/Layout';
import { Route, Routes } from 'react-router';
import Homepage from './pages/Homepage';
import TopManga from './pages/TopManga';
import Recommendations from './pages/Recommendations';
import MangaInfo from './pages/MangaInfo';
import ReadManga from './pages/ReadManga';

function App() {
  return (
    <div className='App'>
      <Layout>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/top-manga' element={<TopManga />} />
          <Route path='/top-manga?page=' element={<TopManga />} />
          <Route path='/recommendations' element={<Recommendations />} />
          <Route path='/manga/:id' element={<MangaInfo />} />
          <Route path='/read-manga' element={<ReadManga />} />
          <Route path='/about' element={<div>About</div>} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
