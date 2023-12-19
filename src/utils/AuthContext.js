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
      "657e3ac8dce6af4d5892",
      "657f0b3382c39de81a75",
      ID.unique(),
      {
        id: id,
        financialReportFee: financialReportFee,
        BookKeepingFee: BookKeepingFee,
      }
    );
  };

  const listId = async () => {
    return databases.listDocuments(
      "657e3ac8dce6af4d5892",
      "657f0b3382c39de81a75"
    );
  };

  const deleteId = async (id) => {
    return databases.deleteDocument(
      "657e3ac8dce6af4d5892",
      "657f0b3382c39de81a75",
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
