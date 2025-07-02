import type { Side } from "drafter-valorant-types";

interface Props {
  side: Side;
}

const TeamBlock: React.FC<Props> = ({ side }) => {
  return (
    <div>
      <h2>{side.name}</h2>
      <p><strong>Name :</strong> {side.name}</p>
      <p><strong>Ready :</strong> {side.isReady ? "Oui" : "Non"}</p>
      <p><strong>WinRate :</strong> {side.winRate}%</p>

      <div >
        <h3>Agents :</h3>
        <ul>
          {side.agents.map((agent, idx) => (
            <li key={idx}>{agent?.displayName}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Bans :</h3>
        <ul>
          {side.bans.map((ban, idx) => (
            <li key={idx}>{ban?.displayName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamBlock;
