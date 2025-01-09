import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';
import { getCarById } from '../api/api';
import { realTimeRegistrationCheck, stopRegistrationCheck } from '../services/registrationService';

export default function RegistrationPage() {
  const [carDetails, setCarDetails] = useState(null);
  const [serverTimeDisplay, setServerTimeDisplay] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getCarById(searchParams.get('id')).then((data) => setCarDetails(data));
    realTimeRegistrationCheck(searchParams.get('id'), setRegistrationStatus, setServerTimeDisplay);

    return () => stopRegistrationCheck();
  }, [searchParams]);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
        <Typography align="center" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Server time: {serverTimeDisplay === null ? 'Loading...' : format(new Date(serverTimeDisplay), 'dd/MM/yyyy HH:mm:ss')}
        </Typography>
        <Button align="center" onClick={() => navigate('/')} sx={{
          border: '1px solid',
          borderColor: 'primary.main',
          color: 'primary.main',
          '&:hover': {
            borderColor: 'primary.dark',
          },
        }}
>
          Return to list
        </Button>
      </Box>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carDetails != null ? (
              <TableRow key={carDetails.id}>
                <TableCell>{carDetails.make}</TableCell>
                <TableCell>{carDetails.model}</TableCell>
                <TableCell>{format(new Date(carDetails.registrationExpiryDate), 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                <TableCell>{registrationStatus === null ? 'Loading...' : registrationStatus ? 'Valid' : 'Expired'}</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No car found with the specified ID.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
