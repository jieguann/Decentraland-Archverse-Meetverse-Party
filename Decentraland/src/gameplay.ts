import { PositionType } from "@decentraland/RestrictedActions";
import { connect } from "./connection";
import {SpawnSystem} from "./spawnParticles";
//import { testSource, middleCube } from "./sceneObject";

interface CollidedPlayer {
  sessionId: string;
  position?: PositionType
}

connect("my_room").then((room) => {
    log("Connected!");
   
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

    class RotatorSystem {

        // this group will contain every entity that has a Transform component
        group = engine.getComponentGroup(Transform)
      
        update(dt: number) {
          // iterate over the entities of the group
          for (let entity of this.group.entities) {
            // get the Transform component of the entity
            
           room.send("player-position", Camera.instance.feetPosition);
    
           //room.send("player-position", Camera.instance.feetPosition.x);
      
          }
        }
      }
      
      // Add a new instance of the system to the engine
      engine.addSystem(new RotatorSystem())

    

    // when a player leaves, remove it from the leaderboard.
    room.state.players.onRemove = () => {
        
    }
    let playerLength:number
    let x:number[] = []
    let y:number[] = []
    let z:number[] = []
    let distanceArray:number[] = []
    
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
      
      for(let i=0;i<Player.length;i++){
         x[i] = Camera.instance.feetPosition.x - Player[i].x
         y[i] = Camera.instance.feetPosition.y - Player[i].y
         z[i] = Camera.instance.feetPosition.z - Player[i].z
         distanceArray[i] = Math.sqrt(x[i]*x[i] + y[i]*y[i] + z[i]*z[i])
         
         if(distanceArray[i] < 1 && distanceArray[i]>0.4 ){
          // log(distanceArray[i])
          //distanceFlat = false
          collidedPlayer.position = {x: Player[i].x, y: Player[i].y, z: Player[i].z}
          collidedPlayer.sessionId = Player[i].clientId;
          break;
         }
      }
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

}).catch((err) => {
    error(err);

});

