import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

import localizedFormat from 'dayjs/plugin/localizedFormat';

// Add the localization plugin to dayjs
dayjs.extend(localizedFormat);

type BasicDateTimePickerProps = {
  label?: string;
  fieldChange?: (dateString: string) => void;
  initialDate?: string | null;
};

const BasicDateTimePicker: React.FC<BasicDateTimePickerProps> = ({ label = "Basic date time picker", fieldChange, initialDate }) => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const date = initialDate ? dayjs(initialDate) : null;
  const [selectedDate, setSelectedDate]  = React.useState<Dayjs | null>(date);

  
  
 
  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    
    console.log(selectedDate)
    if (fieldChange) {
      const dateString = date ? dayjs(date).toISOString() : "";
      fieldChange(dateString);

    }
  
  };

  return (
    <ThemeProvider theme={darkTheme}>
      {/* Use dayjs directly with the added plugin */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateTimePicker']}>
          <DateTimePicker label={label} value={selectedDate || null} onChange={handleDateChange} />
        </DemoContainer>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default BasicDateTimePicker;