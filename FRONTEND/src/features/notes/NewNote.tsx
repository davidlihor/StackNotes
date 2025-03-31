import NewNoteForm from "./NewNoteForm";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { PulseLoader } from "react-spinners";
import { IUser } from "../../types";

const NewNote = () => {
  const { users } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      users: (data?.ids.map((id) => data?.entities[id]) ?? []).filter((user): user is IUser => user !== undefined),
    }),
  });

  if (!users?.length) return <PulseLoader color={"#FFF"} />;

  const content = <NewNoteForm users={users} />;

  return content;
};
export default NewNote;
