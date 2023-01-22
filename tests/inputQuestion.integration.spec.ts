import { inputQuestion } from '@/inputQuestion'
import { Keys, mockStdin } from './helpers/mockStdIn'
import { stdout } from 'stdout-stderr'
import { expect } from 'chai'

describe('inputQuestion', () => {
  beforeEach(() => {
    stdout.start()
  })

  it('should inputQuestion return input', async () => {
    const question = 'Que prato é esse'
    const input = 'Bife Grelhado'

    mockStdin([input, Keys.ENTER])
    const answer = await inputQuestion(question)
    stdout.stop()

    expect(answer).to.equal(input)
    expect(stdout.output).to.include(`? ${question} ${input}`)
  })

  it('should inputQuestion ignore when invalid input', async () => {
    const question = 'Que prato é esse'
    const input = 'Bife Grelhado'

    mockStdin(['', Keys.ENTER, input, Keys.ENTER])
    const answer = await inputQuestion(question)
    stdout.stop()

    expect(answer).to.equal(input)
    expect(stdout.output).to.include(`? ${question} ${input}`)
  })
})
