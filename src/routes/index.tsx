import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './../pages/home';
import Models from '../pages/models';
import Pricing from './../pages/pricing';
import Blog from './../pages/blog';
import Model from '../components/organisms/model';


export const pages = [
    { name: 'Home', path: '/' },
    { name: 'Models', path: '/models' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' }
];

const AppRoutes: React.FC = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/models" element={<Models />} />
      {/* <Route path="/models/real_grades" element={<RealGradeList />} /> */}
      {/* <Route path="/models/master_grades" element={<MasterGradeList />} /> */}
      <Route path="/models/real_grades/:id" element={<Model />} />
      <Route path="/models/master_grades/:id" element={<Model />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
};

export default AppRoutes;