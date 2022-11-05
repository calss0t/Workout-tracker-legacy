import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import WeekView from "../WeekView";
import ExerciseModal from "../ExerciseModal";
import Calendar from "../Calendar";
import AddExerciseModal from "../AddExerciseModal/AddExerciseModal.js";
import { formGroupClasses, touchRippleClasses } from "@mui/material";

export default function DayView({ setView, date, setDate }) {
  const [rows, setRows] = useState([{ name: "", sets: "", reps: "", complete: ""}]);

  const [workoutId, setWorkoutId] = useState()
  const [workoutName, setWorkoutName] = useState(undefined)
  const [showDate, setShowDate] = useState()
  const [tracker, setTracker] = useState(false)
  const [exerciseID, setExerciseID] = useState()

  const addDone = (e) => {
    if (e.target.checked === true) {
      (async () => {
          const rawResponse = await fetch(`/testing//ex/complete/${exerciseID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
              'Accept-Encoding': 'gzip, deflate, br',
              Connection: 'keep-alive',
              'Content-Length': 123,
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ completion: true }),
          }).then(() => setTracker(true))
        })();
    } else {
      (async () => {
          const rawResponse = await fetch(`/testing//ex/complete/${exerciseID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
              'Accept-Encoding': 'gzip, deflate, br',
              Connection: 'keep-alive',
              'Content-Length': 123,
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({completion: false}),
          })
        })();
    }
  };
  useEffect(() => {
    (async () => {
      if(date === undefined){
        date = new Date().toDateString()
      }
      setShowDate(date)
      const fetchWorkout = await fetch(
        `/workout/${localStorage.getItem("userid")}/${date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
            "Content-Length": 123,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const workoutJson = await fetchWorkout
        .json()
        .then((result) => {
          if (result[0] === undefined) {
            setWorkoutName(undefined)
            return undefined
          }
          else{
            setWorkoutName(result[0].name)
            setWorkoutId(result[0].id)
            return result[0].id;
          }
        })
        .then(async (workoutID) => {
          if (workoutID !== undefined) {
            const rawResponse = await fetch(`/exercise/${workoutID}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                Connection: "keep-alive",
                "Content-Length": 123,
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            const content = await rawResponse.json();
            if (Array.isArray(content)) {
              setRows(content);
            }
          }
          else{
            setRows([])
          }
        });
    })();
  }, [date, rows]);

  return (
    <Fragment>
      <h2>{showDate}</h2>
      <h2>{workoutName === undefined ? "No workout yet" : `Workout name: ${workoutName}`}</h2>
      <TableContainer component={Paper}>
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Exercise</TableCell>
              <TableCell align="right">Sets</TableCell>
              <TableCell align="right">Reps</TableCell>
              <TableCell align="right">Complete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.sets}</TableCell>
                <TableCell align="right">{row.reps}</TableCell>
                <TableCell align="right">
                  {<input type="checkbox" checked={row.complete} onChange={console.log("test")} onClick={(e) => {setExerciseID(row.id); addDone(e) } }/>}
                </TableCell>
                <TableCell align="right">
                  <ExerciseModal
                    setRows={setRows}
                    setView={setView}
                    exerciseId={row.id}
                    workoutId={workoutId}
                    initName={row.name}
                    initSets={row.sets}
                    initReps={row.reps}
                    initBreak={row.break_time}
                  ></ExerciseModal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        onClick={() => {
          setView(<WeekView date={date} setView={setView}></WeekView>);
        }}
      >
        Week View
      </Button>
      <Calendar date={date} workoutId={workoutId} setView={setView}/>
      <AddExerciseModal workoutId={workoutId}  setRows={setRows} date={date}/>
    </Fragment>
  );
}
