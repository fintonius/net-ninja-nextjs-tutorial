import ProblemList from "./ProblemList"

export default function Problems() {
    return (
        <main>
            <nav>
                <div>
                   <h2>Problems</h2> 
                   <p><small>Ongoing problems</small></p>
                </div>
            </nav>
            <ProblemList />
        </main>
    )
}