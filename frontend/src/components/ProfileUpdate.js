import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import UserProfile from './userProfile/UserProfile';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProfileUpdate({
  setView,
  initFirstName,
  initLastName,
  initHeight,
  initWeight,
  setDisplayProfile,
}) {
  // exercise states
  const [firstName, setFirstName] = React.useState(initFirstName);
  const [lastName, setLastName] = React.useState(initLastName);
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');
  const [height, setHeight] = React.useState(initHeight);
  const [weight, setWeight] = React.useState(initWeight);

  // exercise state handlers
  function handleFirstName(e) {
    setFirstName(e.target.value);
  }
  function handleLastName(e) {
    setLastName(e.target.value);
  }
  // function handleEmail(e) {
  //   setEmail(e.target.value);
  // }
  // function handlePassword(e) {
  //   setPassword(e.target.value);
  // }
  function handleHeight(e) {
    setHeight(e.target.value);
  }
  function handleWeight(e) {
    setWeight(e.target.value);
  }

  // form submission
  function submit() {
    const data = { firstName, lastName, height, weight };
    (async () => {
      const rawResponse = await fetch(
        `/user/${localStorage.getItem('userid')}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            Connection: 'keep-alive',
            'Content-Length': 123,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(data),
        }
      );
      setView(
        <UserProfile
          setDisplayProfile={setDisplayProfile}
          setView={setView}
        ></UserProfile>
      );
    })();
  }

  return (
    <div>
      <Box component='form' sx={style} noValidate autoComplete='off'>
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='center'
          spacing={0.5}
        >
          <TextField
            id='firstName'
            label='first name'
            value={firstName}
            onChange={handleFirstName}
          />
          <TextField
            id='lastName'
            label='last name'
            value={lastName}
            onChange={handleLastName}
          />
          {/* <TextField
            id='email'
            label='email'
            value={email}
            onChange={handleEmail}
          />
          <TextField
            id='password'
            label='password'
            value={password}
            onChange={handlePassword}
          /> */}
          <TextField
            id='height'
            label='height'
            value={height}
            onChange={handleHeight}
          />
          <TextField
            id='weight'
            label='weight'
            value={weight}
            onChange={handleWeight}
          />
          <Button
            onClick={() => {
              submit();
            }}
            variant='outlined'
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
