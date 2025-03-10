import { Server } from 'socket.io';
import { SocketEvent } from '~/utils/SocketEvent';

const games = {};

const sockets = {};

export default defineNitroPlugin(nitroApp => {
    const config = useRuntimeConfig().public;

    const socketServer = new Server(config.socketPort, {
        serveClient: false,
        cors: {
            origin: '*',
        },
    });

    socketServer.on('connection', socket => {
        console.log('Игрок подключился: ', socket.id);

        socket.on(SocketEvent.joinGame, ({ roomId, nickname }) => {
            socket.join(roomId);

            if (!games[roomId]) {
                games[roomId] = {
                    board: {
                        0: { corner: true, row: 1, col: 1 },
                        1: {
                            price: 10000,
                            owner: null,
                            row: 1,
                            col: 2,
                            side: 'top',
                        },
                        2: {
                            price: 10000,
                            owner: null,
                            row: 1,
                            col: 3,
                            side: 'top',
                        },
                        3: {
                            price: 10000,
                            owner: null,
                            row: 1,
                            col: 4,
                            side: 'top',
                        },
                        4: {
                            price: 10000,
                            owner: null,
                            row: 1,
                            col: 5,
                            side: 'top',
                        },
                        5: {
                            price: 10000,
                            owner: null,
                            row: 1,
                            col: 6,
                            side: 'top',
                        },
                        6: {
                            price: 10000,
                            owner: null,
                            row: 1,
                            col: 7,
                            side: 'top',
                        },
                        7: {
                            price: 10000,
                            owner: null,
                            row: 1,
                            col: 8,
                            side: 'top',
                        },
                        8: {
                            price: 10000,
                            owner: null,
                            row: 1,
                            col: 9,
                            side: 'top',
                        },
                        9: {
                            price: 10000,
                            owner: null,
                            row: 1,
                            col: 10,
                            side: 'top',
                        },
                        10: { corner: true, row: 1, col: 11 },
                        11: {
                            price: 10000,
                            owner: null,
                            row: 2,
                            col: 11,
                            side: 'right',
                        },
                        12: {
                            price: 10000,
                            owner: null,
                            row: 3,
                            col: 11,
                            side: 'right',
                        },
                        13: {
                            price: 10000,
                            owner: null,
                            row: 4,
                            col: 11,
                            side: 'right',
                        },
                        14: {
                            price: 10000,
                            owner: null,
                            row: 5,
                            col: 11,
                            side: 'right',
                        },
                        15: {
                            price: 10000,
                            owner: null,
                            row: 6,
                            col: 11,
                            side: 'right',
                        },
                        16: {
                            price: 10000,
                            owner: null,
                            row: 7,
                            col: 11,
                            side: 'right',
                        },
                        17: {
                            price: 10000,
                            owner: null,
                            row: 8,
                            col: 11,
                            side: 'right',
                        },
                        18: {
                            price: 10000,
                            owner: null,
                            row: 9,
                            col: 11,
                            side: 'right',
                        },
                        19: {
                            price: 10000,
                            owner: null,
                            row: 10,
                            col: 11,
                            side: 'right',
                        },
                        20: { corner: true, row: 11, col: 11 },
                        21: {
                            price: 10000,
                            owner: null,
                            row: 11,
                            col: 10,
                            side: 'bottom',
                        },
                        22: {
                            price: 10000,
                            owner: null,
                            row: 11,
                            col: 9,
                            side: 'bottom',
                        },
                        23: {
                            price: 10000,
                            owner: null,
                            row: 11,
                            col: 8,
                            side: 'bottom',
                        },
                        24: {
                            price: 10000,
                            owner: null,
                            row: 11,
                            col: 7,
                            side: 'bottom',
                        },
                        25: {
                            price: 10000,
                            owner: null,
                            row: 11,
                            col: 6,
                            side: 'bottom',
                        },
                        26: {
                            price: 10000,
                            owner: null,
                            row: 11,
                            col: 5,
                            side: 'bottom',
                        },
                        27: {
                            price: 10000,
                            owner: null,
                            row: 11,
                            col: 4,
                            side: 'bottom',
                        },
                        28: {
                            price: 10000,
                            owner: null,
                            row: 11,
                            col: 3,
                            side: 'bottom',
                        },
                        29: {
                            price: 10000,
                            owner: null,
                            row: 11,
                            col: 2,
                            side: 'bottom',
                        },
                        30: { corner: true, row: 11, col: 1 },
                        31: {
                            price: 10000,
                            owner: null,
                            row: 10,
                            col: 1,
                            side: 'left',
                        },
                        32: {
                            price: 10000,
                            owner: null,
                            row: 9,
                            col: 1,
                            side: 'left',
                        },
                        33: {
                            price: 10000,
                            owner: null,
                            row: 8,
                            col: 1,
                            side: 'left',
                        },
                        34: {
                            price: 10000,
                            owner: null,
                            row: 7,
                            col: 1,
                            side: 'left',
                        },
                        35: {
                            price: 10000,
                            owner: null,
                            row: 6,
                            col: 1,
                            side: 'left',
                        },
                        36: {
                            price: 10000,
                            owner: null,
                            row: 5,
                            col: 1,
                            side: 'left',
                        },
                        37: {
                            price: 10000,
                            owner: null,
                            row: 4,
                            col: 1,
                            side: 'left',
                        },
                        38: {
                            price: 10000,
                            owner: null,
                            row: 3,
                            col: 1,
                            side: 'left',
                        },
                        39: {
                            price: 10000,
                            owner: null,
                            row: 2,
                            col: 1,
                            side: 'left',
                        },
                    },
                    gameData: { players: {}, turnOrder: [], currentTurn: 0 },
                };
            }

            if (!games[roomId].gameData.players[socket.id]) {
                games[roomId].gameData.players[socket.id] = {
                    nickname,
                    position: 0,
                    color: '#000000'.replace(/0/g, function () {
                        return (~~(Math.random() * 16)).toString(16);
                    }),
                    lastRoll: null,
                    balance: 100000,
                };
                games[roomId].gameData.turnOrder.push(socket.id);
            }

            sockets[socket.id] = roomId;

            console.log(`Игрок ${socket.id} зашёл в комнату ${roomId}`);
            socketServer.to(roomId).emit(SocketEvent.updateGame, games[roomId]);
        });

        socket.on(SocketEvent.buyProperty, ({ roomId }) => {
            if (!games[roomId]) return;

            const game = games[roomId];
            const player = games[roomId].gameData.players[socket.id];
            const position = player.position;

            if (!game.board[position] || game.board[position].owner !== null)
                return;

            if (player.balance >= game.board[position].price) {
                player.balance -= game.board[position].price;
                game.board[position].owner = socket.id;

                socketServer
                    .to(roomId)
                    .emit(SocketEvent.updateGame, games[roomId]);
            }
        });

        socket.on(SocketEvent.rollDice, ({ roomId }) => {
            if (!games[roomId]) return;
            console.log('1');

            if (!games[roomId].gameData.players[socket.id]) return;
            console.log('2');

            const currentPlayer =
                games[roomId].gameData.turnOrder[
                    games[roomId].gameData.currentTurn
                ];
            if (socket.id !== currentPlayer) return;
            console.log('3');

            const player = games[roomId].gameData.players[socket.id];
            const roll = [
                Math.floor(Math.random() * 6) + 1,
                Math.floor(Math.random() * 6) + 1,
            ];

            player.position += roll[0];
            player.position += roll[1];
            if (player.position >= 40) {
                player.position -= 40;
            }
            player.lastRoll = roll;

            games[roomId].gameData.currentTurn =
                (games[roomId].gameData.currentTurn + 1) %
                games[roomId].gameData.turnOrder.length;

            socketServer.to(roomId).emit(SocketEvent.updateGame, games[roomId]);
        });

        socket.on('disconnect', () => {
            const roomId = sockets[socket.id];

            games[roomId].gameData.turnOrder = games[
                roomId
            ].gameData.turnOrder.filter(id => id !== socket.id);

            delete games[roomId].gameData.players[socket.id];

            console.log(`Игрок ${socket.id} вышел`);

            if (Object.keys(games[roomId]?.gameData?.players)?.length) {
                socketServer
                    .to(roomId)
                    .emit(SocketEvent.updateGame, games[roomId]);
            } else {
                console.log(
                    `Комната ${roomId} удалена, так как не осталось ни одного игрока`
                );
                delete games[roomId];
            }

            delete sockets[socket.id];
        });
    });
});
