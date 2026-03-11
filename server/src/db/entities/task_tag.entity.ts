import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { Tag } from "./tag.entity";
import { Task } from "./task.entity";

@Entity('task_tags')
export class Task_tag{
    @PrimaryGeneratedColumn()
        id: number
    @ManyToOne(() => Task,(tusk) => tusk.task_tag, )
    public task_ : Task

    @ManyToOne(() => Tag, (tag) => tag.task_tag)
    public tag_: Tag

    @CreateDateColumn()
        createdAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;
}