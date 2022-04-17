import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItem, TextField, Grid } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { db } from "./firebase";
import styles from "./TaskItem.module.css";

interface PROPS {
  id: string;
  title: string;
}

const TaskItem: React.FC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    db.collection("tasks").doc(props.id).set({ title: title }, { merge: true });
  };

  const deleteTask = () => {
    db.collection("tasks").doc(props.id).delete();
  };

  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="Edit Task"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </Grid>
      <button className={styles.taskitem_icon} onClick={editTask}>
        <EditOutlined />
      </button>
      <button className={styles.taskitem_icon} onClick={deleteTask}>
        <DeleteIcon />
      </button>
    </ListItem>
  );
};

export default TaskItem;
