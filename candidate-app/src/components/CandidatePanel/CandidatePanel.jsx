import "./style.scss";
import { useEffect, useState } from "react";

import wordIcon from '../../assets/icons/icons8-microsoft-word-48.png';
import cSharpIcon from '../../assets/icons/icons8-c-sharp-64.png';
import cPlusPlusIcon from '../../assets/icons/icons8-c++-48.png';
import javaIcon from '../../assets/icons/icons8-java-48.png';
import linuxIcon from '../../assets/icons/icons8-linux-48.png';
import javascriptIcon from '../../assets/icons/icons8-javascript-48.png';
import powerPointIcon from '../../assets/icons/icons8-microsoft-powerpoint-48.png';
import sqlServerIcon from '../../assets/icons/icons8-sql-server-64.png';
import mySqlIcon from '../../assets/icons/icons8-mysql-64.png';
import serverWinIcon from '../../assets/icons/icons8-server-windows-50.png';
import vbIcon from '../../assets/icons/icons8-vb-16.png';
import visualStudioIcon1 from '../../assets/icons/icons8-visual-studio-48.png';
import visualStudioIcon2 from '../../assets/icons/icons8-visual-studio-50.png';


function CandidatePanel() {
  const [candidates, setCandidates] = useState([]);

  const getSkillIcon = (skillName) => {
    switch (skillName) {
        case 'Microsoft Word':
            return wordIcon;
        case 'Microsoft PowerPoint':
            return powerPointIcon;
        case 'Visual Studio 2017':
            return visualStudioIcon1;
        case 'Visual Studio 2015':
            return visualStudioIcon2;
        case 'C#':
            return cSharpIcon;
        case 'VB.Net':
            return vbIcon;
        case 'Java':
            return javaIcon;
        case 'Javascript':
            return javascriptIcon;
        case 'C++':
            return cPlusPlusIcon;
        case 'Linux':
            return linuxIcon;
        case 'Windows Server 2016':
            return serverWinIcon;
        case 'SQL Server 2016':
            return sqlServerIcon;
        case 'MySQL':
            return mySqlIcon;
        default:
          return null;
      }
  };

  const fetchCandidates = async () => {
    let response = await fetch("https://localhost:7123/api/candidates");
    let data = await response.json();

    console.log(data);
    setCandidates(data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  console.log("cassac", candidates);

  return (
    <div className="candidateContainer">
      {candidates ? (
        candidates.map((candidate, index) => (
          <div key={index} className="candidateCard">
            <p>{candidate.firstName} {candidate.surname}</p>
            
            <p>{candidate.address1}</p>
            <p>{candidate.town}</p>
            <p>{candidate.country}</p>
            <p>{candidate.postCode}</p>
            

            <p>{candidate.phoneHome}</p>
            <p>{candidate.phoneMobile}</p>
            <p>{candidate.phoneWork}</p>
            
            <div className='skillContainer'>
                {candidate.skills.map((skill) => (
                    <div className='skill'>
                  
                        <img src={getSkillIcon(skill.name)} alt={skill.name} className='skillLogo' />
                    </div>
                ))}
            </div>
          </div>
        ))
      ) : (
        <div>Nae candidates</div>
      )}
    </div>
  );
}

export default CandidatePanel;
