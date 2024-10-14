import { useEffect, createContext, useState, useContext } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext({
  currentUser: null,
  isLoading: false,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    }

    setIsLoading(false);
  }, [isLoading]);

  const signin = async (email, userId) => {
    setIsLoading(true);
    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        userId,
      })
    );

    setCurrentUser({
      email,
      userId,
    });

    setIsLoading(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        signin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
