import { confirmQuestion } from '@/confirmQuestion'
import { Keys, mockStdin } from './helpers/mockStdIn'
import { stdout } from 'stdout-stderr'
import { expect } from 'chai'
import { beforeEach } from 'mocha'

describe('confirmQuestion', () => {
  beforeEach(() => {
    stdout.start()
  })

  it('should question return true when selected "Sim"', async () => {
    mockStdin([Keys.ENTER])
    const answer = await confirmQuestion('Isso é uma Questão?')
    stdout.stop()

    expect(answer).to.equal(true)
    expect(stdout.output).to.equal(
      '? Isso é uma Questão? (Use arrow keys)\n❯ Sim \n  Não ? Isso é uma Questão? Sim\n'
    )
  })

  it('should question return false when selected "Não"', async () => {
    mockStdin([Keys.DOWN, Keys.ENTER])
    const answer = await confirmQuestion('Isso é uma Questão?')
    stdout.stop()

    expect(answer).to.equal(false)
    expect(stdout.output).to.equal(
      '? Isso é uma Questão? (Use arrow keys)\n❯ Sim \n  Não ? Isso é uma Questão? \n  Sim \n❯ Não ? Isso é uma Questão? Não\n'
    )
  })

  it('should question ignore invalid input', async () => {
    mockStdin([Keys.LEFT, Keys.ENTER])
    const answer = await confirmQuestion('Isso é uma Questão?')
    stdout.stop()

    expect(answer).to.equal(true)
    expect(stdout.output).to.equal(
      '? Isso é uma Questão? (Use arrow keys)\n❯ Sim \n  Não ? Isso é uma Questão? Sim\n'
    )
  })
})
