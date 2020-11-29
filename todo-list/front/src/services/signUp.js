import axios from './axios';

const signUpService = () => {
    const clickSignUp = async (email, password) => {
        if (!email || !password) {
            alert('정보를 정확하게 입력해주세요.');
            return;
        }
        const data = {
            email,
            password,
        };
        const result = await axios.post('/signup', data);
        console.log(result); 
    };
    return {
        clickSignUp,
    };
};

export {
    signUpService,
};