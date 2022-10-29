import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import WeekView from './WeekView';


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

export default function ProfileUpdate({ setView, initName, workoutid }) {
  // exercise states
  const [name, setName] = React.useState(initName);

  // exercise state handlers
  function handleName(e) {
    setName(e.target.value);
  }

  // form submission
  function submit() {
    const data = { name };
    (async () => {
      const rawResponse = await fetch(`/workout/${workoutid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
      setView(<WeekView setView={setView}></WeekView>);
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
            id='name'
            label='name'
            value={name}
            onChange={handleName}
          />
          <Button
            onClick={() => {
              submit();
            }}
            variant='outlined'
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              setView(<WeekView setView={setView}></WeekView>);
            }}
            variant='outlined'
          >
            return
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
