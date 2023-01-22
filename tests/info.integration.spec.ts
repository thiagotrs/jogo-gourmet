import { info } from '@/info'
import { Keys, mockStdin } from './helpers/mockStdIn'
import { stdout } from 'stdout-stderr'
import { expect } from 'chai'
import { beforeEach } from 'mocha'

describe('info', () => {
  beforeEach(() => {
    stdout.start()
  })

  it('should info return true when selected "OK"', async () => {
    mockStdin([Keys.ENTER])
    const answer = await info('Isso é uma Informação!')
    stdout.stop()

    expect(answer).to.equal(true)
    expect(stdout.output).to.equal(
      '! Isso é uma Informação! (Use arrow keys)\n❯ OK \n  Fechar ! Isso é uma Informação! OK\n'
    )
  })

  it('should info return false when selected "Fechar"', async () => {
    mockStdin([Keys.DOWN, Keys.ENTER])
    const answer = await info('Isso é uma Informação!')
    stdout.stop()

    expect(answer).to.equal(false)
    expect(stdout.output).to.equal(
      '! Isso é uma Informação! (Use arrow keys)\n❯ OK \n  Fechar ! Isso é uma Informação! \n  OK \n❯ Fechar ! Isso é uma Informação! Fechar\n'
    )
  })

  it('should info ignore invalid input', async () => {
    mockStdin([Keys.LEFT, Keys.ENTER])
    const answer = await info('Isso é uma Informação!')
    stdout.stop()

    expect(answer).to.equal(true)
    expect(stdout.output).to.equal(
      '! Isso é uma Informação! (Use arrow keys)\n❯ OK \n  Fechar ! Isso é uma Informação! OK\n'
    )
  })
})
