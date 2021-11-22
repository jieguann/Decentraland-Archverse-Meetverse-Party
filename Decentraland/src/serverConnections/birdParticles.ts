import * as utils from '@dcl/ecs-scene-utils';
import { randomInt, isValidKey, randomDirection } from "../utils";
import resourse from '../resourse';
import { CollidedData } from './gameplay';

// const birdScale = new Vector3(0.5, 0.5, 0.5);
// let birdShape = resourse.particles.bird;
const particles = resourse.particles;
const birdScale = new Vector3(0.15, 0.15, 0.15);

export class SpawnBird{
    private position: CollidedData;
    private clip: any;
    private birdCount: number;
    constructor(position: CollidedData, clip: any, birdCount: number = 10) {
        this.birdCount = birdCount;
        this.position = position;
        this.clip = clip;
        let count = 1;
        while(count < this.birdCount) {
            newBird(this.position, this.clip, count);
            count += 1;
        }
    }
}

function newBird(position: CollidedData, clip: any, count: number) {
    const bird = new Entity();
    //将声音绑在第一个粒子上
    if(count === 1) {
        const source = new AudioSource(clip)
        bird.addComponent(source) 
        source.playing = true
        source.playOnce();
    }
    const startPosition = new Vector3(position.x, position.y + 1.2, position.z);
    bird.addComponent(
        new Transform({
            position: startPosition,
            scale: birdScale
        })
    );

    let birdShape: any = null;
    const particlesKeys = Object.keys(particles);
    const randmomNum = randomInt(0, particlesKeys.length -1);
    const key = particlesKeys[randmomNum];
    if(isValidKey(key, particles)) {
        birdShape = particles[key];
    }

    bird.addComponent(birdShape);
    const nextPos = new Vector3(
        position.x + Math.random() * 8 * randomDirection(),
        position.y + Math.random() * 10,
        position.z + Math.random() * 8 * randomDirection()
    );

    bird.getComponent(Transform).lookAt(nextPos);
    bird.addComponent(
        new utils.MoveTransformComponent(
            startPosition, 
            nextPos, 
            4, 
            () => {
                engine.removeEntity(bird)
            })
    );
    engine.addEntity(bird);
}