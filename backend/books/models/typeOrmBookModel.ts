// typeOrmBookModel
import "reflect-metadata";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity({name: "books"})
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column("varchar")
    name: string;

    @Column("varchar")
    author: string;
}
