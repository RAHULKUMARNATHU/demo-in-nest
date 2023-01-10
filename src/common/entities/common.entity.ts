import { Column, CreateDateColumn, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
    })

    @Generated('uuid')
    uuid: string;

    @CreateDateColumn({
        name: 'created_at',
        type: Date,
    })
    cretaedAt: Date;

    @CreateDateColumn({
        name: 'updated_at',
        type: Date,
    })
    updatedAt: Date;
}
