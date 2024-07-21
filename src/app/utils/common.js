// * ========= STORY ========= *//
/**
 * Upload train schedule
 * After upload sort trains and store them in a state
 * Loop through the platforms
 * For each vacant platform, allot a train based on arrival time and priority
 * Push the train information to platform schedule
 * Assign the plaform number to the train data
 * -------------------------------------------
 * For every minute, update UI with current status of platforms
 * Loop through platforms,
 * If the platform does not have any trains in the schedule matching the current time(time between arr.time and dep.time), mark platform as vacant
 * If there is a train with arr.time matching current time, show arrival animation(if platform was previously empty or had a different train)
 * Then change status to occupied
 * If there is a train with dep.time matching current time, show departure animation
 * Then change status to empty
 * -------------------------------------------
 * For every minute, update UI with current trains, waiting trains, and remaining trains
 * Loop through trains,
 * If train has no delay and has arrival time that matches the current time and a platform number, push them to current trains list
 * If train has a delay but has arrival time that matches the current time and a platform number, push them to waiting trains list
 * If train has a delay but has delayed arrival time that matches the current time and a platform number, push them to current trains list
 * Push the remaining trains to the yet to arrive list
 * ---------------------------------------------
 * Generate report based on a from and to time that filters the trains according to their scheduled times and return the data
 */

// * ========= UI ========= *//
// TODO:  Create CSS variables
// TODO:  Create project title
// TODO:  Create content header UI
// TODO:  Create layout for content
// TODO:  Create platform item
// TODO:  Create simple train item
// TODO:  Create train item for waiting trains and trains yet to arrive

// * ========= FUNCTIONALITY ========= *//
// TODO: Create a state to store trains as an array sorted by arrival time and priority
// TODO: A train object should have, train ID, arrivalTime, delayedArrivalTime, departureTime, delayedDepartureTime, priority, assignedPlatform
// TODO: Create a state for current trains on the platform
// TODO: Create a state for waitingTrains
// TODO: Create a state for trainsYetToArrive
// TODO: Create a state to store platforms as an array
// TODO: A platform object should have, platform number as a string and schedule which would be an array
// TODO: Create a function to delay a train
// TODO: Create a function to allocateTrains
// TODO: Create a function to upload CSV train schedule and store it in browser storage
// TODO: Create a function to generate report between a set timeframe