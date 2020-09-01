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
    document.accessibleBy.push(user._id); //could do this by validating on frontend too
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

// ------------------------------------ edit ------------------------------------ //

router.post("/edit/:id", async (req, res) => {
  try {
    let { title, deadline, stage, accessibleBy, requiredInputs, requiredApprovals } = req.body;
    let checkInputs = requiredInputs.filter(x => x.isDone == 0);
    let checkApprovals = requiredApprovals.filter(x => x.isDone == 0);
    if (checkInputs.length == 0) stage = "review";
    if (checkApprovals.length == 0) stage = "approved";
    
    let document = await Document.findByIdAndUpdate(req.params.id, {
      title, 
      deadline,
      stage,
      accessibleBy,
      requiredInputs,
      requiredApprovals,
    });

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

// ------------------------------------ export ------------------------------------ //

module.exports = router;