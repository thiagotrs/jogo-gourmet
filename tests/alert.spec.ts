import inquirer from 'inquirer'
import { alert } from '@/alert'
import { use, expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { afterEach, beforeEach } from 'mocha'

use(chaiAsPromised)

let mockedPrompt: any

describe('alert', () => {
  beforeEach(() => {
    mockedPrompt = sinon.stub(inquirer, 'prompt')
  })

  it('should alert not return', async () => {
    mockedPrompt.resolves({ alert: 'OK' })

    expect(alert('Isso é um Alerta!')).eventually.equal(undefined)
    expect(mockedPrompt.calledOnce)
  })

  it('should alert throw error', async () => {
    mockedPrompt.rejects(new Error('Erro do sistema'))

    expect(alert('Isso é um Alerta!')).eventually.rejectedWith('Isso é um Alerta!')
    expect(mockedPrompt.calledOnce)
  })

  afterEach(() => {
    mockedPrompt.restore()
  })
})
