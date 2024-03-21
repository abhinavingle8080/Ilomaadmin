import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function GuestGuard({children}) {
    const [ isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
              const accessToken = localStorage.getItem("accessToken");
              try {
              const response = await axios.post(
                `http://localhost:8020/api/superadmin/get-profile-details`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                  },
                }
              );
      
              console.log("responce", response);
      
              if (response.status === "200") {
                navigate("/dashboard");
              }

            } catch (error) {
                console.log(error);
                navigate('/');
            }

          };
      
          getProfile();
    }, []);

    return(
        <>
        {children}
        </>
    );
}

export default GuestGuard;