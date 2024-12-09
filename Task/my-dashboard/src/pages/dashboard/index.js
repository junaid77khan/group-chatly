import MetricsCard from "@/components/MetricsCard";
import TopicsCard from "@/components/TopicsCard";
import Leaderboard from "@/components/Leaderboard";
import FilterBar from "@/components/FilterBar";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/data.json");
      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <FilterBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        <MetricsCard title="Starting Knowledge" value="64%" />
        <MetricsCard title="Current Knowledge" value="86%" />
        <MetricsCard title="Knowledge Gain" value="+34%" />
        <MetricsCard title="Avg. Session Length" value="2m 34s" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <TopicsCard title="Weakest Topics" data={data?.topics || []} />
        <TopicsCard title="Strongest Topics" data={data?.strongestTopics || []} />
      </div>
      <Leaderboard
        title="User Leaderboard"
        data={data?.userLeaderboard || []}
        isGroup={false}
      />
      <Leaderboard
        title="Group Leaderboard"
        data={data?.groupLeaderboard || []}
        isGroup={true}
      />
    </div>
  );
};

export default Dashboard;
