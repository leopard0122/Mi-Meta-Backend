const Collection = require("../models/Collection"); // Credit model
const Phase = require("../models/Phase");

exports.create = (req, res) => {
    const { name, creator, description, bannerImg, collectionImg, logoImg, royalty, category, url } = req.body;

    const newCollection = new Collection({
        name: name,
        creator: creator,
        description: description,
        bannerImg: bannerImg,
        collectionImg: collectionImg,
        logoImg: logoImg,
        royalty: royalty,
        category: category,
        url: url
    });

    newCollection
        .save()
        .then(res.json("Successfully saved"))
        .catch((err) => console.log(err));
}

exports.addFavorite = (req, res) => {
    const { name, creator, description, bannerImg, collectionImg, logoImg, royalty, category, url, addFavorite } = req.body;

    const collection = new Collection({
        name: name,
        creator: creator,
        description: description,
        bannerImg: bannerImg,
        collectionImg: collectionImg,
        logoImg: logoImg,
        royalty: royalty,
        category: category,
        url: url,
    });

    collection
        .save()
        .then(res.json("Successfully add Favorite saved"))
        .catch((err) => console.log(err));
}

exports.get = (req, res) => {
    Collection.find().then((collection) => {
      if(!collection) return res.send({message:"noData"});
      return res.send({message:'success', data:collection});
    })
}

