module.exports = (sequelize, dataTypes) => {
    let alias = "Category";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
    };
    let config = {
        tableName: "categories",
        timestamps: false,
    }
    const Category = sequelize.define(alias, cols, config);
    
    Category.associate = function(models) {
        Category.hasMany(models.Post, {
            as: "posts",
            foreignKey: "category"
        })
    }
    return Category;
}