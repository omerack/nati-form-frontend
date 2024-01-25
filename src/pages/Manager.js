import { useState } from "react";
import Admin from "./Admin";
import ClientsPage from "./ClientsPage";
import { styled, Button } from "@mui/material/";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { useAuth } from "../utils/AuthContext";

const TabItem = styled(Tab)(({ theme }) => ({
  opacity: 1,
  overflow: "initial",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  borderTopLeftRadius: theme.spacing(1),
  borderTopRightRadius: theme.spacing(1),
  color: (theme.vars || theme).palette.text.primary,
  backgroundColor: (theme.vars || theme).palette.grey[300],
  transition: "0.2s",
  zIndex: 2,
  marginTop: theme.spacing(0.5),
  textTransform: "initial",
  [theme.breakpoints.up("xs")]: {
    minWidth: "50%",
  },
  "&:before": {
    transition: "0.2s",
  },
  "&:not(:first-of-type)": {
    "&:before": {
      content: '" "',
      position: "absolute",
      left: 0,
      display: "block",
      height: 20,
      width: "1px",
      zIndex: 1,
      marginTop: theme.spacing(0.5),
      backgroundColor: (theme.vars || theme).palette.grey[500],
    },
  },
  [`& + .${tabClasses.selected}::before`]: {
    opacity: 0,
  },
  "&:hover": {
    [`&:not(.${tabClasses.selected})`]: {
      backgroundColor: "rgba(0 0 0 / 0.2)",
    },
    "&::before": {
      opacity: 0,
    },
    [`& + .${tabClasses.root}::before`]: {
      opacity: 0,
    },
  },
  [`&.${tabClasses.selected}`]: {
    backgroundColor: "#1976d2",
    color: (theme.vars || theme).palette.common.white,
  },
  [`&.${tabClasses.selected} + .${tabClasses.root}`]: {
    zIndex: 1,
  },
  [`&.${tabClasses.selected} + .${tabClasses.root}::before`]: {
    opacity: 0,
  },
}));
export default function Manager() {
  const [tabIndex, setTabIndex] = useState(0);
  const { logoutUser, user } = useAuth();
  return (
    <>
      <div className="logout-container">
        <Button onClick={logoutUser} variant="contained" color="primary">
          התנתק
        </Button>
      </div>
      <Tabs
        value={tabIndex}
        onChange={(e, index) => setTabIndex(index)}
        sx={{
          [`& .${tabsClasses.indicator}`]: {
            display: "none",
          },
        }}
      >
        <TabItem label={"לידים לקוחות - גיא"} />
        {user.labels[0] === "admin" ? <TabItem label={"מערכת טפסים"} /> : null}
      </Tabs>
      {tabIndex === 1 ? <Admin /> : <ClientsPage />}
    </>
  );
}
