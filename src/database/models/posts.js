module.exports = (sequelize, dataTypes) => {
    let alias = "Post";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        content: {
            type: dataTypes.STRING(255),
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: true,
        },
        category: {
            type: dataTypes.INTEGER(11),
            allowNull: true,
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: true,
        },
    }
    let config = {
        tableName: "posts",
        timestamps: false,
    }
    const Post = sequelize.define(alias, cols, config);
    
    Post.associate = function (models) {
        Post.belongsTo(models.Category, {
            as: "categories",
            foreignKey: "category",
        });
    };
    return Post;
}