import CardDriver from "./CardDriver";

export default function ListDrivers({ drivers }) {
    return (
        <div className="w-full bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 ">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Lista de Motoristas</h2>
            <div className="w-full space-y-4 h-full">
                {drivers.map((driver) => (
                    <CardDriver driver={driver} key={driver.id} />
                ))}
            </div>
        </div>
    );
}
