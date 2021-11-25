// ECS utils
import * as utils from '@dcl/ecs-scene-utils'

// UI utils
import * as ui from '@dcl/ui-scene-utils'




let exhibition_image_A1: string[] = [
    "images/exhibition/A1/1A-1-1.jpg",
    "images/exhibition/A1/1A-1-2.jpg",
    "images/exhibition/A1/1A-3-1.jpg",
    "images/exhibition/A1/1A-3-2.jpg",
    "images/exhibition/A1/1A-3-3.jpg",
    "images/exhibition/A1/1A-4-1.jpg",
    "images/exhibition/A1/1A-4-2.jpg",
    "images/exhibition/A1/1A-4-3.jpg",
    "images/exhibition/A1/1A-4-4.jpg",
    "images/exhibition/A1/1A-4-5.jpg",
    "images/exhibition/A1/1A-5-1.jpg",
    "images/exhibition/A1/1A-5-2.jpg",
    "images/exhibition/A1/1A-5-3.jpg",
    "images/exhibition/A1/1A-5-4.jpg",
    "images/exhibition/A1/1A-5-5.jpg",
    "images/exhibition/A1/1A-5-6.jpg",
    "images/exhibition/A1/1A-5-7.jpg",
    "images/exhibition/A1/1A-6-1.jpg",
    "images/exhibition/A1/1A-6-2.jpg",
    "images/exhibition/A1/1A-6-3.jpg",
    "images/exhibition/A1/1A-6-4.jpg",
    "images/exhibition/A1/1A-7-1.jpg",
    "images/exhibition/A1/1A-7-2.jpg",
    "images/exhibition/A1/1B-1-1.jpg",
    "images/exhibition/A1/1B-1-2.jpg",
    "images/exhibition/A1/1B-3-1.jpg",
    "images/exhibition/A1/1B-3-2.jpg",
    "images/exhibition/A1/1B-3-3.jpg",
    "images/exhibition/A1/1B-4-1.jpg",
    "images/exhibition/A1/1B-4-2.jpg",
    "images/exhibition/A1/1B-4-3.jpg",
    "images/exhibition/A1/1B-4-4.jpg",
    "images/exhibition/A1/1B-4-5.jpg",
    "images/exhibition/A1/1B-5-1.jpg",
    "images/exhibition/A1/1B-5-2.jpg",
    "images/exhibition/A1/1B-5-3.jpg",
    "images/exhibition/A1/1B-5-4.jpg",
    "images/exhibition/A1/1B-5-5.jpg",
    "images/exhibition/A1/1B-5-6.jpg",
    "images/exhibition/A1/1B-5-7.jpg",
    "images/exhibition/A1/1B-6-1.jpg",
    "images/exhibition/A1/1B-6-2.jpg",
    "images/exhibition/A1/1B-6-3.jpg",
    "images/exhibition/A1/1B-6-4.jpg",
    "images/exhibition/A1/1B-7-1.jpg",
    "images/exhibition/A1/1B-7-2.jpg",
    "images/exhibition/A1/1C-1-1.jpg",
    "images/exhibition/A1/1C-3-1.jpg",
    "images/exhibition/A1/1C-4-1.jpg",
    "images/exhibition/A1/1C-4-2.jpg",
    "images/exhibition/A1/1C-4-3.jpg",
    "images/exhibition/A1/1C-5-1.jpg",
    "images/exhibition/A1/1C-5-2.jpg",
    "images/exhibition/A1/1C-5-3.jpg",
    "images/exhibition/A1/1C-5-4.jpg",
    "images/exhibition/A1/1C-5-5.jpg",
    "images/exhibition/A1/1C-5-6.jpg",
    "images/exhibition/A1/1C-6-1.jpg",
    "images/exhibition/A1/1C-6-2.jpg",
    "images/exhibition/A1/1C-6-3.jpg",
    "images/exhibition/A1/1C-7-1.jpg",
]







