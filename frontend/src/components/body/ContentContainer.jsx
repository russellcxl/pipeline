import React from 'react';
import AppRoutes from "../AppRoutes";
import {
  Container,
  Grid, 
  Paper,
  Box
} from "@material-ui/core";
import { Copyright } from '@material-ui/icons';

// ------------------------------------ component ------------------------------------ //

export default function ContentContainer(props) {

  return (
    <main className={props.classes.content}>
      <div className={props.classes.appBarSpacer} />
      <Container maxWidth="lg" className={props.classes.container}>

          {/* router for rendering the main body content */}
          <AppRoutes {...props} />

      </Container>
    </main>
  );
};

