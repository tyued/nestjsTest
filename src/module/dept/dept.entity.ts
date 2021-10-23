import { Column, Entity,PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity({name:'dept'})
export class DeptEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    num: number;

    @Column()
    name: string;
}