let exhibition_image_A2: string[] = [
    "images/exhibition/A2/2A-1-1.jpg",
    "images/exhibition/A2/2A-3-1.jpg",
    "images/exhibition/A2/2A-5-1.jpg",
    "images/exhibition/A2/2A-6-1.jpg",
    "images/exhibition/A2/2A-6-2.jpg",
    "images/exhibition/A2/2A-8-1.jpg",
    "images/exhibition/A2/2A-9-1.jpg",
    "images/exhibition/A2/2A-9-2.jpg",
    "images/exhibition/A2/2A-9-3.jpg",
    "images/exhibition/A2/2A-9-4.jpg",
    "images/exhibition/A2/2A-11-1.jpg",
    "images/exhibition/A2/2A-13-1.jpg",
    "images/exhibition/A2/2A-14-1.jpg",
    "images/exhibition/A2/2A-14-2.jpg",
    "images/exhibition/A2/2A-15-1.jpg",
    "images/exhibition/A2/2A-17-1.jpg",
    "images/exhibition/A2/2A-20-1.jpg",
    "images/exhibition/A2/2A-22-1.jpg",
    "images/exhibition/A2/2B-1-1.jpg",
    "images/exhibition/A2/2B-3-1.jpg",
    "images/exhibition/A2/2B-5-1.jpg",
    "images/exhibition/A2/2B-6-1.jpg",
    "images/exhibition/A2/2B-6-2.jpg",
    "images/exhibition/A2/2B-8-1.jpg",
    "images/exhibition/A2/2B-9-1.jpg",
    "images/exhibition/A2/2B-9-2.jpg",
    "images/exhibition/A2/2B-9-3.jpg",
    "images/exhibition/A2/2B-9-4.jpg",
    "images/exhibition/A2/2B-11-1.jpg",
    "images/exhibition/A2/2B-13-1.jpg",
    "images/exhibition/A2/2B-14-1.jpg",
    "images/exhibition/A2/2B-14-2.jpg",
    "images/exhibition/A2/2B-15-1.jpg",
    "images/exhibition/A2/2B-17-1.jpg",
    "images/exhibition/A2/2B-20-1.jpg",
    "images/exhibition/A2/2B-22-1.jpg",
    "images/exhibition/A2/2C-1-1.jpg",
    "images/exhibition/A2/2C-3-1.jpg",
    "images/exhibition/A2/2C-5-1.jpg",
    "images/exhibition/A2/2C-6-1.jpg",
    "images/exhibition/A2/2C-6-2.jpg",
    "images/exhibition/A2/2C-8-1.jpg",
    "images/exhibition/A2/2C-9-1.jpg",
    "images/exhibition/A2/2C-9-2.jpg",
    "images/exhibition/A2/2C-9-3.jpg",
    "images/exhibition/A2/2C-9-4.jpg",
    "images/exhibition/A2/2C-11-1.jpg",
    "images/exhibition/A2/2C-13-1.jpg",
    "images/exhibition/A2/2C-14-1.jpg",
    "images/exhibition/A2/2C-14-2.jpg",
    "images/exhibition/A2/2C-15-1.jpg",
    "images/exhibition/A2/2C-17-1.jpg",
    "images/exhibition/A2/2C-20-1.jpg",
    "images/exhibition/A2/2C-22-1.jpg",
]




let exhibition_image_A3: string[] = [
    "images/exhibition/A3/3A-2-1.jpg",
    "images/exhibition/A3/3A-3-1.jpg",
    "images/exhibition/A3/3A-3-2.jpg",
    "images/exhibition/A3/3A-5-1.jpg",
    "images/exhibition/A3/3A-5-2.jpg",
    "images/exhibition/A3/3A-5-4.jpg",
    "images/exhibition/A3/3A-6-1.jpg",
    "images/exhibition/A3/3A-6-2.jpg",
    "images/exhibition/A3/3A-6-4.jpg",
    "images/exhibition/A3/3A-8-1.jpg",
    "images/exhibition/A3/3A-9-1.jpg",
    "images/exhibition/A3/3A-9-2.jpg",
    "images/exhibition/A3/3A-9-3.jpg",
    "images/exhibition/A3/3A-9-4.jpg",
    "images/exhibition/A3/3A-10-1.jpg",
]



