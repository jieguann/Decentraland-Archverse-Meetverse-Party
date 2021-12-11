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
    const pariticlesCount: number = randomInt(4, 8);
    new SpawnBird(position, clip, pariticlesCount);
  }

  //OSC message Control
  function lightingControl(fader: Entity, value: number, y: number) {
    var foo: number
    if (value == 0) {
      fader.getComponent(GLTFShape).visible = false
      // fader.addComponentOrReplace(stageLightOff)
    } else if (value > 0 && value < 1) {
      if (0 < value && value <= 0.25){
        fader.addComponentOrReplace(stageLightBlue)
      } else if (0.3 < value && value <= 0.6) {
        fader.addComponentOrReplace(stageLightGreen)
      } else if (0.6 < value && value <= 0.9) {
        fader.addComponentOrReplace(stageLightRed)
      } else if (0.9 < value && value < 1) {
        fader.addComponentOrReplace(stageLightWhite)
      }
    } else if (value == 1){
      fader.getComponent(GLTFShape).visible = true
    } else if (value > 1 && value < 2) {
      fader.getComponent(Transform).scale.set((((value - 1.5) * 2 + 1)) * 3,(((value - 1.5) * 2 + 1)) * 3, ((2 - value) * 1 + 1))
    } else if (value > 2 && value < 3) {
      foo = fader.getComponent(Transform).rotation.eulerAngles.y
      fader.getComponent(Transform).rotation.setEuler((value - 3.5) * 90 + 100, foo, 0)
    } else if (value > 3 && value < 4) {
      foo = fader.getComponent(Transform).rotation.eulerAngles.x
      fader.getComponent(Transform).rotation.setEuler(foo, (value - 3.5) * 120 + 230 , 0)
    } else if (4 <= value && value <= 5){
      fader.getComponent(Transform).position.y = y - ((value - 4) * 10.5 )
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
    lightingControl(fader1, value, 23)
    lightingControl(fader11, value, 5.5)
  })

  room.state.listen('fader2', (value: number) => {
    lightingControl(fader2, value, 23)
    lightingControl(fader12, value, 12.6)
  })

  room.state.listen('fader3', (value: number) => {
    lightingControl(fader3, value, 23)
    lightingControl(fader13, value, 12.6)
  })

  room.state.listen('fader4', (value: number) => {
    lightingControl(fader4, value, 23)
    lightingControl(fader14, value, 5.5)
  })

}).catch((err) => {
  error(err);

});

// Stage light models in different colors

const stageLightWhite = new GLTFShape("models/beiwenquan/StageLightWhite.glb")
const stageLightBlue = new GLTFShape("models/beiwenquan/StageLightBlue.glb")
const stageLightGreen = new GLTFShape("models/beiwenquan/StageLightGreen.glb")
const stageLightRed = new GLTFShape("models/beiwenquan/StageLightRed.glb")
const stageLightOff = new GLTFShape("models/beiwenquan/StageLightOff.glb")


//osc entity being controlled

let fader1 = new Entity()
fader1.addComponent(stageLightWhite)
fader1.addComponent(
  new Transform({
    position: new Vector3(301.91, 23, 105.55),
    rotation: Quaternion.Euler(0, 160, 0)
  })
)
engine.addEntity(fader1)

let fader2 = new Entity()
fader2.addComponent(stageLightWhite)
fader2.addComponent(
  new Transform({
    position: new Vector3(323.15, 23.193, 99.283),
    rotation: Quaternion.Euler(0, 160, 0)
  })
)
engine.addEntity(fader2)

let fader3 = new Entity()
fader3.addComponent(stageLightWhite)
fader3.addComponent(
  new Transform({
    position: new Vector3(337.55, 23, 81.698),
    rotation: Quaternion.Euler(0, 160, 0)
  })
)
engine.addEntity(fader3)

let fader4 = new Entity()
fader4.addComponent(stageLightWhite)
fader4.addComponent(
  new Transform({
    position: new Vector3(339.5, 23, 59.672),
    rotation: Quaternion.Euler(0, 160, 0)
  })
)
engine.addEntity(fader4)


let fader11Parent = new Entity()
fader11Parent.addComponent(
  new Transform({
    position: new Vector3(293.96, 5.5, 75.047),
    rotation: Quaternion.Euler(120, 0, 90)
  })
)
engine.addEntity(fader11Parent)
let fader11 = new Entity()
fader11.addComponent(stageLightWhite)
fader11.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 0, 0)
  })
)
fader11.setParent(fader11Parent)


let fader12Parent = new Entity()
fader12Parent.addComponent(
  new Transform({
    position: new Vector3(268.5, 9.6, 50),
    rotation: Quaternion.Euler(120, 0, 90)
  })
)
engine.addEntity(fader12Parent)
let fader12 = new Entity()
fader12.addComponent(stageLightWhite)
fader12.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 0, 0)
  })
)
fader12.setParent(fader12Parent)


let fader13Parent = new Entity()
fader13Parent.addComponent(
  new Transform({
    position: new Vector3(280.87, 9.6, 34),
    rotation: Quaternion.Euler(120, 0, 90)
  })
)
engine.addEntity(fader13Parent)
let fader13 = new Entity()
fader13.addComponent(stageLightWhite)
fader13.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 0, 0)
  })
)
fader13.setParent(fader13Parent)


let fader14Parent = new Entity()
fader14Parent.addComponent(
  new Transform({
    position: new Vector3(308.87, 5.5, 58.053),
    rotation: Quaternion.Euler(120, 0, 90)
  })
)
engine.addEntity(fader14Parent)
let fader14 = new Entity()
fader14.addComponent(stageLightWhite)
fader14.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 0, 0)
  })
)
fader14.setParent(fader14Parent)