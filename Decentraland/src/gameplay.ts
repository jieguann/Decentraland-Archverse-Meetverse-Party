import { PositionType } from "@decentraland/RestrictedActions";
import { connect } from "./connection";
import {SpawnSystem} from "./spawnParticles";
import utils from '../node_modules/decentraland-ecs-utils/index'
//import { testSource, middleCube } from "./sceneObject";

//add sound clip


interface CollidedPlayer {
  sessionId: string;
  position?: PositionType
}

const clip = new AudioClip("sounds/drum.mp3")

//add sound clip to control osc
const drum1 = new AudioClip("sounds/drum1.mp3")
const drum2 = new AudioClip("sounds/bass_drum.mp3")
const piano1Clip = new AudioClip("sounds/piano-a.mp3")
const piano2Clip = new AudioClip("sounds/piano-b.mp3")
const piano3Clip = new AudioClip("sounds/piano-c.mp3")
const piano4Clip = new AudioClip("sounds/piano-d.mp3")
const source1 = new AudioSource(drum1)
const source2 = new AudioSource(drum2)
const pianoSource1 = new AudioSource(piano1Clip)
const pianoSource2 = new AudioSource(piano2Clip)
const pianoSource3 = new AudioSource(piano3Clip)
const pianoSource4 = new AudioSource(piano4Clip)



connect("my_room").then((room) => {
    log("Connected!");
    const sendMessageEntity = new Entity()

    runSendmessage()
function runSendmessage(){
  //sendMessageEntity.addComponent(new BoxShape())
  //sendMessageEntity.addComponent(new Transform())

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






   
    let collidedPlayerSessionId = "";
    let collidedPlayerPosition: PositionType = {
      x:0,
      y:0,
      z:0
    }

    let collidedPlayer : CollidedPlayer = {sessionId: collidedPlayerSessionId};

    Object.defineProperties(collidedPlayer, {
      "sessionId": {
        get: function(){
          return collidedPlayerSessionId
        },
        set: function(value: string){
          if(value !== collidedPlayerSessionId){
            if(collidedPlayer.position){
              playAnimation(collidedPlayer.position);
            }
          }
          collidedPlayerSessionId = value;
        }
      },
      "position": {
        get: function(){
          return collidedPlayerPosition;
        },
        set: function(value: PositionType){
          collidedPlayerPosition = value;
        }
      }
    })

    let collidedPlayers: any = {};
    var  initPosition: [] = [];
    Object.defineProperty(collidedPlayers, 'positions', {
      get: function(){
        return initPosition;
      },
      set: function(value){
        if(value && value.length && JSON.stringify(value) !== JSON.stringify(initPosition)){
          value.map((position: PositionType) => {
            playAnimation(position);
          })
        }
        initPosition = value;
      }
    })

/*
    class PlayerPositionUpdate {

        // this group will contain every entity that has a Transform component
        group = engine.getComponentGroup(Transform)
      
        update(dt: number) {
          // iterate over the entities of the group
          for (let entity of this.group.entities) {
            // get the Transform component of the entity
            new utils.Interval(0.1, () => {
              //room.send("player-position", Camera.instance.feetPosition);
            })
           
    
           //room.send("player-position", Camera.instance.feetPosition.x);
      
          }
        }
      }
      
      // Add a new instance of the system to the engine
      engine.addSystem(new PlayerPositionUpdate())

    */

    // when a player leaves, remove it from the leaderboard.
    room.state.players.onRemove = () => {
        
    }
    let playerLength:number
    // let x:number[] = []
    // let y:number[] = []
    // let z:number[] = []
    // let distanceArray:number[] = []
    
    //let distanceFlat:boolean[play] = [] 
    room.onMessage("PlayerPositionArray", (Player) => {
      //playOnce(fallSound, 1, new Vector3(atPosition.x, atPosition.y, atPosition.z));
      /*
            x = player1.x - player2.x
            y = player1.y - player2.y
            z = player1.z - player2.z
            distanceArray[i*k/2] = Math.sqrt(x*x + y*y + z*z)
      */
      //playerLength = Player.length
      //add array ofy
      //log(Player.length);
      //let distanceFlat:boolean[playerLength] = []

      //计算玩家距离方法
      //此处大于0.4是让玩家不计算与自己的距离
      
      // for(let i=0;i<Player.length;i++){
      //    x[i] = Camera.instance.feetPosition.x - Player[i].x
      //    y[i] = Camera.instance.feetPosition.y - Player[i].y
      //    z[i] = Camera.instance.feetPosition.z - Player[i].z
      //    distanceArray[i] = Math.sqrt(x[i]*x[i] + y[i]*y[i] + z[i]*z[i])
         
      //    if(distanceArray[i] < 1 && distanceArray[i]>0.4 ){
      //     // log(distanceArray[i])
      //     //distanceFlat = false
      //     collidedPlayer.position = {x: Player[i].x, y: Player[i].y, z: Player[i].z}
      //     collidedPlayer.sessionId = Player[i].clientId;
      //     break;
      //    }
      // }


      let collidedPlayerPositions: PositionType[] = [];
      let pl = Player.length;
      for(let i = 0; i < pl; i++) {
        let x: number[] = [];
        let y: number[] = [];
        let z: number[] = [];
        let distanceArray: number[] = [];
        for(let j = i + 1; j < pl; j++){
          x[j] = Player[j].x - Player[i].x;
          y[j] = Player[j].y - Player[i].y;
          z[j] = Player[j].z - Player[i].z;
          distanceArray[j] = Math.sqrt(x[j]*x[j] + y[j]*y[j] + z[j]*z[j]);
          if(distanceArray[j] < 1 && distanceArray[j] > 0.4 ) {
            collidedPlayerPositions.push({x: Player[j].x, y: Player[j].y, z: Player[j].z})
          }
        }
      }

      collidedPlayers.positions = collidedPlayerPositions;

      //log(distanceArray)
      //Play Sound
      //testSource.playing = true
      
     })

  
    room.onLeave((code) => {
        log("onLeave, code =>", code);
    });

    function playAnimation(position: PositionType){
      log("Play particles animation!!!!")
      engine.addSystem(new SpawnSystem(position))
    }



     //OSC message Control
     room.state.listen('fader1', (value: number) => {
      fader1.getComponent(Transform).position.y = value * 1
      if(value> 0){
        source1.playOnce()
      }
    })
  
    room.state.listen('fader2', (value: number) => {
      fader2.getComponent(Transform).position.z = value * 1 + 8
      if(value> 0){
        source2.playOnce()
      }
    })
  
    room.state.listen('fader3', (value: number) => {
      fader3.getComponent(Transform).position.y = value * 0.1
      switch (value){
        case 1 :{
          pianoSource1.playOnce()
          break
        }
        case 2 :{
          pianoSource2.playOnce()
          break
        }
        case 3 :{
          pianoSource3.playOnce()
          break
        }
        case 4 :{
          pianoSource4.playOnce()
          break
        }
        // case 5 :{
        //   pianoSource5.playOnce()
        //   break
        // }
        // case 6 :{
        //   pianoSource6.playOnce()
        //   break
        // }
        // case 7 :{
        //   pianoSource7.playOnce()
        //   break
        // }
        // case 8 :{
        //   pianoSource8.playOnce()
        //   break
        // }
      }
    })
  
    room.state.listen('fader4', (value: number) => {
      fader4.getComponent(Transform).position.y = value * 1
      if(value> 0.9){
        fader4.addComponentOrReplace(redMaterial)
      } else if (value > 0.6){
        fader4.addComponentOrReplace(yellowMaterial)
      } else{
        fader4.addComponentOrReplace(greenMaterial)
      }
    })

}).catch((err) => {
    error(err);

});

//osc entity for control
let greenMaterial = new Material()
greenMaterial.albedoColor = Color4.Green()

let yellowMaterial = new Material()
yellowMaterial.albedoColor = Color4.Yellow()

let redMaterial = new Material()
redMaterial.albedoColor = Color4.Red()

let fader1 = new Entity()
fader1.addComponent(source1)
fader1.addComponent(new GLTFShape("models/qingliangting-roof.gltf"))
fader1.addComponent(
  new Transform({
    position: new Vector3(8, 2, 8),
  })
)
fader1.addComponent(greenMaterial)
engine.addEntity(fader1)

let fader2 = new Entity()
fader2.addComponent(source2)
fader2.addComponent(new GLTFShape("models/qingliangting-wall.gltf"))
fader2.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
  })
)
fader2.addComponent(greenMaterial)
engine.addEntity(fader2)

