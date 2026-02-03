import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CredentialsProvider } from './context/CredentialsContext';
import AppLayout from './components/Layout/AppLayout';
import GameGrid from './components/Dashboard/GameGrid';
import GameDetailsPage from './components/GameDetails/GameDetailsPage';

function App() {
  return (
    <CredentialsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<GameGrid />} />
            <Route path="game/:gameCode" element={<GameDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CredentialsProvider>
  );
}

export default App;
