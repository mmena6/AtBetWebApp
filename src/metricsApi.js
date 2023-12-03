
const MetricsAPI = class {
    baseURL = "https://mkscv9urgj.execute-api.us-east-2.amazonaws.com/api";
    fetchEndpoint = "/fetch";
    apiKey = "jrdbGBoXnZ2Bed4Xk7xEk94Abv9zUV3d8l7p9wW8";

    constructor() {};

    getMetrics = async () => {
        let metrics = {};
        try {
            const payload = {
                method: "GET",
                headers: {
                    'x-api-key': this.apiKey,
                }
            };
            const url = this.baseURL + this.fetchEndpoint;
            console.log("querying " + url)
            const resp = await fetch(url, payload);
            if (resp.ok) {
                const respBody = await resp.json();
                console.log(respBody);
                metrics = respBody.metrics;
            } else {
                console.error("/fetch request failed: ", resp);
                try {
                    const respBody = await resp.json();
                    console.error(respBody);
                } catch (e) {}
            }
        } catch (e) {
            console.error("error occurred during getMetrics: " + e.message, e, e.stack);
        }
        return metrics;
    };
};
export default MetricsAPI;
