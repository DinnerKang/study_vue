import axios from './axios';

export async function testCall(){
    
    try{
        const test = await axios.post('/testCall');
        console.log('test', test);
        return test;
    }catch(err){
        return err;
    }
}