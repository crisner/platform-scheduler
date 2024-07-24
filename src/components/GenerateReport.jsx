import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./report.css";
import TrainTable from "./TrainTable";
import TimeRangeSelector from "./ui/TimeRangeSelector";

const GenerateReport = () => {
  const [filter, setFilter] = useState({});
  const [generate, setGenerate] = useState();
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="btn btn-primary">Get Report</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="ReportOverlay" />
        <Dialog.Content className="ReportContent">
          <Dialog.Title className="ReportTitle">Report</Dialog.Title>
          <div className="flex-align-center gap mb-1">
            <TimeRangeSelector handleChange={setFilter} />
            <button
              className="btn btn-primary"
              onClick={() => setGenerate(filter)}
            >
              Generate
            </button>
          </div>
          <TrainTable filter={generate} />
          <Dialog.Close asChild>
            <button
              onClick={() => setGenerate(null)}
              className="IconButton"
              aria-label="Close"
            >
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default GenerateReport;
