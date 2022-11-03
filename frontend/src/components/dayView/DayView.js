import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import WeekView from '../WeekView';
import ExerciseModal from '../ExerciseModal';
import Calendar from '../Calendar';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function DayView({ setView, workoutId }) {

  const [rows, setRows] = useState([{ name: "", weight: "", sets: "", reps: "", break_time: "" }])

  useEffect(() => {
    (async () => {
      const rawResponse = await fetch(
        `/exercise/${workoutId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            Connection: 'keep-alive',
            'Content-Length': 123,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const content = await rawResponse.json();
      if (Array.isArray(content)) {
        setRows(content);
      }
    })();
  }, []);
  
  const [open, setOpen] = React.useState(false);
  const [menu, setMenu] = React.useState('');

  const menuHandleChange = (event) => {
    setMenu(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };


  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Exercise</TableCell>
              <TableCell align="right">Weight(not implemented)</TableCell>
              <TableCell align="right">Sets</TableCell>
              <TableCell align="right">Reps</TableCell>
              <TableCell align="right">Break Time</TableCell>
              <TableCell align="right">Complete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">{row.sets}</TableCell>
                <TableCell align="right">{row.reps}</TableCell>
                <TableCell align="right">{row.break_time}</TableCell>
                <TableCell align="right">{<input type="checkbox" />}</TableCell>
                <TableCell align="right">
                  <ExerciseModal setView={setView} exerciseId={row.id} workoutId={workoutId} initName={row.name} initSets={row.sets} initReps={row.reps} initBreak={row.break_time}></ExerciseModal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => {
        setView(<WeekView setView={setView}></WeekView>)
      }}>Week View</Button>
      <Calendar/>

      <Button onClick={handleClickOpen}>Choose workout</Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Slecet a workout</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">Menu</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={menu}
                  onChange={menuHandleChange}
                  input={<OutlinedInput label="menu" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>abs</MenuItem>
                  <MenuItem value={2}>arms</MenuItem>
                  <MenuItem value={3}>back</MenuItem>
                  <MenuItem value={4}>calves</MenuItem>
                  <MenuItem value={5}>cardio</MenuItem>
                  <MenuItem value={6}>chest</MenuItem>
                  <MenuItem value={7}>legs</MenuItem>
                  <MenuItem value={8}>shoulder</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </Fragment >
  );
}
