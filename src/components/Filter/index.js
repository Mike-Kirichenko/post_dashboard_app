import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './filter.css';

const Filter = () => {
  const [dateRange, setDateRange] = useState({ dateFrom: null, dateTo: null });

  const handleSetDateRange = (dateObj) => {
    setDateRange((prevRange) => ({ ...prevRange, ...dateObj }));
  };

  return (
    <Box id='filter-wrapper'>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              id='standard-basic'
              label='Search'
              variant='standard'
              placeholder='Enter post title or text'
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Date from'
                value={dateRange.dateFrom}
                sx={{ p: '3' }}
                onChange={(newValue) => {
                  handleSetDateRange({ dateFrom: newValue });
                }}
                inputFormat='DD/MM/YYYY'
                renderInput={(params) => (
                  <TextField {...params} variant='standard' id='date-from' />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                variant='standard'
                label='Date to'
                value={dateRange.dateTo}
                onChange={(newValue) => {
                  handleSetDateRange({ dateTo: newValue });
                }}
                inputFormat='DD/MM/YYYY'
                sx={{ p: '3' }}
                renderInput={(params) => (
                  <TextField {...params} variant='standard' id='date-to' />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant='contained' type='submit' className='filterSubmit'>
              Filter
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Filter;
