const express = require("express");
const router = express.Router();

const Column = require("../../models/columns");
const Board = require("../../models/boards");
const Card = require("../../models/cards")
const auth = require("../../middleware/authenticator");
const {
  validate,
  columnValidationRules,
} = require("../../middleware/validator");

// @route POST api/columns/create
// @desc Create a New Column and push the new column to the board
// @access private
router.post(
  "/:boardId",
  [auth, columnValidationRules(), validate],
  async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId);

      Column.create(req.body, async (err, col) => {
        if (err) {
          console.log(err);
        } else {
          // Pushing the column to the board
          board.columns.push({ _id: col.id });
          await board.save();

          res.send(col);
        }
      });
    } catch (err) {
      if (err.name === "CastError")
        return res.status(404).json({ msg: "Board not found" });
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT api/columns/:id
// @desc Either change name of column or changing location of card within column.
// @access private
router.put("/:id", [auth, validate], (req, res) => {
  console.log(req.body);
  Column.findByIdAndUpdate(req.params.id, req.body, (err, updatedColumn) => {
    if (!updatedColumn) {
      console.log(updatedColumn);
      return res.status(400).send({ msg: "Invalid Column" });
    }

    console.log(updatedColumn);
    res.status(200).send(updatedColumn);
  });
});

// @route GET  /api/columns/:id
// @desc Get the column by columnId
// @access Private
router.get("/:id", auth, (req, res) => {
  Column.findById(req.params.id, (err, col) => {
    if (!col) return res.status(400).send({ msg: "Invalid Column" });

    res.send(col);
  });
});

router.delete("/:id", auth, async (req, res) => {
  try {
    Column.findById(req.params.id, (err, col) => {
      col.cards.forEach(cardId => {
        Card.findByIdAndDelete({cardId})
      })
    })
    await Column.findByIdAndDelete(req.params.id)
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
module.exports = router;
