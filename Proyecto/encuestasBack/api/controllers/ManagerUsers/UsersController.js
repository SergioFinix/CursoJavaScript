/**
 * UsersControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async function (req, res) {
        try {
          const { name, email, password } = req.body;
          const newUser = await Users.create({ name, email, password }).fetch();
          return res.json(newUser);
        } catch (error) {
          return res.serverError(error);
        }
      },
};

