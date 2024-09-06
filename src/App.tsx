import './App.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { MantineProvider } from '@mantine/core';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import MasterGerbang from './pages/MasterGerbang/MasterGerbang';
import { BasicAppShell } from './layouts/BasicAppShell';
import LaporanPerHari from './pages/Laporan/LaporanPerHari';
import Layout from './layouts/Layout';

const App = () => {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<BasicAppShell />}>
              <Route path="/dashboard" element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="master-gerbang" element={<MasterGerbang />} />
                <Route path="laporan-perhari" element={<LaporanPerHari />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;
