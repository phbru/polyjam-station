import SelectSongsSection from "./sections/selectSongsSection/SelectSongsSection";
import SelectDateSection from "./sections/selectDateSection/SelectDateSection";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SelectSongsSection />
      <SelectDateSection />
    </div>
  );
};

export default Dashboard;
