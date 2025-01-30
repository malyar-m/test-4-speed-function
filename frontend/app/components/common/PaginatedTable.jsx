'use client';

import Link from 'next/link';
import React, { useState } from 'react'

function PaginatedTable({headings, data}) {
  const [currentPage, setCurrentPage] = useState(1)
  const nbPerPage = 50;
  const lastIndex = currentPage * nbPerPage
  const startIndex = lastIndex - nbPerPage 
  const numberOfPages = Math.ceil(data.length / nbPerPage)
  const records = data.slice(startIndex, lastIndex)

  return (
    <div>
      <table className='w-full table-auto border-collapse border border-green-800'>
        <thead className="p-1">
          <tr>
            {headings.map((h, i) => (
              <th key={i} className='capitalize py-2 text-stone-500'>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="p-1">
          {records.map((d,i) => (
            <tr key={d.id} className={`${i % 2 === 0 ? "bg-slate-100" : null} text-center capitalize`}>
              <td className='p-2 text-stone-600'>{d.id}</td>
              <td className='p-2 text-stone-600'>{d.date}</td>
              <td className='p-2 text-stone-600'>{d.location}</td>
              <td className='p-2 text-stone-600'>{d.magnitude}</td>
              <td className='p-2 text-stone-600'>
                <Link className="text-teal-500 p-1 mr-2" href={`/earthquakes/edit/${d.id}`}>Edit</Link>
                <Link className="text-teal-500 p-1" href={`/earthquakes/edit/${d.id}`}>Delete</Link>
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
    </div>
  )

  function firstPage(){
    setCurrentPage(1);
  }

  function lastPage(){
    setCurrentPage(numberOfPages);
  }

  function nextPage(){
    if (currentPage != numberOfPages){
      setCurrentPage(prev => prev + 1)
    }
  }

  function prevPage(){
    if (currentPage != 1){
      setCurrentPage(prev => prev - 1)
    }
  }
}

export default PaginatedTable;
