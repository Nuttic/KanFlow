import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne} from "typeorm";
import { User } from "./user.entity";
import { Team } from "./team.entity";
import { Collection_access } from "./collection_access.entity";


export enum Type{
    BOARD = 'Board',
    SET = 'Set',
    TREE = 'Tree'
}

export enum Color{
    BLUE = 'blue',
    PURPLE = 'purple',
    GREEN = 'green',
    ORANGE = 'orange',
    PINK = 'pink',
    GRAY = 'gray'
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
        
    @Column({
        type: 'enum',
        enum: Color,
        default: Color.BLUE})
    color: Color

    @ManyToOne(() => Team, team => team.id, {nullable:true})
        public team_ : Team | null
    @ManyToOne(() => User, user => user.id, {nullable:true })
        public user_ : User | null
    @OneToMany(() => Collection_access, (access) => access.collection_)
    accesses: Collection_access[];
    @CreateDateColumn()
        createdAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;
}