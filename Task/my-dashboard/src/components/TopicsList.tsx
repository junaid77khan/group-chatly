const TopicsCard = ({ title, data }: { title: string; data: any[] }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {data.map((topic, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{topic.name}</span>
            <span>{topic.score}%</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default TopicsCard;
  