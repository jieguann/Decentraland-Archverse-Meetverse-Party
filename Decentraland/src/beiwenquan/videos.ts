// ECS utils
import * as utils from '@dcl/ecs-scene-utils'

// UI utils
import * as ui from '@dcl/ui-scene-utils'


export class ExhibitionVideos extends Entity {
  constructor(exhibitionVideo: VideoClip, transform: Transform) {
    super()
    const myVideoTexture = new VideoTexture(exhibitionVideo)

    const myMaterial = new Material()
    myMaterial.albedoTexture = myVideoTexture
    myMaterial.roughness = 1
    myMaterial.specularIntensity = 0
    myMaterial.metallic = 0

    this.addComponent(new PlaneShape())
    this.addComponent(transform)
    this.addComponent(myMaterial)
    this.addComponent(
      new OnPointerDown(() => {
        myVideoTexture.playing = !myVideoTexture.playing
      },
        { button: ActionButton.POINTER, showFeedback: true, hoverText: "Play Video" }
      )
    )
  }
}