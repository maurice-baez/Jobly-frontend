import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import JobCardList from "./JobCardList";
import JoblyApi from "./api";

/** Displays info of a single company
 *
 * Props: none
 *
 * State: company - { data: {handle, name, description, numEmployees, logoUrl}, isLoading: true }
 *
 * RouteList -> CompanyDetail -> JobCardList -> JobCard
 */

function CompanyDetail({ handleApplications }) {
  const { name } = useParams();
  const [company, setCompany] = useState({ data: null, isLoading: true });

  useEffect(
    function fetchCompanyOnRender() {
      async function getCompany(name) {
        const resp = await JoblyApi.getCompany(name);
        console.log(resp);
        setCompany({ data: resp, isLoading: false });
      }
      getCompany(name);
    },
    [name]
  );

  if (company.isLoading) return <i>Loading...</i>;
  console.log("company=", company);
  return (
    <div>
      <div className="container m-5">
        <h2>{company.data.name}</h2>
        <p>{company.data.description}</p>
      </div>
      <JobCardList
        jobs={company.data.jobs}
        handleApplications={handleApplications}
      />
    </div>
  );
}

export default CompanyDetail;
