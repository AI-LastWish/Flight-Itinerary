import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IsUnique } from "../validators/IsUniqueValidator";
import { Itinerary } from "./../../database/entities/Itinerary";

export class CreateItineraryDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  from: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsUnique(Itinerary, "to")
  to: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(255)
  requesterIp: string;
}

export class UpdateItineraryDTO {
  id?: number;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  from: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsUnique(Itinerary, "to")
  to: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  @MaxLength(255)
  requesterIp: string;
}