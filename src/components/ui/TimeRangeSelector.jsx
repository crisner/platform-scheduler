import React, { useEffect, useState } from "react";
import styles from "./TimeRangeSelector.module.css";

const TimeRangeSelector = ({ handleChange }) => {
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  useEffect(() => {
    handleChange({ start: startTime, end: endTime });
  }, [startTime]);

  useEffect(() => {
    handleChange({ start: startTime, end: endTime });
  }, [endTime]);

  return (
    <div className={styles.timeRangeContainer}>
      <div className={styles.startContainer}>
        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={handleStartTimeChange}
          step="300" // 5 minute increments
        />
      </div>
      <div className={styles.endContainer}>
        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={handleEndTimeChange}
          step="300" // 5 minute increments
        />
      </div>
    </div>
  );
};

export default TimeRangeSelector;
