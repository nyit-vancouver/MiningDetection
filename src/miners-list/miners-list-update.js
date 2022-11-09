const axios = require('axios');
const fs = require('fs');

const minersListRepositoryId = process.env.npm_package_config_minersListRepositoryId;
const sourceFileName = 'list.txt';
const resultFileName = 'miners-list.json';
const branch = 'master';
const url = `https://gitlab.com/api/v4/projects/${minersListRepositoryId}/repository/files/${sourceFileName}/raw?ref=${branch}`;

return axios.get(url).then((response) => {
    if (response.status == 200) {
        const lines = response.data.split('\n');
        fs.writeFileSync(`${__dirname}/${resultFileName}`, JSON.stringify(lines, null, 4));
    } else {
        console.error('Can\'t download miners list:', response.status);
    }
}).catch(error => {
    console.error('Can\'t download miners list:', error);
});