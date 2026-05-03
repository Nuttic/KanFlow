import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./user.entity";
import { Team } from "./team.entity";

import { AccessCollection } from "../interface/collection-access";
import { Collection } from "./collection.entity";

@Entity('collection_access')
export class Collection_access {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public user_: User | null

    @ManyToOne(() => Team, team => team.id)
    @JoinColumn({ name: 'team_id' })
    public team_: Team | null

    @ManyToOne(() => Collection)
    @JoinColumn({ name: 'collection_id' })
    public collection_: Collection

    @Column('json')
    access: AccessCollection

    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
}