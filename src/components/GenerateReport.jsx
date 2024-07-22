import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import './report.css';

const GenerateReport = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
    <button className="btn btn-primary">Get Report</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="ReportOverlay" />
      <Dialog.Content className="ReportContent">
        <Dialog.Title className="ReportTitle">Report</Dialog.Title>
        <Dialog.Description className="ReportDescription">
          Report for today
        </Dialog.Description>
        <div>Table</div>
        
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            X
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default GenerateReport;