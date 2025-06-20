import connectDB from "../utils/lib.js";

// SetTime: Initialize a new time record for a doctor with TotalPatient = 0
export const SetTime = async (doctoremail) => {
  if (!doctoremail) {
    throw new Error("Doctor email is required");
  }

  try {
    const db = await connectDB();
    const collection = db.collection("Time");

    const resp = await collection.deleteMany({ doctoremail });
    console.log(resp);

    const currentTime = new Date().toISOString();
    await collection.insertOne({
      doctoremail,
      time: currentTime,
      TotalPatient: 0
    });

    return { message: "Time set successfully" };

  } catch (error) {
    console.error("SetTime Error:", error);
    throw error;
  }
};

// UpdateTotalPatient: Increments TotalPatient by 1 and returns updated values
export const UpdateTotalPatient = async (doctoremail) => {
  if (!doctoremail) {
    throw new Error("Doctor email is required");
  }

  try {
    const db = await connectDB();
    const collection = db.collection("Time");

    const updateResult = await collection.updateOne(
      { doctoremail },
      { $inc: { TotalPatient: 1 } }
    );

    if (updateResult.matchedCount === 0) {
      throw new Error("Doctor not found");
    }

    // Fetch and return the updated document
    const updatedDoc = await collection.findOne({ doctoremail });

    return {
      message: "TotalPatient incremented by 1",
      TotalPatient: updatedDoc.TotalPatient,
      time: updatedDoc.time
    };

  } catch (error) {
    console.error("UpdateTotalPatient Error:", error);
    throw error;
  }
};