let fader3 = new Entity()
fader3.addComponent(new GLTFShape("models/qingliangting-structure.gltf"))
fader3.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
  })
)
fader3.addComponent(greenMaterial)
engine.addEntity(fader3)

let fader4 = new Entity()
fader4.addComponent(new BoxShape())
fader4.addComponent(
  new Transform({
    position: new Vector3(8, 0, 16),
  })
)
fader4.addComponent(greenMaterial)
engine.addEntity(fader4)

let piano1Entity = new Entity()
piano1Entity.addComponent(pianoSource1)
piano1Entity.addComponent(
  new Transform({
    position: new Vector3(8, 0, 16),
  })
)
engine.addEntity(piano1Entity)

let piano2Entity = new Entity()
piano2Entity.addComponent(pianoSource2)
piano2Entity.addComponent(
  new Transform({
    position: new Vector3(8, 0, 16),
  })
)
engine.addEntity(piano2Entity)

let piano3Entity = new Entity()
piano3Entity.addComponent(pianoSource3)
piano3Entity.addComponent(
  new Transform({
    position: new Vector3(8, 0, 16),
  })
)
engine.addEntity(piano3Entity)

let piano4Entity = new Entity()
piano4Entity.addComponent(pianoSource4)
piano4Entity.addComponent(
  new Transform({
    position: new Vector3(8, 0, 16),
  })
)
engine.addEntity(piano4Entity)