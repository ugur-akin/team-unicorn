const mongoose = require("mongoose");

const CardDetailsSchema = new mongoose.Schema({
  meta: {
    type: {
      sections: [String],
      lockedSections: [String],
    },
    default: { sections: [], lockedSections: [] },
  },
  color: String, // hexcode
  description: String,
  checklist: { type: [Object], default: undefined },
  deadline: Number, // epoch
  comments: { type: [Object], default: undefined },
  attachments: { type: [Object], default: undefined },
  tags: { type: [Object], default: undefined },
});

module.exports = CardDetailsSchema;
