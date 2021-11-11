import { PositionType } from "@decentraland/RestrictedActions";

@Component("isDrop")
export class IsDrop{
    constructor(){}
}

const dropSpeed = 0.1;
const drops = engine.getComponentGroup(IsDrop);


//To do destory the drop after 3 second
export class SpawnSystem implements ISystem {

    dropCount: number;
    position: PositionType;
    constructor(position: PositionType){
        this.dropCount = 1;
        this.position = position;
    }
    update(dt: number) {
        if(this.dropCount > 0) {
            this.dropCount -= 1;
            spawnDrop(this.position);
        }
        for(let drop of drops.entities){
            

            let position = drop.getComponent(Transform).position;
            position.x = position.x + Math.random() * dt * dropSpeed;
            position.y = position.y + Math.random() * dt * dropSpeed;
            position.z = position.z + Math.random() * dt * dropSpeed;
            if(position.y > 8) {
                engine.removeEntity(drop);
            }

           
        }
    }
}

const dropShape = new PlaneShape();
const billboard = new Billboard(false, true, false);
const dropTexture = new Texture("materials/fire.png", {hasAlpha: true, samplingMode: 1});
const dropMaterial = new BasicMaterial();
dropMaterial.texture = dropTexture;

function spawnDrop(position: PositionType){
    const drop = new Entity();
    //add sound clip
    const clip = new AudioClip("sounds/drum.mp3")
    const source = new AudioSource(clip)
    drop.addComponent(source)
    source.playing = true
    source.playOnce()
    //main
    const particalScale:number = Math.random() * 0.5 + 0.5;
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