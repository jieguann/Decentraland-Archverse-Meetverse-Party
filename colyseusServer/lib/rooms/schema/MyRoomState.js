"use strict";
//Decentraland Archverse Server for Music Festival
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoomState = exports.PlayersPosition = exports.Player = void 0;
const schema_1 = require("@colyseus/schema");
//The player value need to ba update
class Player extends schema_1.Schema {
}
__decorate([
    schema_1.type("string")
], Player.prototype, "name", void 0);
exports.Player = Player;
class PlayersPosition extends schema_1.Schema {
}
__decorate([
    schema_1.type("number")
], PlayersPosition.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], PlayersPosition.prototype, "y", void 0);
__decorate([
    schema_1.type("number")
], PlayersPosition.prototype, "z", void 0);
exports.PlayersPosition = PlayersPosition;
class MyRoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.playersPosition = new schema_1.ArraySchema();
        this.players = new schema_1.MapSchema();
    }
}
__decorate([
    schema_1.type([PlayersPosition])
], MyRoomState.prototype, "playersPosition", void 0);
__decorate([
    schema_1.type({ map: Player })
], MyRoomState.prototype, "players", void 0);
exports.MyRoomState = MyRoomState;
