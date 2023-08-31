import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CandidatePanel from '../../components/CandidatePanel/CandidatePanel';
import CandidateInfo from '../../components/CandidateInfo/CandidateInfo';
import AddCandidate from '../../components/AddCandidate/AddCandidate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [candidate, setCandidate] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [add, setAdd] = useState(false);
  const [view, setView] = useState('candidatePanel');
  
  useEffect(() => {
    if (responseStatus === 200) {
      toast.success('Candidate updated successfully');
    }
  }, [responseStatus]);

  console.log('Home candidate', candidate);

  return (
    <div style={{ display: 'flex'}}>
        <Navbar setView={setView} />
        <ToastContainer />
        {
        view === 'candidatePanel' ? 
          (candidate ? <CandidateInfo candidate={candidate} setCandidate={setCandidate} setResponseStatus={setResponseStatus} /> : <CandidatePanel setCandidate={setCandidate} />)
          : <AddCandidate setResponseStatus={setResponseStatus} setCandidate={setCandidate} />
      }
        
    </div>
  )
}

export default Home