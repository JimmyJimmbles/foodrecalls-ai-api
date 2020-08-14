const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Define sequelize User model
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        validate: {
          isUUID: {
            msg: 'Not a valid UUID.',
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Not a valid email address.',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      instanceMethods: {
        generateHash(password) {
          return bcrypt.hashSync(password, salt);
        },
        validPassword(password) {
          return bcrypt.compare(password, this.password);
        },
      },
    }
  );

  User.associate = () => {
    // associations can be defined here
  };

  User.sync({ force: true });

  return User;
};