let exhibition_image_A4: string[] = [
    "images/exhibition/A4/4A-1-1.jpg",
    "images/exhibition/A4/4A-2-1.jpg",
    "images/exhibition/A4/4A-3-1.jpg",
    "images/exhibition/A4/4A-4-1.jpg",
    "images/exhibition/A4/4A-7-1.jpg",
    "images/exhibition/A4/4A-8-1.jpg",
    "images/exhibition/A4/4A-8-2.jpg",
    "images/exhibition/A4/4A-9-1.jpg",
    "images/exhibition/A4/4A-10-1.jpg",
    "images/exhibition/A4/4A-10-2.jpg",
]








let exhibition_image_A6: string[] = [
    "images/exhibition/A6/6A-1-1.jpg",
    "images/exhibition/A6/6A-1-2.jpg",
    "images/exhibition/A6/6A-1-3.jpg",
    "images/exhibition/A6/6A-1-4.jpg",
    "images/exhibition/A6/6A-3-1.jpg",
    "images/exhibition/A6/6A-4-1.jpg",
    "images/exhibition/A6/6A-4-2.jpg",
    "images/exhibition/A6/6A-4-3.jpg",
    "images/exhibition/A6/6A-4-4.jpg",
    "images/exhibition/A6/6A-7-1.jpg",
    "images/exhibition/A6/6A-7-2.jpg",
    "images/exhibition/A6/6A-7-3.jpg",
    "images/exhibition/A6/6A-10-1.jpg",
    "images/exhibition/A6/6A-10-2.jpg",
    "images/exhibition/A6/6A-10-3.jpg",
    "images/exhibition/A6/6A-10-4.jpg",
    "images/exhibition/A6/6B-1-1.jpg",
    "images/exhibition/A6/6B-1-2.jpg",
    "images/exhibition/A6/6B-1-3.jpg",
    "images/exhibition/A6/6B-1-4.jpg",
    "images/exhibition/A6/6B-3-1.jpg",
    "images/exhibition/A6/6B-4-1.jpg",
    "images/exhibition/A6/6B-4-2.jpg",
    "images/exhibition/A6/6B-4-3.jpg",
    "images/exhibition/A6/6B-4-4.jpg",
    "images/exhibition/A6/6B-5-1.jpg",
    "images/exhibition/A6/6B-7-1.jpg",
    "images/exhibition/A6/6B-7-2.jpg",
    "images/exhibition/A6/6B-7-3.jpg",
    "images/exhibition/A6/6B-7-4.jpg",
    "images/exhibition/A6/6B-9-1.jpg",
    "images/exhibition/A6/6B-10-1.jpg",
    "images/exhibition/A6/6B-10-2.jpg",
    "images/exhibition/A6/6B-10-3.jpg",
    "images/exhibition/A6/6B-10-4.jpg",
    "images/exhibition/A6/6B-11-1.jpg",
    "images/exhibition/A6/6C-1-1.jpg",
    "images/exhibition/A6/6C-1-2.jpg",
    "images/exhibition/A6/6C-1-3.jpg",
    "images/exhibition/A6/6C-1-4.jpg",
    "images/exhibition/A6/6C-4-1.jpg",
    "images/exhibition/A6/6C-4-2.jpg",
    "images/exhibition/A6/6C-4-3.jpg",
    "images/exhibition/A6/6C-4-4.jpg",
    "images/exhibition/A6/6C-7-1.jpg",
    "images/exhibition/A6/6C-7-2.jpg",
    "images/exhibition/A6/6C-7-3.jpg",
    "images/exhibition/A6/6C-7-4.jpg",
    "images/exhibition/A6/6C-10-1.jpg",
    "images/exhibition/A6/6C-10-2.jpg",
    "images/exhibition/A6/6C-10-3.jpg",
    "images/exhibition/A6/6C-10-4.jpg",
]






let exhibition_image_A9: string[] = [

]





























































































































































let exhibition_image_A10: string[] = [
    "images/exhibition/A10/10A-1-1.jpg",
    "images/exhibition/A10/10A-1-2.jpg",
    "images/exhibition/A10/10A-2-1.jpg",
    "images/exhibition/A10/10A-4-1.jpg",
    "images/exhibition/A10/10A-6-1.jpg",
    "images/exhibition/A10/10A-8-1.jpg",
]
export { exhibition_image_A1, exhibition_image_A2, exhibition_image_A3, exhibition_image_A4, exhibition_image_A6, exhibition_image_A9, exhibition_image_A10 }