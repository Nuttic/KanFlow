import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { User } from "./user.entity";
import { Task } from "./task.entity";


@Entity('comments')
export class Comment{
    @PrimaryGeneratedColumn()
        id: number
    @ManyToOne(() => User, creator => creator.id )
        public creator_ : User
    @Column({length: 200})
        description: string
    @ManyToOne(() => Task, task_id => task_id.id)
    public task_ : Task
    @CreateDateColumn()
        createdAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;
}