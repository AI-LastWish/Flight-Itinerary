import { ItineraryController } from "@/http/controllers/ItineraryController";
import { ErrorHandler } from "@http/middlewares/ErrorHandler";
import express from "express";

const itineraryController = new ItineraryController();

const router = express.Router();
router.get("/", ErrorHandler.catchErrors(itineraryController.getItineraries));
router.get("/:id", ErrorHandler.catchErrors(itineraryController.getItinerary));
router.post(
  "/", ErrorHandler.catchErrors(itineraryController.create)
);
router.post(
  "/all", ErrorHandler.catchErrors(itineraryController.createList)
);
router.put(
  "/:id", ErrorHandler.catchErrors(itineraryController.update)
);
router.delete(
  "/:id", ErrorHandler.catchErrors(itineraryController.delete)
);

export default router;
