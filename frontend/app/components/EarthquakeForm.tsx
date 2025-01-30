"use client";

import { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const GET_EARTHQUAKE = gql`
  query GetEarthquake($id: ID!) {
    earthquake(id: $id) {
      id
      location
      magnitude
      date
    }
  }
`;

const ADD_EARTHQUAKE = gql`
  mutation AddEarthquake($location: String!, $magnitude: Float!, $date: String!) {
    addEarthquake(location: $location, magnitude: $magnitude, date: $date) {
      id
      location
      magnitude
      date
    }
  }
`;

const UPDATE_EARTHQUAKE = gql`
  mutation UpdateEarthquake($id: ID!, $location: String!, $magnitude: Float!, $date: String!) {
    updateEarthquake(id: $id, location: $location, magnitude: $magnitude, date: $date) {
      id
      location
      magnitude
      date
    }
  }
`;

export default function EarthquakeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const earthquakeId = searchParams.get("id");

  const { data } = useQuery(GET_EARTHQUAKE, {
    variables: { id: earthquakeId },
    skip: !earthquakeId,
  });

  const [location, setLocation] = useState(data?.earthquake?.location);
  const [magnitude, setMagnitude] = useState(data?.earthquake?.magnitude);
  const [date, setDate] = useState(data?.earthquake?.date);
  const [addEarthquake] = useMutation(ADD_EARTHQUAKE);
  const [updateEarthquake] = useMutation(UPDATE_EARTHQUAKE);

  useEffect(() => {
    if (data?.earthquake) {
      setLocation(data.earthquake.location);
      setMagnitude(String(data.earthquake.magnitude));
      setDate(data.earthquake.date);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (earthquakeId) {
      await updateEarthquake({
        variables: { id: earthquakeId, location, magnitude: parseFloat(magnitude), date },
      });
    } else {
      await addEarthquake({
        variables: { location, magnitude: parseFloat(magnitude), date },
      });
    }
    router.push("/"); // Redirect to home after submission
  };

  const openGoogleMaps = () => {
    const url = "https://www.google.com/maps";
    window.open(url, "_blank");
  };

  return (
    <main className="container mx-auto p-4 w-1/2">
      <h1 className="text-2xl font-bold mb-4">
        {earthquakeId ? "Edit" : "Add"} Earthquake 
      </h1>
      <button type="button" onClick={openGoogleMaps} className="bg-gray-500 text-white p-2 mb-1">
        Open Google Maps
      </button>
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <input
          type="text"
          placeholder="Latitude, Longitude"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        /> 
        <input
          type="number"
          step="0.1"
          placeholder="Magnitude (e.g. 5.2)"
          value={magnitude}
          onChange={(e) => setMagnitude(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          {earthquakeId ? "Update" : "Submit"}
        </button>
      </form>
      <Link href="/" className="block text-center text-blue-500 mt-4">Back to Home</Link>
    </main>
  );
}
