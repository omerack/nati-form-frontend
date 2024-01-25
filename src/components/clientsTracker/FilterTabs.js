import { useState } from "react";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";

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
    minWidth: "20%",
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
      backgroundColor: "rgba(0 0 0 / 0.1)",
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

export function FilterTabs({ setSelectFilterTab }) {
  const handleTabChange = (event, index) => {
    setTabIndex(index);

    const statusFilters = ["הכל", "בהמתנה", "בתהליך", "הושלם", "לא נסגר"];
    const selectedStatusFilter = statusFilters[index];

    setSelectFilterTab(selectedStatusFilter);
  };
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Tabs
      value={tabIndex}
      onChange={handleTabChange}
      sx={{
        [`& .${tabsClasses.indicator}`]: {
          display: "none",
        },
      }}
    >
      <TabItem label={"הכל"} />
      <TabItem label={"בהמתנה"} />
      <TabItem label={"בתהליך"} />
      <TabItem label={"הושלם"} />
      <TabItem label={"לא נסגר"} />
    </Tabs>
  );
}
