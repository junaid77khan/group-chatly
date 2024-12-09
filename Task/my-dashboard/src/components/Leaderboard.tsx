const Leaderboard = ({ title, data, isGroup }: { title: string; data: any[]; isGroup: boolean }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {data.map((entry, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{entry.name}</span>
            <span>{entry.points}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default Leaderboard;
  