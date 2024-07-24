import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export const delayTrain = (train, trainList, saveTrainList, status) => {
  return (delayMinutes = 5) => {
    if (delayMinutes == 0) return;
    const clonedTrain = { ...train };
    dayjs.extend(customParseFormat);

    const arrival = dayjs(clonedTrain.arrivalTime, "HH:mm");
    const newArrTime = arrival
      .add(Number(delayMinutes), "minutes")
      .format("HH:mm");

    const departure = dayjs(clonedTrain.departureTime, "HH:mm");
    const newDepTime = departure
      .add(Number(delayMinutes), "minutes")
      .format("HH:mm");

    const updated = trainList.map((train) => {
      if (train.id === clonedTrain.id) {
        return {
          ...train,
          scheduledArrivalTime: clonedTrain.arrivalTime,
          arrivalTime: newArrTime,
          scheduledDepartureTime: clonedTrain.departureTime,
          departureTime: newDepTime,
          status: status,
        };
      }
      return train;
    });
    localStorage.setItem("trains", JSON.stringify(updated));
    saveTrainList(updated);
  };
};
