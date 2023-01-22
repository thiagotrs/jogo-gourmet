import { Keys, mockStdin } from './helpers/mockStdIn'
import { stdout } from 'stdout-stderr'
import { GameData, runGame } from '@/runGame'
import { expect } from 'chai'
import { beforeEach } from 'mocha'

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

const title = '=== JOGO GOURMET ===\n'
const pensePrato = '! Pense em um prato que gosta'
const useKeys = '(Use arrow keys)'
const inferPrato = '? O prato que você pensou é'
const correct = '! Acertei de novo!'
const questPrato = '? Qual o prato você pensou?'

const catPrato = (quest: string, cat: string) => `? ${quest} é ____ mas ${cat} não.`
const treeWithInput = (input: string, quest: string) => input.split('')
  .reduce((acc, curr, idx) => acc + ' ' + (acc + ' ' + acc + curr).slice(-idx - 1))
  .split(' ').map(el => `${quest} ${el}`).join('')

describe('runGame', () => {
  beforeEach(() => {
    stdout.start()
  })

  it('should runGame response correct answer', async () => {
    const output = [
      title,
      `${pensePrato} ${useKeys}`,
      '❯ OK ',
      `  Fechar ${pensePrato} OK`,
      `${inferPrato} ${gameData[0].category}? ${useKeys}`,
      '❯ Sim ',
      `  Não ${inferPrato} ${gameData[0].category}? Sim`,
      `${inferPrato} ${gameData[0].questions[0]}? ${useKeys}`,
      '❯ Sim ',
      `  Não ${inferPrato} ${gameData[0].questions[0]}? Sim`,
      `${correct} ${useKeys}`,
      `❯ OK ${correct} OK`,
      `${pensePrato} ${useKeys}`,
      '❯ OK ',
      `  Fechar ${pensePrato} `,
      '  OK ',
      `❯ Fechar ${pensePrato} Fechar\n`
    ].join('\n')

    mockStdin([
      Keys.ENTER, Keys.ENTER, Keys.ENTER,
      Keys.ENTER, Keys.DOWN, Keys.ENTER
    ])
    const answer = await runGame(gameData)
    stdout.stop()

    expect(answer).to.be.equal(undefined)
    expect(stdout.output).to.equal(output)
  })

  it('should runGame add new question Data', async () => {
    const input = 'Talharim'
    const output = [
      title,
      `${pensePrato} ${useKeys}`,
      '❯ OK ',
      `  Fechar ${pensePrato} OK`,
      `${inferPrato} ${gameData[0].category}? ${useKeys}`,
      '❯ Sim ',
      `  Não ${inferPrato} ${gameData[0].category}? Sim`,
      `${inferPrato} ${gameData[0].questions[0]}? ${useKeys}`,
      '❯ Sim ',
      `  Não ${inferPrato} ${gameData[0].questions[0]}? `,
      '  Sim ',
      `❯ Não ${inferPrato} ${gameData[0].questions[0]}? Não`,
      `${questPrato} ${treeWithInput(input, questPrato)}${questPrato} ${input}`,
      `${pensePrato} ${useKeys}`,
      '❯ OK ',
      `  Fechar ${pensePrato} OK`,
      `${inferPrato} ${gameData[0].category}? ${useKeys}`,
      '❯ Sim ',
      `  Não ${inferPrato} ${gameData[0].category}? Sim`,
      `${inferPrato} ${gameData[0].questions[0]}? ${useKeys}`,
      '❯ Sim ',
      `  Não ${inferPrato} ${gameData[0].questions[0]}? `,
      '  Sim ',
      `❯ Não ${inferPrato} ${gameData[0].questions[0]}? Não`,
      `${inferPrato} ${input}? ${useKeys}`,
      '❯ Sim ',
      `  Não ${inferPrato} ${input}? Sim`,
      `${correct} ${useKeys}`,
      `❯ OK ${correct} OK`,
      `${pensePrato} ${useKeys}`,
      '❯ OK ',
      `  Fechar ${pensePrato} `,
      '  OK ',
      `❯ Fechar ${pensePrato} Fechar\n`
    ].join('\n')

    mockStdin([
      Keys.ENTER, Keys.ENTER, Keys.DOWN, Keys.ENTER, input, Keys.ENTER,
      Keys.ENTER, Keys.ENTER, Keys.DOWN, Keys.ENTER, Keys.ENTER, Keys.ENTER,
      Keys.DOWN, Keys.ENTER
    ])
    const answer = await runGame(gameData)
    stdout.stop()

    expect(answer).to.be.equal(undefined)
    expect(gameData[0].questions).to.be.eql(['Lasanha', input])
    expect(stdout.output).to.equal(output)
  })

  it('should runGame add new category Data', async () => {
    const cat = 'carne'
    const quest = 'Churrasco'
    const output = [
      title,
      `${pensePrato} ${useKeys}`,
      '❯ OK ',
      `  Fechar ${pensePrato} OK`,
      `${inferPrato} ${gameData[0].category}? ${useKeys}`,
      '❯ Sim ',
      `  Não ${inferPrato} ${gameData[0].category}? `,
      '  Sim ',
      `❯ Não ${inferPrato} ${gameData[0].category}? Não`,
      `${inferPrato} ${gameData[1].category}? ${useKeys}`,
      '❯ Sim ',
      `  Não ${inferPrato} ${gameData[1].category}? `,
      '  Sim ',
      `❯ Não ${inferPrato} ${gameData[1].category}? Não`,
      `${questPrato} ${treeWithInput(quest, questPrato)}${questPrato} ${quest}`,
      `${catPrato(quest, gameData[1].category)} ${treeWithInput(cat, catPrato(quest, gameData[1].category))}${catPrato(quest, gameData[1].category)} ${cat}`,
      `${pensePrato} ${useKeys}`,
      '❯ OK ',
      `  Fechar ${pensePrato} OK`,
      `${inferPrato} ${gameData[0].category}? ${useKeys}`,
      '❯ Sim ',
      `  Não ${inferPrato} ${gameData[0].category}? `,
      '  Sim ',
      `❯ Não ${inferPrato} ${gameData[0].category}? Não`,
      `${inferPrato} ${gameData[1].category}? ${useKeys}`,
      '❯ Sim ',
      `  Não ${inferPrato} ${gameData[1].category}? `,
      '  Sim ',
      `❯ Não ${inferPrato} ${gameData[1].category}? Não`,
      `${inferPrato} ${cat}? ${useKeys}`,
      '❯ Sim ',
      `  Não ${inferPrato} ${cat}? Sim`,
      `${inferPrato} ${quest}? ${useKeys}`,
      '❯ Sim ',
      `  Não ${inferPrato} ${quest}? Sim`,
      `${correct} ${useKeys}`,
      `❯ OK ${correct} OK`,
      `${pensePrato} ${useKeys}`,
      '❯ OK ',
      `  Fechar ${pensePrato} `,
      '  OK ',
      `❯ Fechar ${pensePrato} Fechar\n`
    ].join('\n')

    mockStdin([
      Keys.ENTER, Keys.DOWN, Keys.ENTER, Keys.DOWN, Keys.ENTER,
      quest, Keys.ENTER, cat, Keys.ENTER,
      Keys.ENTER, Keys.DOWN, Keys.ENTER, Keys.DOWN, Keys.ENTER,
      Keys.ENTER, Keys.ENTER, Keys.ENTER, Keys.DOWN, Keys.ENTER
    ])
    const answer = await runGame(gameData)
    stdout.stop()

    expect(answer).to.be.equal(undefined)
    expect(gameData[2].category).to.equal(cat)
    expect(gameData[2].questions).to.eql([quest])
    expect(stdout.output).to.equal(output)
  })
})
