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

/**
 * @swagger
 * /media:
 *   post:
 *     summary: Upload media file
 *     tags: [Media]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               uploaded_by:
 *                 type: string
 *                 format: uuid
 *                 example: 11111111-1111-4111-8111-111111111111
 *     responses:
 *       201:
 *         description: Media uploaded successfully
 *       413:
 *         description: Uploaded file is too large
 *       415:
 *         description: Unsupported media type
 *   get:
 *     summary: List media
 *     tags: [Media]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: uploaded_by
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Media fetched successfully
 */

router.post(
  "/",
  upload.single("file"),
  validateBody(uploadMediaBodySchema),
  controller.uploadMedia,
);
router.get("/", validateQuery(listMediaQuerySchema), controller.getMedia);

/**
 * @swagger
 * /media/user/{userId}:
 *   get:
 *     summary: Get media by user ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User media fetched successfully
 *       422:
 *         description: Validation failed
 */

router.get(
  "/user/:userId",
  validateParams(mediaUserIdParamsSchema),
  controller.getMediaByUser,
);

/**
 * @swagger
 * /media/{id}:
 *   get:
 *     summary: Get media by ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Media fetched successfully
 *       404:
 *         description: Media not found
 *   put:
 *     summary: Update media metadata by ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               file_name:
 *                 type: string
 *               file_type:
 *                 type: string
 *               file_size:
 *                 type: number
 *               uploaded_by:
 *                 type: string
 *                 format: uuid
 *                 example: 11111111-1111-4111-8111-111111111111
 *               url:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Media updated successfully
 *       422:
 *         description: Validation failed
 *   delete:
 *     summary: Delete media by ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Media deleted successfully
 *       404:
 *         description: Media not found
 */

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
