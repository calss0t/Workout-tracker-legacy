import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SignupModal from './SignupModal';
import WeekView from './WeekView';
import DayView from './dayView/DayView';


export default function LoginSignup({ setView }) {
  // email validation regex
  function isEmail(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  }

  // login info states
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // login info handlers
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function submit() {
    if (isEmail(email)) {
      const data = { email, password };
      (async () => {
        const rawResponse = await fetch(`/user/login`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            Connection: 'keep-alive',
            'Content-Length': 123,
          },
          body: JSON.stringify(data),
        });
        const content = await rawResponse.json();
        localStorage.setItem('token', content.token);
        localStorage.setItem('userid', content.userid);
        setView(<DayView setView={setView}></DayView>);
      })();
    } else {
      alert('invalid email');
    }
  }

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={0.5}
      >
        <TextField
          required
          id='email'
          type='email'
          label='Email'
          value={email}
          onChange={handleEmail}
        />
        <TextField
          required
          id='password'
          label='Password'
          type='password'
          autoComplete='current-password'
          value={password}
          onChange={handlePassword}
        />
        <Button
          onClick={() => {
            submit();
          }}
          variant='outlined'
        >
          Login
        </Button>
        <SignupModal setView={setView}></SignupModal>
      </Stack>
    </Box>
  );
}
