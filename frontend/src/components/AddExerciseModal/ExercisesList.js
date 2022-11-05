import * as React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import ImageListItem from '@mui/material/ImageListItem';


import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height:'100%',
  overflow:'scroll',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function RenderMoreInfo({ card, date, setOpenParent, setRows}) {
  const [open, setOpen] = React.useState(false);

  const [sets, setSets] = React.useState("");
  const [reps, setReps] = React.useState("");
  const [name, setName] = React.useState(card.exercises[0].name);

  function handleSets(e) {
    setSets(e.target.value);
  }
  function handleReps(e) {
    setReps(e.target.value);
  }

  const handleOpenChild = () => {
    setOpen(true);

  };
  const handleCloseChild = () => {
    setOpen(false);
  };

  function submit() {
    setRows([])
    const data = { name, sets, reps };
    (async () => {
      const rawResponse = await fetch(`/testing/ex/${localStorage.getItem('userid')}/${date}`, {
        method: 'POST',
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
      handleCloseChild();
      setOpenParent(false)
    })();
  }


  return (
    <React.Fragment>
      <Button onClick={handleOpenChild}>More Info</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleCloseChild}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">{card.exercises[0].name}</h2>
          <p id="child-modal-description">{card.exercises[0].description}</p>
          {card.images.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
              />
            </ImageListItem>
          ))}
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
          >
            <TextField
              id='name'
              label='Name'
              value={card.exercises[0].name}
            />
            <TextField
              id="sets"
              label="Sets"
              value={sets}
              onChange={handleSets}
            />
            <TextField
              id="reps"
              label="Reps"
              value={reps}
              onChange={handleReps}
            />
            <Button
              onClick={() => {
                submit();
              }}
              variant="outlined"
            >
              Submit
            </Button>
          </Stack>
          <Button onClick={handleCloseChild}>Close Exercise</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function ExercisesList({ exercises, selectedBodyPart, setSelectedBodyPart, date, setRows}) {
  
  const [open, setOpenParent] = React.useState(false);

  React.useEffect(() => {
    if (selectedBodyPart) {
      handleOpen();
    }
  }, [selectedBodyPart]);

  const handleOpen = () => {
    setOpenParent(true);
  };
  const handleClose = () => {
    setOpenParent(false);
    setSelectedBodyPart(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    height:'100%',
    overflow:'scroll',
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const renderCard = (card) => {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {card.exercises[0].name}
          </Typography>
          <Typography variant="body2">
            {card.exercises[0].description[0] == "<" ? card.exercises[0].description.substr(3,(card.exercises[0].description.length - 7)) : card.exercises[0].description}
          </Typography>
        </CardContent>
        <RenderMoreInfo setOpenParent={setOpenParent} card={card} date={date} setRows={setRows}/>
      </Card>
    );
  };

  return (
    <>
      {selectedBodyPart == true && (
        <Modal
          open={handleOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {exercises.length == 0 ? (
              <h3>"Sorry, we couldn't find any exercises"</h3>
            ) : (
              exercises.map(renderCard)
            )}
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default ExercisesList;
