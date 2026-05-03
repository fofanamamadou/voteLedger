const candidates = [
  {
    id: 1,
    firstName: "Abdoulaye",
    lastName: "Maiga",
    dailyVotes: [48, 61, 74, 80, 72],
  },
  {
    id: 2,
    firstName: "Amadou Sy",
    lastName: "Savané",
    dailyVotes: [55, 69, 62, 76, 90],
  },
  {
    id: 3,
    firstName: "Assimi",
    lastName: "Goïta",
    dailyVotes: [38, 54, 67, 75, 81],
  },
  {
    id: 4,
    firstName: "Choguel Koukala",
    lastName: "Maïga",
    dailyVotes: [43, 50, 68, 66, 59],
  },
];

const dayLabels = ["Jour 1", "Jour 2", "Jour 3", "Jour 4", "Jour 5"];

function Dashboard() {
  const totalsByCandidate = candidates.map((candidate) => ({
    ...candidate,
    totalVotes: candidate.dailyVotes.reduce((sum, value) => sum + value, 0),
  }));

  const totalByDay = dayLabels.map((_, index) =>
    candidates.reduce(
      (sum, candidate) => sum + (candidate.dailyVotes[index] || 0),
      0,
    ),
  );

  const maxDailyTotal = Math.max(...totalByDay);

  return (
    <main className="dashboard-shell">
      <div className="topbar">
        <button className="connect-button">Connexion</button>
      </div>
      <header className="dashboard-header">
        <div>
          <p className="badge">VoteLedger</p>
          <h1>Vote en temps réel des candidats</h1>
          <p className="subtitle">
            Recapitulatif des votes par candidat et par jour pour les 5 derniers
            jours
          </p>
        </div>
        <div className="header-meta">
          <div className="meta-stats">
            <span>Total candidats</span>
            <strong>{candidates.length}</strong>
          </div>
        </div>
      </header>

      <section className="overview-grid">
        {totalsByCandidate.map((candidate) => (
          <article key={candidate.id} className="candidate-card">
            <div className="candidate-info full-width">
              <h2>
                {candidate.firstName} {candidate.lastName}
              </h2>
              <p>Votes totaux</p>
              <strong>{candidate.totalVotes}</strong>
              <div className="small-progress">
                {candidate.dailyVotes.map((votes, index) => (
                  <span
                    key={index}
                    title={`${dayLabels[index]}: ${votes} votes`}
                  >
                    {votes}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="progress-section">
        <div className="progress-panel">
          <h2>Avancement des votes par jour</h2>
          <div className="progress-list">
            {dayLabels.map((day, index) => (
              <div key={day} className="progress-item">
                <div className="progress-title">
                  <span>{day}</span>
                  <strong>{totalByDay[index]} voix</strong>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(totalByDay[index] / maxDailyTotal) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="table-panel">
          <h2>Votes journaliers par candidat</h2>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Candidat</th>
                  {dayLabels.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {totalsByCandidate.map((candidate) => (
                  <tr key={candidate.id}>
                    <td>
                      {candidate.firstName} {candidate.lastName}
                    </td>
                    {candidate.dailyVotes.map((votes, index) => (
                      <td key={index}>{votes}</td>
                    ))}
                    <td>{candidate.totalVotes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
