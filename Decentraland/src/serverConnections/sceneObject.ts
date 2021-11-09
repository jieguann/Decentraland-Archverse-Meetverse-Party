/// --- Set up a system ---
//Music Clip Initial
const clip = new AudioClip("../sounds/test.wav")
export const testSource = new AudioSource(clip)


class RotatorSystem {
    // this group will contain every entity that has a Transform component
    group = engine.getComponentGroup(Transform)
  
    update(dt: number) {
      // iterate over the entities of the group
      for (let entity of this.group.entities) {
        // get the Transform component of the entity
        const transform = entity.getComponent(Transform)
  
        // mutate the rotation
        //transform.rotate(Vector3.Up(), dt * 10)
        //log(Camera.instance.feetPosition)
        /*
        distance calculate 
        var a = x1 - x2;
        var b = y1 - y2;
  
        var c = Math.sqrt( a*a + b*b );
        */
        var a = middleCube.getComponent(Transform).position.x - Camera.instance.feetPosition.x
        var b = middleCube.getComponent(Transform).position.z - Camera.instance.feetPosition.z
        var c = Math.sqrt(a*a + b*b)
        
        //log(c)
        if(c<0.7){
          //log("touch")
          //middleCube.getComponent(Material).albedoColor = Color3.Blue()
        }
        else{
          //log("not touch")
          //middleCube.getComponent(Material).albedoColor = Color3.Red()
        }

       //room.send("player-position", Camera.instance.feetPosition.x);
  
      }
    }
  }
  
  // Add a new instance of the system to the engine
  engine.addSystem(new RotatorSystem())
  
  /// --- Spawner function ---
  
  function spawnCube(x: number, y: number, z: number) {
    // create the entity
    const cube = new Entity()
  
    // add a transform to the entity
    cube.addComponent(new Transform({ position: new Vector3(x, y, z) }))
  
    // add a shape to the entity
    cube.addComponent(new BoxShape())
    cube.addComponent(new Material())
    //add music
    //cube.addComponent(testSource)
    // add the entity to the engine
    engine.addEntity(cube)
  
    return cube
  }
  
  /// --- Spawn a cube ---
  
  export const middleCube = spawnCube(8, -0.5, 8)
  
  