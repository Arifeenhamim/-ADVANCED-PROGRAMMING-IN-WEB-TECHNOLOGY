import { MigrationInterface, QueryRunner, Table } from "typeorm";



export class CreateUserTable1775500022201 implements MigrationInterface{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name:"users",
                    columns:[

                        {
                            name:"id",
                            type:"uuid",
                            isPrimary: true,
                            generationStrategy:"uuid",
                            default:"uuid_generate_v4()",
                        },
                        {
                            name:"name",
                            type:"varchar",
                            isNullable:false,
                        },

                         {
                            name:"email",
                            type:"varchar",
                            isNullable:false,
                        },
                         {
                            name:"password",
                            type:"varchar",
                            isNullable:false,
                        },
                         {
                            name:"created_at",
                            type:"timestamp",
                            default:"CURRENT_TIMESTAMP(6)"
                        },
                         {
                            name:"updated_at",
                            type:"timestamp",
                            default:"CURRENT_TIMESTAMP(6)"
                        },

                    ],
                } ),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}