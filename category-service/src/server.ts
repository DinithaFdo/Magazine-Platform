import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 3003;

connectDB();

app.listen(PORT, () => {
  console.log(`Category Service running on port ${PORT}`);
});
