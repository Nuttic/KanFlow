import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { User } from "./user.entity";
import { Team } from "./team.entity";

@Entity('collection_access')
export class Collection_access{
    @PrimaryGeneratedColumn()
        id: number
    @ManyToOne(() => User, user => user.id)
        public user_ : User

    @ManyToOne(() => Team, team => team.id)
        public team_ : Team
    @Column()
        collection_id: number
    @Column('json')
        access: any
    @CreateDateColumn()
        createdAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;
}