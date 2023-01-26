const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel) {
    super(model);
    this.commentModel = commentModel;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // create new sighting
  async createSighting(req, res) {
    try {
      const newSighting = await this.model.create(req.body);
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Get all comments on sighting
  async getComments(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: {
          sighting_id: sightingId,
        },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // create new comment
  async createComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;
    try {
      const newComment = await this.commentModel.create({
        content: content,
        sighting_id: sightingId,
      });
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
