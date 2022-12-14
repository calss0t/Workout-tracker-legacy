import React, { Fragment, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import { Badge } from "@material-ui/core";
import DayView from './dayView/DayView';


import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Calendar({ date, setView }) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([1, 2, 15]);

  const [dateToday, changeDate] = useState(new Date());

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const SelectDate = (newValue) => {
    date = new Date(newValue).toDateString();
    setView(
      <DayView setView={setView} date={date} ></DayView>
    );
    // changeDate(newValue);
    // handleDateChange(newValue);
    // console.log(newValue);
    // //setDate(newValue)
    // date = new Date(newValue).toDateString();
    // console.log(date);
    handleClose();
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
              //orientation="landscape"
              variant="static"
              openTo="date"
              value={dateToday}
              onChange={(newValue) => {
                SelectDate(newValue);
              }}
            />
          </MuiPickersUtilsProvider>
        </Box>
      </Modal>
    </>
  );
}

export default Calendar;
