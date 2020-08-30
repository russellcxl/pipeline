const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },

    text: String,

    deadline: Date,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    comments: [
      {
        content: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        postedOn: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    stage: {
      type: String,
      enum: ["in-progress", "review", "approved"],
      default: "in-progress",
    },

    // only the admin and those included here can view/edit the document
    accessibleBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    requiredInputs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    requiredApprovals: [
      {
        isApproved: {
          type: Number,
          enum: [0, 1], // 0 for pending approval
          default: 0,
        },
        Approver: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    history: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        before: String,
        after: String,
        editedOn: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", DocumentSchema);

