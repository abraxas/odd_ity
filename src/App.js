import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Header from "./components/Header";
import Roller from "./components/Roller";

export default function App() {
  return (
    <Box>
      <Header />
      <Container>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            O.D.D - Ity
          </Typography>
        </Box>
        <Box>
          <Roller />
        </Box>
      </Container>
    </Box>
  );
}