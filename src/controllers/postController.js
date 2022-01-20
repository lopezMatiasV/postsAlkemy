const db = require("../database/models");
const getUrl = (req) => req.protocol + "://" + req.get("host") + req.originalUrl;

module.exports = {
    all: (req, res) => {
    db.Post.findAll({
        attributes: ["id", "title", "image", "category", "created_at"],
        order: [["created_at", "DESC"]],
        include: [{association: 'categories'}]
    })
    .then((result) => {
        if (result !== 0) {
            res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    total: result.length,
                },
                data: result,
            });
        } else {
            return res.status(404).json({
                meta: {
                    status: 404,
                    msg: "Not found",
                },
            });
        }
    })
    .catch((error) => res.status(400).send(error));
    },
    one: (req, res) => {
        if (req.params.id % 1 !== 0 || req.params.id < 0) {
            return res.status(400).json({
                meta: {
                    status: 400,
                    msg: "Wrong ID",
                },
            });
        } else {
            db.Post.findByPk(req.params.id, {
                include: [{association: 'categories'}]
            })
            .then((result) => {
                if (result) {
                    return res.status(200).json({
                        meta: {
                            endPoint: getUrl(req),
                            name: result.title,
                        },
                        data: result,
                    });
                } else {
                return res.status(404).json({
                    meta: {
                        status: 404,
                        msg: "ID not found",
                    },
                });
                }
            })
        .catch((errors) => console.log(errors));
        }
    },
    add: (req, res) => {
        const { title, content, image, category, created_at } = req.body;
        db.Post.create({
            title,
            content,
            image,
            category,
            created_at,
        })
        .then((post) => {
            res.status(201).json({
                meta: {
                endPoint: getUrl(req),
                msg: "Post agregado",
                },
                data: post,
            });
        })
        .catch((error) => res.status(400).send(error));
    },
    edit: (req, res) => {
    const { title, content, image, category, created_at } = req.body;
    db.Post.findByPk(req.params.id)
    .then(result => {
        if (result) {
            db.Post.update(
                { title, content, image, category, created_at },
                { where: { id: req.params.id }}
            )
            .then((post) => {
                res.status(201).json({
                    msg: "Post actualizado",
                })
            })
        }else{
            return res.status(400).json({
                msg: "Sin cambios, ese id no existe ",
            });
        }
    })
    .catch((error) => res.status(400).send(error));
    },
    destroy: (req, res) => {
        db.Post.destroy({
            where: {id : req.params.id}
        })
        .then(()=> {
            res.status(201).json({
                msj: 'Post eliminado correctamente'
            })
        })
        .catch(errors => console.log(errors))
    },
};
