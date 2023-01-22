import { alert } from './alert'
import { info } from './info'
import { confirmQuestion } from './confirmQuestion'
import { inputQuestion } from './inputQuestion'

export type GameData = {
  category: string,
  questions: string[]
}

export async function runGame (data: GameData[]) {
  console.log('===\u001B[32m JOGO GOURMET \u001B[39m===\n')

  while (true) {
    const again = await info('Pense em um prato que gosta')

    if (!again) break

    for await (const [keyEntry, entry] of data.entries()) {
      let answer = await confirmQuestion(`O prato que você pensou é ${entry.category}?`)

      if (!answer && data.length === keyEntry + 1) {
        const input = await inputQuestion('Qual o prato você pensou?')
        const category = await inputQuestion(`${input} é ____ mas ${entry.category} não.`)
        data.push({ category, questions: [input] })
        break
      }

      if (!answer) continue

      for await (const [keyQuest, quest] of entry.questions.entries()) {
        answer = await confirmQuestion(`O prato que você pensou é ${quest}?`)

        if (!answer && entry.questions.length === keyQuest + 1) {
          const name = await inputQuestion('Qual o prato você pensou?')
          data[keyEntry].questions.push(name)
          break
        }

        if (answer) {
          await alert('Acertei de novo!')
          break
        }

        continue
      }

      break
    }
  }
}
