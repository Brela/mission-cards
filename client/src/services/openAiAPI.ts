import { API_URL } from './_config';



export async function chatWithGPT(userPrompt: string) {
    const response = await fetch(`${API_URL}/decks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userPrompt,
        }),
    });
    const responseData = await response.json();
    console.log('done', responseData);
    return responseData;
}
