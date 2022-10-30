'use client';

export default function Error({ error, reset }: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div>
            <p>Something went wrong! Error: {error.toString()}</p>
            <button onClick={() => reset()}>Reset error boundary</button>
        </div>
    );
}
