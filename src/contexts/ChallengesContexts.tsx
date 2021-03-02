import { createContext, useState, ReactNode, useEffect } from "react";
import challenges from '../Challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from "../components/LevelUpModal";



  

export const ChallengesContext = createContext({} as ChallengesContextsDada);

interface ChallengesProviderProps {
  children?: ReactNode;
  level:number;
  currentExperience:number;
  challengesCompleted:number;
}


interface Challenge {
    type: 'body' | 'eye';
    description:string;
    amount:number;
}

interface ChallengesContextsDada {
    level:number;
    startNewChallenge:() => void;
    currentExperience:number;
    activeChallenge:Challenge;
    challengesCompleted:number;
    resetChallenge: ()=> void;
    experienceToNextTolevel:number;
    completedNewChallenge:() => void;
    levelUp: () => void;
    closeLevelUpModal:() => void;
    
    
    

}

export function ChallengesProvider({ children, ...rest }) {
  const [level, setLevelUp] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);


  const [isLevelUpModalOpen, setIslevelUpModalOpen] = useState(false); 

  function levelUp() {
    setLevelUp(level + 1);
    setIslevelUpModalOpen(true);
  }

  function closeLevelUpModal(){
    setIslevelUpModalOpen(false);
  }

  const experienceToNextTolevel = Math.pow((level +1 ) * 4, 2);


  useEffect(() => {
    Notification.requestPermission();
  }, 
  [])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  const [ activeChallenge, setActiveChallenge ] = useState(null);

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() *  challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio 🥳', {
       body:`Valendo ${challenge.amount}xp!`
      })
    }
   
  }

  function resetChallenge(){
      setActiveChallenge(null);
  }

  function completedNewChallenge(){
    if(!activeChallenge){
      return;
    }

    const {amount} = activeChallenge;
    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextTolevel){
      finalExperience = finalExperience - experienceToNextTolevel;
      levelUp();

    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

    
  return (
    <ChallengesContext.Provider
      value={{
        level,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        currentExperience,
        challengesCompleted,
        completedNewChallenge,
        levelUp,
        experienceToNextTolevel,
        closeLevelUpModal,

      }}
    >
      {children}
      
      { isLevelUpModalOpen && <LevelUpModal />}

    </ChallengesContext.Provider>
  );
}
