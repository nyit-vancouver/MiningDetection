
### Web Mining Detection and Reporting Tool
<a name="readme-top"></a>
The Web Mining Detection and Reporting Tool was developed during the course INCS 870 at New York Institute of Technology (Vancouver, BC campus) under the supervision of Dr. Amin Milani Fard by students:
 
- Juan Fu
- Saba Mohammadi
- Elina Kuznetsova

<!-- ABOUT THE PROJECT -->
## About The Project

The tool is aimed to analyze, detect and report about mining activities on a website. Also, it saves the screenshot of the tested web domain.

### Built With

For bootstraping this project, the next major frameworks/libraries were used:

* <a href="https://github.com/nodejs/nodejs.org">NodeJS</a>
* <a href="https://github.com/nodejs/nodejs.org](https://developer.chrome.com/docs/puppeteer/">Google Puppeteer</a>
* <a href="https://telegraf.js.org/">telegraf.js</a>

<!-- GETTING STARTED -->
## Getting Started

For setting up our project locally, you will need to get a local copy up and follow these simple steps.

### Prerequisites
* Install <a href="https://nodejs.org/en/">NodeJS</a>
* Install <a href="https://developer.chrome.com/docs/puppeteer/">Google Puppeteer</a>
* Install <a href="https://telegraf.js.org/">telegraf.js</a>
* Install <a href="https://telegram.org/">Telegram Messenger</a>

### Installation

For installation you will need to follow these steps:

1. Clone the repo
   ```sh
   git clone https://github.com/nyit-vancouver/MiningDetection
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Install Telegraf package
   ```sh
   npm install telegraf
   ```
5. Update the Mining Database
   ```sh
   npm run update-miners-list
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
For using the Web Mining Detection and Reporting Tool, you need to follow only two steps:

1. Open your cloned folder in Terminal and launch for updating database:
```sh
npm run update-miners-list
 ```

2. Run for launching the Telegram bot: 
```sh
   node telegram.js
   ```
 3. In any browser, open https://t.me/MiningDetection_bot
 4. In the bot, click 'Start' and enter the web addresses for testing

<!-- USAGE EXAMPLES -->

## Reporting
After the script analyzed the URLs, you will see the reports about found activities
<img src="https://github.com/nyit-vancouver/MiningDetection/blob/main/screenshots/start.png">
<img src="https://github.com/nyit-vancouver/MiningDetection/blob/main/screenshots/1.png">
<img src="https://github.com/nyit-vancouver/MiningDetection/blob/main/screenshots/2.png">


## Contact

<a href="mailto:ekuznets@nyit.edu">Elina Kuznetsova</a>

<a href="https://www.nyit.edu">New York Institute of Technology</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

