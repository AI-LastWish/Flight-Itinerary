import { DBTable } from "../../constants/DBTable";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity(DBTable.ITINERARY)
export class Itinerary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  from: string;

  @Column({ unique: true, nullable: false })
  to: string;

  @Column({ nullable: false })
  requesterIp: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toPayload(): Itinerary {
    return {
      id: this.id,
      from: this.from,
      to: this.to,
      createdAt: this.createdAt,
      requesterIp: this.requesterIp,
      updatedAt: this.updatedAt,
    } as Itinerary;
  }
}