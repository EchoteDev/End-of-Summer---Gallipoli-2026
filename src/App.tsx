/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import BookingWizard from './pages/BookingWizard';
import CustomerArea from './pages/CustomerArea';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
           <Route index element={<Landing />} />
           <Route path="booking" element={<BookingWizard />} />
           <Route path="customer" element={<CustomerArea />} />
           <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
