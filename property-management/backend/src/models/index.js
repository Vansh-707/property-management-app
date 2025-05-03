const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define Property model
const Property = sequelize.define('Property', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false
});

// Define Floor model
const Floor = sequelize.define('Floor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    property_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Property,
            key: 'id'
        },
        allowNull: false
    },
    floor_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false
});

// Define Unit model
const Unit = sequelize.define('Unit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    floor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Floor,
            key: 'id'
        },
        allowNull: false
    },
    unit_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('available', 'booked'),
        defaultValue: 'available'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false
});

// Define relationships
Property.hasMany(Floor, { foreignKey: 'property_id' });
Floor.belongsTo(Property, { foreignKey: 'property_id' });
Floor.hasMany(Unit, { foreignKey: 'floor_id' });
Unit.belongsTo(Floor, { foreignKey: 'floor_id' });

module.exports = {
    Property,
    Floor,
    Unit
};