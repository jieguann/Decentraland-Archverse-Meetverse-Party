"use strict";
/*
方案一：
不行-物体附在玩家身上，用trigger去触发。

方案二：
实时把array发送到客户端
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = exports.ArrayPlayersPosition = void 0;
const colyseus_1 = require("colyseus");
const MyRoomState_1 = require("./schema/MyRoomState");
// import DB from '../db';
//let midPlayer
exports.ArrayPlayersPosition = [];
//let ArrayPlayersPosition2:any[] = []
class MyRoom extends colyseus_1.Room {
    onCreate(options) {
        this.setState(new MyRoomState_1.MyRoomState());
        this.onMessage("player-position", (client, playerPosition) => {
            // set player new position
            const player = this.state.players.get(client.sessionId);
            const playersPosition = new MyRoomState_1.PlayersPosition();
            playersPosition.x = playerPosition.x;
            playersPosition.y = playerPosition.y,
                playersPosition.z = playerPosition.z,
                this.state.playersPosition.push(playersPosition);
            for (let i = 0; i < exports.ArrayPlayersPosition.length; i++) {
                if (exports.ArrayPlayersPosition[i].clientId == client.sessionId) {
                    //Upadat Players position
                    exports.ArrayPlayersPosition[i].x = playersPosition.x;
                    exports.ArrayPlayersPosition[i].y = playersPosition.y;
                    exports.ArrayPlayersPosition[i].z = playersPosition.z;
                    //this.broadcast(ArrayPlayersPosition);
                }
            }
            this.broadcast("PlayerPositionArray", exports.ArrayPlayersPosition);
        });
        this.onMessage("record-timeline", (client, recordInfo = {}) => {
            let { date, music, position } = recordInfo;
            position = position ? JSON.stringify(position, ['x', 'y', 'z', 'sessionId']) : "";
            // DB.run(`insert into timeline(date, music, position) values("${date}", "${music}", '${position}')`, function (err: any) {
            //   if(err) {
            //     console.log(err);
            //   }
            // })
        });
        //get osc message
        this.onMessage('change', (client, message) => {
            switch (message.address) {
                case '/fader1':
                    this.state.fader1 = message.value;
                    this.presence.publish('/fader1', { value: message.value });
                    //console.log(message.value);
                    break;
                case '/fader2':
                    this.state.fader2 = message.value;
                    this.presence.publish('/fader2', { value: message.value });
                    break;
                case '/fader3':
                    this.state.fader3 = message.value;
                    this.presence.publish('/fader3', { value: message.value });
                    break;
                case '/fader4':
                    this.state.fader4 = message.value;
                    this.presence.publish('/fader4', { value: message.value });
                    break;
            }
        });
        // Get changes from other rooms
        this.presence.subscribe('/fader1', (message) => {
            this.state.fader1 = message.value;
            //console.log(this.state.fader1)
        });
        this.presence.subscribe('/fader2', (message) => {
            this.state.fader2 = message.value;
        });
        this.presence.subscribe('/fader3', (message) => {
            this.state.fader3 = message.value;
        });
        this.presence.subscribe('/fader4', (message) => {
            this.state.fader4 = message.value;
        });
    }
    onJoin(client, options) {
        //PUsh json
        const clientId = client.sessionId;
        exports.ArrayPlayersPosition.push({ clientId: clientId, x: 0, y: 0, z: 0 });
    }
    onLeave(client, consented) {
        const player = this.state.players.get(client.sessionId);
        //console.log(player.name, "left!");
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
