export const delayTrain = (train, trainList, saveTrainList, status) => {
    return (delayMinutes = 5) => {
      // Convert the arrival time string to a Date object
      const [arrivalHours, arrivalMinutes] = clonedTrain.arrivalTime
        .split(":")
        .map(Number);
      const arrivalDate = new Date();
      arrivalDate.setHours(arrivalHours, arrivalMinutes, 0, 0);
      // Add delayMinutes to the arrival time
      arrivalDate.setMinutes(arrivalDate.getMinutes() + delayMinutes);
      // Format the new time as a string in HH:MM format
      const newArrHours = arrivalDate.getHours().toString().padStart(2, "0");
      const newArrMinutes = arrivalDate.getMinutes().toString().padStart(2, "0");
      const newArrTime = `${newArrHours}:${newArrMinutes}`;
  
      const [departureHours, departureMinutes] = clonedTrain.departureTime
        .split(":")
        .map(Number);
      const departureDate = new Date();
      departureDate.setHours(departureHours, departureMinutes, 0, 0);
      // Add delayMinutes to the departure time
      departureDate.setMinutes(departureDate.getMinutes() + delayMinutes);
      // Format the new time as a string in HH:MM format
      const newDepHours = departureDate.getHours().toString().padStart(2, "0");
      const newDepMinutes = departureDate
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const newDepTime = `${newDepHours}:${newDepMinutes}`;
      const updated = trainList.map((train) => ({
        ...train,
        scheduledArrivalTime: train.arrivalTime,
        arrivalTime: newArrTime,
        scheduledDepartureTime: train.departureTime,
        departureTime: newDepTime,
        list: status
      }));
      saveTrainList(updated);
    };
  };
  