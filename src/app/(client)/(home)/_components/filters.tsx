"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SortFluent } from "@/components/ui/sort-by-grid/fluent";
import { SortGrid } from "@/components/ui/sort-by-grid/grid";
import { SortTable } from "@/components/ui/sort-by-grid/table";
import { SelectTrigger } from "@radix-ui/react-select";
import { parseAsString, parseAsStringEnum, useQueryState } from "nuqs";
import { FC } from "react";

enum Grid {
  grid = "grid",
  fluent = "fluent",
  table = "table",
}

export const Filters: FC = () => {
  const [sortBy, setSortBy] = useQueryState("sortBy", parseAsString);

  const [grid, setGrid] = useQueryState(
    "orientation",
    parseAsStringEnum<Grid>(Object.values(Grid))
  );

  return (
    <div className="flex items-center">
      <Select onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={
              sortBy === "asc"
                ? "Sorted at newest"
                : sortBy === "desc"
                  ? "Sorted at latest"
                  : "Sort by"
            }
          />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="asc">Created at newest</SelectItem>
          <SelectItem value="desc">Created at latest</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center">
        <SortGrid grid={grid || ""} onClick={() => setGrid(Grid.grid)} />
        <SortFluent fluent={grid || ""} onClick={() => setGrid(Grid.fluent)} />
        <SortTable table={grid || ""} onClick={() => setGrid(Grid.table)} />
      </div>
    </div>
  );
};
