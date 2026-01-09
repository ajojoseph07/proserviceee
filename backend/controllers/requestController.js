import { db } from "../config/firebaseAdmin.js";
import { findMatchingSuppliers } from "../services/supplierService.js";
import { sendSupplierMail } from "../services/emailService.js";

export const createRequirement = async (req, res) => {
  try {
    const data = req.body;
    console.log("📩 Incoming data:", data);

    // 1️⃣ Save requirement
    const docRef = await db.collection("requirements").add({
      ...data,
      createdAt: new Date(),
    });

    console.log("✅ Requirement saved:", docRef.id);

    // 2️⃣ Find suppliers (safe)
    const suppliers = await findMatchingSuppliers(
      data.category,
      data.subCategory
    );

    console.log("🔍 Suppliers found:", suppliers.length);

    // 3️⃣ Send emails (NON-BLOCKING)
    suppliers.forEach((supplier) => {
      if (supplier.email) {
        sendSupplierMail(supplier.email, data)
          .catch(err =>
            console.error("📧 Email failed:", err.message)
          );
      }
    });

    // 4️⃣ Respond immediately
    return res.status(200).json({
      success: true,
      message: "Requirement submitted successfully",
    });

  } catch (error) {
    console.error("🔥 createRequirement error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
