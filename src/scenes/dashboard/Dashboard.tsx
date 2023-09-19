import TimeSlotsForEveryDatesSection from "../../components/TimeSlotsForEveryDateSection";
import SongsForADateSection from "../../components/SongsForADateSection";
import { useEffect, useState } from "react";
import { parseCSVData } from "../../data/dataLoader";

const Dashboard = () => {
  const csvFilePath = "/dispos.csv"; // Replace with the actual path

  parseCSVData(csvFilePath)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching or parsing CSV:", error.message);
    });

  return (
    <div className="dashboard">
      <TimeSlotsForEveryDatesSection />
      <SongsForADateSection />
    </div>
  );
};

export default Dashboard;
