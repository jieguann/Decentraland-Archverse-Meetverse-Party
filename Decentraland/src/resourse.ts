import { isValidKey } from "./utils"

const randomSoundPaths = {
    Chinese_blade1: 'sounds/random/sampling/Chinese_blade1.mp3',
  Chinese_blade2: 'sounds/random/sampling/Chinese_blade2.mp3',
  attack1: 'sounds/random/sampling/attack1.mp3',
  attack2: 'sounds/random/sampling/attack2.mp3',
  attack3: 'sounds/random/sampling/attack3.mp3',
  clenching_my_hand: 'sounds/random/sampling/clenching_my_hand.mp3',
  cutting_with_a_katana1: 'sounds/random/sampling/cutting_with_a_katana1.mp3',
  damage1: 'sounds/random/sampling/damage1.mp3',
  damage2: 'sounds/random/sampling/damage2.mp3',
  damage5: 'sounds/random/sampling/damage5.mp3',
  damage6: 'sounds/random/sampling/damage6.mp3',
  damage7: 'sounds/random/sampling/damage7.mp3',
  extracting_a_knife: 'sounds/random/sampling/extracting_a_knife.mp3',
  extracting_a_sword: 'sounds/random/sampling/extracting_a_sword.mp3',
  flying_pan: 'sounds/random/sampling/flying_pan.mp3',
  hitting1: 'sounds/random/sampling/hitting1.mp3',
  holly_sword1: 'sounds/random/sampling/holly_sword1.mp3',
  katana1: 'sounds/random/sampling/katana1.mp3',
  kick1: 'sounds/random/sampling/kick1.mp3',
  kick2: 'sounds/random/sampling/kick2.mp3',
  knocking_a_wall: 'sounds/random/sampling/knocking_a_wall.mp3',
  stabbing: 'sounds/random/sampling/stabbing.mp3',
  striking: 'sounds/random/sampling/striking.mp3',
  swing1: 'sounds/random/sampling/swing1.mp3',
  swing2: 'sounds/random/sampling/swing2.mp3',
  swing3: 'sounds/random/sampling/swing3.mp3',
  swish1: 'sounds/random/sampling/swish1.mp3',
  swish2: 'sounds/random/sampling/swish2.mp3',
  sword_attack1: 'sounds/random/sampling/sword_attack1.mp3',
  sword_attack2: 'sounds/random/sampling/sword_attack2.mp3',
  new01: 'sounds/random/new/new01.mp3',
  new02_1: 'sounds/random/new/new02_1.mp3',
  new03: 'sounds/random/new/new03.mp3',
  new04: 'sounds/random/new/new04.mp3',
  new05_1: 'sounds/random/new/new05_1.mp3',
  new06: 'sounds/random/new/new06.mp3',
  new07_1: 'sounds/random/new/new07_1.mp3',
  Japanese_drum1: 'sounds/random/percussion/Japanese_drum1.mp3',
  Japanese_drum2: 'sounds/random/percussion/Japanese_drum2.mp3',
  bass_drum: 'sounds/random/percussion/bass_drum.mp3',
  drum1: 'sounds/random/percussion/drum1.mp3',
  drum2: 'sounds/random/percussion/drum2.mp3',
  small_drum1: 'sounds/random/percussion/small_drum1.mp3',
  horror_piano_chord: 'sounds/random/piano/horror_piano_chord.mp3',
  pianoA: 'sounds/random/piano/pianoA.mp3',
  pianoB: 'sounds/random/piano/pianoB.mp3',
  pianoC: 'sounds/random/piano/pianoC.mp3',
  pianoC2: 'sounds/random/piano/pianoC2.mp3',
  pianoD: 'sounds/random/piano/pianoD.mp3',
  pianoE: 'sounds/random/piano/pianoE.mp3',
  pianoF: 'sounds/random/piano/pianoF.mp3',
  pianoG: 'sounds/random/piano/pianoG.mp3',
}

let randomSound: any = {}
for(const key in randomSoundPaths) {
    if(isValidKey(key, randomSoundPaths)) {
        randomSound[key] = new AudioClip(randomSoundPaths[key]); 
    }
}

export default {
    randomSound: randomSound,
    particles: {
        particles1: new GLTFShape("models/particles/monster1.glb"),
        particles2: new GLTFShape("models/particles/monster2.glb"),
        particles3: new GLTFShape("models/particles/monster3.glb"),
    },
    bird: new GLTFShape("models/particles/star.glb"),
}