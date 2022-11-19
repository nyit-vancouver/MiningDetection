const axios = require('axios');
const fs = require('fs');

const databases = [
    'https://gitlab.com/api/v4/projects/6837855/repository/files/list.txt/raw?ref=master',
    'https://raw.githubusercontent.com/elina2015/MiningBlocker/main/mining_pools.txt',
];

const resultFileName = 'miners-list.json';
const requestHandler = (url) => {
    return axios.get(url).then((response) => {
        if (response.status == 200) {
            return response.data.split('\n');
        }
    });
};

const startDate = Date.now();

return Promise.all(databases.map(requestHandler)).then(responses => {
    const resultList = new Set();
    for (let list of responses) {
        if (list instanceof Array) {
            list.forEach(item => resultList.add(item))
        }
    }
    console.log('Unique miners:', resultList.size);
    fs.writeFileSync(`${__dirname}/${resultFileName}`, JSON.stringify(Array.from(resultList), null, 4));
}).catch(error => {
    console.error('Can\'t download miners lists:', error);
});