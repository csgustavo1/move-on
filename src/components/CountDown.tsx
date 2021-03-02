import { useContext, useEffect, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { ChallengesContext } from "../contexts/ChallengesContexts";
import { CountDownContexts } from "../contexts/CountDownContexts";
import styles from "../styles/components/CountDown.module.css";

export function CountDown() {
  const {minutes, seconds, hasFinished, isActive, startCountDown, resetCountDown} = useContext(CountDownContexts);

  const [minutesLeft, minutesRight] = String(minutes)
    .padStart(2, "0")
    .split("");

  const [secondsLeft, secondsRight] = String(seconds)
    .padStart(2, "0")
    .split("");

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minutesLeft}</span>
          <span>{minutesRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.startCountDownContainer}>
          Ciclo encerrado
        </button>
      ) : (
        <div>
          {isActive ? (
            <button
              type="button"
              className={`${styles.startCountDownContainer} ${styles.startCountDownActive}`}
              onClick={resetCountDown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              onClick={startCountDown}
              className={styles.startCountDownContainer}
            >
              Iniciar ciclo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
