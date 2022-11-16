import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({
   _id,
   name,
   qualities,
   profession,
   completedMeetings,
   rate,
   bookmark,
   onToggleBookMark,
   onDelete,
}) => (
   <tr>
      <th className="col-3">{name}</th>
      <td className="col-3">
         {qualities.map((quality) => (
            <Qualitie key={quality._id} {...quality} />
         ))}
      </td>
      <td className="col">{profession.name}</td>
      <td className="col">{completedMeetings}</td>
      <td className="col">{rate} / 5</td>
      <td className="col">
         <BookMark
            status={bookmark}
            className="btn btn-sm"
            onClick={() => onToggleBookMark(_id)}
         />
      </td>
      <td className="col">
         <button className="btn btn-danger" onClick={() => onDelete(_id)}>
            Удалить
         </button>
      </td>
   </tr>
);

export default User;
