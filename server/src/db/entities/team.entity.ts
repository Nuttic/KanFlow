import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity('team')
export class Team{
    @PrimaryGeneratedColumn()
        id: number
    @Column({length: 30})
        team_name: string
    @CreateDateColumn()
        reatedAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;
}