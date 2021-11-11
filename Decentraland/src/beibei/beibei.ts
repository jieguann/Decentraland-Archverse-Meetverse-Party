import { movePlayerTo } from '@decentraland/RestrictedActions'
import { Dialog, NPC } from '@dcl/npc-scene-utils'
import * as ui from '@dcl/ui-scene-utils'
import * as utils from '@dcl/ecs-scene-utils'
import { getUserData, UserData } from '@decentraland/Identity'




export function BeiBei(): void {



    // 一.基础场景模型

    //主建筑
    const baseScene1 = new Entity();
    engine.addEntity(baseScene1);
    baseScene1.addComponent(new GLTFShape("models/beibei/A1.glb"));
    baseScene1.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //地面
    const baseScene2 = new Entity();
    engine.addEntity(baseScene2);
    baseScene2.addComponent(new GLTFShape("models/beibei/D1.glb"));
    baseScene2.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //
    const baseScene3 = new Entity();
    engine.addEntity(baseScene3);
    baseScene3.addComponent(new GLTFShape("models/beibei/Z1.glb"));
    baseScene3.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //
    const baseScene4 = new Entity();
    baseScene4.addComponent(new GLTFShape("models/beibei/A2.glb"));
    baseScene4.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //
    const baseScene5 = new Entity();
    baseScene5.addComponent(new GLTFShape("models/beibei/Z2.glb"));
    baseScene5.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //
    const baseScene6 = new Entity();
    baseScene6.addComponent(new GLTFShape("models/beibei/Z3.glb"));
    baseScene6.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //
    const Car = new Entity();
    Car.addComponent(new GLTFShape("models/beibei/Car.glb"));
    Car.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //
    const ZP1 = new Entity();
    ZP1.addComponent(new GLTFShape("models/beibei/ZP1.glb"));
    ZP1.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    //
    let EnvironmentRender1 = new Entity()
    engine.addEntity(EnvironmentRender1)
    EnvironmentRender1.addComponent(
        new utils.Delay(10000, () => {
            engine.addEntity(baseScene4)
        })
    )

    //
    let EnvironmentRender2 = new Entity()
    engine.addEntity(EnvironmentRender2)
    EnvironmentRender2.addComponent(
        new utils.Delay(20000, () => {
            engine.addEntity(baseScene5)
        })
    )

    //
    let EnvironmentRender3 = new Entity()
    engine.addEntity(EnvironmentRender3)
    EnvironmentRender3.addComponent(
        new utils.Delay(30000, () => {
            engine.addEntity(baseScene6)
            engine.addEntity(Car)
            engine.addEntity(ZP1)
        })
    )









    //视频
    const myVideoClip = new VideoClip("https://tvhttps.jieguanart.com:8443/live/hello/index.m3u8")
    const myVideoTexture = new VideoTexture(myVideoClip)
    const myMaterial = new BasicMaterial()
    myMaterial.texture = myVideoTexture
    //#视频开关
    myVideoTexture.playing = true
    //#屏幕
    //1.会议室F1屏幕
    const screen1 = new Entity()
    screen1.addComponent(new PlaneShape())
    screen1.addComponent(
        new Transform({
            position: new Vector3(216.14, 6.2737, 88.247),
            scale: new Vector3(14.6, 8.22, 1),
            rotation: Quaternion.Euler(0, 0, 0)
        })
    )
    screen1.addComponent(myMaterial)
    engine.addEntity(screen1)


    //Alice对话
    let AliceTalk: Dialog[] = [
        {
            text: 'Hi, I\'m your tour guide Alice, I will show you the city of Beibei during the Republic of China.',
        },
        {
            text: 'What service do you need?',
            isQuestion: true,
            buttons: [
                { label: `Teleport`, goToDialog: 2 },
                { label: `Introduction`, goToDialog: 4 },
                { label: `Nothing`, goToDialog: 3 }
            ]
        },
        {
            text: 'Where do you want to go?',
            isQuestion: true,
            buttons: [
                { label: `Starting point`, goToDialog: 5 },
                { label: `Sky garden`, goToDialog: 6 },
                { label: `Nothing`, goToDialog: 3 }
            ]
        },
        {
            text: 'If you need help please contact me.',
            isEndOfDialog: true
        },
        {
            text: 'Beibei Beibei Beibei Beibei',
            isEndOfDialog: true
        },
        {
            text: 'There is an exhibition of rural construction here, welcome to visit.',
            isEndOfDialog: true,
            triggeredByNext: () => {
                movePlayerTo(new Vector3(200, 1, 105))

            }
        },
        {
            text: 'You can overlook this area from the sky garden.',
            isEndOfDialog: true,
            triggeredByNext: () => {
                movePlayerTo(new Vector3(105, 20, 90))

            }
        },
    ]

    //导游NPC设定
    let player = Camera.instance

    @Component("FollowsPlayer")
    class FollowsPlayer {
    }

    let Guide = new NPC(
        {
            position: new Vector3(200, 1, 210),
            rotation: Quaternion.Euler(0, 0, 0),
        },
        'models/beibei/alice.glb',
        () => {
            Guide.talk(AliceTalk, 0)
        },
        {
            portrait: { path: "images/alice.png", section: { sourceHeight: 384, sourceWidth: 384 }, },
            faceUser: true,

            continueOnWalkAway: true,
            onlyClickTrigger: true,
        }
    )
    Guide.addComponent(new FollowsPlayer())
    engine.addEntity(Guide)

    function distance(pos1: Vector3, pos2: Vector3) {
        const a = pos1.x - pos2.x
        const b = pos1.z - pos2.z
        return a * a + b * b
    }

    class PlayerFollowSystem {
        group = engine.getComponentGroup(FollowsPlayer)
        update(dt: number) {
            for (let entity of this.group.entities) {
                //entity.getComponent(Transform).position = player.position
                let transform = entity.getComponent(Transform)

                if (distance(player.feetPosition, transform.position) > 20) {
                    let moveDirection = player.position.subtract(transform.position)
                    moveDirection = moveDirection.normalize().multiplyByFloats(9 * dt, 9 * dt, 9 * dt)

                    transform.position.addInPlace(moveDirection)
                }

                transform.lookAt(player.feetPosition)
            }
        }
    }

    const Follow = new PlayerFollowSystem
    engine.addSystem(Follow)

    //声音
    const clipBBW = new AudioClip("sounds/BBW.mp3")
    const BBW = new AudioSource(clipBBW)
    Guide.addComponent(BBW)
    BBW.playing = true
    BBW.loop = true

    const clipBBN = new AudioClip("sounds/BBN.mp3")
    const BBN = new AudioSource(clipBBN)
    BBN.playing = true
    BBN.loop = true

    //采访王姑婆
    const source1 = new AudioStream("https://dl.dropbox.com/s/pnyxb6lu2gqagk9/Tgupo.mp3")
    source1.playing = true

    //采访二姐
    const source2 = new AudioStream("https://dl.dropbox.com/s/a8tiuesko9mmhxd/Terjie.mp3")
    source2.playing = true

    //采访煤炭厂家
    const source3 = new AudioStream("https://dl.dropbox.com/s/3ywmmpu2izwdtf0/Tmeitan.mp3")
    source3.playing = true

    //采访周王夫妇
    const source4 = new AudioStream("https://dl.dropbox.com/s/afdtcp3ngh6ftkq/Tzhou.mp3")
    source4.playing = true

    //歌曲：半个月亮爬上来
    const source5 = new AudioStream("https://dl.dropbox.com/s/g4p4j3id55nixyt/yueliang.mp3")
    source5.playing = true

    //歌曲：光辉的里程碑
    const source6 = new AudioStream("https://dl.dropbox.com/s/uryvmd7gkc1pmhl/guanghui.mp3")
    source6.playing = true

    //歌曲：国际歌
    const source7 = new AudioStream("https://dl.dropbox.com/s/t0pmx5yp1u9ra3a/guoji.mp3")
    source7.playing = true

    //歌曲：我和你
    const source8 = new AudioStream("https://dl.dropbox.com/s/t0dkvowxzj7uw20/woheni.mp3")
    source8.playing = true

    //歌曲：（二姐）
    const source9 = new AudioStream("https://dl.dropbox.com/s/tjy2f58jlu3m63z/erjie.mp3")
    source9.playing = true

    //展厅触发器

    //create entity
    const box = new Entity()
    const a = new BoxShape()
    a.visible = false
    //create shape for entity and disable its collision
    box.addComponent(a)
    box.getComponent(BoxShape).withCollisions = false

    //set transform component with initial position
    box.addComponent(new Transform({ position: new Vector3(216.08, 9.2661, 148.6) }))

    // create trigger area object, setting size and relative position
    let triggerBox = new utils.TriggerBoxShape(new Vector3(48, 18.5, 64))

    //create trigger for entity
    box.addComponent(
        new utils.TriggerComponent(
            triggerBox, //shape
            {
                onCameraEnter: () => {
                    Guide.addComponentOrReplace(BBN)

                },
                onCameraExit: () => {
                    Guide.addComponentOrReplace(BBW)
                    BBN.playing = true
                    source1.playing = false
                    source2.playing = false
                    source3.playing = false
                    source4.playing = false
                    source5.playing = false
                    source6.playing = false
                    source7.playing = false
                    source8.playing = false
                    source9.playing = false
                }
            }
        )
    )

    //add entity to engine
    engine.addEntity(box)


    //唱机
    const CD = new Entity();
    engine.addEntity(CD);
    CD.addComponent(new GLTFShape("models/beibei/CD.glb"));
    CD.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))

    const CDHB = new Entity();
    engine.addEntity(CDHB);
    CDHB.addComponent(new GLTFShape("models/beibei/CDHB.glb"));
    CDHB.addComponent(new Transform({
        rotation: Quaternion.Euler(0, -90, 0),
        position: new Vector3(216.08, 0.3, 122.32)
    }))

    const CD1 = new Entity();
    engine.addEntity(CD1);
    CD1.addComponent(new GLTFShape("models/beibei/CD1.glb"));
    CD1.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(214.35, 1.5123, 122.31)
    }))
    CD1.addComponent(
        new OnPointerDown(
            (e) => {
                BBN.playing = false
                source1.playing = true
                Guide.addComponentOrReplace(source1)
            },
            {
                hoverText: "Play",
            }
        )
    )

    const CD2 = new Entity();
    engine.addEntity(CD2);
    CD2.addComponent(new GLTFShape("models/beibei/CD2.glb"));
    CD2.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(214.72, 1.5117, 122.31)
    }))
    CD2.addComponent(
        new OnPointerDown(
            (e) => {
                BBN.playing = false
                source2.playing = true
                Guide.addComponentOrReplace(source2)
            },
            {
                hoverText: "Play",
            }
        )
    )

    const CD3 = new Entity();
    engine.addEntity(CD3);
    CD3.addComponent(new GLTFShape("models/beibei/CD3.glb"));
    CD3.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(215.11, 1.5117, 122.31)
    }))
    CD3.addComponent(
        new OnPointerDown(
            (e) => {
                BBN.playing = false
                source3.playing = true
                Guide.addComponentOrReplace(source3)
            },
            {
                hoverText: "Play",
            }
        )
    )

    const CD4 = new Entity();
    engine.addEntity(CD4);
    CD4.addComponent(new GLTFShape("models/beibei/CD4.glb"));
    CD4.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(215.52, 1.5103, 122.31)
    }))
    CD4.addComponent(
        new OnPointerDown(
            (e) => {
                BBN.playing = false
                source4.playing = true
                Guide.addComponentOrReplace(source4)
            },
            {
                hoverText: "Play",
            }
        )
    )

    const CD5 = new Entity();
    engine.addEntity(CD5);
    CD5.addComponent(new GLTFShape("models/beibei/CD5.glb"));
    CD5.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(216.64, 1.5103, 122.31)
    }))
    CD5.addComponent(
        new OnPointerDown(
            (e) => {
                BBN.playing = false
                source5.playing = true
                Guide.addComponentOrReplace(source5)
            },
            {
                hoverText: "Play",
            }
        )
    )

    const CD6 = new Entity();
    engine.addEntity(CD6);
    CD6.addComponent(new GLTFShape("models/beibei/CD6.glb"));
    CD6.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(217.05, 1.5117, 122.31)
    }))
    CD6.addComponent(
        new OnPointerDown(
            (e) => {
                BBN.playing = false
                source6.playing = true
                Guide.addComponentOrReplace(source6)
            },
            {
                hoverText: "Play",
            }
        )
    )

    const CD7 = new Entity();
    engine.addEntity(CD7);
    CD7.addComponent(new GLTFShape("models/beibei/CD7.glb"));
    CD7.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(217.44, 1.5117, 122.31)
    }))
    CD7.addComponent(
        new OnPointerDown(
            (e) => {
                BBN.playing = false
                source7.playing = true
                Guide.addComponentOrReplace(source7)
            },
            {
                hoverText: "Play",
            }
        )
    )

    const CD8 = new Entity();
    engine.addEntity(CD8);
    CD8.addComponent(new GLTFShape("models/beibei/CD8.glb"));
    CD8.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(217.81, 1.5123, 122.31)
    }))
    CD8.addComponent(
        new OnPointerDown(
            (e) => {
                BBN.playing = false
                source8.playing = true
                Guide.addComponentOrReplace(source8)
            },
            {
                hoverText: "Play",
            }
        )
    )

    const CD9 = new Entity();
    engine.addEntity(CD9);
    CD9.addComponent(new GLTFShape("models/beibei/CD9.glb"));
    CD9.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(218.23, 1.5117, 122.31)
    }))
    CD9.addComponent(
        new OnPointerDown(
            (e) => {
                BBN.playing = false
                source9.playing = true
                Guide.addComponentOrReplace(source9)
            },
            {
                hoverText: "Play",
            }
        )
    )
}