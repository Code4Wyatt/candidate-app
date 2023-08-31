import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.scss";

function CandidateInfo({ candidate, setCandidate, setResponseStatus }) {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: candidate,
  });

  const updateCandidate = async (data) => {
    let response = await fetch(`https://localhost:7123/api/candidates/${candidate.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    return response.status;
  };

  const onSubmit = async (data) => {
    console.log(data);
    const status = await updateCandidate(data);
    setResponseStatus(status);

    if (status === 200) {
        toast.success('Candidate updated successfully');
        setCandidate(null);
    } else {
        toast.error('Candidate update was not successful');
    }
  };

  useEffect(() => {
    if (candidate) {
      for (const [key, value] of Object.entries(candidate)) {
        setValue(key, value);
      }
    }
  }, [candidate, setValue]);

  console.log("CandidateInfo candidate", candidate);

  return (
    <div className="candidateInfoContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          First Name
          <input {...register('firstName')} />
        </label>
        <label>
          Surname
          <input {...register('surname')} />
        </label>
        <label>
          Date Of Birth
          <input {...register('dateOfBirth')} />
        </label>
        <label>
          Street
          <input {...register('address1')} />
        </label>
        <label>
          Town
          <input {...register('town')} />
        </label>
        <label>
          Postcode
          <input {...register('postCode')} />
        </label>
        <label>
          Home
          <input {...register('phoneHome')} />
        </label>
        <label>
          Mobile
          <input {...register('phoneMobile')} />
        </label>
        <label>
          Work
          <input {...register('phoneWork')} />
        </label>

        <div className='buttonContainer'>
            <button onClick={() => setCandidate(null)}>Go Back</button>
            <button type="submit">Submit</button>
        </div>
        
      </form>
    </div>
  );
}

export default CandidateInfo;
