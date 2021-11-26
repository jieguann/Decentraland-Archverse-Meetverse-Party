import { PositionType } from "@decentraland/RestrictedActions";
import { connect } from "connection";
// import { SpawnSystem } from "spawnParticles";
import { SpawnBird } from "./birdParticles";
import * as utils from '@dcl/ecs-scene-utils'
import resources from "../resourse";
import { randomInt, isValidKey } from "../utils";

export interface CollidedData{
  x: number;
  y: number;
  z: number;
  sessionId: string;
}

const randomSound = resources.randomSound;

connect("my_room").then((room) => {
  const sendMessageEntity = new Entity()
  // 当前客户端玩家的Id
  const roomSessionId = room.sessionId;
  runSendmessage()
  function runSendmessage() {
    // add a repeated function
    //需要提高吗？
    //every n milliseconds.
    //0.5 second
    sendMessageEntity.addComponent(
      new utils.Interval(100, () => {
        room.send("player-position", Camera.instance.feetPosition);
      })
    )
    // add entity to scene
    engine.addEntity(sendMessageEntity)
  }

  // 客户端有碰撞的所有玩家组的数组
  let collidedPlayers: any = {};
  var initPosition: [] = [];
  Object.defineProperty(collidedPlayers, 'positions', {
    get: function () {
      return initPosition;
    },
    set: function (value) {
      if (value && value.length && JSON.stringify(value) !== JSON.stringify(initPosition)) {
        value.map((position: CollidedData) => {
          //sound clip 随机取一个音效
          let clip = null;
          const randomSoundKeys = Object.keys(randomSound);
          const randmomNum = randomInt(0, randomSoundKeys.length -1);
          const key = randomSoundKeys[randmomNum];
          if(isValidKey(key, randomSound)) {
            clip = randomSound[key];
          }
          playAnimation(position, clip, key);
        })
      }
      initPosition = value;
    }
  })

  // when a player leaves, remove it from the leaderboard.
  room.state.players.onRemove = () => {

  }

  //let distanceFlat:boolean[play] = []
  room.onMessage("PlayerPositionArray", (Player) => {

    let collidedPlayerPositions: CollidedData[] = [];
    let pl = Player.length;
    for (let i = 0; i < pl; i++) {
      let x: number[] = [];
      let y: number[] = [];
      let z: number[] = [];
      let distanceArray: number[] = [];
      for (let j = i + 1; j < pl; j++) {
        x[j] = Player[j].x - Player[i].x;
        y[j] = Player[j].y - Player[i].y;
        z[j] = Player[j].z - Player[i].z;
        distanceArray[j] = Math.sqrt(x[j] * x[j] + y[j] * y[j] + z[j] * z[j]);
        if (distanceArray[j] < 1 && distanceArray[j] > 0.4) {
          collidedPlayerPositions.push({ x: Player[j].x, y: Player[j].y, z: Player[j].z, sessionId: Player[j].clientId })
        }
      }
    }
    collidedPlayers.positions = collidedPlayerPositions;
  })


  room.onLeave((code) => {
    log("onLeave, code =>", code);
  });

  function playAnimation(position: CollidedData, clip: any, playMusiceKey: string) {
    log("Play particles animation!!!!")
    // 碰撞的数组里面，如果有当前用户的话，就把信息传统给服务端进行记录
    if(position.sessionId === roomSessionId) {
      const dateSceond = Date.parse(new Date().toString())/1000;
      room.send("record-timeline", {position: position, music: playMusiceKey, date: dateSceond})
    }
    const pariticlesCount: number = randomInt(10, 20);
    new SpawnBird(position, clip, pariticlesCount);
  }

  //OSC message Control
  function lightingControl(fader: Entity, value: number) {
    var foo: number
    if (value == 0) {
      fader.getComponent(GLTFShape).visible = false
      // fader.addComponentOrReplace(stageLightOff)
    } else if (value > 0 && value <= 1) {
      fader.getComponent(GLTFShape).visible = true
      if (0 < value && value <= 0.25){
        fader.addComponentOrReplace(stageLightBlue)
      } else if (0.3 < value && value <= 0.6) {
        fader.addComponentOrReplace(stageLightGreen)
      } else if (0.6 < value && value <= 0.9) {
        fader.addComponentOrReplace(stageLightRed)
      } else if (0.9 < value && value < 1) {
        fader.addComponentOrReplace(stageLightWhite)
      }
    } else if (value > 1 && value < 2) {
      fader.getComponent(Transform).scale.set((((value - 1.5) * 2 + 1)) * 4,(((value - 1.5) * 2 + 1)) * 4, 1.2)
    } else if (value > 2 && value < 3) {
      foo = fader.getComponent(Transform).rotation.eulerAngles.y
      fader.getComponent(Transform).rotation.setEuler((value - 3.5) * 90 + 120, foo, 0)
    } else if (value > 3 && value < 4) {
      foo = fader.getComponent(Transform).rotation.eulerAngles.x
      fader.getComponent(Transform).rotation.setEuler(foo, (value - 3.5) * 90 + 160 , 0)
    } else if (value == 10){
      fader.addComponentOrReplace(stageLightWhite)
    } else if (value == 11){
      fader.addComponentOrReplace(stageLightBlue)
    } else if (value == 12){
      fader.addComponentOrReplace(stageLightGreen)
    } else if (value == 13){
      fader.addComponentOrReplace(stageLightRed)
    }
  }
  room.state.listen('fader1', (value: number) => {
    lightingControl(fader1, value)
  })

  room.state.listen('fader2', (value: number) => {
    lightingControl(fader2, value)
  })

  room.state.listen('fader3', (value: number) => {
    lightingControl(fader3, value)
  })

  room.state.listen('fader4', (value: number) => {
    lightingControl(fader4, value)
  })

}).catch((err) => {
  error(err);

});

// Stage light models in different colors

const stageLightWhite = new GLTFShape("models/beiwenquan/StageLightWhite.glb")
const stageLightBlue = new GLTFShape("models/beiwenquan/StageLightBlue.glb")
const stageLightGreen = new GLTFShape("models/beiwenquan/StageLightGreen.glb")
const stageLightRed = new GLTFShape("models/beiwenquan/StageLightRed.glb")
// const stageLightOff = new GLTFShape("models/beiwenquan/StageLightOff.glb")


//osc entity being controlled

let fader1 = new Entity()
fader1.addComponent(stageLightWhite)
fader1.addComponent(
  new Transform({
    position: new Vector3(178.43, 55, 148.83),
    rotation: Quaternion.Euler(0, 160, 0)
  })
)
engine.addEntity(fader1)

let fader2 = new Entity()
fader2.addComponent(stageLightWhite)
fader2.addComponent(
  new Transform({
    position: new Vector3(189.75, 55, 152.86),
    rotation: Quaternion.Euler(0, 160, 0)
  })
)
engine.addEntity(fader2)

let fader3 = new Entity()
fader3.addComponent(stageLightWhite)
fader3.addComponent(
  new Transform({
    position: new Vector3(204.13, 55, 158.17),
    rotation: Quaternion.Euler(0, 160, 0)
  })
)
engine.addEntity(fader3)

let fader4 = new Entity()
fader4.addComponent(stageLightWhite)
fader4.addComponent(
  new Transform({
    position: new Vector3(214.5, 55, 162.17),
    rotation: Quaternion.Euler(0, 160, 0)
  })
)
engine.addEntity(fader4)
