export interface Flight {
  from: string
  to: string
  requesterIp: string
}

export class ItineraryUtil {
  static sortItinerary(unorderedItinerary: Flight[]): Flight[] {
    const orderedItineraryFlight: Flight[] = []
    let dataSet = ItineraryUtil.unorderedItineraryToFlightSet(unorderedItinerary)

    // To store reverse of given map
    let reversemap = new Map<string, string>()

    // To fill reverse map, iterate through the given map
    for (const [key, value] of dataSet) reversemap.set(value.to, key)

    // Find the starting point of itinerary
    let start = ""

    for (const key of dataSet.keys()) {
      if (!reversemap.has(key)) {
        start = key
        break
      }
    }

    // If we could not find a starting point, then something wrong with input
    if (start.length == 0) {
      return []
    }

    // Once we have starting point, we simple need to go next,
    //next of next using given hash map
    let it = start
    while (dataSet.has(it)) {
      orderedItineraryFlight.push(dataSet.get(it)!)
      // @ts-ignore
      it = dataSet.get(it)?.to
    }

    return orderedItineraryFlight
  }

  static isOrphanFlight(unorderedItineraryLength: number, orderedItineraryFlightLength: number): boolean {
    return unorderedItineraryLength !== orderedItineraryFlightLength
  }

  static unorderedItineraryToFlightSet(unorderedItinerary: Flight[]): Map<string, Flight> {
    let dataSet = new Map<string, Flight>()
    for (let i = 0; i < unorderedItinerary.length; i++) {
      dataSet.set(unorderedItinerary[i].from, unorderedItinerary[i])
    }
    return dataSet
  }
}
