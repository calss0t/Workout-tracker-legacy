import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DayView from './dayView/DayView';
import Calendar from './Calendar';



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
        result.unshift(todayDate.toDateString())
      } 
      for (let i = 1; i <= (7-dayOfTheWeek); i++){
        var todayDate = new Date()
        todayDate.setDate(todayDate.getDate() + i)
        result.push(todayDate.toDateString())
      }
      return result
    }
    const daysArray = getWeekDates(dayOfTheWeek)
    setWeekDates(daysArray)
  },[])

  return (
    <Box>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={5}
        marginTop="1rem"
      >
        {weekDates.map(obj => {
          return (
            <>
              <Item
                onClick={() => {
                  setView(
                    <DayView setView={setView} date={obj}></DayView>
                  );
                }}
              >
              {obj}
              </Item>
            </>
          );
        })}
      </Stack>
      {<br></br>}
      {<br></br>}
      <Calendar date={date} setView={setView}/>
    </Box>
  );
}
