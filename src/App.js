import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BasicFormInfo from './forms/basicInfoForm';
import AccountForm from './forms/accountForm';
import AddressForm from './forms/addressForm';
import EducationForm from './forms/educationForm';
import MainForm from './forms/mainForm';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainForm />} />
        <Route path='/basicInfo' element={<BasicFormInfo />} />
        <Route path='/accountInfo' element={<AccountForm />} />
        <Route path='/addressInfo' element={<AddressForm />} />
        <Route path='/educationInfo' element={<EducationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
