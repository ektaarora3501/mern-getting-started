const { Router } = require("express");
const cartController = require("../controllers/cartController");
const router = Router();

// :id = id of user
router.get("/cart/:id", cartController.get_cart_items);
router.post("/cart/:id", cartController.add_cart_item);
router.delete("/cart/:userId/:itemId", cartController.delete_item);

module.exports = router;
