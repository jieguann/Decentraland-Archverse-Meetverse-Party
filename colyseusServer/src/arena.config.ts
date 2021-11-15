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

        app.get("/db", (req, res) => {

            const date = "1232323";
            const music = "fasfasf";
            let position : any = {x:1.00111, y:2.2432, z: 3.325325, sessionId: "fdsafas"};
            position = JSON.stringify(position, ["x", "y", "z", "sessionId"]);
            DB.run(`insert into timeline(date, music, position) values("${date}", "${music}", '${position}')`, function (err: any) {
                if(err) {
                  console.log(err);
                }
            })

            DB.all("select * from timeline", function (err: any, result: any) {
                if (!err) {
                    res.send(JSON.stringify(result));
                } else {
                    console.log(err);
                }
            });
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