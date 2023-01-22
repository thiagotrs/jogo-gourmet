import inquirer from 'inquirer'
import { info } from '@/info'
import { use, expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { afterEach, beforeEach } from 'mocha'

use(chaiAsPromised)

let mockedPrompt: any

describe('info', () => {
  beforeEach(() => {
    mockedPrompt = sinon.stub(inquirer, 'prompt')
  })

  it('should info return true', async () => {
    mockedPrompt.resolves({ info: true })

    await expect(info('Isso é uma Informação!')).eventually.true
    expect(mockedPrompt.calledOnce)
  })

  it('should info return false', async () => {
    mockedPrompt.resolves({ info: false })

    await expect(info('Isso é uma Informação!')).eventually.false
    expect(mockedPrompt.calledOnce)
  })

  it('should info throw error', async () => {
    mockedPrompt.rejects(new Error('Erro do sistema'))

    await expect(info('Isso é uma Informação!')).rejectedWith('Erro do sistema')
    expect(mockedPrompt.calledOnce)
  })

  afterEach(() => {
    mockedPrompt.restore()
  })
})
