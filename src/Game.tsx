import { useState, useRef, useEffect } from "react";
import { RenderEquation } from "./smallComps/RenderEquation.tsx";

type GameProps = {
    isHardMode: boolean;
}

export function Game({ isHardMode }: GameProps) {
    const [count, setCount] = useState<number>(0);
    const [answered, setAnswered] = useState<boolean>(false);
    const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean>(false);
    const [currentEquation, setCurrentEquation] = useState<number>(0);
    const timerRef = useRef<number | null>(null);

    // Reset game when mode changes
    useEffect(() => {
        setCount(0);
        setCurrentEquation(0);
        setAnswered(false);
        setAnsweredCorrectly(false);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, [isHardMode]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    function checkAnswer(isCorrect: boolean) {
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

    const totalQuestions = isHardMode ? 10 : 5;

    if (count < totalQuestions) {
        return (
            <section>
                <h1 className="text-center mt-5">
                    {count} / {totalQuestions}
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
            </section>
        );
    } else {
        return (
            <section>
                <h1 className="text-center mt-5">
                    Koniec Gry! Twój wynik: {count}/{totalQuestions}
                </h1>
            </section>
        );
    }
}