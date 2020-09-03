const router = require("express").Router();
const User = require("../model/user.model");
const Document = require("../model/document.model");
const checkToken = require("../config/config");
const bcrypt = require("bcrypt");


// ------------------------------------ create ------------------------------------ //


// set createdBy, accessibleBy
// add document to user model
router.post("/:userid", async (req, res) => {
  try {
    let user = await User.findById(req.params.userid);
    let document = new Document(req.body);
    document.createdBy = user._id;
    document.accessibleBy.push(user._id);
    user.documents.push(document._id);
    await user.save();
    await document.save();

    res.status(200).json({
      message: "DOCUMENT successfully created",
      document,
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create DOCUMENT",
    });
  }
});


// ------------------------------------ index (show all) ------------------------------------ //


router.get("/", async (req, res) => {
  try {
    let documents = await Document.find()
      .populate({
        path : "requiredInputs",
        populate: {
          path: "user",
          model: "User"
        }
      })
      .populate({
        path : "requiredApprovals",
        populate: {
          path: "user",
          model: "User"
        }
      })
      .populate({
        path : "history",
        populate: ({
          path: "user",
          model: "User"
        })
      })
      .sort({"deadline": 1});

    res.status(200).json({
      documents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve DOCUMENTS",
    });
  }
});


// ------------------------------------ show ------------------------------------ //


router.get("/show/:id", async (req, res) => {
  try {
    // deep populating approvers
    let document = await Document.findById(req.params.id)
      .populate({
        path: "requiredInputs",
        populate: {
          path: "user",
          model: "User",
        },
      })
      .populate({
        path: "requiredApprovals",
        populate: {
          path: "user",
          model: "User",
        },
      });
    res.status(200).json({
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve DOCUMENT",
    });
  }
});


// ------------------------------------ edit as creator ------------------------------------ //


router.post("/edit/:id", async (req, res) => {
  try {
    let document = await Document.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      message: "DOCUMENT successfully updated",
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to edit DOCUMENT",
    });
  }
});


// ------------------------------------ edit as contributor (input) ------------------------------------ //


// for updating text, isDone, history
router.post("/input/:id/user/:userid", async (req, res) => {
  try {
    let userId = req.params.userid;
    let document = await Document.findById(req.params.id);
    let { text, history, isDone } = req.body;
    let isComplete = true; //checks if all required inputs have been made
    document.text = text;
    document.history = history;

    document.requiredInputs.forEach((input) => {
      if (input.user == userId) {
        input.isDone = isDone;
      }
    });

    document.requiredInputs.forEach((input) => {
      if (input.isDone == 0) isComplete = false;
    });

    isComplete ? document.stage = "review" : document.stage = "in-progress";

    await document.save();

    res.status(200).json({
      message: "DOCUMENT succesfully updated!",
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update DOCUMENT",
    });
  }
})


// ------------------------------------ edit as reviewer (approve) ------------------------------------ //


// for updating text, isApproved, history
router.post("/review/:id/user/:userid", async (req, res) => {
  try {
    let userId = req.params.userid;
    let document = await Document.findById(req.params.id);
    let { text, history, isApproved } = req.body;
    let isComplete = true; //checks if all required reviews have been made
    document.text = text;
    document.history = history;

    document.requiredApprovals.forEach((input) => {
      if (input.user == userId) {
        input.isApproved = isApproved;
      }
    });

    document.requiredApprovals.forEach((input) => {
      if (input.isApproved == 0) isComplete = false;
    });

    isComplete ? document.stage = "approved" : document.stage = "review";

    await document.save();

    res.status(200).json({
      message: "DOCUMENT succesfully updated!",
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update DOCUMENT",
    });
  }
})


// ------------------------------------ edit ------------------------------------ //


router.delete("/delete/:id", async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "DOCUMENT removed from database",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove DOCUMENT",
    });
  }
});


// ------------------------------------ export ------------------------------------ //


module.exports = router;