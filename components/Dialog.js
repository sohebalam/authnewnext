import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core"
import Controls from "./controls/Controls"
import { useContext } from "react"
import { DataContext } from "../store/GlobalState"
import { deleteItem } from "../store/Actions"

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}))

export default function DialogComponent(props) {
  const { state, dispatch } = useContext(DataContext)
  const { modal } = state
  const { confirmDialog, setConfirmDialog } = props
  const classes = useStyles()

  const handelSubmit = () => {
    dispatch(deleteItem(modal.data, modal.id, "ADD_CART"))
    dispatch({ type: "ADD_MODAL", payload: {} })
  }

  return (
    <Dialog
      open={confirmDialog?.isOpen || false}
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle className={classes.dialogTitle}>
        {modal.title}
        {/* <IconButton disableRipple className={classes.titleIcon}> */}
        {/* <NotListedLocationIcon /> */}
        {/* </IconButton> */}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog?.title}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button
          text="No"
          color="default"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <Controls.Button text="Yes" color="secondary" onClick={handelSubmit} />
      </DialogActions>
    </Dialog>
  )
}
