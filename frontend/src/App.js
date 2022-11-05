import './App.css';
import WeekView from './components/WeekView';
import LoginSignup from './components/LoginSignup';
import NavBar from '../src/components/navbar/NavBar';
import { useState, useEffect } from 'react';

function App() {
  const [displayProfile, setDisplayProfile] = useState(false);
  const [view, setView] = useState(null);
  const [date, setDate] = useState(new Date().toDateString())

  useEffect(() => {
    setView(<LoginSignup date={date} setDate={setDate} setView={setView}></LoginSignup>);
    // const loginDate = new Date().toDateString()
    // setDate(loginDate)
    // if (localStorage.getItem('userid')) {
    //   setView(<WeekView setView={setView}></WeekView>);
    // } else {
    //   setView(<LoginSignup date={date} setDate={setDate} setView={setView}></LoginSignup>);
    // }
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
