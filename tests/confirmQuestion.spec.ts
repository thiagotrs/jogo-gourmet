import inquirer from 'inquirer'
import { confirmQuestion } from '@/confirmQuestion'
import { use, expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { afterEach, beforeEach } from 'mocha'

use(chaiAsPromised)

let mockedPrompt: any

describe('confirmQuestion', () => {
  beforeEach(() => {
    mockedPrompt = sinon.stub(inquirer, 'prompt')
  })

  it('should question return true', async () => {
    mockedPrompt.resolves({ confirm_question: true })

    await expect(confirmQuestion('Isso é uma Questão?')).eventually.true
    expect(mockedPrompt.calledOnce)
  })

  it('should question return false', async () => {
    mockedPrompt.resolves({ confirm_question: false })

    await expect(confirmQuestion('Isso é uma Questão?')).eventually.false
    expect(mockedPrompt.calledOnce)
  })

  it('should question throw error', async () => {
    mockedPrompt.rejects(new Error('Erro do sistema'))

    await expect(confirmQuestion('Isso é uma Questão?')).rejectedWith('Erro do sistema')
    expect(mockedPrompt.calledOnce)
  })

  afterEach(() => {
    mockedPrompt.restore()
  })
})
