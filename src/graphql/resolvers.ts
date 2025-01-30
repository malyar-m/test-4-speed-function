import Earthquake from '../models/Earthquake';

const resolvers = {
  Query: {
    earthquakes: async () => await Earthquake.findAll(),
    earthquake: async (_: any, { id } : { id: any}) => {
      console.error('Error fetching earthquake:', id);
      try {
        const earthquake = await Earthquake.findByPk(id);
        if (!earthquake) throw new Error('Earthquake not found');
        return earthquake;
      } catch (error) {
        console.error('Error fetching earthquake:', error);
        throw error;
      }
    }
  },
  Mutation: {
    addEarthquake: async (_: any, { location, magnitude, date }: any) =>
      await Earthquake.create({ location, magnitude, date }),
    updateEarthquake: async (_: any, { id, location, magnitude, date }: any) => {
      const earthquake = await Earthquake.findByPk(id);
      if (!earthquake) throw new Error('Earthquake not found');
      return await earthquake.update({ location, magnitude, date });
    },
    deleteEarthquake: async (_: any, { id }: any) => {
      const earthquake = await Earthquake.findByPk(id);
      if (!earthquake) throw new Error('Earthquake not found');
      await earthquake.destroy();
      return true;
    },
  },
};

export default resolvers;
