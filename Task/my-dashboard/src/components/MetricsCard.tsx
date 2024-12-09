const MetricsCard = ({ title, value }: { title: string; value: string }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-gray-500">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  };
  
  export default MetricsCard;
  