import TimeSlotsForEveryDatesSection from "../../components/TimeSlotsForEveryDateSection";
import SongsForADateSection from "../../components/SongsForADateSection";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <TimeSlotsForEveryDatesSection />
      <SongsForADateSection />
    </div>
  );
};

export default Dashboard;
