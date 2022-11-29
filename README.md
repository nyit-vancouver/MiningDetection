
### Web Mining Detection and Reporting Tool
<a name="readme-top"></a>
The Web Mining Detection and Reporting Tool was developed during the course INCS 870 at New York Institute of Technology (Vancouver, BC campus) under the supervision of Dr. Amin Milani Fard by students:
 
- Juan Fu
- Saba Mohammadi
- Elina Kuznetsova

<!-- ABOUT THE PROJECT -->
## About The Project

The tool is aimed to analyze, detect and report about mining activities on a website.

### Built With

For bootstraping this project, the next major frameworks/libraries were used:

* <a href="https://github.com/nodejs/nodejs.org">NodeJS</a>
* <a href="https://github.com/nodejs/nodejs.org](https://developer.chrome.com/docs/puppeteer/">Google Puppeteer</a>

<!-- GETTING STARTED -->
## Getting Started

For setting up our project locally, you will need to get a local copy up and follow these simple steps.

### Prerequisites
* Install <a href="https://nodejs.org/en/">NodeJS</a>
* Install <a href="https://developer.chrome.com/docs/puppeteer/">Google Puppeteer</a>

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
4. Update the Mining Database
   ```sh
   npm run update-miners-list
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
For using the Web Mining Detection and Reporting Tool, you need to follow only two steps:

1. Add all URLs for scanning to <b>websites-to-scan.txt</b>. For example:
```txt
http://coinhive.com/
https://google.com
   ```
 2. Run for scanning: npm run scan
  ```sh
   npm run scan
   ```
<!-- USAGE EXAMPLES -->

## Reporting
After the script analyzed the URLs, you will see the reports about found activities
<img src="https://github.com/nyit-vancouver/MiningDetection/blob/main/images/example.png">


## Contact

<a href="mailto:ekuznets@nyit.edu">Elina Kuznetsova</a>

<a href="https://www.nyit.edu">New York Institute of Technology</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

