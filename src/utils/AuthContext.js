import { createContext, useState, useEffect, useContext } from "react";
import { account, databases } from "./appwriteConfig";
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
    try {
      await account.createEmailSession(userInfo.email, userInfo.password);
      let accountDetails = await account.get();
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

  const cpaCreateId = async (id, financialReportFee, BookKeepingFee) => {
    return databases.createDocument(
      "65832e96a4e2a2f48a0a",
      "658c6769dc96bb34bd9a",
      ID.unique(),
      {
        id: id,
        financialReportFee: financialReportFee,
        BookKeepingFee: BookKeepingFee,
      }
    );
  };

  const cpaListId = async () => {
    return databases.listDocuments(
      "65832e96a4e2a2f48a0a",
      "658c6769dc96bb34bd9a"
    );
  };

  const cpaDeleteId = async (id) => {
    return databases.deleteDocument(
      "65832e96a4e2a2f48a0a",
      "658c6769dc96bb34bd9a",
      id
    );
  };

  const insuranceCreateId = async (id, insuranceFee) => {
    return databases.createDocument(
      "65832e96a4e2a2f48a0a",
      "658a0e84ef5feb69b880",
      ID.unique(),
      {
        id: id,
        insuranceFee: insuranceFee,
      }
    );
  };

  const insuranceListId = async () => {
    return databases.listDocuments(
      "65832e96a4e2a2f48a0a",
      "658a0e84ef5feb69b880"
    );
  };

  const insuranceDeleteId = async (id) => {
    return databases.deleteDocument(
      "65832e96a4e2a2f48a0a",
      "658a0e84ef5feb69b880",
      id
    );
  };

  const taxRefundCreateId = async (id, company) => {
    return databases.createDocument(
      "65832e96a4e2a2f48a0a",
      "658ae35cb5299a8f94e0",
      ID.unique(),
      {
        id: id,
        company: company,
      }
    );
  };

  const taxRefundListId = async () => {
    return databases.listDocuments(
      "65832e96a4e2a2f48a0a",
      "658ae35cb5299a8f94e0"
    );
  };

  const taxRefundDeleteId = async (id) => {
    return databases.deleteDocument(
      "65832e96a4e2a2f48a0a",
      "658ae35cb5299a8f94e0",
      id
    );
  };

  const createClient = async (name, phone, demandProducts, notesGilad, id) => {
    return databases.createDocument(
      "65832e96a4e2a2f48a0a",
      "65a9665c7ed715dadf97",
      ID.unique(),
      {
        name: name,
        phone: phone,
        demandProducts: demandProducts,
        status: "בהמתנה",
        notesGilad: notesGilad,
        id: id,
      }
    );
  };
  const uploadClient = async (
    name,
    phone,
    // demandProducts,
    notesGilad,
    status,
    // boughtProducts,
    notesGuy,
    id
  ) => {
    // console.log(name);
    // console.log(phone);
    // console.log(demandProducts);
    // console.log(notesGilad);
    // console.log(boughtProducts);
    // console.log(notesGuy);
    // console.log(id);
    return databases.createDocument(
      "65832e96a4e2a2f48a0a",
      "65a9665c7ed715dadf97",
      ID.unique(),
      {
        name: name,
        phone: phone,
        // demandProducts: demandProducts,
        notesGilad: notesGilad,
        status: status,
        // boughtProducts: boughtProducts,
        notesGuy: notesGuy,
        id: id,
      }
    );
  };

  const listClient = async () => {
    return databases.listDocuments(
      "65832e96a4e2a2f48a0a",
      "65a9665c7ed715dadf97"
    );
  };

  const deleteClient = async (id) => {
    return databases.deleteDocument(
      "65832e96a4e2a2f48a0a",
      "65a9665c7ed715dadf97",
      id
    );
  };

  const updateGiladNotes = async (id, notesGilad) => {
    return databases.updateDocument(
      "65832e96a4e2a2f48a0a",
      "65a9665c7ed715dadf97",
      id,
      {
        notesGilad: notesGilad,
      }
    );
  };

  const updateGuyNotes = async (id, notesGuy) => {
    return databases.updateDocument(
      "65832e96a4e2a2f48a0a",
      "65a9665c7ed715dadf97",
      id,
      {
        notesGuy: notesGuy,
      }
    );
  };

  const updateStatus = async (id, status) => {
    return databases.updateDocument(
      "65832e96a4e2a2f48a0a",
      "65a9665c7ed715dadf97",
      id,
      {
        status: status,
      }
    );
  };
  const updateBoughtProducts = async (id, boughtProducts) => {
    return databases.updateDocument(
      "65832e96a4e2a2f48a0a",
      "65a9665c7ed715dadf97",
      id,
      {
        boughtProducts: boughtProducts,
      }
    );
  };
  const updateInfoIcon = async (id, date) => {
    return databases.updateDocument(
      "65832e96a4e2a2f48a0a",
      "65a9665c7ed715dadf97",
      id,
      {
        date: date,
      }
    );
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    cpaCreateId,
    cpaListId,
    cpaDeleteId,
    insuranceCreateId,
    insuranceListId,
    insuranceDeleteId,
    taxRefundCreateId,
    taxRefundListId,
    taxRefundDeleteId,
    createClient,
    listClient,
    deleteClient,
    updateGiladNotes,
    updateGuyNotes,
    updateStatus,
    uploadClient,
    updateBoughtProducts,
    updateInfoIcon,
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
