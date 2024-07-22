import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import './upload.css';

const Upload = () => (
  <Dialog.Root>
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
          <input type='file' className="Input" id="name" placeholder="Select file" />
        </fieldset>
        
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            X
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Upload;