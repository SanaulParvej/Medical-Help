import { useState, useEffect, useContext, use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const useAdmin = () => {
    const { user, loading } = use(AuthContext);
    const [role, setRole] = useState(null);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:4000/users/role/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setRole(data?.role); 
                    setIsAdminLoading(false);
                })
                .catch(error => {
                    console.error("Failed to fetch user role:", error);
                    setIsAdminLoading(false);
                });
        } else if (!loading) {
            setIsAdminLoading(false);
        }
    }, [user, loading]);

    return [role, isAdminLoading];
};

export default useAdmin;