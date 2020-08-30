import React from 'react';
import AppRoutes from "../AppRoutes";
import {
  Container,
  Grid, 
  Paper,
  Box
} from "@material-ui/core";

export default function MainContent(props) {

  return (
    <main className={props.classes.content}>
      <div className={props.classes.appBarSpacer} />
      <Container maxWidth="lg" className={props.classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={props.classes.paper} >
              <AppRoutes {...props}/>
            </Paper>
          </Grid>
        </Grid>
        <Box pt={4}></Box>
      </Container>
    </main>
  );
};