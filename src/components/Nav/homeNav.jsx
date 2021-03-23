import React from "react";
import { Link } from "react-router-dom";
import {
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

// --- Temporary Import (remove)
import CreateFakeWo from "../../utils/createFakeWo";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function HomeNav({ handleSearch }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Link to="/create_turnsheet" className={classes.menuButtonLink}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="create turnsheet"
        >
          <AddIcon />
        </IconButton>
      </Link>

      <Typography className={classes.title} variant="h6" noWrap>
        Turnsheets
      </Typography>

      {/* Temporary button for development */}
      <Button variant="contained" color="secondary" onClick={CreateFakeWo}>
        Create Fake WO
      </Button>

      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={handleSearch}
        />
      </div>
    </React.Fragment>
  );
}
