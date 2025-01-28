import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Earthquake extends Model {
  public id!: number;
  public location!: string;
  public magnitude!: number;
  public date!: Date;
}

Earthquake.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    magnitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'earthquakes',
  }
);

export default Earthquake;
