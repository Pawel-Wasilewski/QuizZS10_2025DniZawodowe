import { useState, useRef, useEffect } from "react";
import { RenderEquation } from "./smallComps/RenderEquation.tsx";
import {Footer} from "./smallComps/Footer.tsx";
import {Timer} from "./smallComps/Timer.tsx";
import {getSpecificCookie} from "./cookieData/getSpecificCookie.ts";
import {addCustomUserData} from "./cookieData/addCustomUserData.ts";

type GameProps = {
    isHardMode: boolean;
}

export function Game({ isHardMode }: GameProps) {
    const [count, setCount] = useState<number>(0);
    const [countAnswered, setCountAnswered] = useState<number>(0);
    const [answered, setAnswered] = useState<boolean>(false);
    const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean>(false);
    const [currentEquation, setCurrentEquation] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const timerRef = useRef<number | null>(null);

    // Reset game when mode changes
    useEffect(() => {
        setCount(0);
        setCurrentEquation(0);
        setAnswered(false);
        setAnsweredCorrectly(false);
        setTimeLeft(null);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, [isHardMode]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    function checkAnswer(isCorrect: boolean) {
        setCountAnswered(prev => prev + 1);
        setAnswered(true);
        setAnsweredCorrectly(isCorrect);

        if (isCorrect) {
            setCount(prev => prev + 1);
        }

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            setAnswered(false);
            setCurrentEquation(prev => prev + 1);
        }, 1200);
    }

    const totalQuestions = 5;
    const cookie_name = "results_" + (isHardMode ? "hard" : "easy");

    if (count < totalQuestions && timeLeft !== 0 && getSpecificCookie(cookie_name) !== null) {
        return (
            <section>
                <h1 className="text-center mt-5">
                    {count} / {totalQuestions} <br/>
                    podanych: {countAnswered} <br/>
                    <Timer timeAssigned={ isHardMode ? 300 : 10 } onTimeLeft={setTimeLeft} />
                </h1>
                {answered && (
                    <div className="text-center mt-3">
                        {answeredCorrectly ? (
                            <p className="text-success fs-4">Prawda!</p>
                        ) : (
                            <p className="text-danger fs-4">Źle!</p>
                        )}
                    </div>
                )}
                <RenderEquation
                    key={currentEquation}
                    isHardMode={isHardMode}
                    onAnswer={checkAnswer}
                />
                <Footer/>
            </section>
        );
    } else {
        let triggerCookie: boolean = false;
        let percentage: number;
        if (getSpecificCookie(cookie_name)) {
            const previousBest = parseInt(getSpecificCookie(cookie_name)!.value as string, 10);
            triggerCookie = true;
            percentage = previousBest
        }
        else {
            if (count === 0) {
                percentage = 0;
            }
            else {
                percentage = Math.round((count / countAnswered) * 100);
            }
            addCustomUserData({
                name: cookie_name,
                value: percentage.toString()
            });
        }

        return (
            <section>
                <h1 className="text-center mt-5">
                    Koniec Gry! Twój wynik: {count}/{totalQuestions} ({percentage}% {triggerCookie ? " Wynik z poprzedniego razu" : ""})
                </h1>
                <Footer/>
            </section>
        );
    }
}