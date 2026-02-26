type StatCardProps = {
    title: string;
    value: string | number;
};

const StatCard = ({ title, value }: StatCardProps) => {
    return (
        <div className="p-4 bg-white rounded-xl shadow">
            <p className="text-xs text-gray-500">{title}</p>
            <h2 className="text-xl font-bold">{value}</h2>
        </div>
    );
};

export default StatCard;