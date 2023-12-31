import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../providers/AuthProvider";

export const useAdmin = () => {
    const { user } = useContext(AuthContext);

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['Admin', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://speak-ease-server.vercel.app/user/admin/${user.email}`)
            return res.data
        }
    })
    return [isAdmin, isAdminLoading]
}