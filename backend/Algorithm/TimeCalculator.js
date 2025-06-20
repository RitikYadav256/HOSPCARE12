export const calculateEstimatedTime = (startTimeISO, totalPatientsAttended, myNumber) => {
  if (totalPatientsAttended <= 0 || myNumber <= 0) {
    throw new Error("Invalid patient count or number");
  }

  const startTime = new Date(startTimeISO);
  const currentTime = new Date();
  console.log(startTime);
  // Calculate time spent so far in milliseconds
  const timeSpent = currentTime - startTime;

  // Average time per patient in milliseconds
  const avgTimePerPatient = timeSpent / totalPatientsAttended;
  // Estimated time for your turn
  const estimatedTime = new Date(startTime.getTime() + avgTimePerPatient * myNumber);

  return estimatedTime.toISOString(); 
};
