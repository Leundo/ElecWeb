import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles/App.css';

import TableViewer from './pages/TableViewer';


function App() {
    return (
        <div className='app'>
            <Routes>
            	<Route path='/' element={<TableViewer />} />
            </Routes>
        </div>
    );
};


export default App;