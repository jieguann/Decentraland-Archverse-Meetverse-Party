// Import the custom gameplay code.
import * as utils from '@dcl/ecs-scene-utils'
import "./serverConnections/gameplay";
import { BeiBei } from './beibei/beibei'
import { beiwenquan } from './beiwenquan/beiwenquan'
import { Dispenser } from './dispenser'


//北温泉地面
const Ground = new Entity();
engine.addEntity(Ground);
Ground.addComponent(new GLTFShape("models/beiwenquan/Ground.glb"));
Ground.addComponent(new Transform({
  rotation: Quaternion.Euler(0, 180, 0),
  position: new Vector3(0, 0, 0)
}))
//检查时间 
async function checkTime() {
  let url = 'https://worldtimeapi.org/api/timezone/etc/gmt'

  try {
    let response = await fetch(url)
    let json = await response.json()
    let toDate = new Date(json.datetime)
    let a = toDate.getHours()
    log(a)

    if (a % 2) {
      beiwenquan()

      NewYearTimeChecker.removeComponent(utils.Interval)
      engine.removeEntity(NewYearTimeChecker)
    } else {
      beiwenquan()

      NewYearTimeChecker.removeComponent(utils.Interval)
      engine.removeEntity(NewYearTimeChecker)
    }
  } catch (e) {
  }
}

let NewYearTimeChecker = new Entity()
engine.addEntity(NewYearTimeChecker)
NewYearTimeChecker.addComponent(
  new utils.Interval(10000, () => {
    checkTime()
  })
)


// POAP BOOTH

let POAPBooth = new Dispenser(
  {
    position: new Vector3(192.34, 27.535, 120.23),
  },
  '14799'
)

// MAKE POAP BOOTH MULTIPLAYER

export let sceneMessageBus = new MessageBus()

sceneMessageBus.on('activatePoap', () => {
  POAPBooth.activate()
})

// POAP BOOTH



