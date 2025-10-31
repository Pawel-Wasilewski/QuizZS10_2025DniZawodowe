import { useEffect, useState } from "react";

interface TimerProps {
    timeAssigned: number;
    onTimeLeft?: (timeLeft: number) => void;
    onExpire?: () => void;
}

export function Timer({ timeAssigned, onTimeLeft, onExpire }: TimerProps) {
    const [timeLeft, setTimeLeft] = useState<number>(timeAssigned);

    useEffect(() =>
    {
        setTimeLeft(timeAssigned);
        onTimeLeft?.(timeAssigned);
    },
        [timeAssigned, onTimeLeft]
    );

    useEffect(() => {
        const id = window.setInterval(() =>
        {
            setTimeLeft(prev =>
            {
                const next = Math.max(0, prev - 1);
                onTimeLeft?.(next);
                if (next === 0 && prev !== 0)
                {
                    onExpire?.();
                }
                return next;
            });
        },
            1000
        );
        return () => clearInterval(id);
    },
        [onTimeLeft, onExpire]
    );

    return(
        <span>
            {Math.round(timeLeft / 60)} :{' '}
            {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
        </span>
    )
}
