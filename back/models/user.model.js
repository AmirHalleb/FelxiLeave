module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        annualLeave: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        unpaidLeave: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        sickLeave: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    });

    User.associate = (models) => {
        User.hasMany(models.Leave, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
    };

    return User;
};
