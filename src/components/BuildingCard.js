import "../styles/manageacc.css"

const BuildingCard = ({ building, onClick }) => {

  return (
    <button className="building-card" onClick={onClick}>
      <h3>{building.BuildingName}</h3>
      <p>{building.Address}, {building.PostalCode}</p>
      <p>Supervisor: {building.supervisor.SupervisorName}</p>
      <p>{building.supervisor.SupervisorEmail}, {building.supervisor.SupervisorPhone}</p>
    </button>
  );
};

export default BuildingCard;
