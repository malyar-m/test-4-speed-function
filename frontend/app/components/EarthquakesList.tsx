"use client";
import Link from "next/link";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

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

const DELETE_EARTHQUAKE = gql`
  mutation DeleteEarthquake($id: Int!) {
    deleteEarthquake(id: $id)
  }
`;

const Earthquake: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(EARTHQUAKE_QUERY);
  const [deleteEarthquake] = useMutation(DELETE_EARTHQUAKE);
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const perPage = 50;
  const lastIndex = currentPage * perPage;
  const startIndex = lastIndex - perPage;
  const numberOfPages = Math.ceil(data.earthquakes.length / perPage);
  const records = data.earthquakes.slice(startIndex, lastIndex);

  return (
    <>
      <h1 className="p-6 text-center text-4xl">Earthquakes</h1>
      <div className="mb-4 text-center">
        <Link className="bg-blue-500 text-white p-2 rounded" href="/earthquake-form">Add Earthquake</Link>
      </div>
      <table className='w-full table-auto border-collapse border border-green-800'>
        <thead className="p-1 border-b-2 border-b-slate-400">
          <tr>
            {["ID", "Date", "Location", "Magnitude", "Actions"].map((h, i) => (
              <th key={i} className='capitalize py-2 text-stone-500'>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="p-1">
          {records.map((d: IEarthquake, i: number) => (
            <tr key={d.id} className={`${i % 2 === 0 ? "bg-slate-100" : null} text-center capitalize`}>
              <td className='p-2 text-stone-600'>{d.id}</td>
              <td className='p-2 text-stone-600'>{d.date}</td>
              <td className='p-2 text-stone-600'>
                <a target="_blank" className="text-teal-500 p-1 mr-2" href={`https://maps.google.com/?q=${d.location}`}>
                  {d.location}
                </a>
              </td>
              <td className='p-2 text-stone-600'>{d.magnitude}</td>
              <td className='p-2 text-stone-600'>
                <Link className="text-teal-500 p-1 mr-2" href={`/earthquake-form?id=${d.id}`}>Edit</Link>
                <button onClick={() => {
                  deleteEarthquake({ variables: { id: d.id } });
                  refetch();
                }} className="text-red-500 p-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-full flex flex-row justify-center p-5'>
        <div className='flex flex-row gap-4'>
          <span className='cursor-pointer font-semibold' onClick={() => firstPage()}>{'<<'}</span>
          <span className='cursor-pointer font-semibold' onClick={() => prevPage()}>{'<'}</span>
          <div className='flex flex-row'>
            <span>{currentPage}</span>
            <span>/</span>
            <span>{numberOfPages}</span>
          </div>
          <span className='cursor-pointer font-semibold' onClick={() => nextPage()}>{'>'}</span>
          <span className='cursor-pointer font-semibold' onClick={() => lastPage()}>{'>>'}</span>
        </div>
      </div>
    </>
  );

  function firstPage(){
    setCurrentPage(1);
  }

  function lastPage(){
    setCurrentPage(numberOfPages);
  }

  function nextPage(){
    if (currentPage !== numberOfPages){
      setCurrentPage(prev => prev + 1);
    }
  }

  function prevPage(){
    if (currentPage !== 1){
      setCurrentPage(prev => prev - 1);
    }
  }
};

export default Earthquake;