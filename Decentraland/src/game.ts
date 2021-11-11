// Import the custom gameplay code.
import "./serverConnections/gameplay";

import { BeiBei } from './beibei/beibei'
import utils from '../node_modules/decentraland-ecs-utils/index'
import { beiwenquan } from './beiwenquan/beiwenquan'
//北碚代码

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
