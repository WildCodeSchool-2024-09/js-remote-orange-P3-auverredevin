import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import tastingActions from "./modules/degustation/tastingActions";
import itemActions from "./modules/item/itemActions";
import wineActions from "./modules/vin/wineActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/wines", wineActions.browse);
router.get("/api/wines/:id", wineActions.read);
router.post("/api/wines", wineActions.add);

router.get("/api/tastings", tastingActions.browse);
router.get("/api/tastings/:id", tastingActions.read);
router.post("/api/tastings", tastingActions.add);

/* ************************************************************************* */

export default router;
