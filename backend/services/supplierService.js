import { db } from "../config/firebaseAdmin.js";

export const findMatchingSuppliers = async (category, subCategory) => {
  try {
    if (!category || !subCategory) return [];

    const snapshot = await db
      .collection("shops")
      .where("category", "==", category)
      .where("subCategory", "==", subCategory)
      .get();

    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => doc.data());

  } catch (error) {
    console.error("❌ findMatchingSuppliers error:", error.message);
    return []; // NEVER throw
  }
};
