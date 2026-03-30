import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 3005;

connectDB();

app.listen(PORT, () => {
  console.log(`Subscription Service running on port ${PORT}`);
});
