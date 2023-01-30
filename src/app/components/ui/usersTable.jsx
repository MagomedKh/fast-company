import React from "react";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UserTable = ({
   users,
   onSort,
   selectedSort,
   onToggleBookMark,
   ...rest
}) => {
   const columns = {
      avatar: {
         path: "avatar",
         name: "",
         component: (user) => (
            <img
               src={user.image}
               alt="avatar"
               height="40"
               className="img-responsive rounded-circle"
            />
         ),
      },
      name: {
         path: "name",
         name: "Имя",
         component: (user) => (
            <Link to={`/users/${user._id}`}>{user.name}</Link>
         ),
      },
      qualities: {
         name: "Качества",
         component: (user) => <Qualities qualities={user.qualities} />,
      },
      professions: {
         name: "Професия",
         component: (user) => <Profession id={user.profession} />,
      },
      completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
      rate: {
         path: "rate",
         name: "Оценка",
         component: (user) => <>{user.rate + "/5"}</>,
      },
      // bookmark: {
      //    path: "bookmark",
      //    name: "Избранное",
      //    component: (user) => (
      //       <BookMark
      //          status={user.bookmark}
      //          className="btn btn-sm"
      //          onClick={() => onToggleBookMark(user._id)}
      //       />
      //    ),
      // },
   };

   return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

export default UserTable;
