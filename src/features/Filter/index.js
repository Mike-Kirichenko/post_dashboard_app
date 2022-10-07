import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addSearchText, setDateRange, getFilterFields } from './filterSlice';
import { changeQueryObj, fetchPosts, getQueryObj } from '../Posts/postsSlice';
import './filter.css';

const Filter = () => {
  const dispatch = useDispatch();

  const { search, dateRange } = useSelector(getFilterFields);
  let queryObj = useSelector(getQueryObj);
  const { dateFrom, dateTo } = dateRange;

  const handleSetDateRange = (dateObj) => {
    const serializedDate = JSON.stringify(dateObj);
    dispatch(setDateRange(serializedDate));
  };

  const handleAddSearchField = ({ target }) => {
    const { value: searchText } = target;
    dispatch(addSearchText(searchText));
  };

  const handleFilter = () => {
    queryObj = {
      page: 1,
      limit: queryObj.limit,
      ...dateRange,
      search,
    };
    dispatch(changeQueryObj(queryObj));
    dispatch(fetchPosts({ query: queryObj }));
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
              onInput={handleAddSearchField}
              value={search}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Date from'
                value={dateFrom}
                inputFormat='DD/MM/YYYY'
                onChange={(newValue) =>
                  handleSetDateRange({ dateFrom: newValue })
                }
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
                value={dateTo}
                inputFormat='DD/MM/YYYY'
                onChange={(newValue) =>
                  handleSetDateRange({ dateTo: newValue })
                }
                renderInput={(params) => (
                  <TextField {...params} variant='standard' id='date-to' />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant='contained'
              className='filterSubmit'
              onClick={handleFilter}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Filter;
