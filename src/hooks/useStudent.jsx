import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "react-query";

export const useStudent = () => {
    const { user } = useContext(AuthContext);

    const { data: isStudent, isLoading: isStudentLoading } = useQuery({
        queryKey: ['student', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/user/student/${user.email}`)
            return res.data
        }
    })
    return [isStudent, isStudentLoading]
}