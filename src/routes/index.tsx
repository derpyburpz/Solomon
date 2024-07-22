import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './../pages/home';
import Models from '../pages/models';
import Pricing from './../pages/pricing';
import Blog from './../pages/blog';
import Model from '../components/organisms/model';

export const pages = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' }
];

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/model-kits" element={<Models />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/model-kits/:id" element={<Model />} />
    </Routes>
  );
};

export default AppRoutes;
