#!/usr/bin/env node

import { GameData, runGame } from './runGame'

const gameData: GameData[] = [
  {
    category: 'massa',
    questions: ['Lasanha']
  },
  {
    category: 'sobremesa',
    questions: ['Bolo de Chocolate']
  }
]

runGame(gameData).catch((error) => {
  if (error.isTtyError) {
    console.error('Prompt não pode ser renderizado no ambiente atual')
  } else {
    console.error(error)
  }
})
