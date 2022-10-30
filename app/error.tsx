'use client';

interface ErrorWithDigest extends Error {
    digest: string
}

export default function Error({ error, reset }: {
    error: ErrorWithDigest;
    reset: () => void;
}) {
    return (
        <div>
            <p>Something went wrong!</p>
            <pre>{error.toString()}</pre>
            {error?.digest && <p>Digest: {error?.digest}</p>}
            <button onClick={() => reset()}>Reset error boundary</button>
        </div>
    );
}
