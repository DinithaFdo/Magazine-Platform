import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 3004;

connectDB();

app.listen(PORT, () => {
  console.log(`Comment Service running on port ${PORT}`);
});
