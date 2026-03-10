import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity('collection_access')
export class Collection_access{
    @PrimaryGeneratedColumn()
        id: number
    @Column({default: null})
        user_id: number
    @Column({default: null})
        team_id: number
    @Column()
        collection_id: number
    @Column('json')
        access: any
    @CreateDateColumn()
        reatedAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;
}