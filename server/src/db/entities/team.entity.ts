import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { User_to_team_access } from "./user_to_team_access.entity";

@Entity('team')
export class Team{
    @PrimaryGeneratedColumn()
        id: number
    @Column({length: 30})
        team_name: string
    @CreateDateColumn()
        createdAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;

    @OneToMany(() => User_to_team_access, user_to_team => user_to_team.team_)
    public user_to_team: User_to_team_access
}