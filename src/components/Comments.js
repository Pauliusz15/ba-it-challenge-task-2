import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Comment } from './Comment';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    alignItems: 'center'
  }
}));

export const Comments = () => {
  const classes = useStyles();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3212/feedbacks');
      const data = await res.json();
      setComments(data.body);
    })();
  }, []);

  return (
    <Fragment>
      <Link to="/">Rašyti komentarą</Link>
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
            Komentarai
          </Typography>
          <div className={classes.Container}>
            {comments.map((comment, index) => {
              return (
                <Comment
                  key={index}
                  name={comment.name}
                  date={comment.date}
                  text={comment.text}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </Fragment>
  );
};
