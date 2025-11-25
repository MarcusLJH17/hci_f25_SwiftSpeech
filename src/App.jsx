import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateSet from './pages/CreateSet';
import StudySet from './pages/StudySet';
import GameHub from './pages/GameHub';
import MatchingGame from './pages/games/MatchingGame';
import QuizGame from './pages/games/QuizGame';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateSet />} />
          <Route path="/study/:id" element={<StudySet />} />
          <Route path="/games" element={<GameHub />} />
          <Route path="/games/matching" element={<MatchingGame />} />
          <Route path="/games/quiz" element={<QuizGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
