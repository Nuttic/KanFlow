import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne} from "typeorm";
import { Task_tag } from "./task_tag.entity";


@Entity('tag')
export class Tag{
    @PrimaryGeneratedColumn()
        id: number
    @Column({length: 100})
        title: string
    @CreateDateColumn()
        reatedAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;

    @OneToMany(() => Task_tag, task_tag => task_tag.tag_)
    public task_tag : Task_tag
}