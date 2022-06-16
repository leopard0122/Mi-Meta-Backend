const Nft = require("../models/Nft"); // Credit model

exports.create = (req, res) => {
    const { owner, price, collectionId, description, category, royalty, rarity, edition,  propertise, unlockable, explicit, listMarketplace, unlockableContent, nftImg, listMarketplaceCategory } = req.body;

    const newNft = new Nft({
        owner: owner,
        price:price,
        collectionId:collectionId,
        description:description,
        category:category,
        royalty:royalty,
        rarity:rarity,
        edition:edition,
        propertise:propertise,
        unlockable:unlockable,
        explicit:explicit,
        listMarketplace:listMarketplace,
        nftImg: nftImg,
        listMarketplaceCategory: listMarketplaceCategory,
        unlockableContent: unlockableContent,
        nftImg:{cid:"aaa", name:'aaaa'},
    });

    newNft
        .save()
        .then(res.json("Successfully saved"))
        .catch((err) => console.log(err));
}

exports.get = (req, res) => {
    Nft.find().then((nft) => {
      if(!nft) return res.send({message:"noData"});
      return res.send({message:'success', data:nft});
    })
}