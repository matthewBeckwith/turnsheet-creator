import React from "react";
import { Button, Paper, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <Toolbar />
      <Paper
        style={{
          textAlign: "center",
        }}
      >
        <Toolbar />
        <Typography variant="h4">404 ERROR:</Typography>
        <Toolbar />
        <Typography
          variant="body1"
          style={{
            padding: `0 40px 0 40px`,
          }}
        >
          This is not a valid address. Please try again.
        </Typography>
        <Toolbar />
        <Button variant="text" component={Link} to={"/"}>
          All Turnsheets
        </Button>
        <Button variant="text" component={Link} to={"/create"}>
          Create a Turnsheet
        </Button>
      </Paper>
    </>
  );
}
