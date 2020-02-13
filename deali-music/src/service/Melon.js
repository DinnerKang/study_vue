import * as firebase from 'firebase/app';
import 'firebase/database';


// Read

export function getMelonChartList() {
    return firebase.database().ref('melon');
}


// Write

export function updateMelon(data) {
    firebase.database().ref('melon').set({
        result : data.result,
        registDate : data.registDate,
    });
}

