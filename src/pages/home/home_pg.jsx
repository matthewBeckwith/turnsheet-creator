import React from "react";
import GroupedByYear from "./components/groupedByYear";

export default function HomePg({ searchFor }) {
  return (
    <div>
      <GroupedByYear searchFor={searchFor} />
    </div>
  );
}
