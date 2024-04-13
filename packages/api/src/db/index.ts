import {DataSource } from "typeorm"
import {Artist, Track} from './entities'
import path from "node:path";


const AppDataSource = new DataSource({
    type: "sqlite",
    database: path.join(__dirname, 'db.sqlite3'),
    entities: [Track, Artist],
    synchronize: true
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        console.log(`Connected to: ${AppDataSource.driver.database}`)
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export { AppDataSource, Artist, Track} ;
