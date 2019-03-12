import axios from 'axios';


// Steam
export const getSteamApp = (id) => (
    axios({
        url: `/external/steam/${id}`,
        method: 'GET'
    })
)

export const getSteamBG = (id) => (
    axios({
        url: `/external/steam/${id}/bg`,
        method: 'GET'
    })
)

// IGDB
export const getIgdbApp = (name) => {
    const sani_name = name.replace(/[\u{0080}-\u{FFFF}]/gu, "");
    let data = `fields id, popularity, pulse_count, name, \
                aggregated_rating, aggregated_rating_count, \
                similar_games; where name = "${sani_name}";`;
    return axios({
        url: `/external/igdb/game`,
        method: 'POST',
        data: {
            data
        }
    });
};

export const getIgdbApps = (gameIds) => {
    let data = `fields id, popularity, pulse_count, name, \
                aggregated_rating, aggregated_rating_count, \
                similar_games; where id = (${gameIds.join(", ")});`;

    return axios({
        url: `/external/igdb/games`,
        method: 'POST',
        data: {
            data
        }
    });
};

export const getTTB = (id) => {
    let data = `fields *; where game = ${id}; limit 50;`;

    return axios({
        url: `/external/igdb/ttb`,
        method: 'POST',
        data: {
            data
        }
    });
};

export const getScreenshots = gameIds => {
    let data = `fields *; where game = (${gameIds.join(", ")});`;
    return axios({
        url: "/external/igdb/screenshots",
        method: 'POST',
        data: {
            data
        }
    });
};
