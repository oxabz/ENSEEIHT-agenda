import feathersClient from "../feathers-client";

function createAgenda(agenda){
    return feathersClient.service('agenda').create(agenda).then((result)=>{
        console.log('Created agenda : ' + result.id);
        return result;
    });
}

export {createAgenda}