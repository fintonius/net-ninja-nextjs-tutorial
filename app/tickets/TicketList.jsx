import Link from 'next/link';

async function getTickets() {
    const res = await fetch('http://localhost:4000/tickets', {
        next: {
            /* using 0 opts out of Next caching the data from the initial fetch request
            if you add another value that is the amount of seconds Next will wait before
            making another fetch request to get the latest data. 
            
            However, it does cache the data and will serve this to a user first even if the 
            data has been updated, as that is what is quicker. Next will update the cache
            with this newly fetched data and the next time a user visits the page this new
            data will be served. Seems not the most efficient tbh!
            */
            revalidate: 0
        }
    })
    
    return res.json()
}

export default async function TicketList() {
    const tickets = await getTickets();
    console.log(tickets)

    return (
        <>
           {tickets.map((ticket) => (           
                <div key={ticket.id} className='card my-5'>
                    <Link href={`/tickets/${ticket.id}`}>
                        <h3>{ticket.title}</h3>
                        <p>{ticket.body.slice(0, 200)}...</p>
                        <div className={`pill ${ticket.priority}`}>
                            {ticket.priority} priority
                        </div>
                    </Link>
                </div>
            ))}
            {tickets.length === 0 && (
                <p className="text-center">There are no open tickets</p>
            )}
            
        </>
    )
  }