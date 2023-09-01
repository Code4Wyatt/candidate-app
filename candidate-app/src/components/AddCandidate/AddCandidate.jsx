import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

function AddCandidate({ candidate, setCandidate, setResponseStatus }) {
    const { register, handleSubmit, control, setValue } = useForm({
        defaultValues: candidate,
    });

    const addCandidate = async (data) => {
        console.log('addCandidate', data);
        
        let response = await fetch(
            `https://localhost:7123/api/candidates?FirstName=${data.firstName}&surname=${data.surname}&dateOfBirth=${data.dateOfBirth}&Address1=${data.address1}&Town=${data.town}&Country=${data.country}&PostCode=${data.postCode}&PhoneHome=${data.phoneHome}&PhoneMobile=${data.phoneMobile}&PhoneWork=${data.phoneWork}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        return response.status;
    };

    const addSkill = async (skillData) => {
        skillData.CandidateID = candidate.id;

        let response = await fetch("https://localhost:7123/api/candidateSkills", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(skillData),
        });

        return response.status;
    };

    const onSubmit = async (data) => {
        console.log(data);
        const status = await addCandidate(data);
        setResponseStatus(status);

        if (status === 200) {
            toast.success("Candidate added successfully!");
            setCandidate(null);
        } else {
            toast.error("Candidate could not be added, please check you've filled in all of the fields.");
        }
    };

    const onSubmitSkill = async (data) => {
        const status = await addSkill(data);

        if (status === 200) {
            toast.success("Skill added successfully!");
        } else {
            toast.error(
                "Skill could not be added, please check the ID for the skill is valid."
            );
        }
    };

    return (
        <div className="candidateInfoContainer">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    First Name
                    <input {...register("firstName")} />
                </label>
                <label>
                    Surname
                    <input {...register("surname")} />
                </label>
                <label>
                    Date Of Birth
                    <input {...register("dateOfBirth")} />
                </label>
                <label>
                    Street
                    <input {...register("address1")} />
                </label>
                <label>
                    Town
                    <input {...register("town")} />
                </label>
                <label>
                    Country
                    <input {...register("country")} />
                </label>
                <label>
                    Postcode
                    <input {...register("postCode")} />
                </label>
                <label>
                    Home
                    <input {...register("phoneHome")} />
                </label>
                <label>
                    Mobile
                    <input {...register("phoneMobile")} />
                </label>
                <label>
                    Work
                    <input {...register("phoneWork")} />
                </label>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>

        </div>
    );
}

export default AddCandidate;
