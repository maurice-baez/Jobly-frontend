/** Displays a single CompanyCard
 *
 * Props: company - {handle, name, description, numEmployees, logoUrl}
 *
 * State: none
 *
 * RouteList ->CompanyList -> CompanyCard
 */

function CompanyCard({ company }) {
  const compImg = company.logoUrl || "/logos/logo1.png";

  return (
    <div className="companyCard">
      <p className="d-flex justify-content-between container">
        {company.name}{" "}
        <img
          src={`${compImg}`}
          alt={`${company.name}'s logo.`}
          className="company-logo"
        ></img>
      </p>
      <p className="container">{company.description}</p>
    </div>
  );
}

export default CompanyCard;
