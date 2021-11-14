/*
方案一：
不行-物体附在玩家身上，用trigger去触发。

方案二：
实时把array发送到客户端
*/

import { Room, Client } from "colyseus";
import { MyRoomState, Player, PlayersPosition } from "./schema/MyRoomState";
import DB from '../db';

//let midPlayer
export let ArrayPlayersPosition: any[] = []
//let ArrayPlayersPosition2:any[] = []



export class MyRoom extends Room<MyRoomState> {

  onCreate(options: any) {
    this.setState(new MyRoomState());
    this.onMessage("player-position", (client: Client, playerPosition: any) => {
      // set player new position
      const player = this.state.players.get(client.sessionId);
      const playersPosition = new PlayersPosition();
      playersPosition.x = playerPosition.x;

      playersPosition.y = playerPosition.y,
        playersPosition.z = playerPosition.z,
        this.state.playersPosition.push(
          playersPosition
        );

      for (let i = 0; i < ArrayPlayersPosition.length; i++) {
        if (ArrayPlayersPosition[i].clientId == client.sessionId) {
          //Upadat Players position
          ArrayPlayersPosition[i].x = playersPosition.x;
          ArrayPlayersPosition[i].y = playersPosition.y;
          ArrayPlayersPosition[i].z = playersPosition.z;
          //this.broadcast(ArrayPlayersPosition);

        }
      }
      this.broadcast("PlayerPositionArray", ArrayPlayersPosition);
    });

    this.onMessage("record-timeline", (client: Client, recordInfo: any = {}) => {
      let { date, music, position } = recordInfo;
      position = position ? JSON.stringify(position, ['x', 'y', 'z', 'sessionId']) : "";
      DB.run(`insert into timeline(date, music, position) values("${date}", "${music}", '${position}')`, function (err: any) {
        if(err) {
          console.log(err);
        }
      })
    });

    //get osc message
    this.onMessage('change', (client, message) => {
      switch (message.address) {
        case '/fader1':
          this.state.fader1 = message.value
          this.presence.publish('/fader1', { value: message.value })
          //console.log(message.value);

          break
        case '/fader2':
          this.state.fader2 = message.value
          this.presence.publish('/fader2', { value: message.value })
          break
        case '/fader3':
          this.state.fader3 = message.value
          this.presence.publish('/fader3', { value: message.value })
          break
        case '/fader4':
          this.state.fader4 = message.value
          this.presence.publish('/fader4', { value: message.value })
          break
      }
    })

    // Get changes from other rooms
    this.presence.subscribe('/fader1', (message: any) => {
      this.state.fader1 = message.value
      //console.log(this.state.fader1)
    })


    this.presence.subscribe('/fader2', (message: any) => {
      this.state.fader2 = message.value
    })

    this.presence.subscribe('/fader3', (message: any) => {
      this.state.fader3 = message.value
    })

    this.presence.subscribe('/fader4', (message: any) => {
      this.state.fader4 = message.value
    })
  }

  onJoin(client: Client, options: any) {
    //PUsh json
    const clientId = client.sessionId;
    ArrayPlayersPosition.push({ clientId: clientId, x: 0, y: 0, z: 0 })
  }

  onLeave(client: Client, consented: boolean) {
    const player = this.state.players.get(client.sessionId);
    //console.log(player.name, "left!");

    this.state.players.delete(client.sessionId);

    for (let i = 0; i < ArrayPlayersPosition.length; i++) {
      if (ArrayPlayersPosition[i].clientId == client.sessionId) {
        ArrayPlayersPosition.splice(i, 1);

      }
    }
  }

  onDispose() {
    console.log("Disposing room...");
  }

}
