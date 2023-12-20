import { createContext, useState, useEffect, useContext } from "react";
import { account, databases } from "../appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);

    console.log("userInfo", userInfo);

    try {
      let response = await account.createEmailSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetails = await account.get();
      console.log(response);
      setUser(accountDetails);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const logoutUser = async () => {
    account.deleteSession("current");
    setUser(null);
  };

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const createId = async (id, financialReportFee, BookKeepingFee) => {
    return databases.createDocument(
      "6583274f32a916913fab",
      "6583275937d7711af47b",
      ID.unique(),
      {
        id: id,
        financialReportFee: financialReportFee,
        BookKeepingFee: BookKeepingFee,
      }
    );
  };

  const listId = async (id) => {
    return databases.listDocuments(
      "6583274f32a916913fab",
      "6583275937d7711af47b"
    );
  };

  const deleteId = async (id) => {
    return databases.deleteDocument(
      "6583274f32a916913fab",
      "6583275937d7711af47b",
      id
    );
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    createId,
    listId,
    deleteId,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

//Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
