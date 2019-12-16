import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(2, 0, 2, 0),
    backgroundColor: '#f5f5f5'
  },
  name: {
    margin: theme.spacing(1.5, 0.5, 1, 1.5),
    fontWeight: 'bold'
  },
  date: {
    margin: theme.spacing(1.5, 0, 1, 0.5)
  },
  text: {
    margin: theme.spacing(2),
    whiteSpace: 'pre-wrap'
  }
}));

export const Comment = props => {
  const classes = useStyles();
  return (
    <Paper className={classes.card}>
      <Grid container justify="space-between" direction="column">
        <Grid item>
          <Grid
            container
            justify="flex-start"
            direction="row"
            className={classes.container}
          >
            <Grid item>
              <Typography variant="subtitle1" className={classes.name}>
                {props.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={classes.date}
              >
                {formatDate(props.date)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body1" className={classes.text}>
            {props.text}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

const formatDate = date => {
  let y, m, d;
  let millis = new Date(date);
  y = millis.getFullYear();
  m = millis.getMonth() + 1;
  if (m < 10) m = '0' + m.toString();
  d = millis.getDate();
  if (d < 10) d = '0' + d.toString();
  return y + '-' + m + '-' + d;
};
