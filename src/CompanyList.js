import axios from "axios";
import { useEffect, useState, useContext } from "react";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";
import { Link } from "react-router-dom";
import JoblyApi from "./api";
import UserContext from "./userContext";

/** Show list of all companies.
 *
 * Props: none
 *
 * State: companies- { data: [{handle, name, description, numEmployees, logoUrl}, ...], isLoading: true }
 *
 * RouteList -> CompanyList -> [CompanyCard, SearchForm]
 */

function CompanyList() {
  const [companies, setCompanies] = useState({ data: null, isLoading: true });

  useEffect(function fetchCompaniesOnRender() {
    async function getCompanyList() {
      const resp = await JoblyApi.getCompanies();
      setCompanies({ data: resp, isLoading: false });
    }
    getCompanyList();
  }, []);

  /** Makes axios request based on search term, updates companies state */
  async function searchCompanies(searchTerm) {
    const resp = await JoblyApi.getCompanies({ name: searchTerm });
    setCompanies({ data: resp, isLoading: false });
  }

  if (companies.isLoading) return <i>Loading...</i>;

  return (
    <div className="">
      <div>
        <SearchForm search={searchCompanies} />
      </div>
      <div className="d-flex justify-content-center">
        <ul className="">
          {companies.data.map((company) => (
            <li key={company.handle} className="card card-display m-3">
              <Link to={`/companies/${company.handle}`}>
                <CompanyCard company={company} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CompanyList;
