const userModel    = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: async (req, res) => {
        try {
            const users = await userModel.find();

            return typeof req.query.pretty !== 'undefined' ? 
                   res.send(JSON.stringify(users, null, 4)) :
                   res.json({data:users, error: 0});

        } catch (error) {

            return res.status(500).json({
                message: 'Error when getting user.',
                error: error.message || error
            });

        }
    },

    /**
     * userController.show()
     */
    show: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await userModel.findOne({_id: id});

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return typeof req.query.pretty !== 'undefined' ? 
                   res.send(JSON.stringify(user, null, 4)) :
                   res.json({data:user, error: 0});

        } catch (error) {

            return res.status(500).json({
                message: 'Error when getting users.',
                error: error.message || error
            });

        }
    },

    /**
     * userController.create()
     */
    create: async (req, res) => {
        try {
            
            const user = new userModel({
                email    : req.body.email,
                fullname : req.body.fullname,
                password : req.body.password,
                restaurants: req.body.restaurants
            });

            await user.save();

            return res.status(201).json({data:user, error: 0});

        } catch (error) {

            return res.status(500).json({
                message: 'Error when creating user',
                error: error.message || error
            });

        }
    },

    /**
     * userController.update()
     */
    update: async (req, res) => {
        try {

            const id   = req.params.id;
            const user = await userModel.findOne({_id: id}); 

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.phone = req.body.phone ? req.body.phone : user.phone;
            user.email  = req.body.email  ? req.body.email  : user.email;
            user.fullname  = req.body.fullname  ? req.body.fullname  : user.fullname;
            
            const updatedUser = await user.save();

            return res.json({data:updatedUser, error: 0});

        } catch (error) {

            return res.status(500).json({
                message: 'Error when updating user.',
                error: error.message || error
            });

        }
    },

    /**
     * userController.remove()
     */
    remove: async (req, res) => {
        try {
            const id = req.params.id;
            await userModel.findByIdAndRemove(id);

            return res.status(204).json();

        } catch(error) {

            return res.status(500).json({
                message: 'Error when deleting the user.',
                error: error.message || error
            });

        }
    }
};
