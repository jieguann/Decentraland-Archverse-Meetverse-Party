export function beiwenquan(): void {
    //主建筑
    const baseScene1 = new Entity();
    engine.addEntity(baseScene1);
    baseScene1.addComponent(new GLTFShape("models/beiwenquan/BWQ.glb"));
    baseScene1.addComponent(new Transform({
        rotation: Quaternion.Euler(0, 180, 0),
        position: new Vector3(0, 0, 0)
    }))
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