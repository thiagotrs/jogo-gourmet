import { inputQuestion } from '@/inputQuestion'
import { Keys, mockStdin } from './helpers/mockStdIn'
import { stdout } from 'stdout-stderr'

describe('inputQuestion', () => {
  beforeEach(() => {
    stdout.start()
  })

  it('should inputQuestion return input', async () => {
    expect.assertions(2)
    const question = 'Que prato é esse?'
    const input = 'Bife Grelhado'

    mockStdin([input, Keys.ENTER])
    const answer = await inputQuestion(question)
    stdout.stop()

    expect(answer).toBe(input)
    expect(stdout.output).toMatch(`? ${question} ${input}`)
  })

  it('should inputQuestion ignore when invalid input', async () => {
    expect.assertions(2)
    const question = 'Que prato é esse?'
    const input = 'Bife Grelhado'

    mockStdin(['', Keys.ENTER, input, Keys.ENTER])
    const answer = await inputQuestion(question)
    stdout.stop()

    expect(answer).toBeTruthy()
    expect(stdout.output).toMatch(`? ${question} ${input}`)
  })
})
