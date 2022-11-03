import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DayView from './dayView/DayView';
import { Button, unstable_composeClasses } from '@mui/material';
import WorkoutUpdate from './WorkoutUpdate';



// The most straitforward way of doing this I've been able to find.
const daysOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// default styling from MUI
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minWidth: '200px',
}));

// this array is here as a template for what I believe should returned by the API call and for testing
// It should not exist in production
const tempWeekViewArr = [
  { name: '', dayOfWeek: 0 },
  { name: '', dayOfWeek: 1 },
  { name: '', dayOfWeek: 2 },
  { name: '', dayOfWeek: 3 },
  { name: '', dayOfWeek: 4 },
  { name: '', dayOfWeek: 5 },
  { name: '', dayOfWeek: 6 },
];

export default function WeekView({ setView, date}) {

  const [weekViewArr, setWeekViewArr] = useState(tempWeekViewArr);
  const [weekDates, setWeekDates] = useState([])


  
  useEffect(()=>{
    const dayOfTheWeek = new Date().getDay()
    const getWeekDates  = (dayOfTheWeek) => {
      const result = []
      for(let i = 0 ; i < dayOfTheWeek; i++) {
        var todayDate = new Date()
        todayDate.setDate(todayDate.getDate() - i)
        result.unshift(todayDate)
      } 
      for (let i = 1; i <= (7-dayOfTheWeek); i++){
        var todayDate = new Date()
        todayDate.setDate(todayDate.getDate() + i)
        result.push(todayDate)
      }
      return result
    }
    
    const arrayFetchURL = getWeekDates(dayOfTheWeek).map((element) => {
      return fetch(
        `/workout/${localStorage.getItem("userid")}/${element.toDateString()}`,
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
    })
    Promise.all(arrayFetchURL)
    .then(async ([mon,tue,wed,thu,fri,sat,sun]) => {
      const result = []
      await mon.json().then((res) => result.push(res[0]))
      await tue.json().then((res) => result.push(res[0]))
      await wed.json().then((res) => result.push(res[0]))
      await thu.json().then((res) => result.push(res[0]))
      await fri.json().then((res) => result.push(res[0]))
      await sat.json().then((res) => result.push(res[0]))
      await sun.json().then((res) => result.push(res[0]))
      return result
    })
    .then((res) => {
      setWeekDates(getWeekDates(dayOfTheWeek)) 
      setWeekViewArr(res)
      return res
    })
    .then((res) => {
      for(let i = 0; i<res.length;i++){
        if(res[i] == undefined){
          res[i] = {}
          res[i].name = "No workout yet"
          res[i].date = new Date(weekDates[i]).toDateString()
        }
      }
    })
  },[weekDates])

  return (
    <Box>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={0.5}
      >
        {/* // TODO add onClick to Item to setView to DayView obj.dayOfWeek */}
        {weekViewArr.map(obj => {
          return (
            <>
              <Item
                onClick={() => {
                  setView(
                    <DayView setView={setView} date={obj.date} workoutId={obj.id}></DayView>
                  );
                }}
              >
              {obj.name && obj.date}
              {/* {`${daysOfTheWeek[obj.day_of_week] || ''} -  Workout: ${
                obj.name || ''
              }`} */}
              </Item>
              <Button
                onClick={() => {
                  setView(
                    <WorkoutUpdate
                      setView={setView}
                      initName={obj.name}
                      workoutid={obj.id}
                    ></WorkoutUpdate>
                  );
                }}
              >
                edit
              </Button>
            </>
          );
        })}
      </Stack>
    </Box>
  );
}
