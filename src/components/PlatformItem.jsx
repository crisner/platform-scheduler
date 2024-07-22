import React from "react";
import TrainIcon from "../../public/assets/train.svg";
import RightArrow from "../../public/assets/right-arrow.svg";

const PlatformItem = ({
  platformID = "00",
  trainID,
  trainArrival,
  trainDeparture,
  status,
}) => {
  const platformStatus =
    status === "ARR"
      ? "arrive"
      : status === "DEP"
      ? "depart"
      : status === "CURR"
      ? "occupied"
      : "vacant";
  return (
    <div className={`platform platform-${platformStatus}`}>
      <div className="platform-number">{platformID}</div>
      {trainID && (
        <div className="train-info">
          <div className="main-info">
            <div>
              <TrainIcon />
              {trainID}
            </div>
            {status === 'ARR' ? <em className="status-text">Arriving...</em> : status === 'DEP' ? <em className="status-text">Departing...</em> : null}
            <div>
              <span>{trainArrival}</span>
              <RightArrow />
              <span>{trainDeparture}</span>
            </div>
          </div>
          <div className="sub-info"></div>
        </div>
      )}
      {!trainID && <em className="vacant-text">VACANT</em>}
      <div className="platform-status"></div>
    </div>
  );
};

export default PlatformItem;
