import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity('user_to_team_access')
export class User_to_team_access{
    @PrimaryGeneratedColumn()
        id: number
    @Column()
        user_id: number
    @Column()
        team_id: number
    @Column('json')
        access: any
    @CreateDateColumn()
        reatedAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;
}