"use client";
import PlatformItem from "@/components/PlatformItem";
import TrainItem from "@/components/TrainItem";
import Upload from "@/components/Upload";
import GenerateReport from "@/components/GenerateReport";
import { useEffect, useRef, useState } from "react";
import { delayTrain } from "../lib/train";
import "@/app/page.css";
import styles from "./page.module.css";
import { getParsedTrainData } from "@/lib/utils";

export default function Dashboard() {
  const firstRender = useRef(true);
  const NO_OF_PLATFORMS = 2;
  // const sortedTrains = trainData;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [updatedTrains, setUpdatedTrains] = useState([]);
  const [currentTrains, setCurrentTrains] = useState([]);
  const [waitingTrains, setWaitingTrains] = useState([]);
  const [upcomingTrains, setUpcomingTrains] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  const allotTrains = (sortedTrains, platforms) => {
    console.log("sortedTrains");
    const currentHours = currentTime.getHours().toString().padStart(2, "0");
    const currentMinutes = currentTime.getMinutes().toString().padStart(2, "0");
    console.log(
      "current time",
      currentTime,
      `${currentHours}:${currentMinutes}`
    );
    // Note: Train categorization
    const current = [];
    const waiting = [];
    const upcoming = [];

    // Platforms clone
    let clonedPlatforms = [...platforms];

    const updated = sortedTrains.map((train) => {
      const clonedTrain = { ...train };
      // Check if train matches the current time
      // Check if arrival time is less than or equal to current time
      const [arrivalHours, arrivalMinutes] = clonedTrain.arrivalTime
        .split(":")
        .map(Number);
      const [departureHours, departureMinutes] = clonedTrain.departureTime
        .split(":")
        .map(Number);

      if (
        departureHours == currentHours &&
        departureMinutes < currentMinutes &&
        clonedTrain.assignedPlatform
      ) {
        // Check if platforms are available
        clonedPlatforms = clonedPlatforms.map((platform) => {
          const clonedPlatform = { ...platform };
          if (clonedPlatform.train?.id === clonedTrain.id) {
            // Remove platform number from train
            clonedTrain.assignedPlatform = null;
            // Remove train from platform
            clonedPlatform.train = null;
            // Update status
            clonedPlatform.status = "vacant";
            return clonedPlatform;
          }
          return clonedPlatform;
        });
        return clonedTrain;
      }

      // Note: Handling arrival and occupied status of platforms
      if (
        ((arrivalHours == currentHours && arrivalMinutes <= currentMinutes) ||
          arrivalHours < currentHours) &&
        ((departureHours == currentHours &&
          departureMinutes >= currentMinutes) ||
          departureHours > currentHours)
      ) {
        let noVacantPlatform = false;
        // Check if platforms are available
        clonedPlatforms = clonedPlatforms.map((platform) => {
          const clonedPlatform = { ...platform };

          if (clonedPlatform.train === null && !clonedTrain.assignedPlatform) {
            noVacantPlatform = false;
            // Allot train to platform
            clonedPlatform.train = clonedTrain;
            // Add train to current trains list
            current.push(clonedTrain);
            // Add train arrival status
            clonedPlatform.status = "ARR";
            if (firstRender.current) {
              clonedPlatform.status = "CURR";
            }
            // Update train information with platformID
            clonedTrain.assignedPlatform = clonedPlatform.id;
            clonedTrain.status = null;
            return clonedPlatform;
          }
          if (clonedPlatform.train?.id == clonedTrain.id) {
            noVacantPlatform = false;
            // Add train to current trains list
            current.push(clonedTrain);
            if (
              departureHours == currentHours &&
              departureMinutes == currentMinutes &&
              clonedTrain.assignedPlatform
            ) {
              // Note: Handling departure status of platforms
              clonedPlatform.status = "DEP";
            } else if (clonedPlatform.status === "ARR") {
              // Update status if not already updated
              clonedPlatform.status = "CURR";
            }
            return clonedPlatform;
          }
          if (
            !clonedTrain.assignedPlatform &&
            clonedPlatform.status !== "vacant"
          ) {
            // if there are no vacant platforms, put the trains in the waiting list
            noVacantPlatform = true;
          }
          return clonedPlatform;
        });
        if (noVacantPlatform) {
          clonedTrain.status = "waiting";
          waiting.push(clonedTrain);
        }
        return clonedTrain;
      }
      // Note: Push delayed waiting trains correctly to waiting list
      if (clonedTrain.status == "waiting" && !clonedTrain.assignedPlatform) {
        waiting.push(clonedTrain);
      }

      // Note: Handle upcoming trains
      if (
        arrivalHours > currentHours ||
        (arrivalHours == currentHours && arrivalMinutes > currentMinutes)
      ) {
        upcoming.push(clonedTrain);
      }
      return clonedTrain;
    });

    // console.log("platforms", clonedPlatforms);
    // console.log("current", current);
    // console.log("updated", updated);
    // console.log("waiting", waiting);
    // console.log("upcoming", upcoming);
    console.log("--------------------------------------");
    // Update state
    setPlatforms(clonedPlatforms);
    setUpdatedTrains(updated);
    setCurrentTrains(current);
    setWaitingTrains(waiting);
    setUpcomingTrains(upcoming);
  };

  const refreshAlottedTrains = (platforms) => (updatedTrains) => allotTrains(updatedTrains, platforms);

  useEffect(() => {
    const renderTimer = setInterval(function updateCurrentTime() {
      if (firstRender.current) {
        firstRender.current = false;
      }
      setCurrentTime(new Date());

      // console.log("update time", new Date());
    }, 15000);

    return () => {
      clearInterval(renderTimer);
    };
  }, []);

  useEffect(() => {
    // Generate platform data from number of platforms
    const platforms = Array.from({ length: NO_OF_PLATFORMS }, (_, i) => {
      const number = i + 1;
      const platformID = number < 10 ? "0" + number : number.toString();
      return {
        id: platformID,
        train: null,
        status: "vacant",
      };
    });
    setPlatforms(platforms);

    // Get train data from local storage
    const trainData = getParsedTrainData();

    console.log("trainData", trainData);
    // set
    allotTrains(trainData, platforms);
  }, [NO_OF_PLATFORMS]);

  useEffect(() => {
    if (firstRender.current) return;
    allotTrains(updatedTrains, platforms);
  }, [currentTime]);

  return (
    <main className={styles.main}>
      <h1>Platform Viewer</h1>
      <div className="info-header">
        <section className="details">
          <h2>Station 06</h2>
          <div>No. of platforms: 8</div>
        </section>
        <div className="action-btns">
          {/* <button className="btn btn-primary">Upload schedule</button> */}
          <Upload />
          {/* <button className="btn btn-primary">Generate Report</button> */}
          <GenerateReport />
        </div>
      </div>
      <div className="content-container">
        <div className="current-trains">
          <div className="trains">
            {currentTrains.map((train) => (
              <div
                key={train.id}
                className="train"
              >{`${train.id} - P${train.assignedPlatform} - ${train.departureTime}`}</div>
            ))}
          </div>
          <div className="platforms">
            {platforms.map((platform) => (
              <PlatformItem
                key={platform.id}
                platformID={platform.id}
                trainID={platform.train?.id}
                trainArrival={platform.train?.arrivalTime}
                trainDeparture={platform.train?.departureTime}
                status={platform.status}
              />
            ))}
          </div>
        </div>
        <div className="waiting-trains">
          <h3>Waiting</h3>
          <div className="trains-container">
            {waitingTrains.map((train) => (
              <TrainItem
                key={train.id}
                status="waiting"
                trainID={train.id}
                trainArrival={train.arrivalTime}
                trainDeparture={train.departureTime}
                delayFn={delayTrain(
                  train,
                  updatedTrains,
                  refreshAlottedTrains(platforms),
                  "waiting"
                )}
              />
            ))}
          </div>
        </div>
        <div className="upcoming-trains">
          <h3>Upcoming</h3>
          <div className="trains-container">
            {upcomingTrains.map((train) => (
              <TrainItem
                key={train.id}
                status="upcoming"
                trainID={train.id}
                trainArrival={train.arrivalTime}
                trainDeparture={train.departureTime}
                delayFn={delayTrain(
                  train,
                  updatedTrains,
                  refreshAlottedTrains(platforms),
                  "upcoming"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
