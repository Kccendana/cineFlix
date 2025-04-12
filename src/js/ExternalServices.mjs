const baseUrl = import.meta.env.VITE_BASE_URL;
const api_key = import.meta.env.VITE_SERVER_KEY;

async function convertToJson(res) {
    const jsonResponse = await res.json();
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { name: 'serviceError', message: jsonResponse };
    }
}

export default class ExternalServices {
    constructor(){
    }
    //get data from the API
    async getData(category) {
        const response = await fetch(`${baseUrl}discover/${category}?&api_key=${api_key}`);
        const data = await convertToJson(response);
        console.log(data.results)
        return data.results;
    }
    async findDataById(category, id) {
        const response = await fetch(`${baseUrl}${category}/${id}?api_key=${api_key}`);
        const data = await convertToJson(response);
        console.log(data);
        return data;
    }
    async findTrailer(category, id){
        const url = `${baseUrl}${category}/${id}/videos?language=en-US&api_key=${api_key}`;
        
        const response = await fetch(url);
        const data = await convertToJson(response);
        console.log(data);
        // Find the first video where type is "Trailer"
        const trailer = data.results.find(video => video.type === "Trailer");

        if (trailer) {
            console.log(trailer.key)
            return trailer.key; // This is the YouTube video ID
        } else {
            return null;
        }

    }
}