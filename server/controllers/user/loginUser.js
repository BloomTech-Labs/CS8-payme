const express = require('express');
const router = express.Router();
const User = require('../../models/users');
const { makeToken } = require('../../config/auth');

const login = (req, res) => {
    const { _id, username } = req.user;
    const tknUser = { _id, username };
    const token = makeToken(tknUser);
    User.findOne(_id)
        .select('-password -img')
        .populate('invoices')
        .then(user => {
            res.json({ token, user });
        });
};

const checkToken = (req, res) => {
    const { _id, username } = req.user;
    const tknUser = { _id, username };
    const token = makeToken(tknUser);
    User.findById(_id)
        .select('-password')
        .populate('invoices')
        .then(user => res.json({ user, token }))
        .catch(err => res.status(501).json(err));
};

const auth0Login = (req, res) => {
    const user = req.user;
    if (user.exp * 1000 < new Date().getTime()) {
        return res.status(401).send('Login expired, please login again.');
    }
    if (user.email) {
    } else
        res.status(500).send('Email address not provided byt OAuth Provider.');
    res.json({ req: Object.keys(req), user });
};

module.exports = {
    login,
    checkToken,
    auth0Login,
};
