export default async function fetchDataWithAuth(urlSuffix, method, body) {
    const url = "https://kouseiapi.herokuapp.com/api" + urlSuffix;
    console.log("Fetching from this url: " + url);
    try {
        const token = JSON.parse(sessionStorage.getItem("token"));
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authentication': token.token
            },
            body: JSON.stringify(body)
        });
        const results = await response.json();
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
    }
}