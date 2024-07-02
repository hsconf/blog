export interface apiBlog {
    title: string;
    description: string;
    date: string;
}

export interface apiBlogs {
    [id: string]: apiBlog;
}

export interface Blog extends apiBlog{
    id: string;
}

export interface BlogMutation {
    title: string;
    description: string;
    date: string;
}