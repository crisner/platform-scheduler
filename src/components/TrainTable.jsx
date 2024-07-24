import React, { useEffect, useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { getParsedTrainData } from "@/lib/utils";
import "./trainTable.css";

const columnHelper = createColumnHelper();

const TrainTable = ({ filter }) => {
  const calculateDelay = (scheduled, actual) => {
    if (!scheduled || !actual) return 0;
    dayjs.extend(customParseFormat);
    const scheduledTime = dayjs(scheduled, "HH:mm");
    const actualTime = dayjs(actual, "HH:mm");
    return actualTime.diff(scheduledTime, "minute");
  };

  const filterByArrivalTime = (data, startTime, endTime) => {
    dayjs.extend(customParseFormat);
    const start = dayjs(startTime, "HH:mm");
    const end = dayjs(endTime, "HH:mm");
    dayjs.extend(isSameOrBefore);
    dayjs.extend(isSameOrAfter);
    return data.filter((train) => {
      const arrival = dayjs(train.arrivalTime, "HH:mm");
      return arrival.isSameOrAfter(start) && arrival.isSameOrBefore(end);
    });
  };
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (!filter) return;
    const data = getParsedTrainData();
    const filtered = filterByArrivalTime(data, filter.start, filter.end);
    setFilteredData(filtered);
  }, [filter]);

  const columns = [
    columnHelper.accessor("id", {
      header: "Train No",
    }),
    columnHelper.accessor("priority", {
      header: "Priority",
    }),
    columnHelper.accessor("scheduledArrivalTime", {
      header: "Scheduled Arrival Time",
    }),
    columnHelper.accessor("arrivalTime", {
      header: "Actual Arrival Time",
    }),
    columnHelper.accessor("scheduledDepartureTime", {
      header: "Scheduled Departure Time",
    }),
    columnHelper.accessor("departureTime", {
      header: "Actual Departure Time",
    }),
    columnHelper.accessor(
      (row) => {
        return calculateDelay(row.scheduledArrivalTime, row.arrivalTime);
      },
      {
        header: "Delay in Arrival",
      }
    ),
    columnHelper.accessor(
      (row) => calculateDelay(row.scheduledDepartureTime, row.departureTime),
      {
        header: "Delay in Departure",
      }
    ),
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="fixed-header-table">
      <thead className="fixed-header">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} style={{ borderBottom: "1px solid gray" }}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{ border: "1px solid gray", padding: "8px" }}
              >
                {header.column.columnDef.header}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="scrollable-body">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} style={{ borderBottom: "1px solid gray" }}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{ border: "1px solid gray", padding: "8px" }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TrainTable;
