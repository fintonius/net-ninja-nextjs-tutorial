import notFound from 'next/navigation';

export const dynamicParams = false;

/*this will serve up a list of all the info Next will need to pre-render
the pages so they can be dynamically rendered when a user wants to open one.
It will generate a list of whatever info we want it to pass to Next so it will
know what needs to be rendered ahead of time */
export async function generateStaticParams() {
    const res = await fetch('http://localhost:4000/tickets');
    const tickets = await res.json();

    return tickets.map((ticket) => ({
        id: ticket.id
    }))
}

async function getTicket(id) {
    //imitate delay:
    await new Promise(resolve => setTimeout(resolve, 3000));

    const res = await fetch('http://localhost:4000/tickets/' + id, {
        next: {
            revalidate: 60
        }
    })
    // returns a 404 error page if the response from the fetch call returns nothing
    if (!res.ok) {
        notFound()
    }
    return res.json()
}

export default async function TicketDetails({ params }) {
    const ticket = await getTicket(params.id);

    return (
        <main>
            <nav>
                <h2>Problem details</h2>
            </nav>
            <div className="card">
                <h3>{ticket.title}</h3>
                <small>Created by {ticket.user_email}</small>
                <p>{ticket.body}</p>
                <div className={`pill ${ticket.priority}`}>
                    {ticket.priority} priority
                </div>
            </div>
        </main>
    )
}