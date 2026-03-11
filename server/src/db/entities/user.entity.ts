import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Comment } from "./comment.entity";
import { Collection } from "./collection.entity";
import { User_to_team_access } from "./user_to_team_access.entity";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100, unique: true})
        name: string
    @Column({unique: true})
        email: string
    @Column()
        password: string
    @CreateDateColumn()
        createdAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;


    @OneToMany(() => Comment, comment => comment.creator_)
    comment_relation : User

    @OneToMany(() => User_to_team_access, user_to_team => user_to_team.user_)
    public user_to_team : User_to_team_access
}
