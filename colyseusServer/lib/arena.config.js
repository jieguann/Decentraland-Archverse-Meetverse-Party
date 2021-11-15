"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arena_1 = __importDefault(require("@colyseus/arena"));
const monitor_1 = require("@colyseus/monitor");
/**
 * Import your Room files
 */
const MyRoom_1 = require("./rooms/MyRoom");
const db_1 = __importDefault(require("./db"));
exports.default = arena_1.default({
    getId: () => "Your Colyseus App",
    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('my_room', MyRoom_1.MyRoom);
    },
    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req, res) => {
            res.send(MyRoom_1.ArrayPlayersPosition);
            //res.send("ArrayPlayersPosition");
        });
        app.get("/db", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let response = [];
                yield db_1.default.get().then((queryResult) => {
                    for (let doc of queryResult.docs) {
                        response.push(doc.data());
                    }
                });
                return res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
        }));
        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/colyseus", monitor_1.monitor());
    },
    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});
