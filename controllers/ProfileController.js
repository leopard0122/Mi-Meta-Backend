const Profile = require("../models/Profile"); // Credit model

exports.save = (req, res) => {
    const { wallet, linkNft, username, email, bio, twitter, instagram, discord, facebook, tiktok, profileImg, bannerImg } = req.body;

    Profile.findOne({wallet:wallet}).then((profile)=> {
        if (!profile) {
            const newProfile = new Profile({
                wallet: wallet,
                linkNft: linkNft,
                username: username,
                email: email,
                profileImg:profileImg,
                bannerImg:bannerImg,
                bio: bio,
                twitter: twitter,
                instagram: instagram,
                discord: discord,
                facebook: facebook,
                tiktok: tiktok
            });
            newProfile
                .save()
                .then(console.log("Successfully saved"))
                .catch((err) => console.log(err));
            
        } else {
            profile.wallet = wallet;
            profile.linkNft= linkNft;
            profile.username= username;
            profile.email= email;
            profile.bannerImg = bannerImg;
            profile.profileImg = profileImg;
            profile.bio= bio;
            profile.twitter= twitter;
            profile.instagram= instagram;
            profile.discord= discord;
            profile.facebook= facebook;
            profile.tiktok= tiktok;

            profile.save().then(console.log("Successfully saved")).catch((err) => console.log(err));
           
        }
        return res.send({message:"success"})
    });
    
}

exports.get = (req, res) => {
    Profile.findOne().then((profile) => {
      if(!profile) return res.send({message:"noData"});
      return res.send({message:'success', data:profile});
    })
}