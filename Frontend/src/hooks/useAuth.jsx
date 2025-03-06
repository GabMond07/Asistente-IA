import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { host } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );

  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || null
  );

  const [surveyCompleted, setSurveyCompleted] = useState(
    () => JSON.parse(localStorage.getItem("surveyCompleted")) || false
  );

  const signin = async (credentials) => {
    try {
      const response = await fetch(`http://${host}/Login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        setUsername(data.user.username);
        setIsAuthenticated(true);
        
        // Verificar si el usuario ya completó la encuesta
        const surveyStatus = data.user.survey_completed || false;
        setSurveyCompleted(surveyStatus);
        localStorage.setItem("surveyCompleted", JSON.stringify(surveyStatus));

      } else {
        toast.error("Credenciales incorrectas", {
          position: "top-center",
          style: {
            background: "black",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const signout = async () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const response = await fetch(`http://${host}/Logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Logout successful:", data);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUsername(null);
        toast(`Nos vemos ${username}!`, {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } else {
        console.error("Logout failed:", response.status);
        toast.error("Logout failed. Please try again.", {
          position: "top-center",
          style: {
            background: "red",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, surveyCompleted, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
    