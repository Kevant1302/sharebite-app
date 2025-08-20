// Author: Kevant Patel
// Date: 2025-08-17
// Description: Code to interact with food listings in PostgreSQL

import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  title: String,
  description: String,
  lat: Number,
  lng: Number,
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Listing || mongoose.model("Listing", ListingSchema);