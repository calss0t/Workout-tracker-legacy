import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DayView from './dayView/DayView';
import { Button } from '@mui/material';
import WorkoutUpdate from './WorkoutUpdate';

import { utils } from '../utils';

const API = utils.API_URL || 'http://localhost:8080';

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

export default function WeekView({ setView }) {
  const [weekViewArr, setWeekViewArr] = useState(tempWeekViewArr);

  useEffect(() => {
    (async () => {
      const rawResponse = await fetch(
        `${API}/workout/${localStorage.getItem('userid')}`,
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
        setWeekViewArr(content);
      }
    })();
  }, []);

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
                    <DayView setView={setView} workoutId={obj.id}></DayView>
                  );
                }}
              >{`${daysOfTheWeek[obj.day_of_week] || ''} -  Workout: ${
                obj.name || ''
              }`}</Item>
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
