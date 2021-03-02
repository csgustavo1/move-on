import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import  styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
   
   const {currentExperience, experienceToNextTolevel} = useContext(ChallengesContext);

   
  const percentToNextLevel = Math.round((currentExperience * 100 ) / experienceToNextTolevel);

  return (
    <header className={styles.experienceBar}>
      <span> 0 xp </span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }}/>
          <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
          {currentExperience} xp
          </span>
      </div>
      <span>{experienceToNextTolevel} xp</span>
    </header>
  );
}
