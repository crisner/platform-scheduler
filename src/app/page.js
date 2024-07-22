"use client";

import TrainIcon from "../../public/assets/train.svg";
import RightArrow from "../../public/assets/right-arrow.svg";
import "@/app/page.css";
import styles from "./page.module.css";

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
          <button className="btn btn-primary">Upload schedule</button>
          <button className="btn btn-primary">Generate Report</button>
        </div>
      </div>
      <div className="content-container">
        <div className="current-trains">
          <div className="trains">
            <div className="train">220128 - P01 - 08:25</div>
          </div>
          <div className="platforms">
            <div className="platform platform-occupied">
              <div className="platform-number">01</div>
              <div className="train-info">
                <div className="main-info">
                  <div>
                    <TrainIcon />
                    220128
                  </div>
                  <div>
                    <span>08:15</span>
                    <RightArrow />
                    <span>08:25</span>
                  </div>
                </div>
                <div className="sub-info"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="waiting-trains">2</div>
        <div className="upcoming-trains">3</div>
      </div>
    </main>
  );
}
