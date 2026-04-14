import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne} from "typeorm";
import { User } from "./user.entity";
import { Team } from "./team.entity";


export enum Type{
    BOARD = 'Board',
    SET = 'Set',
    TREE = 'Tree'
}

@Entity('collections')
export class Collection{
    @PrimaryGeneratedColumn()
        id: number
    @Column({
        type: 'enum',
        enum: Type,
        default: Type.BOARD})
    type: Type

    @Column({length: 100})
        title: string
    @Column({length: 400})
        description: string

    @ManyToOne(() => Team, team => team.id, {nullable:true})
        public team_ : Team | null
    @ManyToOne(() => User, user => user.id, {nullable:true })
        public user_ : User | null

    @CreateDateColumn()
        createdAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;
}