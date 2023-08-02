import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AccountManager from "../../managers/accountmanager";
import BuildingCard from "../../components/BuildingCard";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

const ManageAccount = () => {
  const [buildings, setBuildings] = useState([]);
  const { AdminID } = useParams();
  const accountManager = new AccountManager();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get('userId');
    const type = Cookies.get('type');

    if (!userId || !type) {
      // If any of the required cookies are missing, redirect to the login page
      console.log('Unauthorized');
      navigate("/unauthorize");
    } else {
      // Check if the user's ID and type match the expected values (e.g., TenantID and "tenant")
      if (Number(userId) === parseInt(AdminID) && type === "Admin") {
        // Proceed with rendering the component
        console.log('Authorized');
      } else {
        // If not authorized, display "Unauthorized access" message
        console.log('Unauthorized');
        navigate("/unauthorize");
      }
    }
  }, [navigate, AdminID]);

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
      <Grid container spacing={1}>
        {buildings.map((building) => (
          <Grid item xs={6}>
            <Link
              key={building.BuildingID}
              to={`/adminportal/manageacc/${AdminID}/building/${building.BuildingID}`}
            >
                <BuildingCard building={building}/>
            </Link>
          </Grid>
          
        ))}
      </Grid>
      
    </div>
  );
};

export default ManageAccount;
