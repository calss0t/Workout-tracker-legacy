import React, { Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider, DatePicker  } from "@material-ui/pickers";
import { Badge } from "@material-ui/core";


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

function Calendar() {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [selectedDays, setSelectedDays] = useState([1, 2, 15]);


  const [date, changeDate] = useState(new Date());

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleMonthChange = async () => {
    // just select random days to simulate server side based data
    return new Promise(resolve => {
      setTimeout(() => {
        setSelectedDays([1, 2, 3].map(() => getRandomNumber(1, 28)));
        resolve();
      }, 1000);
    });
  };


  return (
<>
    <Button onClick={handleOpen}>Open calendar</Button>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                autoOk
                orientation="landscape"
                variant="static"
                openTo="date"
                value={date}
                onChange={(newValue)=> {changeDate(newValue); handleDateChange(newValue); console.log(newValue)}}
                renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
                    const isSelected = isInCurrentMonth && selectedDays.includes(day.getDate());
                    return <Badge badgeContent={isSelected ? "🌚" : undefined}>{dayComponent}</Badge>;
                  }}
                onMonthChange={handleMonthChange}
            />
            </MuiPickersUtilsProvider>
        </Box>
    </Modal>
</>
  );
}

export default Calendar;