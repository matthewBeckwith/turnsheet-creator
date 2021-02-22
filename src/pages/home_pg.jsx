import React from "react";
import GroupedByYear from "../components/groupedByYear";

import { Button } from "@material-ui/core";

import CreateFakeWo from "../components/createFakeWo";

export default function HomePg() {
  return (
    <div>
      <Button onClick={() => CreateFakeWo("2021")}>WO</Button>
      <GroupedByYear />
    </div>
  );
}
