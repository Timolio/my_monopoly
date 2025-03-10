<script setup>
const userStore = useUserStore();

const { $io } = useNuxtApp();

const { nickname, roomId } = storeToRefs(userStore);

$io.connect();

const gameData = ref(null);
const board = ref({});

const boardRef = ref(null);
const lastRoll = ref(null);

const resizeTrigger = ref(0);

const displayedPositions = ref({});

const getPath = (start, end) => {
    const path = [];
    let current = start;
    const totalCells = 40;

    while (current !== end) {
        current = (current + 1) % totalCells;
        path.push(current);
    }

    return path;
};

const animateMovement = (playerId, newPosition) => {
    const start = gameData.value?.players[playerId]?.position;
    const path = getPath(start, newPosition);

    path.forEach((step, index) => {
        setTimeout(() => {
            displayedPositions.value[playerId] = step;
        }, index * 300);
    });
    displayedPositions.value[playerId] = null;
};

const getPlayerStyle = (playerId, player) => {
    const position = displayedPositions.value[playerId] ?? player.position;
    const cellPos = getCellPosition(position);

    return {
        top: `${cellPos.y}px`,
        left: `${cellPos.x}px`,
        backgroundColor: player.color,
    };
};

const getCellPosition = position => {
    const _ = resizeTrigger.value;
    const cellElement = boardRef.value?.querySelector(
        `[data-position="${position}"]`
    );
    console.log(position);
    if (!cellElement) return { x: 0, y: 0 };
    console.log('success');

    const boardRect = boardRef.value.getBoundingClientRect();
    const cellRect = cellElement.getBoundingClientRect();
    return {
        x: cellRect.left - boardRect.left + cellRect.width / 2,
        y: cellRect.top - boardRect.top + cellRect.height / 2,
    };
};

const rollDice = () => {
    $io.emit(SocketEvent.rollDice, { roomId: roomId.value });
};

const buyProperty = () => {
    $io.emit(SocketEvent.buyProperty, { roomId: roomId.value });
};

const isMyTurn = () => {
    return gameData.value?.turnOrder[gameData.value?.currentTurn] === $io.id;
};

const currentTurn = computed(
    () => gameData.value?.turnOrder[gameData.value?.currentTurn]
);

const currentCell = computed(
    () => board.value[gameData.value?.players[$io.id].position]
);

useResizeObserver(boardRef, async () => {
    resizeTrigger.value++;
});

onMounted(async () => {
    if (!nickname.value || !roomId.value) {
        await navigateTo('/');
    }

    $io.emit(SocketEvent.joinGame, {
        nickname: nickname.value,
        roomId: roomId.value,
    });

    $io.on(SocketEvent.updateGame, async message => {
        board.value = message.board;
        console.log(board.value);

        await nextTick();

        lastRoll.value =
            message?.gameData?.players[
                message?.gameData?.turnOrder[gameData.value?.currentTurn]
            ]?.lastRoll;
        if (gameData.value) {
            Object.entries(message.gameData.players).forEach(
                ([playerId, player]) => {
                    if (!gameData.value?.players[playerId]) return;
                    animateMovement(playerId, player.position);
                }
            );
        }
        gameData.value = message.gameData;
    });
});
</script>

<template>
    <div class="table">
        <div class="table-body">
            <div class="table-body-players">
                <div
                    class="player-wrapper"
                    :class="{ active: playerId === currentTurn }"
                    v-for="(player, playerId, index) in gameData?.players"
                    :style="{ color: player.color }"
                >
                    <h3>{{ player.nickname }}</h3>
                    <p>{{ player.balance }}$</p>
                </div>
            </div>
            <div class="table-body-board" ref="boardRef">
                <div class="table-body-board-fields">
                    <div
                        v-for="(cell, cellPosition, index) in board"
                        :key="cellPosition"
                        class="cell"
                        :class="cell.side"
                        :data-position="cellPosition"
                        :style="{
                            backgroundColor:
                                gameData?.players[cell?.owner]?.color ??
                                'white',
                            gridRow: cell.row,
                            gridColumn: cell.col,
                        }"
                    >
                        <div class="cell-content">
                            {{ cell.name }}
                        </div>
                    </div>
                    <div class="controls">
                        <div class="dice-wrapper">
                            <img
                                v-if="lastRoll"
                                :src="`/img/dice-${lastRoll[0]}.png`"
                            />
                            <img
                                v-if="lastRoll"
                                :src="`/img/dice-${lastRoll[1]}.png`"
                            />
                        </div>
                        <div v-if="isMyTurn()">
                            <button @click="rollDice">Бросить кости</button>
                            <button
                                v-if="
                                    !currentCell?.corner && !currentCell?.owner
                                "
                                @click="buyProperty"
                            >
                                Прикупить ♂ business ♂ за
                                {{ currentCell?.price }}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="table-body-board-tokens">
                    <div
                        class="player-token"
                        v-for="(player, playerId, index) in gameData?.players"
                        :key="playerId"
                        :style="getPlayerStyle(playerId, player)"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
img {
    width: 25%;
    height: auto;
    aspect-ratio: 1/1;
}

.dice-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.player-wrapper {
    padding: 16px;
}

.player-wrapper.active {
    border: 2px solid white;
    border-radius: 8px;
    font-weight: bold;
}

.table {
    /* position: relative;
    flex: 0 0 auto;
    transform-origin: center; */
    display: flex;
    flex-direction: row;
    user-select: none;
    width: 100%;
    height: 100%;
}

.table-body {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.table-body-players {
    /* position: absolute; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 12px;
    margin: 12px 0;
}

.table-body-board {
    position: relative;
    aspect-ratio: 1/1;
    max-height: 100%;
    max-width: 100%;
    /* margin: auto; */
    box-sizing: border-box;
    /* top: 50%;
    transform: translateY(-50%); */
}

.table-body-board-fields {
    position: relative;
    display: grid;
    grid-template-columns: 14% repeat(9, 1fr) 14%;
    grid-template-rows: 14% repeat(9, 1fr) 14%;
    width: 100%;
    height: 100%;
    border: 2px solid #262c2f;
}

.table-body-board-fields .controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-column-start: 2;
    grid-column-end: 11;
    grid-row-start: 2;
    grid-row-end: 11;
}

.table-body-board-tokens div {
    position: absolute;
    width: 5%;
    height: 5%;
    border-radius: 100%;
    background-color: aqua;
    transition: top 200ms linear, left 200ms linear, border 100ms ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    border: 2px solid transparent;
    pointer-events: none;
    z-index: 2;
    transform: translate(-50%, -50%);
}

.cell {
    border: 2px solid #262c2f;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    position: relative;
    background-color: white;
    color: black;
}

.cell-content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    box-sizing: border-box;
}

.top .cell-content,
.bottom .cell-content {
    height: 14%;
}

.right .cell-content,
.left .cell-content {
    width: 14%;
}

/* .right .cell-content {
    transform: rotate(90deg);
}

.left .cell-content {
    transform: rotate(-90deg);
}

.bottom .cell-content {
    transform: rotate(180deg);
} */

.cell {
    transition: background-color 0.3s ease;
}

.player-token {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}

.player-token-enter-active {
    transition: all 0.3s ease;
}
.player-token-enter-from {
    opacity: 0;
    transform: scale(0);
}
</style>
