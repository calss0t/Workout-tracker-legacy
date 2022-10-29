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
import { utils } from '../../utils'
const API = utils.API_URL;

export default function DayView({ setView, workoutId }) {

  const [rows, setRows] = useState([{ name: "", weight: "", sets: "", reps: "", break_time: "" }])

  useEffect(() => {
    (async () => {
      const rawResponse = await fetch(
        `${API}/exercise/${workoutId}`,
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
    </Fragment >
  );
}
