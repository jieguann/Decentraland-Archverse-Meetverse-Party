// ECS utils
import * as utils from '@dcl/ecs-scene-utils'

// UI utils
import * as ui from '@dcl/ui-scene-utils'


export class Exhibition extends Entity {
  constructor(texture: Texture, transform: Transform, image: string) {
    super()
    this.addComponent(new PlaneShape())
    const myMaterial = new Material()
    myMaterial.albedoTexture = texture
    myMaterial.transparencyMode = 4
    this.addComponent(myMaterial)
    this.addComponent(transform)
    let gameOver = new ui.CenterImage(image, 8, true, 0, 0, 1025, 300, {
      sourceHeight: 1251,
      sourceWidth: 4167,
      sourceLeft: 0,
      sourceTop: 0
    })
    this.addComponent(
      new OnPointerDown(
        (e) => {
          gameOver.show()
        },
        { button: ActionButton.POINTER, showFeedback: false, hoverText: "Hold to view details, release to close." }
      )
    )

    this.addComponent(
      new OnPointerUp(
        (e) => {
          gameOver.hide()
        },
        { button: ActionButton.POINTER, showFeedback: false, hoverText: "Hold to view details, release to close." }
      )
    )
    const input = Input.instance
    input.subscribe("BUTTON_UP", ActionButton.POINTER, false, (e) => {
      gameOver.hide()
    })
  }
}