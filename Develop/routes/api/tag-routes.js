const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {

  // find all tags
  try {

    const tData = await Tag.findAll({include: [{ model: Product}]});
    res.status(200).json(tData);
  } catch (err) {

    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {

  // find a single tag by its `id`
  try {

    const tData = await Tag.findByPk(req.params.id,{

      include: [{ model: Product}]
    });
      if (!categoryData) {

        res.status(404).json({ message: "Failed to find tag that matches this id" });
        return;
      }
    res.status(200).json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {

  // create a new tag
  try {

    const tNew = await Tag.create(req.body);
    res.status(200).json(tNew);
  } catch (err) {

    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {

  // update a tag"s name by its `id` value
  try {
    const tData = await Tag.update({

      where: {

        id: req.params.id
      }
    });
      if (!categoryData) {

        res.status(404).json({ message: "Failed to find tag that matches this id" });
        return;
      }
    res.status(200).json(categoryData);
  } catch (err) {

    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {

  // delete on tag by its `id` value
  try {

    const tData = await Tag.destroy({

      where: {

        id: req.params.id
      }
    });
      if (!categoryData) {

        res.status(404).json({ message: "Failed to find tag that matches this id" });
        return;
      }
    res.status(200).json(tData);
  } catch (err) {

    res.status(500).json(err);
  }
});

module.exports = router;
