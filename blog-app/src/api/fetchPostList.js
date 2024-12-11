import axios from 'axios';

const fetchPostList = async () => {
    try{
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return response.data}
    catch(err){ console.error(err);
        return [];
    }
}

export default fetchPostList;