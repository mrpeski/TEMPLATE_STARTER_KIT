const host = `https://rensource-website-api.test.rensource.energy`;
const path = `api/v1`;
const path2 = `api/v1.0.1`;

export const api = {
    article: {
        get: {
            single: (id) => `${host}/${path}/articles/${id}`,
            articles_by_type: (type, page, size) => `${host}/${path}/articles?page=${page}&size=${size}&type=${type}`,
            all: (page, size) => `${host}/${path}/articles/all?page=${page}&size=${size}`,
            articleImage: (pictureUrl) => `${host}/${path}/get-article-image?pictureUrl=${pictureUrl}`
        },
        post: {
            default: () => `${host}/${path}/articles`,
            withImage: () => `${host}/${path2}/articles`
        },
        put: {
            default: () => `${host}/${path}/articles`,
            withImage: () => `${host}/${path2}/articles`
        },
        delete: (id) => `${host}/${path}/articles/${id}`
    },
    feed: {
        get: {
            single: (id) => `${host}/${path}/rssfeeds/${id}`,
            all: (page, size) => `${host}/${path}/rssfeeds/all?page=${page}&size=${size}`
        },
        post: () => `${host}/${path}/rssfeeds`,
        put: () => `${host}/${path}/rssfeeds`,
        delete: (id) => `${host}/${path}/rssfeeds/${id}`
    },
    articleTypes: {
        get: {
            single: (id) => `${host}/${path}/articles/types/${id}`,
            all: () => `${host}/${path}/articles/types`
        },
        post: () => `${host}/${path}/articles/types`,
        put: () => `${host}/${path}/articles/types`,
        delete: (id) => `${host}/${path}/articles/types/${id}`
    }
};