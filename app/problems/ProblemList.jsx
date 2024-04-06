async function getProblems() {
    const res = await fetch('http://localhost:4000/tickets');

    return res.json()
}

export default async function ProblemList() {
    const problems = await getProblems();
        return (
        <>
            {problems.map((problem) => {
                <div key={problem.id} className="card my-5">
                    <h3>{problem.title}</h3>
                    <p>{problem.body.slice(0, 200)}...</p>
                    <div className={`pill ${problem.priority}`}>
                        {problem.priority} priority
                    </div>
                </div>
            })}
            {problems.length === 0 && (
                <p className="text-center">WTF, you have no problems?!?</p>
            )}
        </>
    )
}