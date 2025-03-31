import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";
import { IUser } from "../../types";

const EditNote = () => {
  const { id } = useParams();
  const { username, isManager, isAdmin } = useAuth();

  const { note } = useGetNotesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id!],
    }),
  });

  const { users } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users?.length) return <PulseLoader color={"#FFF"} />;

  if (!isManager && !isAdmin) {
    if (note.user.username !== username) {
      return <p className="errmsg">No access</p>;
    }
  }

  return <EditNoteForm note={note} users={users.filter((user): user is IUser => user !== undefined)} />;
};
export default EditNote;
