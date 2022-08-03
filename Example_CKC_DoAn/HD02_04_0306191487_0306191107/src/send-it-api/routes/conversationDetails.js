const router = require('express').Router();
const ConversationDetail = require('../models/ConversatioDetail');

// create
router.post("/", async (req, res) => {
    var date = Date.now().toString();
    const newConversationDetail = new ConversationDetail({
        conversation_id: `CONVS${date}`,
        user_id: "uid",
        nick_name: "nickname",
        unread_count: 0,
        date_in: Date.now(),
        date_out: null,
        role: 1,
    });

    try {
        const savedConversation = await newConversationDetail.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
});


// gets one
router.get("/:id", async (req, res) => {
    try {
        const conversation_detail = await ConversationDetail.find({ _id: req.params.id });
        if (conversation_detail) {
            res.status(200).json(conversation_detail);
        }
        else {
            res.status(404).json("conversation detail not found");

        }
    } catch (error) {
        res.status(500).json(error + "can't get conversation detail");
    }
});

// gets all
router.get("/", async (req, res) => {
    try {
        const conversation_detail = await ConversationDetail.find({});
        res.status(200).json(conversation_detail);
    } catch (error) {
        res.status(500).json(error + "can't get all conversation");
    }
});

//delete 
router.delete("/:id", async (req, res) => {
    try {
        const conversationWillDelete = await ConversationDetail.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json("conversation detail deleted successfully");

    } catch (error) {
        res.status(500).json(error + " error deleting conversation detail" + req.params.id);
    }
});

//update

module.exports = router;