"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = exports.ArrayPlayersPosition = void 0;
const colyseus_1 = require("colyseus");
const MyRoomState_1 = require("./schema/MyRoomState");
const ROUND_DURATION = 60 * 3;
// const ROUND_DURATION = 30;
// const MAX_BLOCK_HEIGHT = 5;
const MAX_BLOCK_HEIGHT = 19;
//完成测试
//flat for the distance
let distanceFlat = true;
//let midPlayer
exports.ArrayPlayersPosition = [];
class MyRoom extends colyseus_1.Room {
    onCreate(options) {
        this.setState(new MyRoomState_1.MyRoomState());
        this.onMessage("player-position", (client, playerPosition) => {
            // set player new position
            const player = this.state.players.get(client.sessionId);
            /*
            player.x = playerPosition.x;
            player.y = playerPosition.y;
            player.z = playerPosition.y;
            */
            //console.log(playerPosition.x);
            const playersPosition = new MyRoomState_1.PlayersPosition();
            playersPosition.x = playerPosition.x;
            playersPosition.y = playerPosition.y,
                playersPosition.z = playerPosition.z,
                this.state.playersPosition.push(playersPosition);
            //let PositionToAdd = {:0}
            //console.log({playersPosition})
            //console.log(client.sessionId);
            //let distance:any[] = []
            //Flat for the event
            for (let i = 0; i < exports.ArrayPlayersPosition.length; i++) {
                if (exports.ArrayPlayersPosition[i].clientId == client.sessionId) {
                    //Upadat Players position
                    exports.ArrayPlayersPosition[i].x = playersPosition.x;
                    exports.ArrayPlayersPosition[i].y = playersPosition.y;
                    exports.ArrayPlayersPosition[i].z = playersPosition.z;
                }
                let distance;
                let player1;
                let player2;
                //caculate the distance between players
                for (let i = 1; i < exports.ArrayPlayersPosition.length; i++) {
                    player1 = exports.ArrayPlayersPosition[i - 1];
                    player2 = exports.ArrayPlayersPosition[i];
                    let x = player1.x - player2.x;
                    let y = player1.y - player2.y;
                    let z = player1.z - player2.z;
                    distance = Math.sqrt(x * x + y * y + z * z);
                    //middle of the Player 1 and 2
                    let midPlayer = [(player1.x + player2.x) / 2, (player1.y + player2.y) / 2, (player1.z + player2.z) / 2];
                    if (distance < 1 && distanceFlat == true) {
                        console.log(midPlayer);
                        this.broadcast("midPlayer", midPlayer);
                        distanceFlat = false;
                    }
                    else if (distance > 1.5) {
                        distanceFlat = true;
                    }
                }
            }
        });
        this.onMessage("fall", (client, atPosition) => {
            this.broadcast("fall", atPosition);
        });
    }
    onJoin(client, options) {
        const newPlayer = new MyRoomState_1.Player().assign({
            name: options.userData.displayName || "Anonymous",
        });
        this.state.players.set(client.sessionId, newPlayer);
        //let clientID = client.sessionId;
        //ArrayPlayersPosition.push(1)
        console.log(newPlayer.name, "joined! => ", options.userData);
        const displayName = newPlayer.name;
        //PUsh json
        const clientId = client.sessionId;
        exports.ArrayPlayersPosition.push({ clientId: clientId, x: 0, y: 0, z: 0 });
        //JSONPlayersPosition = {clientId2:{x:0,y:0,z:0}};
        //console.log(JSONPlayersPosition)
    }
    onLeave(client, consented) {
        const player = this.state.players.get(client.sessionId);
        console.log(player.name, "left!");
        this.state.players.delete(client.sessionId);
        for (let i = 0; i < exports.ArrayPlayersPosition.length; i++) {
            if (exports.ArrayPlayersPosition[i].clientId == client.sessionId) {
                exports.ArrayPlayersPosition.splice(i, 1);
            }
        }
    }
    onDispose() {
        console.log("Disposing room...");
    }
}
exports.MyRoom = MyRoom;
