import { alert } from '@/alert'
import { Keys, mockStdin } from './helpers/mockStdIn'
import { stdout } from 'stdout-stderr'
import { expect } from 'chai'
import { beforeEach } from 'mocha'

describe('alert', () => {
  beforeEach(() => {
    stdout.start()
  })

  it('should alert not return when selected "OK"', async () => {
    mockStdin([Keys.ENTER])
    const answer = await alert('Isso é um Alerta!')
    stdout.stop()

    expect(answer).to.be.equal(undefined)
    expect(stdout.output).to.equal(
      '! Isso é um Alerta! (Use arrow keys)\n❯ OK ! Isso é um Alerta! OK\n'
    )
  })

  it('should alert ignore invalid input', async () => {
    mockStdin([Keys.LEFT, Keys.ENTER])
    const answer = await alert('Isso é um Alerta!')
    stdout.stop()

    expect(answer).to.be.equal(undefined)
    expect(stdout.output).to.equal(
      '! Isso é um Alerta! (Use arrow keys)\n❯ OK ! Isso é um Alerta! OK\n'
    )
  })
})
