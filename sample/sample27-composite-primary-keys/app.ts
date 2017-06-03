import "reflect-metadata";
import {createConnection, ConnectionOptions} from "../../src/index";
import {Post} from "./entity/Post";

const options: ConnectionOptions = {
    driver: {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "admin",
        database: "test"
    },
    logging: {
        logOnlyFailedQueries: true,
        logFailedQueryError: true
    },
    autoSchemaSync: true,
    entities: [Post]
};

createConnection(options).then(async connection => {

    let postRepository = connection.getRepository(Post);

    const post = new Post();
    post.id = 1;
    post.type = "person";
    post.text = "this is test post!";

    console.log("saving the post: ");
    await postRepository.save(post);
    console.log("Post has been saved: ", post);

    console.log("now loading the post: ");
    const loadedPost = await postRepository.findOneById({ id: 1, type: "person" });
    console.log("loaded post: ", loadedPost);

}, error => console.log("Error: ", error));
