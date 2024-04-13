import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, OneToMany} from 'typeorm'

@Entity("artist")
export class Artist {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}

@Entity("track")
export class Track {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToOne(() => Artist, (artist) => artist.name, {eager: true})
    artist_id: Artist
}
