#!/usr/bin/env node
const fs = require('fs');
import { join } from 'path';

const dataDir = "/data";
const now = new Date();

const year = now.getUTCFullYear();
const month = (now.getUTCMonth() + 1).toString().padStart(2, '0');
const day = now.getUTCDate().toString().padStart(2, '0')
const hour = now.getUTCHours().toString()
const fileDate = `${year}-${month}-${day}-${hour}-00-00`

const pathToData = join(__dirname, dataDir, fileDate) + '.json';

let data = [];

const stationsUrl = "https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_status"
async function getStationStatuses() {
    fetch(stationsUrl).then((resp) => resp.json()).then(function(response){
        data = response.data.stations;
    })
}

getStationStatuses().then(() => {
    fs.writeFileSync(path.resolve(pathToData), JSON.stringify(data, null, 2))
});
