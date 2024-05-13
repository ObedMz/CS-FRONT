'use server'
export default async function getGlobalPercentage(): Promise<number> {
    try {
        const response = await fetch(process.env.BACKEND_URL + "/v1/items/global");
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data: number = await response.json();
        if (typeof data !== 'number' || isNaN(data)) {
            throw new Error('Invalid data received');
        }
        return data;
    } catch (error) {
        console.error('Error fetching global percentage:', error);
        return 0;
    }
}
