// Users model
export default (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      id: {
        primaryKey: true,
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
    },
    {}
  );

  users.associate = () => {
    // associations can be defined here
  };

  return users;
};
