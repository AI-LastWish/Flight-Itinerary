import { ItineraryUtil } from "@/utils/ItineraryUtil"
import chai from "chai"
const expect = chai.expect
import isEqual from "lodash/isEqual"

describe("Test Flight itinerary", () => {
  it("should sort the itinerary in the correct order of the flights", () => {
    const unorderFlight = [
      {
        from: "SFO",
        to: "GRU",
        requesterIp: "172.111.112.113",
      },
      {
        from: "EZE",
        to: "MIA",
        requesterIp: "172.111.112.113",
      },
      {
        from: "MIA",
        to: "SFO",
        requesterIp: "172.111.112.113",
      },
      {
        from: "GRU",
        to: "SCL",
        requesterIp: "172.111.112.113",
      },
    ]
    const orderFlight = [
      {
        from: "EZE",
        to: "MIA",
        requesterIp: "172.111.112.113",
      },
      {
        from: "MIA",
        to: "SFO",
        requesterIp: "172.111.112.113",
      },
      {
        from: "SFO",
        to: "GRU",
        requesterIp: "172.111.112.113",
      },
      {
        from: "GRU",
        to: "SCL",
        requesterIp: "172.111.112.113",
      },
    ]
    const isCorrectOrder = isEqual(ItineraryUtil.sortItinerary(unorderFlight), orderFlight)
    const isOrphanFlight = ItineraryUtil.isOrphanFlight(unorderFlight.length, orderFlight.length)
    expect(isCorrectOrder).to.equal(true)
    expect(isOrphanFlight).to.equal(false)
  })

  it("should return empty array, means Orphan Flight detected", () => {
    const unorderFlight = [
      {
        from: "SFO",
        to: "GRU",
        requesterIp: "172.111.112.113",
      },
      {
        from: "EZE",
        to: "MIA",
        requesterIp: "172.111.112.113",
      },
      {
        from: "GRU",
        to: "SCL",
        requesterIp: "172.111.112.113",
      },
    ]
    const orderFlight = ItineraryUtil.sortItinerary(unorderFlight)
    const isOrphanFlight = ItineraryUtil.isOrphanFlight(unorderFlight.length, orderFlight.length)
    expect(isOrphanFlight).to.equal(true)
  })
})
