import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";


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
        reatedAt: Date;
    @UpdateDateColumn()
        updatedAt: Date;
}
