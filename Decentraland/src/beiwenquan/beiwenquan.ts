import * as utils from '@dcl/ecs-scene-utils'
import { movePlayerTo } from '@decentraland/RestrictedActions'
import * as ui from '@dcl/ui-scene-utils'

import { Exhibition } from 'src/beiwenquan/exhibition'
import { exhibition_image_A1, exhibition_image_A2, exhibition_image_A3, exhibition_image_A4, exhibition_image_A6, exhibition_image_A9, exhibition_image_A10 } from 'src/beiwenquan/exhibiton_image'
import { exhibition_texture_A1, exhibition_texture_A2, exhibition_texture_A3, exhibition_texture_A4, exhibition_texture_A6, exhibition_texture_A9, exhibition_texture_A10 } from 'src/beiwenquan/exhibition_texture'
import { exhibition_transform_A1, exhibition_transform_A2, exhibition_transform_A3, exhibition_transform_A4, exhibition_transform_A6, exhibition_transform_A9, exhibition_transform_A10 } from 'src/beiwenquan/exhibition_transform'
import { ExhibitionVideos } from 'src/beiwenquan/videos'
import { exhibitionVideo, exhibitionVideo_transform } from 'src/beiwenquan/video_attributes'



export function beiwenquan(): void {

    //柏林楼
    const A1 = new Entity();
    engine.addEntity(A1);
    A1.addComponent(new GLTFShape("models/beiwenquan/A1.glb"));
    A1.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //农庄
    const A2 = new Entity();
    engine.addEntity(A2);
    A2.addComponent(new GLTFShape("models/beiwenquan/A2.glb"));
    A2.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //磐室
    const A3 = new Entity();
    engine.addEntity(A3);
    A3.addComponent(new GLTFShape("models/beiwenquan/A3.glb"));
    A3.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //主楼
    const A4 = new Entity();
    engine.addEntity(A4);
    A4.addComponent(new GLTFShape("models/beiwenquan/A4.glb"));
    A4.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //数帆楼
    const A5 = new Entity();
    engine.addEntity(A5);
    A5.addComponent(new GLTFShape("models/beiwenquan/A5.glb"));
    A5.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //红楼
    const A6 = new Entity();
    engine.addEntity(A6);
    A6.addComponent(new GLTFShape("models/beiwenquan/A6.glb"));
    A6.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //清凉亭
    const A7 = new Entity();
    engine.addEntity(A7);
    A7.addComponent(new GLTFShape("models/beiwenquan/A7.glb"));
    A7.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //老舍故居
    const A8 = new Entity();
    engine.addEntity(A8);
    A8.addComponent(new GLTFShape("models/beiwenquan/A8.glb"));
    A8.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //育才学校
    const A9 = new Entity();
    engine.addEntity(A9);
    A9.addComponent(new GLTFShape("models/beiwenquan/A9.glb"));
    A9.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //雅舍
    const A10 = new Entity();
    engine.addEntity(A10);
    A10.addComponent(new GLTFShape("models/beiwenquan/A10.glb"));
    A10.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //环境
    const tree1 = new Entity();
    engine.addEntity(tree1);
    tree1.addComponent(new GLTFShape("models/beiwenquan/tree1.glb"));
    tree1.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))
    const tree2 = new Entity();
    engine.addEntity(tree2);
    tree2.addComponent(new GLTFShape("models/beiwenquan/tree2.glb"));
    tree2.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))
    const tree3 = new Entity();
    engine.addEntity(tree3);
    tree3.addComponent(new GLTFShape("models/beiwenquan/tree3.glb"));
    tree3.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))



    //舞台
    const Stage = new Entity();
    engine.addEntity(Stage);
    Stage.addComponent(new GLTFShape("models/beiwenquan/Stage.glb"));
    Stage.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))


    //A1一楼到二楼
    const A1_1F_UP = new Entity();
    engine.addEntity(A1_1F_UP);
    A1_1F_UP.addComponent(new GLTFShape("models/beiwenquan/up.glb"));
    A1_1F_UP.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(29.7772, 55.8951, 136.61)
    }))

    let A1_1F_UPtriggerSphere = new utils.TriggerSphereShape(0.5, new Vector3(0, 1.5, 0))
    A1_1F_UP.addComponent(
        new utils.TriggerComponent(
            A1_1F_UPtriggerSphere, //shape
            {
                onCameraEnter: () => {
                    movePlayerTo(new Vector3(21.0359, 60.8836, 133.072))
                    ui.displayAnnouncement('2F', 5, Color4.Red(), 50, true)
                }
            }
        )
    )

    //A1二楼到三楼
    const A1_2F_UP = new Entity();
    engine.addEntity(A1_2F_UP);
    A1_2F_UP.addComponent(new GLTFShape("models/beiwenquan/up.glb"));
    A1_2F_UP.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(33.4393, 60.0117, 137.901)
    }))

    let A1_2F_UPtriggerSphere = new utils.TriggerSphereShape(0.5, new Vector3(0, 1.5, 0))
    A1_2F_UP.addComponent(
        new utils.TriggerComponent(
            A1_2F_UPtriggerSphere, //shape
            {
                onCameraEnter: () => {
                    movePlayerTo(new Vector3(23.6394, 64.7636, 134.092))
                    ui.displayAnnouncement('3F', 5, Color4.Red(), 50, true)
                }
            }
        )
    )


    //A1二楼到一楼
    const A1_1F_DOWN = new Entity();
    engine.addEntity(A1_1F_DOWN);
    A1_1F_DOWN.addComponent(new GLTFShape("models/beiwenquan/down.glb"));
    A1_1F_DOWN.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(26.5654, 60.3164, 134.406)
    }))

    let A1_2F_DOWNtriggerSphere = new utils.TriggerSphereShape(0.5, new Vector3(0, 1.5, 0))
    A1_1F_DOWN.addComponent(
        new utils.TriggerComponent(
            A1_2F_DOWNtriggerSphere, //shape
            {
                onCameraEnter: () => {
                    movePlayerTo(new Vector3(26.0235, 56.6536, 135.121))
                    ui.displayAnnouncement('1F', 5, Color4.Red(), 50, true)
                }
            }
        )
    )

    //A1三楼到二楼
    const A1_3F_DOWN = new Entity();
    engine.addEntity(A1_3F_DOWN);
    A1_3F_DOWN.addComponent(new GLTFShape("models/beiwenquan/down.glb"));
    A1_3F_DOWN.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(29.896, 64.1093, 136.609)
    }))

    let A1_3F_DOWNtriggerSphere = new utils.TriggerSphereShape(0.5, new Vector3(0, 1.5, 0))
    A1_3F_DOWN.addComponent(
        new utils.TriggerComponent(
            A1_3F_DOWNtriggerSphere, //shape
            {
                onCameraEnter: () => {
                    movePlayerTo(new Vector3(22.4265, 60.3164, 134.406))
                    ui.displayAnnouncement('2F', 5, Color4.Red(), 50, true)
                }
            }
        )
    )


    //A3一楼到二楼
    const A3_1F_UP = new Entity();
    engine.addEntity(A3_1F_UP);
    A3_1F_UP.addComponent(new GLTFShape("models/beiwenquan/up.glb"));
    A3_1F_UP.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(248.315, 42.8379, 179.628)
    }))

    let A3_1F_UPtriggerSphere = new utils.TriggerSphereShape(0.5, new Vector3(0, 1.5, 0))
    A3_1F_UP.addComponent(
        new utils.TriggerComponent(
            A3_1F_UPtriggerSphere, //shape
            {
                onCameraEnter: () => {
                    movePlayerTo(new Vector3(244.489, 45.5376, 177.123))
                    ui.displayAnnouncement('2F', 5, Color4.Red(), 50, true)
                }
            }
        )
    )

    //A3二楼到三楼
    const A3_2F_UP = new Entity();
    engine.addEntity(A3_2F_UP);
    A3_2F_UP.addComponent(new GLTFShape("models/beiwenquan/up.glb"));
    A3_2F_UP.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(251.033, 45.5625, 181.172)
    }))

    let A3_2F_UPtriggerSphere = new utils.TriggerSphereShape(0.5, new Vector3(0, 1.5, 0))
    A3_2F_UP.addComponent(
        new utils.TriggerComponent(
            A3_2F_UPtriggerSphere, //shape
            {
                onCameraEnter: () => {
                    movePlayerTo(new Vector3(244.489, 48.2724, 177.123))
                    ui.displayAnnouncement('3F', 5, Color4.Red(), 50, true)
                }
            }
        )
    )


    //A3二楼到一楼
    const A3_1F_DOWN = new Entity();
    engine.addEntity(A3_1F_DOWN);
    A3_1F_DOWN.addComponent(new GLTFShape("models/beiwenquan/down.glb"));
    A3_1F_DOWN.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(247.792, 45.5154, 179.671)
    }))

    let A3_2F_DOWNtriggerSphere = new utils.TriggerSphereShape(0.5, new Vector3(0, 1.5, 0))
    A3_1F_DOWN.addComponent(
        new utils.TriggerComponent(
            A3_2F_DOWNtriggerSphere, //shape
            {
                onCameraEnter: () => {
                    movePlayerTo(new Vector3(244.489, 42.7968, 177.123))
                    ui.displayAnnouncement('1F', 5, Color4.Red(), 50, true)
                }
            }
        )
    )

    //A3三楼到二楼
    const A3_3F_DOWN = new Entity();
    engine.addEntity(A3_3F_DOWN);
    A3_3F_DOWN.addComponent(new GLTFShape("models/beiwenquan/down.glb"));
    A3_3F_DOWN.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(247.792, 48.2501, 179.671)
    }))

    let A3_3F_DOWNtriggerSphere = new utils.TriggerSphereShape(0.5, new Vector3(0, 1.5, 0))
    A3_3F_DOWN.addComponent(
        new utils.TriggerComponent(
            A3_3F_DOWNtriggerSphere, //shape
            {
                onCameraEnter: () => {
                    movePlayerTo(new Vector3(244.489, 45.565, 177.123))
                    ui.displayAnnouncement('2F', 5, Color4.Red(), 50, true)
                }
            }
        )
    )

    //A6一楼到二楼
    const A6_1F_UP = new Entity();
    engine.addEntity(A6_1F_UP);
    A6_1F_UP.addComponent(new GLTFShape("models/beiwenquan/up.glb"));
    A6_1F_UP.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(273.906, 43.3342, 258.708)
    }))

    let A6_1F_UPtriggerSphere = new utils.TriggerSphereShape(0.5, new Vector3(0, 1.5, 0))
    A6_1F_UP.addComponent(
        new utils.TriggerComponent(
            A6_1F_UPtriggerSphere, //shape
            {
                onCameraEnter: () => {
                    movePlayerTo(new Vector3(273.877, 50.3094, 265.18))
                    ui.displayAnnouncement('2F', 5, Color4.Red(), 50, true)
                }
            }
        )
    )

    //A6二楼到三楼
    const A6_2F_UP = new Entity();
    engine.addEntity(A6_2F_UP);
    A6_2F_UP.addComponent(new GLTFShape("models/beiwenquan/up.glb"));
    A6_2F_UP.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(273.906, 48.0008, 258.708)
    }))

    let A6_2F_UPtriggerSphere = new utils.TriggerSphereShape(0.5, new Vector3(0, 1.5, 0))
    A6_2F_UP.addComponent(
        new utils.TriggerComponent(
            A6_2F_UPtriggerSphere, //shape
            {
                onCameraEnter: () => {
                    movePlayerTo(new Vector3(273.877, 54.8233, 259.045))
                    ui.displayAnnouncement('3F', 5, Color4.Red(), 50, true)
                }
            }
        )
    )


    //A6二楼到一楼
    const A6_1F_DOWN = new Entity();
    engine.addEntity(A6_1F_DOWN);
    A6_1F_DOWN.addComponent(new GLTFShape("models/beiwenquan/down.glb"));
    A6_1F_DOWN.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(273.861, 47.9537, 251.742)
    }))

    let A6_2F_DOWNtriggerSphere = new utils.TriggerSphereShape(0.5, new Vector3(0, 1.5, 0))
    A6_1F_DOWN.addComponent(
        new utils.TriggerComponent(
            A6_2F_DOWNtriggerSphere, //shape
            {
                onCameraEnter: () => {
                    movePlayerTo(new Vector3(273.877, 45.4543, 251.804))
                    ui.displayAnnouncement('1F', 5, Color4.Red(), 50, true)
                }
            }
        )
    )

    //A6三楼到二楼
    const A6_3F_DOWN = new Entity();
    engine.addEntity(A6_3F_DOWN);
    A6_3F_DOWN.addComponent(new GLTFShape("models/beiwenquan/down.glb"));
    A6_3F_DOWN.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(273.861, 52.81, 251.742)
    }))

    let A6_3F_DOWNtriggerSphere = new utils.TriggerSphereShape(0.5, new Vector3(0, 1.5, 0))
    A6_3F_DOWN.addComponent(
        new utils.TriggerComponent(
            A6_3F_DOWNtriggerSphere, //shape
            {
                onCameraEnter: () => {
                    movePlayerTo(new Vector3(273.877, 50.3094, 265.18))
                    ui.displayAnnouncement('2F', 5, Color4.Red(), 50, true)
                }
            }
        )
    )


    //A1展品
    for (let i = 0; i < exhibition_texture_A1.length; i++) {
        const exhibitionwork1 = new Exhibition(exhibition_texture_A1[i], exhibition_transform_A1[i], exhibition_image_A1[i])
        engine.addEntity(exhibitionwork1)
    }

    //A2展品
    for (let i = 0; i < exhibition_texture_A2.length; i++) {
        const exhibitionwork2 = new Exhibition(exhibition_texture_A2[i], exhibition_transform_A2[i], exhibition_image_A2[i])
        engine.addEntity(exhibitionwork2)
    }

    //A3展品
    for (let i = 0; i < exhibition_texture_A3.length; i++) {
        const exhibitionwork3 = new Exhibition(exhibition_texture_A3[i], exhibition_transform_A3[i], exhibition_image_A3[i])
        engine.addEntity(exhibitionwork3)
    }

    //A4展品
    for (let i = 0; i < exhibition_texture_A4.length; i++) {
        const exhibitionwork4 = new Exhibition(exhibition_texture_A4[i], exhibition_transform_A4[i], exhibition_image_A4[i])
        engine.addEntity(exhibitionwork4)
    }

    //A6展品
    for (let i = 0; i < exhibition_texture_A6.length; i++) {
        const exhibitionwork6 = new Exhibition(exhibition_texture_A6[i], exhibition_transform_A6[i], exhibition_image_A6[i])
        engine.addEntity(exhibitionwork6)
    }

    //A9展品
    for (let i = 0; i < exhibition_texture_A9.length; i++) {
        const exhibitionwork9 = new Exhibition(exhibition_texture_A9[i], exhibition_transform_A9[i], exhibition_image_A9[i])
        engine.addEntity(exhibitionwork9)
    }

    //A10展品
    for (let i = 0; i < exhibition_texture_A10.length; i++) {
        const exhibitionwork10 = new Exhibition(exhibition_texture_A10[i], exhibition_transform_A10[i], exhibition_image_A10[i])
        engine.addEntity(exhibitionwork10)
    }

    //video
    for (let i = 0; i < exhibitionVideo.length; i++) {
        const exhibitionVideowork = new ExhibitionVideos(exhibitionVideo[i], exhibitionVideo_transform[i])
        engine.addEntity(exhibitionVideowork)
    }




    //视频
    //https://tvhttps.jieguanart.com:8443/live/hello/index.m3u8
    //https://dl.dropbox.com/s/ko4zmr320jsbb2v/SSS.mp4
    const myVideoClip = new VideoClip("https://tvhttps.jieguanart.com:8443/live/hello/index.m3u8")
    const myVideoTexture = new VideoTexture(myVideoClip)
    const myMaterial = new BasicMaterial()
    myMaterial.texture = myVideoTexture
    //#视频开关
    myVideoTexture.playing = true
    myVideoTexture.loop = true

    //#屏幕
    //1.广场屏幕
    const screen1 = new Entity()
    screen1.addComponent(new PlaneShape())
    screen1.addComponent(
        new Transform({
            position: new Vector3(196.44, 40.712, 155.65),
            scale: new Vector3(38.4, 21.6, 1),
            rotation: Quaternion.Euler(0, -20 + 180, 0)
        })
    )
    screen1.addComponent(myMaterial)
    // engine.addEntity(screen1)

    //2.船屏幕
    const screen2 = new Entity()
    screen2.addComponent(new PlaneShape())
    screen2.addComponent(
        new Transform({
            position: new Vector3(312.47, 16.451, 102.82),
            scale: new Vector3(21.7, 12.2, 1),
            rotation: Quaternion.Euler(0, 15.7 + 180, 0)
        })
    )
    screen2.addComponent(myMaterial)
    engine.addEntity(screen2)

    //2.船屏幕
    const screen3 = new Entity()
    screen3.addComponent(new PlaneShape())
    screen3.addComponent(
        new Transform({
            position: new Vector3(330.52, 16.451, 90.674),
            scale: new Vector3(21.7, 12.2, 1),
            rotation: Quaternion.Euler(0, 50.7 + 180, 0)
        })
    )
    screen3.addComponent(myMaterial)
    engine.addEntity(screen3)

    //2.船屏幕
    const screen4 = new Entity()
    screen4.addComponent(new PlaneShape())
    screen4.addComponent(
        new Transform({
            position: new Vector3(338.88, 16.451, 70.584),
            scale: new Vector3(21.7, 12.2, 1),
            rotation: Quaternion.Euler(0, 85.7 + 180, 0)
        })
    )
    screen4.addComponent(myMaterial)
    engine.addEntity(screen4)



}