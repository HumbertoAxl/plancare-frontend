import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarDetailsPage from './pages/CarDetailsPage';
import RegistrationPage from './pages/RegistrationPage';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';

function App() {
    return (
        <Router>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6'>Car Registration Status</Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: '20px' }}>
                <Routes>
                    <Route path='/' element={<CarDetailsPage />} />
                    <Route path='/registration' element={<RegistrationPage />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
