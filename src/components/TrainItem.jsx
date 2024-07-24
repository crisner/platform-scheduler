"use client";
import React from "react";
import TrainIcon from "../../public/assets/train.svg";
import RightArrow from "../../public/assets/right-arrow.svg";
import DelayButton from "./Delay";

const TrainItem = ({
  status,
  trainID,
  trainArrival,
  trainDeparture,
  delayFn = () => {},
}) => {
  return (
    <div className={`train-item train-${status}`}>
      <div>
        <TrainIcon />
        {trainID}
      </div>
      <div>
        <div className="train-timings">
          <span>{trainArrival}</span>
          <RightArrow />
          <span>{trainDeparture}</span>
        </div>
        <DelayButton delayFn={delayFn} />
      </div>
    </div>
  );
};

export default TrainItem;
