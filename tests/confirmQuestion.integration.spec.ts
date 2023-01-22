import { confirmQuestion } from '@/confirmQuestion'
import { Keys, mockStdin } from './helpers/mockStdIn'
import { stdout } from 'stdout-stderr'

describe('confirmQuestion', () => {
  beforeEach(() => {
    stdout.start()
  })

  it('should question return true when selected "Sim"', async () => {
    expect.assertions(2)

    mockStdin([Keys.ENTER])
    const answer = await confirmQuestion('Isso é uma Questão?')
    stdout.stop()

    expect(answer).toBeTruthy()
    expect(stdout.output).toBe(
      '? Isso é uma Questão? (Use arrow keys)\n❯ Sim \n  Não ? Isso é uma Questão? Sim\n'
    )
  })

  it('should question return false when selected "Não"', async () => {
    expect.assertions(2)

    mockStdin([Keys.DOWN, Keys.ENTER])
    const answer = await confirmQuestion('Isso é uma Questão?')
    stdout.stop()

    expect(answer).toBeFalsy()
    expect(stdout.output).toBe(
      '? Isso é uma Questão? (Use arrow keys)\n❯ Sim \n  Não ? Isso é uma Questão? \n  Sim \n❯ Não ? Isso é uma Questão? Não\n'
    )
  })

  it('should question ignore invalid input', async () => {
    expect.assertions(2)

    mockStdin([Keys.LEFT, Keys.ENTER])
    const answer = await confirmQuestion('Isso é uma Questão?')
    stdout.stop()

    expect(answer).toBeTruthy()
    expect(stdout.output).toBe(
      '? Isso é uma Questão? (Use arrow keys)\n❯ Sim \n  Não ? Isso é uma Questão? Sim\n'
    )
  })
})
