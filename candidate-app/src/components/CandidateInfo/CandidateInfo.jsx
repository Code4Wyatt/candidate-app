import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

function CandidateInfo({ candidate, setCandidate, setResponseStatus }) {
    const [enteredSkillId, setEnteredSkillId] = useState('');
    const { register, handleSubmit, control, setValue } = useForm({
        defaultValues: candidate,
    });

    const { register: registerSkill, handleSubmit: handleSubmitSkill } =
        useForm();

    const updateCandidate = async (data) => {
        let response = await fetch(
            `https://localhost:7123/api/candidates/${candidate.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        return response.status;
    };

    const addSkill = async (skillData) => {
        skillData.CandidateID = candidate.id;
        skillData.SkillId = parseInt(skillData.SkillId, 10);

        console.log("addSkill skillData", skillData);
        let response = await fetch("https://localhost:7123/api/candidateSkills", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(skillData),
        });

        return response.status;
    };

    const deleteSkill = async (skillData) => {
        skillData.CandidateID = candidate.id;
        let skillId = Number(skillData.SkillId);
        skillData.SkillId = skillId;
        console.log('deleteSkill skillData', skillData);
        let response = await fetch(
            `https://localhost:7123/api/candidateSkills/${candidate.id}/${enteredSkillId}`, {
            method: 'DELETE'
        });
        console.log(response)
        return response.status;
    };

    const onSubmit = async (data) => {
        console.log(data);
        const status = await updateCandidate(data);
        setResponseStatus(status);

        if (status === 200) {
            toast.success("Candidate updated successfully!");
            setCandidate(null);
        } else {
            toast.error("Candidate update was not successful.");
        }
    };

    const onSubmitSkill = async (data) => {
        console.log(data);
        const status = await addSkill(data);

        if (status === 200) {
            toast.success("Skill added successfully!");
        } else {
            toast.error(
                "Skill could not be added, please check the ID for the skill is valid."
            );
        }
    };

    const onDeleteSkill = async (enteredSkillId) => {
        const status = await deleteSkill({ CandidateID: candidate.id, SkillId: enteredSkillId });

        if (status === 200) {
            toast.success("Skill deleted successfully!");
        } else {
            toast.success("Skill could not be deleted.");
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
                    <button onClick={() => setCandidate(null)}>Go Back</button>
                    <button type="submit">Submit</button>
                </div>
            </form>

            <form onSubmit={handleSubmitSkill(onSubmitSkill)}>
                <label>
                    Skill ID
                    <input {...registerSkill("SkillId")}  onChange={(e) => setEnteredSkillId(e.target.value)} />
                </label>

                <div>
                    <button type="submit">Add Skill</button>
                    <button
                        type="button"
                        onClick={() => onDeleteSkill(enteredSkillId)}
                    >
                        Delete Skill
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CandidateInfo;
