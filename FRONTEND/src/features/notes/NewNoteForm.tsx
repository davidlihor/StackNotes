import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { IUser } from "../../types";
import { getErrorMessage } from "../../app/utils/errorUtils";

const NewNoteForm = ({ users }: { users: IUser[] }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setUser("");
      setTitle("");
      setText("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onUserChanged = (e: ChangeEvent<HTMLSelectElement>) => setUser(e.target.value);
  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  const canSave = [user, title, text].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({ user, title, text });
    }
  };

  const options = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.username}
    </option>
  ));

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !user ? "form__input--incomplete" : "";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{getErrorMessage(error)}
      </p>

      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h2>New Note</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

        <label className="form__label" htmlFor="title">
          Title:
        </label>
        <input
          className={`form__input form__input__title ${validTitleClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="text">
          Text:
        </label>
        <input
          className={`form__input form__input__text ${validTextClass}`}
          id="text"
          name="text"
          type="text"
          autoComplete="off"
          value={text}
          onChange={onTextChanged}
        />

        <label className="form__label" htmlFor="user">
          ASSIGNED TO
        </label>
        <select
          id="user"
          name="user"
          className={`form__select ${validUserClass}`}
          value={user}
          onChange={onUserChanged}
        >
          <option value=""></option>
          {options}
        </select>
      </form>
    </>
  );

  return content;
};
export default NewNoteForm;
