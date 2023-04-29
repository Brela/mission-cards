import { API_URL } from './_config';



export async function chatWithGPT(userPrompt: string) {
    const response = await fetch(`${API_URL}/openai`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userPrompt,
        }),
    });

    // --------------- this 401 response is caused by user not being logged in --------------
    // -------------   error is sent to error context then mui error popup  -------
    if (response.status === 401) {
        const data = await response.json();
        return { error: data.message };
    }

    const responseData = await response.json();
    console.log('done', responseData);
    return responseData;
}
