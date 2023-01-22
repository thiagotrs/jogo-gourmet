import inquirer from 'inquirer'

export const info = async (message: string): Promise<boolean> => {
  const answer = await inquirer
    .prompt<Promise<{ info: boolean }>>([
      {
        type: 'list',
        name: 'info',
        message,
        prefix: '\u001B[32m!\u001B[39m',
        choices: [
          'OK',
          'Fechar'
        ],
        filter: res => res === 'OK'
      }
    ])

  return answer.info
}
