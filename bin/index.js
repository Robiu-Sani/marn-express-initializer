#!/usr/bin/env node

import { Command } from 'commander';
import Enquirer from 'enquirer';
import pc from 'picocolors';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// ESM ডিরেক্টরি সেটআপ
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();
const enquirer = new Enquirer();

program
  .name('create-express-easy')
  .description('Easy and Fast Express Project Starter')
  .version('1.0.0');

program
  .argument('[project-name]', 'Name of the project folder')
  .action(async (projectName) => {
    let targetDir = projectName;

    console.log(pc.cyan(`\n🚀 Welcome to ${pc.bold('create-express-easy')}!\n`));

    try {
      // ১. প্রজেক্ট নাম ইনপুট নেওয়া
      if (!targetDir) {
        const response = await enquirer.prompt({
          type: 'input',
          name: 'name',
          message: 'Enter your project name:',
          initial: 'my-express-server'
        });
        targetDir = response.name;
      }

      // ২. ডাটাবেস অপশন সিলেকশন
      const { database } = await enquirer.prompt({
        type: 'select',
        name: 'database',
        message: 'Which database template would you like to use?',
        choices: [
          { name: 'mongodb', message: 'MongoDB (Mongoose) - Ready' },
          { name: 'mysql', message: 'MySQL (Coming Soon)', disabled: true },
          { name: 'postgres', message: 'PostgreSQL (Coming Soon)', disabled: true }
        ]
      });

      const fullPath = path.join(process.cwd(), targetDir);

      /**
       * গুরুত্বপূর্ণ পরিবর্তন: 
       * যেহেতু এই ফাইলটি 'bin/' ফোল্ডারের ভেতরে আছে, 
       * তাই 'templates' এ যেতে হলে এক ধাপ উপরে (..) যেতে হবে।
       */
      const templatePath = path.resolve(__dirname, '..', 'templates', database);

      // ৩. ফাইল কপি শুরু
      const spinner = ora(`Generating ${database} project structure...`).start();

      if (!fs.existsSync(templatePath)) {
        spinner.fail(pc.red(`Error: Template for ${database} not found!`));
        console.log(pc.yellow(`\nMake sure the template folder exists at: ${templatePath}\n`));
        process.exit(1);
      }

      // টেম্পলেট কপি করা
      await fs.copy(templatePath, fullPath);
      spinner.succeed(pc.green(`${database.toUpperCase()} structure generated successfully!`));

      // ৪. নতুন প্রজেক্টের package.json আপডেট করা
      const pkgPath = path.join(fullPath, 'package.json');
      if (fs.existsSync(pkgPath)) {
        const pkg = await fs.readJson(pkgPath);
        pkg.name = targetDir;
        pkg.version = "1.0.0";
        await fs.writeJson(pkgPath, pkg, { spaces: 2 });
      }

      // ৫. ডিপেন্ডেন্সি ইনস্টল করা
      console.log(pc.blue('\n📦 Installing dependencies...'));
      const installSpinner = ora('npm install is running...').start();
      
      try {
        execSync(`npm install`, { cwd: fullPath, stdio: 'ignore' });
        installSpinner.succeed(pc.green('Dependencies installed!'));
      } catch (err) {
        installSpinner.warn(pc.yellow('Auto-install failed. Please run "npm install" manually.'));
      }

      // ৬. সাকসেস মেসেজ
      console.log('\n' + pc.bgGreen(pc.black(' SUCCESS ')) + pc.green(' Project is ready to go!'));
      console.log('\n' + pc.white('Next steps:'));
      console.log(pc.cyan(`  cd ${targetDir}`));
      console.log(pc.cyan(`  npm run dev`));
      console.log('\n' + pc.magenta('Happy coding! 👨‍💻\n'));

    } catch (err) {
      console.error(pc.red('\n✖ Critical Error: ' + err.message));
      process.exit(1);
    }
  });

program.parse(process.argv);