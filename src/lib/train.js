import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
// import add from "dayjs/plugin/add";
// import format from "dayjs/plugin/format";

export const delayTrain = (train, trainList, saveTrainList, status) => {
  return (delayMinutes = 5) => {
    if (delayMinutes == 0) return;
    const clonedTrain = {...train};
    dayjs.extend(customParseFormat);
    
    const arrival = dayjs(clonedTrain.arrivalTime, "HH:mm");
    const newArrTime = arrival.add(Number(delayMinutes), 'minutes').format( "HH:mm");
    
    const departure = dayjs(clonedTrain.departureTime, "HH:mm");
    const newDepTime = departure.add(Number(delayMinutes), 'minutes').format( "HH:mm");

    const updated = trainList.map((train) => ({
      ...train,
      scheduledArrivalTime: clonedTrain.arrivalTime,
      arrivalTime: newArrTime,
      scheduledDepartureTime: clonedTrain.departureTime,
      departureTime: newDepTime,
      list: status,
    }));
    saveTrainList(updated);
  };
};
