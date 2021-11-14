import { PositionType } from "@decentraland/RestrictedActions";
import resources from "../resourse";
import { randomInt, isValidKey, randomDirection } from "../utils";
import { CollidedData } from "./gameplay";

@Component("isDrop")
export class IsDrop {
  constructor() { }
}

const dropSpeed = 0.3;
const dropCount = 10;
const drops = engine.getComponentGroup(IsDrop);

//To do destory the drop after 3 second
export class SpawnSystem implements ISystem {
  dropCount: number;
  position: CollidedData;
  clip: any;
  constructor(position: CollidedData, clip: any) {
    this.dropCount = dropCount;
    this.position = position;
    this.clip = clip;
  }
  update(dt: number) {
    if (this.dropCount > 0) {
      this.dropCount -= 1;
      spawnDrop(this.position, this.dropCount, this.clip);
    }
    for(let i = 0, l = drops.entities.length; i < l; i++) {
      let drop = drops.entities[i];
      let position = drop.getComponent(Transform).position;
      const randomDir = i % 2 === 0 ? -1 : 1;
      position.x = position.x + Math.random() * dt * dropSpeed * (1 + Math.random()) * randomDir;
      position.y = position.y + Math.random() * dt * dropSpeed;
      position.z = position.z + Math.random() * dt * dropSpeed * (1 + Math.random()) * randomDir;
      if (position.y > 8) {
        engine.removeEntity(drop);
      }
    }
    for (let drop of drops.entities) {
      
    }
  }
}

const dropShape = new PlaneShape();
const billboard = new Billboard(false, true, false);
const randomSound = resources.randomSound;
const particles = resources.particles;
function spawnDrop(position: CollidedData, count: number, clip: any) {
  const drop = new Entity();
  // 将声音绑定在其中一个粒子上
  if(count === dropCount - 1) {
    const source = new AudioSource(clip)
    drop.addComponent(source) 
    source.playing = true
    source.playOnce();
  }
  
  // 随机取粒子
  let dropTexture: any = null;
  const particlesKeys = Object.keys(particles);
  const randmomNum = randomInt(0, particlesKeys.length -1);
  const key = particlesKeys[randmomNum];
  if(isValidKey(key, particles)) {
    dropTexture = particles[key];
  }
  const dropMaterial = new BasicMaterial();
  dropMaterial.texture = dropTexture;
  //main
  const particalScale: number = Math.random() * 0.5 + 0.5;
  drop.addComponent(new IsDrop());
  drop.addComponent(new Transform({
    position: new Vector3(position.x, position.y + 1, position.z),
    scale: new Vector3(0.15, 0.15, 0.15)
  }));
  drop.addComponent(dropShape);
  drop.addComponent(billboard);
  drop.addComponent(dropMaterial);
  engine.addEntity(drop);
}
