
//Decentraland Archverse Server for Music Festival

import { Schema, Context, ArraySchema, MapSchema, type } from "@colyseus/schema";

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

export class MyRoomState extends Schema {
  @type([PlayersPosition]) playersPosition = new ArraySchema<PlayersPosition>();
  @type({ map: Player }) players = new MapSchema<Player>();

}
