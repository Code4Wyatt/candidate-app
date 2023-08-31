import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CandidatePanel from '../../components/CandidatePanel/CandidatePanel';
import CandidateInfo from '../../components/CandidateInfo/CandidateInfo';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [candidate, setCandidate] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    if (responseStatus === 200) {
      toast.success('Candidate updated successfully');
    }
  }, [responseStatus]);

  console.log('Home candidate', candidate);

  return (
    <div style={{ display: 'flex'}}>
        <Navbar />
        <ToastContainer />
        {candidate ? <CandidateInfo candidate={candidate} setCandidate={setCandidate} setResponseStatus={setResponseStatus} /> : <CandidatePanel setCandidate={setCandidate} />}
        
    </div>
  )
}

export default Home