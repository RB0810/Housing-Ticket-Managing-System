import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AccountManager from "../../managers/accountmanager";
import BuildingCard from "../../components/BuildingCard";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";


const ManageAccount = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const { AdminID } = useParams();
  const accountManager = new AccountManager();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const buildingsData = await accountManager.getBuildingsandSupervisors();
        setBuildings(buildingsData);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    fetchBuildings();
  }, []);

  return (
    <div>
      <h1>Manage Accounts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={1}>
          {buildings.map((building) => (
            <Grid item xs={6}>
              <Link
                key={building.BuildingID}
                to={`/adminportal/manageacc/${AdminID}/building/${building.BuildingID}`}
              >
                <BuildingCard building={building} />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ManageAccount;
