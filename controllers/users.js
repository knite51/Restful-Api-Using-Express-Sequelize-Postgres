import models from '../models';

const { Users } = models;

export default {
  async createUser(req, res) {
    let { username, email } = req.body;
    username = username && username.trim();
    email = email && email.trim();

    const requestBody = {
      ...req.body,
      username,
      email
    };

    const user = await Users.create(requestBody);

    const normalizedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isAdmin: user.isAdmin
    };

    const responseObject = { ...normalizedUser };

    return res.status(201).send({
      data: { ...responseObject },
      status: 201
    });
  },

  async getOneUser(req, res) {
    const user = await Users.findByPk(req.params.id);
    const data = {
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isAdmin: user.isAdmin
    };

    const responseObject = { data, status: 200 };

    return res.send(responseObject);
  },

  async getAllUsers(req, res) {
    const data = await Users.findAll().map(user => {
      return {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      };
    });
    return res.send({ data, status: 200 });
  },

  async updateUserDetails(req, res) {
    let { username, email } = req.body;
    username = username && username.trim();
    email = email && email.trim();

    const user = await Users.findByPk(req.params.id);
    const updatedUser = await user.update({
      username: username || user.username,
      email: email || user.email
    });

    const data = {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    };

    const message = 'Update Successful';

    const responseObject = { data, message, status: 200 };
    return res.send(responseObject);
  },

  async deleteUser(req, res) {
    await Users.destroy({ where: { id: req.params.id } });
    return res.json({ message: 'User Deleted' });
  }
};
