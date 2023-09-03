import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1693701312527 implements MigrationInterface {
  name = 'Migration1693701312527';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "process" ("id" SERIAL NOT NULL, "codigoLicitacao" integer NOT NULL, "identificacao" character varying NOT NULL, "numero" character varying NOT NULL, "resumo" character varying NOT NULL, "codigoSituacaoEdital" integer NOT NULL, "codigoStatus" integer NOT NULL, "dataHoraInicioLances" TIMESTAMP NOT NULL, CONSTRAINT "PK_d5e3ab0f6df55ee74ca24967952" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "item" ("id" SERIAL NOT NULL, "quantidade" double precision NOT NULL, "valorReferencia" double precision NOT NULL, "descricao" character varying NOT NULL, "codigoParticipacao" integer NOT NULL, "codigo" integer NOT NULL, "processId" integer NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_2b93e9874b2581622077e1a0728" FOREIGN KEY ("processId") REFERENCES "process"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item" DROP CONSTRAINT "FK_2b93e9874b2581622077e1a0728"`,
    );
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TABLE "process"`);
  }
}
