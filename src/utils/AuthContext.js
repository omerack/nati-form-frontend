import { createContext, useState, useEffect, useContext } from "react";
import { account, databases, storage } from "../appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const downloadFile = async () => {
    return storage.getFileDownload(
      "658615ca9eeba5d0c036",
      "65862efda6314d864f3f"
    );
  };

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
      "65832e96a4e2a2f48a0a",
      "65832eab230e1296cd09",
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
      "65832e96a4e2a2f48a0a",
      "65832eab230e1296cd09"
    );
  };

  const deleteId = async (id) => {
    return databases.deleteDocument(
      "65832e96a4e2a2f48a0a",
      "65832eab230e1296cd09",
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
    downloadFile,
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
