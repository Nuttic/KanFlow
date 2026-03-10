import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";


@Entity('comments')
export class Comment{
    @PrimaryGeneratedColumn()
        id: number
    @Column()
        creator_id: number
    @Column({length: 200})
        description: string
    @Column()
        task_id: number
    @CreateDateColumn()
        reatedAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;
}