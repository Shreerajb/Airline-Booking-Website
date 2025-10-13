import './App.css';
import AppNavbar from './components/Navbar';
import Herocarousel from './components/Carousel';
import SearchBoxDrop from './components/searchBox';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Route, Routes } from 'react-router-dom';
import FlightSearch from './components/flight-search';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PassengerDetailsPage from './components/passengerDetailsPage';
import AddOnsPage from './components/AddOnsPage';

function App() {
  return (
    
    <Routes>
      <Route element={<AppNavbar />}>
        <Route
          index
          element={
            <>
              <Herocarousel />
              <SearchBoxDrop />
            </>
          }
        />
        <Route path="/flight-booking" index element={
          <FlightSearch />} />
          <Route path="/passenger-details" element={<PassengerDetailsPage />} />
          <Route path="/add-ons" element={<AddOnsPage />} />

          
      </Route>
    </Routes >
    
  );
}

export default App;
