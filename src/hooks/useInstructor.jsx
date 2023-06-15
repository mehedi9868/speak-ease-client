import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "react-query";

export const useInstructor = () => {
    const { user } = useContext(AuthContext);

    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
        queryKey: ['instructor', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://speak-ease-server.vercel.app/user/instructor/${user.email}`)
            return res.data
        }
    })
    return [isInstructor, isInstructorLoading]
}