const db = require("../database/models");
const getUrl = (req) => req.protocol + "://" + req.get("host") + req.originalUrl;

module.exports = {
    all: (req, res) => {
        db.Category.findAll()
        .then(result => {
            res.status(200).json({
                meta: {
                    endPoint: getUrl(req),
                    status: 200,
                    total: result.length,
                },
                data: result,
            });
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
            db.Category.findByPk(req.params.id)
            .then(result => {
                if(result){
                    return res.status(200).json({
                        meta: {
                            endPoint: getUrl(req),
                            name: result.name,
                        },
                        data: result,
                    })
                }else{
                    return res.status(404).json({
                        meta: {
                            status: 404,
                            msg: "ID not found",
                        },
                    })
                }
            })
            .catch(errors => console.log(errors))
        }
    }
}