/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Feedbacks from './pages/Feedbacks';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import UnitDetail from './pages/UnitDetail';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feedbacks" element={<Feedbacks />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/unidade/:id" element={<UnitDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}
