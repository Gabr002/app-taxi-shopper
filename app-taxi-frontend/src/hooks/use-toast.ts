import toast from "react-hot-toast";

export default function useToast() {
    return {
        success: (message: string) => {
            toast.success(message);
        },
        error: (message: string) => {
            
        },
    };
}