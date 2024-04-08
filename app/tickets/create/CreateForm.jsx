/* lets Next know this is a client component rather than server 
component so will need "hydrating" in the browser to work. All 
components in Next are server components by default 

Net Ninja is creating the form separately so it can be a client
component and the form page itself gets to remain a server 
component.

This is in line with Next's docs advising that you keep client
components to a minimum
*/
"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateForm() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [priority, setPriority] = useState('low');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        e.preventDefault();
        setIsLoading(true);

        const ticket = {
            title, body, priority, user_email: 'barney@barnacles.com'
        }

        /* this sends a post request to add the submitted ticket object 
        to the db.json file*/
        const res = await fetch('http://localhost:4000/tickets', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(ticket)
        })

        if (res.status === 201) {
            router.push('/tickets')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='w-1/2'>
            <label>
                <span>Title:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </label>
            <label>
                <span>Body:</span>
                <textarea 
                    required
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                />
            </label>
            <label>
                <span>Priority:</span>
                <select
                    onChange={(e) => setPriority(e.target.value)}
                    value={priority}
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
            </label>
            <button
                className="btn-primary"
                disabled={isLoading}
            >
                {/* if isLoading is true this will output 'Adding...' */}
                {isLoading && <span>Adding...</span>}
                {!isLoading && <span>Add Ticket</span>}
            </button>
        </form>
    )
}