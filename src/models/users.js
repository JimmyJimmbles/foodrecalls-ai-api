// Define sequelize User model
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INT,
      },
      uuid: {
        type: DataTypes.UUID,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {}
  );

  User.associate = () => {
    // associations can be defined here
  };

  return User;
};
