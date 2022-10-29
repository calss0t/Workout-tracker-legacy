import './App.css';
import WeekView from './components/WeekView';
import LoginSignup from './components/LoginSignup';
import NavBar from '../src/components/navbar/NavBar';
import { useState, useEffect } from 'react';

function App() {
  const [displayProfile, setDisplayProfile] = useState(false);
  const [view, setView] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('userid')) {
      setView(<WeekView setView={setView}></WeekView>);
    } else {
      setView(<LoginSignup setView={setView}></LoginSignup>);
    }
  }, []);

  return (
    <div className='App'>
      <NavBar
        setView={setView}
        setDisplayProfile={setDisplayProfile}
        displayProfile={displayProfile}
      />
      <>{view}</>
    </div>
  );
}

export default App;
