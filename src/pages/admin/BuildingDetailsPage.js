import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AccountManager from "../../managers/accountmanager";
import BuildingDetails from "../../components/BuildingDetails";
import Cookies from "js-cookie";

const BuildingDetailsPage = () => {
  const [buildingDetails, setBuildingDetails] = useState(null);
  const { BuildingID } = useParams();
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
    const fetchBuildingDetails = async () => {
      try {
        const buildingData = await accountManager.getBuildingDetails(
          BuildingID
        );
        setBuildingDetails(buildingData);
      } catch (error) {
        console.error("Error fetching building details:", error);
      }
    };

    fetchBuildingDetails();
  }, [BuildingID]);

  return (
    <div>
      {buildingDetails && (
        <>
          <h2>{buildingDetails.Building.BuildingName}</h2>
          <h2>{buildingDetails.Building.Address}, {buildingDetails.Building.PostalCode}</h2>
          <BuildingDetails building={buildingDetails} />
        </>
      )}
    </div>
  );
};

export default BuildingDetailsPage;
