import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 3006;

connectDB();

app.listen(PORT, () => {
  console.log(`Media Service running on port ${PORT}`);
});
