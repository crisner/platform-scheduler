import React, { useState } from "react";
import Papa from "papaparse";
import * as Dialog from "@radix-ui/react-dialog";
import "./upload.css";

const Upload = () => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");
  const ERR_MSG = "Please select a csv file";

  const closeDialog = () => {
    setOpen(false);
    setError("");
  };

  const handleFileUpload = (e) => {
    setError("");
    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions
      const fileExtension = inputFile?.type.split("/")[1];
      if (fileExtension !== "csv") {
        setError(ERR_MSG);
        return;
      }

      setFile(inputFile);
    }
  };

  const handleParse = () => {
    if (!file) return setError(ERR_MSG);

    // Initialize reader
    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const uploadFile = Papa.parse(target.result, {
        header: true,
      });
      const fileData = uploadFile?.data;
      const parsed = fileData.filter((data) => data['Train No']).map(data => {
        const updateData = {};
        const keys = Object.keys(data);
        keys.forEach(key => {
          switch (key) {
            case "Train No":
              updateData['id'] = data[key].trim();
              break;
            case "Arrival Time":
              updateData['arrivalTime'] = data[key].trim();
              break;
            case "Departure Time":
              updateData['departureTime'] = data[key].trim();
              break;
            case "Priority":
              updateData['priority'] = data[key].trim();
              break;
            default:
              break;
          }
        });
        return updateData;
      })
      localStorage.setItem("trains", JSON.stringify(parsed));
      closeDialog();
    };
    reader.readAsText(file);
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="btn btn-primary">Upload schedule</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Upload</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Upload train timings as a csv file
          </Dialog.Description>
          <fieldset className="Fieldset">
            <input
              type="file"
              className="Input"
              id="name"
              placeholder="Select file"
              onChange={handleFileUpload}
            />
          </fieldset>
          <p className="error-text">{error}</p>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
              gap: '0.8rem'
            }}
          >
            <button onClick={closeDialog} className="btn" aria-label="Close">
              Cancel
            </button>
            <button
              onClick={handleParse}
              className="btn btn-primary"
              aria-label="Close"
            >
              Confirm
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Upload;
