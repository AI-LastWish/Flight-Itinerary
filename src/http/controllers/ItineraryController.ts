import { Paginator } from "@/database/Paginator";
import { AppDataSource } from "@/database/data-source";
import { Itinerary } from "@/database/entities/Itinerary";
import { ResponseUtil } from "@/utils/Response";
import { Request, Response } from "express";
import { CreateItineraryDTO, UpdateItineraryDTO } from "../dtos/ItineraryDTO";
import { validateOrReject } from "class-validator";
import { Flight, ItineraryUtil } from "@/utils/ItineraryUtil";

export class ItineraryController {
  async getItineraries(req: Request, res: Response) {
    const builder = AppDataSource.getRepository(Itinerary).createQueryBuilder().orderBy("id", "DESC");
    const { records: itinerary, paginationInfo } = await Paginator.paginate(builder, req);
    const itineraryData = itinerary.map((itinerary: Itinerary) => {
      return itinerary.toPayload();
    });
    return ResponseUtil.sendResponse(res, "Fetched itineraries successfully", itineraryData, paginationInfo);
  }

  async getItinerary(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const itinerary = await AppDataSource.getRepository(Itinerary).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtil.sendResponse<Itinerary>(res, "Fetch itinerary successfully", itinerary.toPayload());
  }

  async create(req: Request, res: Response): Promise<Response> {
    const itineraryData = req.body;

    const dto = new CreateItineraryDTO();
    Object.assign(dto, itineraryData);

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Itinerary);
    const itinerary = repo.create(itineraryData);
    await repo.save(itinerary);

    return ResponseUtil.sendResponse(res, "Successfully created new itinerary", itinerary, 200);
  }

  async createList(req: Request, res: Response): Promise<Response> {
    const itineraryDataList: Flight[] = req.body;

    if (!Array.isArray(itineraryDataList)) {
      return ResponseUtil.sendError(res, "Invalid request itinerary list", 404, null)
    }

    const sortedItineraryList = ItineraryUtil.sortItinerary(itineraryDataList);

    if (sortedItineraryList.length == 0) {
      return ResponseUtil.sendError(res, "Invalid itinerary. Invalid input", 404, null)
    }

    if(ItineraryUtil.isOrphanFlight(itineraryDataList.length, sortedItineraryList.length)) {
      return ResponseUtil.sendError(res, "Invalid itinerary. Orphan Flight detected", 404, null)
    }

    for(let i = 0; i < sortedItineraryList.length; i++) {
      const dto = new CreateItineraryDTO();
      const itineraryData = sortedItineraryList[i]
      Object.assign(dto, itineraryData);
  
      await validateOrReject(dto);
  
      const repo = AppDataSource.getRepository(Itinerary);
      const itinerary = repo.create(itineraryData);
      await repo.save(itinerary);
    }

    return ResponseUtil.sendResponse(res, "Successfully created new itinerary list", sortedItineraryList, 200);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const itineraryData = req.body;

    const dto = new UpdateItineraryDTO();
    Object.assign(dto, itineraryData);
    dto.id = parseInt(id);

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(Itinerary);

    const itinerary = await repo.findOneByOrFail({
      id: Number(id),
    });

    repo.merge(itinerary, itineraryData);
    await repo.save(itinerary);
    return ResponseUtil.sendResponse(res, "Successfully updated the itinerary", itinerary.toPayload());
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const repo = AppDataSource.getRepository(Itinerary);
    const itinerary = await repo.findOneByOrFail({
      id: Number(id),
    });
    await repo.remove(itinerary);
    return ResponseUtil.sendResponse(res, "Successfully deleted the itinerary", null);
  }
}