import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";

/**
 * Import your Room files
 */
import { MyRoom,ArrayPlayersPosition } from "./rooms/MyRoom";
import DB from './db';

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('my_room', MyRoom);

    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req, res) => {
            res.send(ArrayPlayersPosition);
            //res.send("ArrayPlayersPosition");
        });

        app.get("/db", async (req, res) => {
            try {
                let response: any = [];
                await DB.get().then((queryResult: {docs: any}) => {
                    for(let doc of queryResult.docs) {
                        response.push(doc.data());
                    }
                })
                return res.status(200).send(response);
            } catch(error) {
                console.log(error);
                return res.status(500).send(error);
            }
        })

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/colyseus", monitor());
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});