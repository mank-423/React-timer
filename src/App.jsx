import React, { useState } from 'react';
import Screen2 from './components/Timer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TimeForm from './components/TimeForm';
import { TimeProvider } from './context';
import { SnackbarProvider, useSnackbar } from 'notistack';



function App() {

  return (
    <SnackbarProvider>
      <TimeProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<TimeForm />} />
            <Route exact path="/timer" element={<Screen2 />} />
          </Routes>
        </BrowserRouter>
      </TimeProvider>
    </SnackbarProvider>
  );
}

export default App;
