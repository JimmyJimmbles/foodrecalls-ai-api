export default (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
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
