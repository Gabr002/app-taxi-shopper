import { Car, CircleDot, Flag, Star } from "lucide-react";
import createRide from "../../../services/create-ride";
import toast from "react-hot-toast";

export default function CardDriver({ driver, rideData, onConfirmRide }) {
    const rating = driver?.review?.rating || 0;

    const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    }).format(driver?.value);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStars = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;

        return (
            <>
                {[...Array(fullStars)].map((_, index) => (
                    <Star key={`full-${index}`} className="text-yellow-500 w-5 h-5" />
                ))}
                {halfStars > 0 && <Star key="half" className="text-yellow-500 w-5 h-5 opacity-50" />}
                {[...Array(emptyStars)].map((_, index) => (
                    <Star key={`empty-${index}`} className="text-gray-300 w-5 h-5" />
                ))}
            </>
        );
    };

    const handleChooseDriver = async () => {
        try {
            const response = await createRide({
                customer_id: "asdasdasdasd-asd13123",
                origin: rideData?.origin,
                destination: rideData?.destination,
                distance: rideData?.distance,
                estimatedTime: rideData?.estimatedTime,
                driver_id: driver.id,
            })

            if (response){
                toast.success("Corrida registrada com sucesso!");
                onConfirmRide();
            }    
        } catch (error) {
            toast.error(error)
        } finally {
            onConfirmRide();
        }
    }

    return (
        <div className="flex flex-col gap-4 bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full">
            {/* Driver Information */}
            <div className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={driver?.picture || "https://via.placeholder.com/150"}
                        alt={`${driver?.name}'s picture`}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-800">{driver?.name || "Nome do Motorista"}</span>
                        <span className="text-sm text-gray-500">Motorista</span>
                    </div>
                </div>

                <div className="flex flex-row gap-4 items-center justify-center">
                    <span className="text-lg font-bold text-gray-800">{valorFormatado}</span>
                    <button
                        className="text-base bg-green-500 overflow-hidden text-white px-2 py-1 font-bold"
                        onClick={handleChooseDriver}
                    >
                        Escolher
                    </button>
                </div>
            </div>
            <span className="text-sm text-gray-500 mt-1">{driver?.description}</span>

            {/* Status Information */}
            <div className="flex items-center gap-3">
                <CircleDot className="text-green-500 w-5 h-5" />
                <span className="text-sm font-medium text-gray-700">Disponível</span>
            </div>

            {/* Vehicle Information */}
            <div className="flex items-center gap-3">
                <Car className="text-blue-500 w-5 h-5" />
                <span className="text-sm font-medium text-gray-700">{driver?.vehicle}</span>
            </div>

            <div className="flex items-center gap-3">
                <Flag className="text-yellow-500 w-5 h-5" />
                <span className="text-sm font-medium text-gray-700">{driver?.review?.comment}</span>
            </div>

            {/* Rating Information */}
            <div className="flex items-center gap-2 mt-2">
                {renderStars(rating)}
                <span className="text-sm text-gray-600">({rating.toFixed(1)})</span>
            </div>
        </div>
    );
}
