import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AccountManager from "../../managers/accountmanager";
import BuildingCard from "../../components/BuildingCard";

const ManageAccount = () => {
  const [buildings, setBuildings] = useState([]);
  const { id } = useParams();
  const accountManager = new AccountManager();

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const buildingsData = await accountManager.getBuildingsandSupervisors();
        setBuildings(buildingsData);
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    fetchBuildings();
  }, []);

  return (
    <div>
      <h1>Manage Accounts</h1>
      {buildings.map((building) => (
        <Link
          key={building.BuildingID}
          to={`/manageacc/building/${building.BuildingID}`}
        >
          <BuildingCard building={building} />
        </Link>
      ))}
    </div>
  );
};

export default ManageAccount;
