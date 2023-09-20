import SelectSongsSection from "../../components/SelectSongsSection";
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
