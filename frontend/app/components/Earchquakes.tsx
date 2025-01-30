"use client";
import PaginatedTable from "./common/PaginatedTable";
import { gql, useQuery } from "@apollo/client";

const EARTHQUAKE_QUERY = gql`
  query Query {
    earthquakes {
      id
      location
      magnitude
      date
    }
  }
`;

const Earthquake: React.FC = () => {
  const { loading, error, data } = useQuery(EARTHQUAKE_QUERY);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="p-6 text-center text-4xl">Earthquakes</h1>
      <PaginatedTable headings={["ID", "Location", "Magnitude", "Date", "Actions"]} data={data.earthquakes} />
    </>
  );
};

export default Earthquake;
