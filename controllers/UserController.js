const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {

    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(400).send({ msg: "All input is required" });
    }

    const user = await User.findOne({ email });

    if (user) {
        let decryptedPassword = await bcrypt.compare(password, user.password);

        if (decryptedPassword) {
            //Create token
            const token = jwt.sign(
                { email: email },
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                {
                    expiresIn: "2h",
                }
            );
            res.status(200).json({ msg: "succes", token: token });
        } else {
            res.status(400).send({msg : "sorry but password not correct"});
        }
    }else {
        res.status(400).json({msg : "email not exists"});
    }




}

exports.register = async (req, res, next) => {

    const { firstname, lastname, email, password, adress, city, country, licence, old } = req.body;

    const isMatch = await User.findOne({ email });

    if (!isMatch) {

        let encryptedPassword = await bcrypt.hash(password, 10);

        let user = await User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: encryptedPassword,
            adress: adress,
            city: city,
            country: country,
            licence: licence,
            old: old,
        })

        let flagSucces = user.save();

        if (flagSucces) {
            //Create token
            const token = jwt.sign(
                { email: email },
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                {
                    expiresIn: "2h",
                }
            );
            await res.status(200).json({ msg: "succes", token: token });
        } else {
            await res.status(400).json({ msg: "echec" });
        }

    } else {
        await res.status(400).json({ msg: "email already exists" });
    }


}

exports.profile = async (req, res, next) => {

   await  res.status(200).json({msg : "la liste de users (Profile)"});

}

