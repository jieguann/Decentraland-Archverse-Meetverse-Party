import { PositionType } from "@decentraland/RestrictedActions";

@Component("isDrop")
export class IsDrop{
    constructor(){}
}

const dropSpeed = 1;
const drops = engine.getComponentGroup(IsDrop);


//To do destory the drop after 3 second
export class SpawnSystem implements ISystem {

    dropCount: number;
    position: PositionType;
    constructor(position: PositionType){
        this.dropCount = 5;
        this.position = position;
    }
    update(dt: number) {
        if(this.dropCount > 0) {
            this.dropCount -= 1;
            spawnDrop(this.position);
        }
        for(let drop of drops.entities){
            

            let position = drop.getComponent(Transform).position;  22
            position.x = position.x + Math.random() * dt * dropSpeed;
            position.y = position.y + Math.random() * dt * dropSpeed;
            position.z = position.z + Math.random() * dt * dropSpeed;

            //add time
            let timer:number = 3
            if(timer > 0){
               timer -= dt
            }
            else(engine.removeEntity(drop))
        }
    }
}

const dropShape = new PlaneShape();
const billboard = new Billboard(false, true, false);
const dropTexture = new Texture("materials/drop.png", {hasAlpha: true, samplingMode: 1});
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