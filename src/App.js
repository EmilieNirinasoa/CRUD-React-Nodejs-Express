import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const ItemList = lazy(() => import('./ItemList'));
const About = lazy(() => import('./About'));
const ItemForm = lazy(() => import('./ItemForm'));
const ItemEditForm = lazy(() => import('./ItemEditForm'));
const ItemDeleteButton = lazy(() => import('./ItemDeleteButton'));
const IDList = lazy(() => import('./IDlist'));
const Compteur = lazy(() => import('./Compteur'));
const Liste = lazy(() => import('./Liste'));
 const Upload = lazy(() => import('./insertuploads/Ajout'));
// const Upload2 = lazy(() => import('./insertuploads/Upload'));
const App = () => (
  <Router>
    <Suspense fallback={<div>Chargement...</div>}>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<ItemForm/>} />
        <Route path="/Compteur" element={<Compteur/>} />
        <Route path="/Liste" element={<Liste/>} />
        <Route path="/id/:id" element={<IDList/>} />
        <Route path="/ItemEditForm/:itemId" element={<ItemEditForm/>} />
        <Route path="/delete/:itemId" element={<ItemDeleteButton/>} />
        <Route path="/insertUpload" element={<Upload/>} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
