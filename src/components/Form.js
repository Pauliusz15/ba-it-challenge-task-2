import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Container,
  Snackbar,
  IconButton
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const Form = () => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');
  const [snackbar, setSnackbar] = useState('');

  const onSubmit = async e => {
    e.preventDefault();

    const formData = { name: name, email: email, date: date, text: text };

    await fetch('http://localhost:3212/feedbacks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        data.success
          ? setSnackbar('Komentaras įrašytas')
          : setSnackbar('Įvyko klaida');
      })
      .catch(() => {
        setSnackbar('Įvyko klaida');
      });
  };

  return (
    <Fragment>
      <Link to="/comments">Žiūrėti komentarus</Link>
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Palik komentarą
          </Typography>
          <form className={classes.form} noValidate onSubmit={e => onSubmit(e)}>
            <TextField
              margin="normal"
              variant="outlined"
              fullWidth
              id="name"
              label="Vardas"
              name="name"
              autoComplete="fname"
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="email"
              label="El. paštas"
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                variant="inline"
                fullWidth
                format="yyyy/MM/dd"
                id="date-picker"
                label="Data"
                value={date}
                onChange={e => {
                  setDate(e);
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField
              margin="normal"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              id="text"
              label="Komentaras"
              name="text"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Įrašyti
            </Button>
          </form>
        </div>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackbar ? true : false}
        autoHideDuration={6000}
        onClose={() => setSnackbar('')}
        message={<Typography>{snackbar}</Typography>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbar('')}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Fragment>
  );
};
