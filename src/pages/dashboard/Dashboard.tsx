import SelectSongsSection from "./sections/selectSongsSection/SelectSongsSection";
import SelectDateSection from "../../components/SelectDateSection";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SelectSongsSection />
      <SelectDateSection />
    </div>
  );
};

export default Dashboard;
