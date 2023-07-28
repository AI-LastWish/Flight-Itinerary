import { DBTable } from "../../constants/DBTable";
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateItineraryTable1690450451973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DBTable.ITINERARY,
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "from",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "to",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "requesterIp",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "createdAt",
            type: "datetime",
            default: "now()",
            isNullable: true,
          },
          {
            name: "updatedAt",
            type: "datetime",
            default: "now()",
            isNullable: true,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
