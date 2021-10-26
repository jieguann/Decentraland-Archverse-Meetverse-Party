// Import the custom gameplay code.
import "./gameplay";


//https://tvhttps.jieguanart.com:8443/live/hello/index.m3u8
const myVideoClip = new VideoClip("https://tvhttps.jieguanart.com:8443/live/hello/index.m3u8")
const myVideoTexture = new VideoTexture(myVideoClip)
const myMaterial = new BasicMaterial()
myMaterial.texture = myVideoTexture

myVideoTexture.playing = true

const screen = new Entity()
screen.addComponent(new PlaneShape())
screen.addComponent(
  new Transform({
    position: new Vector3(32, 8, 16),
    scale: new Vector3(9.6, 5.4, 1),
    rotation: Quaternion.Euler(0, 0, 0)
  })
)
screen.addComponent(myMaterial)
engine.addEntity(screen)