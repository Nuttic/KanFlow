import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Task_tag } from "./task_tag.entity";
import { Tag } from "./tag.entity";
import { table } from "console";

export enum Status{
    BACKLOG = 'Backlog',
    TODO = 'To Do',
    PROCESS = 'In Process',
    REVIEW = 'In Review',
    DONE = 'Done'
}
export enum Difficult{ 
    HIGH = 'High',
    MEDIUM = 'Medium',
    EASY = 'Easy'
}

@Entity('tasks')
export class Task{
    @PrimaryGeneratedColumn()
        id: number
    @Column({length: 100})
        title: string
    @Column({length: 400})
        description: string
    @Column({
        type: 'enum',
        enum: Status,
        default: Status.BACKLOG
    })
    status: Status
    @Column({
        type: 'enum',
        enum: Difficult,
        default: Difficult.EASY
    })
    difficult_level: Difficult
    @Column()
        creator_id: number
    @Column()
        executer_id: number
    @Column()
        collection_id: number
    @CreateDateColumn()
        reatedAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;

    @OneToMany(() => Task_tag, task_tag => task_tag.task_)
    public task_tag: Task_tag[]
}