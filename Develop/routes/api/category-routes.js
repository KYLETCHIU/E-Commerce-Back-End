const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  
  // find all categories
  try {

    const cData = await Category.findAll({include: [{model: Product}]});
    res.status(200).json(cData);
  } catch (err) {
    
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {

  // find one category by its `id` value
  try {

    const cData = await Category.findByPk(req.params.id, {
      
      include: [{ model: Product}]
    });

    if (!cData) {

      res.status(404).json({ message: "Failed to find catagory matching this id" });
      return;
    }

    res.status(200).json(cData);
  } catch (err) {

    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {

  // create a new category
  try {

    const catNew = await Category.create(req.body);
    res.status(200).json(catNew);
  } catch (err) {

    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {

  // update a category by its `id` value
  try {

    const cData = await Category.update({

      where: {

        id: req.params.id
      }
    });

    if (!cData) {

      res.status(404).json({ message: "Failed to find catagory matching this id" });
      return;
    }

    res.status(200).json(cData);
  } catch (err) {

    res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {

  // delete a category by its `id` value
  try {

    const cData = await Category.destroy({

      where: {

        id: req.params.id
      }
    });

    if (!cData) {

      res.status(404).json({ message: "Failed to find catagory matching this id" });
      return;
    }

    res.status(200).json(cData);
  } catch (err) {

    res.status(500).json(err);
  }
});

module.exports = router;
