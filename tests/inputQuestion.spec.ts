import inquirer from 'inquirer'
import { inputQuestion } from '@/inputQuestion'
import { use, expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { afterEach, beforeEach } from 'mocha'

use(chaiAsPromised)

let mockedPrompt: any

describe('inputQuestion', () => {
  beforeEach(() => {
    mockedPrompt = sinon.stub(inquirer, 'prompt')
  })

  it('should question return input', async () => {
    const resp = 'Bife Grelhado'
    mockedPrompt.resolves({ input_question: resp })

    await expect(inputQuestion('Que prato é esse?')).eventually.equal(resp)
    expect(mockedPrompt.calledOnce)
  })

  it('should inputQuestion throw error', async () => {
    mockedPrompt.rejects(new Error('Erro do sistema'))

    await expect(inputQuestion('Que prato é esse?')).rejectedWith('Erro do sistema')
    expect(mockedPrompt.calledOnce)
  })

  afterEach(() => {
    mockedPrompt.restore()
  })
})
