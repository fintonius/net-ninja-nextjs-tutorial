import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="text-center">
            <h2 className="text-3xl">We hit a brick wall</h2>
            <p>{`We couldn't find the ticket you wanted.`}</p>
            <p>Go back to the <Link href="/tickets">Tickets</Link> page.</p>
        </main>
    )
}