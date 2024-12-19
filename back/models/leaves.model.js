module.exports = (sequelize, DataTypes) => {
    const Leave = sequelize.define('Leave', {
        leaveId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.INTEGER, // For example, 1: Annual Leave, 2: Sick Leave, etc.
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Reference to User model
                key: 'userId',
            },
            onDelete: 'CASCADE', // Delete the leave if the associated user is deleted
        },

        status: {
            type: DataTypes.INTEGER, // 0 pending 1 approved 2 rejected
            allowNull: false,
            defaultValue: 0, // Default to false (pending) 
        },
    });
    
    Leave.associate = (models) => {
        Leave.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
    };

    return Leave;
};
