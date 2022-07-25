import axios from "axios";
import { useEffect, useState } from "react";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";

/** Show list of all jobs.
 *
 * Props: none
 *
 * State: jobs - { data: [{id, title, salary, equity, companyHandle, companyName}, ...], isLoading: true }
 *
 * RouteList -> JobList -> [JobCardList -> JobCard, SearchForm]
 */

function JobList({ handleApplications }) {
  const [jobs, setJobs] = useState({ data: null, isLoading: true });

  useEffect(function fetchJobsOnRender() {
    async function getJobsList() {
      const resp = await JoblyApi.getJobs();
      setJobs({ data: resp, isLoading: false });
    }
    getJobsList();
  }, []);

  /** Makes axios request based on search term, updates jobs state */
  async function searchJobs(searchTerm) {
    const resp = await JoblyApi.getJobs({ title: searchTerm });
    setJobs({ data: resp, isLoading: false });
  }

  if (jobs.isLoading) return <i>Loading...</i>;

  return (
    <div>
      <SearchForm search={searchJobs} />
      <JobCardList jobs={jobs.data} handleApplications={handleApplications} />
    </div>
  );
}

export default JobList;
