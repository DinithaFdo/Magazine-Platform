import express from "express";
import multer from "multer";
import * as controller from "../controllers/media.controller";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../middleware/validation.middleware";
import {
  listMediaQuerySchema,
  mediaIdParamsSchema,
  mediaUserIdParamsSchema,
  updateMediaBodySchema,
  uploadMediaBodySchema,
} from "../validators/media.validator";

const router = express.Router();
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
]);

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      return cb(new Error("Unsupported file type"));
    }

    cb(null, true);
  },
});

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Media management APIs
 */

router.post(
  "/",
  upload.single("file"),
  validateBody(uploadMediaBodySchema),
  controller.uploadMedia,
);
router.get("/", validateQuery(listMediaQuerySchema), controller.getMedia);
router.get(
  "/user/:userId",
  validateParams(mediaUserIdParamsSchema),
  controller.getMediaByUser,
);
router.get(
  "/:id",
  validateParams(mediaIdParamsSchema),
  controller.getMediaById,
);
router.put(
  "/:id",
  validateParams(mediaIdParamsSchema),
  validateBody(updateMediaBodySchema),
  controller.updateMedia,
);
router.delete(
  "/:id",
  validateParams(mediaIdParamsSchema),
  controller.deleteMedia,
);

export default router;
