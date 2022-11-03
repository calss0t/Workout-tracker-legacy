import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import DayView from './dayView/DayView';

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

export default function ExerciseModal({
  setView,
  exerciseId,
  initName,
  initSets,
  initReps,
  initBreak,
  workoutId,
  setRows
}) {
  // modal states
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // exercise states
  const [name, setName] = React.useState(initName);
  const [sets, setSets] = React.useState(initSets);
  const [reps, setReps] = React.useState(initReps);
  const [breakTime, setBreakTime] = React.useState(initBreak);

  // exercise state handlers
  function handleName(e) {
    setName(e.target.value);
  }
  function handleSets(e) {
    setSets(e.target.value);
  }
  function handleReps(e) {
    setReps(e.target.value);
  }
  function handleBreakTime(e) {
    setBreakTime(e.target.value);
  }

  // form submission
  function submit() {
    setRows([])
    const data = { name, sets, reps, break_time: breakTime };
    (async () => {
      const rawResponse = await fetch(`/exercise/${exerciseId}`, {
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
      });
      handleClose();
    })();
  }

  return (
    <div>
      <Button onClick={handleOpen}>edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box component='form' sx={style} noValidate autoComplete='off'>
          <Stack
            direction='column'
            justifyContent='center'
            alignItems='center'
            spacing={0.5}
          >
            <TextField
              id='name'
              label='Name'
              value={name}
              onChange={handleName}
            />
            <TextField
              id='sets'
              label='Sets'
              value={sets}
              onChange={handleSets}
            />
            <TextField
              id='reps'
              label='Reps'
              value={reps}
              onChange={handleReps}
            />
            <TextField
              id='breakTime'
              label='Break Time'
              value={breakTime}
              onChange={handleBreakTime}
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
                handleClose();
              }}
              variant='outlined'
            >
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
