const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },

    text: String,

    deadline: {
      type: Date,
      default: "2021-02-02T18:25:43.511Z",
    },

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
        isDone: {
          type: Number,
          enum: [0, 1], // 0 for pending approval
          default: 0,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    requiredApprovals: [
      {
        isApproved: {
          type: Number,
          enum: [0, 1], // 0 for pending approval
          default: 0,
        },
        user: {
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

// ------------------------------------ hooks ------------------------------------ //

DocumentSchema.plugin(populateAllFields);

function populateAllFields(schema) {
  let paths = "";
  schema.eachPath(function process(pathname, schemaType) {
      if (pathname == "_id") return;
      if (schemaType.options.ref) paths += " " + pathname;
  });

  schema.pre("find", handler);
  schema.pre("findOne", handler);

  function handler(next) {
      this.populate(paths);
      next();
  }
};

// ------------------------------------ exports ------------------------------------ //

module.exports = mongoose.model("Document", DocumentSchema);

