import { useContext, useEffect } from "react";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import {CountDownContexts} from '../contexts/CountDownContexts';
import styles from "../styles/components/ChallengeBox.module.css";


export function ChallengeBox() {

const {activeChallenge, resetChallenge, completedNewChallenge} = useContext(ChallengesContext);
const {resetCountDown} = useContext(CountDownContexts);

   function Suceeeded(){
    completedNewChallenge();
    resetCountDown();
   }

   function failed(){
     resetChallenge();
     resetCountDown();
   }


  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
          <div className={styles.challengeActive}>
         <header>Ganhe {activeChallenge.amount} xp</header>

         <main>
             <img src={`icons/${activeChallenge.type}.svg`} />
             <strong>Novo desafio</strong>
             <p>{activeChallenge.description}</p>
         </main>

         <footer>
             <button
              onClick={failed}
              className={styles.challengeFailedButton} type="button">
                 falhei
             </button>

             <button onClick={Suceeeded} className={styles.challengeCompletedButton} type="button">
                 Completei
             </button>
         </footer>
          </div>
      ) : (
         <div> 
         <div className={styles.challengeBoxNotAcitve}>
         <strong>Finalize um ciclo para receber um desafio</strong>
         <p>
             <img src="icons/level-up.svg" alt="Level up" />
             Avance de level completando desafios.
         </p>
       </div>
        
      )
   </div> 
 
      )};
  </div>
)}
