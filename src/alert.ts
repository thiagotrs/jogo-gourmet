import inquirer from 'inquirer'

export const alert = async (message: string): Promise<void> => {
  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'alert',
        message,
        prefix: '\u001B[32m!\u001B[39m',
        choices: [
          'OK'
        ]
      }
    ])
}
