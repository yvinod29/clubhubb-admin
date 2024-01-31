import * as React from 'react';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

interface PinkCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PinkCheckbox: React.FC<PinkCheckboxProps> = ({ checked, onChange }) => {
  const label = { inputProps: { 'aria-label': 'Pink Checkbox' } };

  return (
    <Checkbox
      {...label}
      checked={checked}
      onChange={onChange}
      sx={{
        color: pink[800],
        '&.Mui-checked': {
          color: pink[600],
        },
      }}
    />
  );
};

export default PinkCheckbox;
