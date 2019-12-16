import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Form } from './Form';
import { Comments } from './Comments';

export const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/comments">
            <Comments />
          </Route>
          <Route path="/">
            <Form />
          </Route>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};
