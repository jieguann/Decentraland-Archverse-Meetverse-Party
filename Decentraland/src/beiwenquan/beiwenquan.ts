import * as utils from '@dcl/ecs-scene-utils'
import { movePlayerTo } from '@decentraland/RestrictedActions'
import * as ui from '@dcl/ui-scene-utils'

import { Exhibition } from 'src/beiwenquan/exhibition'
import { exhibition_image } from 'src/beiwenquan/exhibiton_image'
import { exhibition_texture } from 'src/beiwenquan/exhibition_texture'
import { exhibition_transform } from 'src/beiwenquan/exhibition_transform'



export function beiwenquan(): void {
    //主建筑
    const BLL = new Entity();
    engine.addEntity(BLL);
    BLL.addComponent(new GLTFShape("models/beiwenquan/BLL.glb"));
    BLL.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    const dixing = new Entity();
    engine.addEntity(dixing);
    dixing.addComponent(new GLTFShape("models/beiwenquan/dixing.glb"));
    dixing.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    const HL = new Entity();
    engine.addEntity(HL);
    HL.addComponent(new GLTFShape("models/beiwenquan/HL.glb"));
    HL.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    const NZ = new Entity();
    engine.addEntity(NZ);
    NZ.addComponent(new GLTFShape("models/beiwenquan/NZ.glb"));
    NZ.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    const QLT = new Entity();
    engine.addEntity(QLT);
    QLT.addComponent(new GLTFShape("models/beiwenquan/QLT.glb"));
    QLT.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    const QS = new Entity();
    engine.addEntity(QS);
    QS.addComponent(new GLTFShape("models/beiwenquan/QS.glb"));
    QS.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    const shu1 = new Entity();
    engine.addEntity(shu1);
    shu1.addComponent(new GLTFShape("models/beiwenquan/shu1.glb"));
    shu1.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    const shu2 = new Entity();
    engine.addEntity(shu2);
    shu2.addComponent(new GLTFShape("models/beiwenquan/shu2.glb"));
    shu2.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    const shu3 = new Entity();
    engine.addEntity(shu3);
    shu3.addComponent(new GLTFShape("models/beiwenquan/shu3.glb"));
    shu3.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    const shu4 = new Entity();
    engine.addEntity(shu4);
    shu4.addComponent(new GLTFShape("models/beiwenquan/shu4.glb"));
    shu4.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    const YCXX = new Entity();
    engine.addEntity(YCXX);
    YCXX.addComponent(new GLTFShape("models/beiwenquan/YCXX.glb"));
    YCXX.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    const ZL = new Entity();
    engine.addEntity(ZL);
    ZL.addComponent(new GLTFShape("models/beiwenquan/ZL.glb"));
    ZL.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //舞台
    const BoatStage = new Entity();
    engine.addEntity(BoatStage);
    BoatStage.addComponent(new GLTFShape("models/beiwenquan/BoatStage.glb"));
    BoatStage.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //舞台传送装置模型
    const BoatStageConveyor = new Entity();
    engine.addEntity(BoatStageConveyor);
    BoatStageConveyor.addComponent(new GLTFShape("models/beiwenquan/BoatStageConveyor.glb"));
    BoatStageConveyor.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //舞台传送触发器
    let triggerSphere = new utils.TriggerSphereShape(8,new Vector3(255.192, 0.95, 88.7549))
    BoatStageConveyor.addComponent(
      new utils.TriggerComponent(
        triggerSphere, //shape
        {
            onCameraEnter :() => {
                movePlayerTo(new Vector3(307.545, 60, 48.0286))
            }
        }
      )
    )

    //展品
    for (let i = 0; i < exhibition_texture.length; i++) {
        const exhibitionwork = new Exhibition(exhibition_texture[i], exhibition_transform[i], exhibition_image[i])
        engine.addEntity(exhibitionwork)
      }


    //视频
    //https://www.dropbox.com/s/ko4zmr320jsbb2v/SSS.mp4?dl=0
    //https://tvhttps.jieguanart.com:8443/live/hello/index.m3u8
    const myVideoClip = new VideoClip("https://dl.dropbox.com/s/ko4zmr320jsbb2v/SSS.mp4")
    const myVideoTexture = new VideoTexture(myVideoClip)
    const myMaterial = new BasicMaterial()
    myMaterial.texture = myVideoTexture
    //#视频开关
    myVideoTexture.playing = true
    myVideoTexture.loop = true
    
    //#屏幕
    //1.中间屏幕
    const screen1 = new Entity()
    screen1.addComponent(new PlaneShape())
    screen1.addComponent(
        new Transform({
            position: new Vector3(329.753, 22.1211, 86.8465),
            scale: new Vector3(19.8, 11.1375, 1),
            rotation: Quaternion.Euler(0, 39.1-180, 0)
        })
    )
    screen1.addComponent(myMaterial)
    engine.addEntity(screen1)

     //1.左屏幕
     const screen2 = new Entity()
     screen2.addComponent(new PlaneShape())
     screen2.addComponent(
         new Transform({
             position: new Vector3(316.8, 14.531, 93.962),
             scale: new Vector3(14.6, 8.22, 1),
             rotation: Quaternion.Euler(0, -180, 0)
         })
     )
     screen2.addComponent(myMaterial)
     engine.addEntity(screen2)

      //1.右屏幕
    const screen3 = new Entity()
    screen3.addComponent(new PlaneShape())
    screen3.addComponent(
        new Transform({
            position: new Vector3(334.40, 14.531, 72.525),
            scale: new Vector3(14.6, 8.22, 1),
            rotation: Quaternion.Euler(0, 70-141, 0)
        })
    )
    screen3.addComponent(myMaterial)
    engine.addEntity(screen3)
}