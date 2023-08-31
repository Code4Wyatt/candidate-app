import React, { useState } from 'react'
import './style.scss';

function Navbar({ setView }) {
  
  return (
    <div className='nav'>
        <p>Candidate Portal</p>

        <div onClick={() => setView('addCandidate')}>
            <p>Add Candidate</p>
        </div>
        <div onClick={() => setView('candidatePanel')}>
            <p>View Candidates</p>
        </div>
    </div>
  )
}

export default Navbar