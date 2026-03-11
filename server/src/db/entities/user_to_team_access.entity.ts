import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { User } from "./user.entity";
import { Team } from "./team.entity";

@Entity('user_to_team_access')
export class User_to_team_access{
    @PrimaryGeneratedColumn()
        id: number
    @ManyToOne(() => User, user => user.id)
        public user_ : User
    @ManyToOne(() => Team, team => team.id)
        public team_ : Team
    @Column('json')
        access: any
    @CreateDateColumn()
        createdAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;
}