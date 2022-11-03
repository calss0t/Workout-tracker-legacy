import React, { Fragment, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Badge } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ExercisesList from "./ExercisesList";

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

function AddExerciseModal({date}) {
  const [open, setOpen] = React.useState(false);

  const [selectedBodyPart, setSelectedBodyPart] = useState(false);
  const [exercises, setExercises] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchExercises = async (partOfBody) => {
    console.log(partOfBody);
    const fetchWorkout = await fetch(
      `/testing/fetchExercisesByCategory/${partOfBody}`,
      {
        method: "GET",
        headers: {
          images: true,
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
        setSelectedBodyPart(true);
        setExercises(result);
      })
      .then(() => {
        console.log(exercises);
        handleClose();
      });
  };

  return (
    <>
      <Button onClick={handleOpen}>Add exercise</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Choose what part of your body you want to train
          </Typography>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <nav aria-label="secondary mailbox folders">
              <List>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={(e) => fetchExercises(e.target.innerText)}
                  >
                    <ListItemText primary="Abs" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={(e) => fetchExercises(e.target.innerText)}
                  >
                    <ListItemText primary="Arms" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={(e) => fetchExercises(e.target.innerText)}
                  >
                    <ListItemText primary="Back" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={(e) => fetchExercises(e.target.innerText)}
                  >
                    <ListItemText primary="Calves" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={(e) => fetchExercises(e.target.innerText)}
                  >
                    <ListItemText primary="Cardio" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={(e) => fetchExercises(e.target.innerText)}
                  >
                    <ListItemText primary="Chest" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={(e) => fetchExercises(e.target.innerText)}
                  >
                    <ListItemText primary="Legs" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={(e) => fetchExercises(e.target.innerText)}
                  >
                    <ListItemText primary="Shoulder" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
      {selectedBodyPart === true && (
        <ExercisesList
          date={date}
          selectedBodyPart={selectedBodyPart}
          setSelectedBodyPart={setSelectedBodyPart}
          exercises={exercises}
        />
      )}
    </>
  );
}

export default AddExerciseModal;
