// Author: Kevant Patel
// Date: 2025-08-17
// Description: API route for managing food listings

import dbConnect from "../../utils/dbConnect";
import Listing from "../../models/Listing";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "GET": {
      const listings = await Listing.find({}).sort({ created_at: -1 });
      return res.status(200).json(listings);
    }

    case "POST": {
      try {
        const { title, description, lat, lng } = req.body || {};
        if (!title || !lat || !lng) {
          return res.status(400).json({ error: "title, lat, and lng are required" });
        }
        const newListing = await Listing.create({
          title,
          description: description || "",
          lat: Number(lat),
          lng: Number(lng),
        });
        return res.status(201).json(newListing);
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Failed to create listing" });
      }
    }

    case "PUT": {
      try {
        const { id, title, description } = req.body;
        if (!id || !title) return res.status(400).json({ error: "id and title required" });

        const updated = await Listing.findByIdAndUpdate(
          id,
          { title, description },
          { new: true }
        );
        return res.status(200).json(updated);
      } catch (e) {
        return res.status(500).json({ error: "Failed to update listing" });
      }
    }

    case "DELETE": {
      try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: "id required" });

        await Listing.findByIdAndDelete(id);
        return res.status(204).end();
      } catch (e) {
        return res.status(500).json({ error: "Failed to delete listing" });
      }
    }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
