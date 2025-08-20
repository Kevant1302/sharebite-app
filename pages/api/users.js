import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const users = await User.find({}).select("name email image -_id").lean();
    return res.status(200).json(users);
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).end();
}