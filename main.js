async function collection(source, _target, options = {}) {
    const { config, utils } = options;
    const { tauriFetch: fetch } = utils;
    const { token } = config;

    if (token === undefined || token.length === 0) {
        throw "token not found";
    }

    let res = await fetch("https://api.frdic.com/api/open/v1/studylist/words", {
        method: "POST",
        headers: { 
		    'Authorization': token,
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
		},
        query: {
            "id": 0, // 单词本 id
            "language": "en",
            "words": [source]
        }
    });

    if (res.ok) {
        const result = res.data;
        if (result.code === 201) {
            return true;
        } else if (result.msg) {
            throw result.msg;
        } else {
            throw JSON.stringify(result);
        }
    } else {
        throw `Http Request Error\nHttp Status: ${res.status}\n${JSON.stringify(res.data)}`;
    }
}
