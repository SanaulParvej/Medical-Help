import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:4000/users/role/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data?.role === 'admin');
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

    return [isAdmin, isAdminLoading];
};

export default useAdmin;