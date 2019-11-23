import axios from './axios';

export async function testCall(){
    try{
        const test = await axios.post('/testCall');
        return test;
    }catch(err){
        return err;
    }
}