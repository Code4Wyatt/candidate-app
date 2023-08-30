import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CandidatePanel from '../../components/CandidatePanel/CandidatePanel';

function Home() {


  return (
    <div style={{ display: 'flex'}}>
        <Navbar />
        <CandidatePanel/>
    </div>
  )
}

export default Home