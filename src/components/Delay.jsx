import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import "./delay.css";

const DelayButton = ({ delayFn }) => {
  const [open, setOpen] = React.useState(false);
  const [delayMinutes, setDelayMinutes] = useState(0);

  const confirm = () => {
    setOpen(false);
    delayFn(delayMinutes);
    setDelayMinutes(0);
  };
  const closePopover = () => {
    setOpen(false);
    setDelayMinutes(0);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="btn btn-danger">Delay</button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5} side="top">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <fieldset className="FieldsetGrp">
              <label className="InputLabel" htmlFor="width">
                Select number of minutes delay
              </label>
              <input
                className="InputField"
                type="number"
                id="width"
                value={delayMinutes}
                onChange={(e) => {
                  if (e.target.value < 0) return;
                  return setDelayMinutes(e.target.value);
                }}
              />
            </fieldset>

            <button className="btn btn-danger" onClick={confirm}>
              Confirm
            </button>
          </div>
          <Popover.Close
            className="PopoverClose"
            onClick={closePopover}
            aria-label="Close"
          >
            x
          </Popover.Close>
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DelayButton;
