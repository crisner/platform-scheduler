"use client";
import "@/app/page.css";
import styles from "./page.module.css";
import PlatformItem from "@/components/PlatformItem";
import TrainItem from "@/components/TrainItem";
import Upload from "@/components/Upload";
import GenerateReport from "@/components/GenerateReport";

export default function Dashboard() {
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
            <div className="train">220128 - P01 - 08:25</div>
          </div>
          <div className="platforms">
            <PlatformItem platformID="01" />
            <PlatformItem platformID="02" trainID={'987654'} trainArrival={'8:30'} trainDeparture={'8:35'} status='CURR' />
            <PlatformItem platformID="02" trainID={'987654'} trainArrival={'8:30'} trainDeparture={'8:35'} status='ARR' />
            <PlatformItem platformID="02" trainID={'987654'} trainArrival={'8:30'} trainDeparture={'8:35'} status='DEP' />
          </div>
        </div>
        <div className="waiting-trains">
          <h3>Waiting</h3>
          <div className="trains-container">
            <TrainItem status="waiting" trainID={'987654'} trainArrival={'8:30'} trainDeparture={'8:35'} />
            <TrainItem status="waiting" trainID={'987654'} trainArrival={'8:30'} trainDeparture={'8:35'} />
            <TrainItem status="waiting" trainID={'987654'} trainArrival={'8:30'} trainDeparture={'8:35'} />
          </div>
        </div>
        <div className="upcoming-trains">
          <h3>Upcoming</h3>
          <div className="trains-container">
          <TrainItem status="upcoming" trainID={'987654'} trainArrival={'8:30'} trainDeparture={'8:35'} />
          <TrainItem status="upcoming" trainID={'987654'} trainArrival={'8:30'} trainDeparture={'8:35'} />
          <TrainItem status="upcoming" trainID={'987654'} trainArrival={'8:30'} trainDeparture={'8:35'} />
          </div>
        </div>
      </div>
    </main>
  );
}
