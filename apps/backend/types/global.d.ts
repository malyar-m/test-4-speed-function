declare global {
  interface IEarthquake {
    id: number;
    location: string;
    magnitude: number;
    date: string;
  }
}

export {};