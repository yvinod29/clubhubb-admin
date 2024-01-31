import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUpdateStatusMutation } from '@/store/api/postApi';
import { useParams } from 'react-router-dom';

const RegistrationStatus: React.FC<{ status: boolean }> = ({ status }) => {
  console.log(status)
  const [isRegistered, setIsRegistered] = useState(status);
  const [updateStatus] = useUpdateStatusMutation(); // Fix typo here
  const { eventId } = useParams();

  const toggleStatus = async () => {
    setIsRegistered(!isRegistered);
    if (eventId) {
      const session = await updateStatus({ eventId, status: isRegistered }); // Fix typo here
      console.log(session);
    }
  };

  // Define a custom theme with a contrasting color for the switch
  const theme = createTheme({
    palette: {
      primary: {
        main: '#866EFF', // White color for contrast
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <p>Status: {isRegistered ? 'Stop Responses' : 'Activate Responses'}</p>
        <Switch
          checked={isRegistered}
          onChange={toggleStatus}
          color="primary" // Use the primary color defined in the theme
          inputProps={{ 'aria-label': 'toggle registration status' }}
        />
      </div>
    </ThemeProvider>
  );
};

export default RegistrationStatus;
