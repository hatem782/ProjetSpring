// ####################### ICONS #######################

import Groups2Icon from "@mui/icons-material/Groups2";
import BookIcon from "@mui/icons-material/Book";
import GroupIcon from "@mui/icons-material/Group";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import MessageIcon from "@mui/icons-material/Message";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

// ####################### PAGES #######################

import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import ManageAuthors from "../pages/Dashboard/ManageAuthers/ManageAuthers";
import ManageBooks from "../pages/Dashboard/ManageBooks/ManageBooks";
import ManageAdherants from "../pages/Dashboard/ManageAdherants/ManageAdherants";
import ManageEmprunts from "../pages/Dashboard/ManageEmprunts/ManageEmprunts";
import ManageComments from "../pages/Dashboard/ManageComments/ManageComments";
import OneBook from "../pages/Dashboard/OneBook/OneBook";
import Logout from "../pages/Dashboard/Logout/Logout";

const AdminRoutes = {
  main: [
    {
      path: "main",
      name: "Dashboard",
      icon: DashboardIcon,
      Comp: Dashboard,
    },
    {
      path: "manage-authors",
      name: "Manage Authors",
      icon: Groups2Icon,
      Comp: ManageAuthors,
    },
    {
      path: "manage-books",
      name: "Manage Books",
      icon: BookIcon,
      Comp: ManageBooks,
    },
    {
      path: "manage-adherants",
      name: "Manage Adherants",
      icon: GroupIcon,
      Comp: ManageAdherants,
    },
    {
      path: "manage-emprunts",
      name: "Manage Emprunts",
      icon: LocalLibraryIcon,
      Comp: ManageEmprunts,
    },
    {
      path: "manage-comments",
      name: "Manage Comments",
      icon: MessageIcon,
      Comp: ManageComments,
    },
  ],
  sub: [
    {
      path: "logout",
      name: "Logout",
      icon: MeetingRoomIcon,
      Comp: Logout,
    },
  ],
  hidden: [
    {
      path: "book/:id",
      name: "One Book",
      Comp: OneBook,
    },
  ],
};

export { AdminRoutes };
