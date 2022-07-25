import UserContext from "./userContext";
import { useContext, useEffect, useState } from "react";
import JoblyApi from "./api";
import Loading from "./Loading";

/** Displays a single JobCard
 *
 * Props: job - {id, title, salary, equity, companyHandle, companyName}
 *
 * State: none
 *
 * RouteList -> JobList -> JobCardList -> JobCard
 */

function JobCard({ job, handleApplications }) {
  const { currentUser } = useContext(UserContext);
  const jobsApplied = new Set(currentUser.applications);

  async function handleClick() {
    await handleApplications(job.id);
  }

  const applyBtn = () => {
    if (!jobsApplied.has(job.id)) {
      return (
        <button className={`btn btn-primary`} onClick={handleClick}>
          Apply
        </button>
      );
    } else {
      return (
        <button className={`btn btn-success disabled`} onClick={handleClick}>
          Applied!
        </button>
      );
    }
  };

  return (
    <div className="container">
      <p className="fs-4">{job.title}</p>
      <p className="">{job.companyName}</p>
      <p className="d-flex justify-content-between">
        <span>
          <i>Salary: {job.salary}</i>, <i>Equity: {job.equity}</i>
        </span>
        {applyBtn()}
      </p>
    </div>
  );
}

export default JobCard;
