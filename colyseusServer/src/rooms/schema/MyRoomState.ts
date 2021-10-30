
//Decentraland Archverse Server for Music Festival

import { Schema, Context, ArraySchema, MapSchema, type } from "@colyseus/schema";
export const PASSWORD = 'papafrita'
//The player value need to ba update
export class Player extends Schema {
  //the name of the Players
  @type("string") name: string;
  //The position of the Players
  
}

export class PlayersPosition extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type("number") z: number;

}

export class Director extends Schema {
  @type('string') id: string
  @type('string') name: string
  @type('boolean') active: boolean
  constructor(id: string) {
    super()
    this.id = id
    this.active = true
  }
}

export class Viewer extends Schema {
  @type('string') id: string
  @type('string') name: string
  @type('boolean') active: boolean
  constructor(id: string, name: string) {
    super()
    this.id = id
    this.name = name
    this.active = true
  }
}


export class MyRoomState extends Schema {
  @type([PlayersPosition]) playersPosition = new ArraySchema<PlayersPosition>();
  @type({ map: Player }) players = new MapSchema<Player>();

  //osc 
  @type('string') mySynchronizedProperty: string = 'Hello world'
  //osc Control
  @type('number') fader1: number = 0
  @type('number') fader2: number = 0
  @type('number') fader3: number = 0
  @type('number') fader4: number = 0
  @type(Director) director: Director
  @type({ map: Viewer }) audience = new MapSchema<Viewer>()


}
