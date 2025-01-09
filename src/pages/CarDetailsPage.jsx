import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import { getCars } from '../api/api';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiCarInfo } from '@mdi/js';
import { format } from 'date-fns';

export default function CarDetailsPage() {
  const [cars, setCars] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [make, setMake] = useState(searchParams.get('make') || '');

  useEffect(() => {
    getCars(searchParams.get('make')).then((data) => setCars(data));
  }, [searchParams]);

  const handleMakeInput = (event) => {
    const value = event.target.value;
    setMake(value);

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('make', value);
    } else {
      params.delete('make');
    }
    navigate(`?${params.toString()}`);
  };

  const handleIconClick = (carId) => {
    navigate(`/registration?id=${carId}`);
  };

  return (
    <div>
      <TextField label="Search by make" value={make} onChange={handleMakeInput} variant="outlined" margin="normal" fullWidth />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Plate</TableCell>
              <TableCell>Registration Expiry</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.length > 0 ? (
              cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.make}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.plate}</TableCell>
                  <TableCell>{format(new Date(car.registrationExpiryDate), 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                  <TableCell>
                    <Icon path={mdiCarInfo} size={1.5} style={{ cursor: 'pointer' }} onClick={() => handleIconClick(car.id)} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No cars found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
