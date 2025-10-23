// TypeScript
import { useEffect, useState } from "react";

type Equation = {
    addend: bigint;
    addend2: bigint;
    result: bigint;
};
type RenderEquationProps = {
    isHardMode: boolean;
    onAnswer: (isCorrect: boolean) => void;
    equationValue?: (equation: Equation) => void;
}
export function RenderEquation({ isHardMode, onAnswer, equationValue }: RenderEquationProps){
    const [equation] = useState<Equation>(generateEquation(isHardMode));
    const [userAnswer, setUserAnswer] = useState<string>("");

    useEffect(() => {
        if (equationValue) {
            equationValue(equation);
        }
    }, [equation, equationValue]);

    function generateEquation(isHardMode: boolean): Equation {
        if (isHardMode) {
            const addend: bigint = BigInt(Math.floor(Math.random() * 9_000_000_000) + 1_000_000_000);
            const addend2: bigint = BigInt(Math.floor(Math.random() * 9_000_000_000) + 1_000_000_000);
            return { addend, addend2, result: addend * addend2 };
        } else {
            const addend: bigint = BigInt(Math.floor(Math.random() * 90) + 10);
            const addend2: bigint = BigInt(Math.floor(Math.random() * 10));
            return { addend, addend2, result: addend * addend2 };
        }
    }

    console.log(`${equation.addend} * ${equation.addend2} = ${equation.result}`);

    function checkAnswer(): void {
        const correct = userAnswer === equation.result.toString();
        setUserAnswer("");
        onAnswer(correct);
    }

    return (
        <section className={"d-flex flex-column justify-content-center align-items-center mx-auto vh-100"}>
            <p className={"fs-3 fw-bold"} style={{letterSpacing: "20px"}}>&nbsp;
                {equation.addend.toString()}
            </p>
            <p className={"fs-3 fw-bold"} style={{letterSpacing: "20px"}}>&times;
                {equation.addend2.toString()}
            </p>
            <hr className={"bg-black w-100"} />
            <input
                type="number"
                className={"bg-body w-100 fs-3 fw-bold text-lg-start"}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button
                className={"btn btn-primary fs-3 fw-bold m-3"}
                onClick={checkAnswer}
            >
                Sprawdź
            </button>
        </section>
    );
}
