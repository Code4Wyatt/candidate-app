import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import CandidatePanel from '../../components/CandidatePanel/CandidatePanel';

function Home() {
  const [candidates, setCandidates] = useState();
  const fetchCandidates = async () => {
    let response = await fetch('https://localhost:7123/api/candidates');
    let data = await response.json();

    console.log(data);
    setCandidates(data);
  }
  if (!candidates) {
    fetchCandidates();
  }
  

  return (
    <div style={{ display: 'flex'}}>
        <Navbar />
        <CandidatePanel candidates={candidates} />
    </div>
  )
}

export default Home