import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, OneToMany} from 'typeorm'

@Entity("artist")
export class Artist {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany((type) => Track, (track) => track.artist, {eager: true})
    tracks: Track[]
}

@Entity("track")
export class Track {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    artist: string

    @Column({
        type: "text",
        nullable: true
    })
    image: string
}
