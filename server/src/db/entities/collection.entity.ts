import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";


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
    @Column({default: null})
        user_id: number
    @Column({default: null})
        team_id: number
    @CreateDateColumn()
        reatedAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;
}