import { string, object, date } from 'yup';

const ArticleSchema = object().shape({
    subject: string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    body: string()
        .min(2, 'Too Short!')
        .required('Required'),
    summary: string(),
    pictureUrl: string(),
    date: date()
});

const ArticleTypeSchema = object().shape({
    name: string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

const RSSSchema = object().shape({
    subject: string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    summary: string()
        .min(2, 'Too Short!')
        .max(350, 'Too Long!')
        .required('Required'),
    url: string()
        .min(2, 'Too Short!')
        .required('Required'),
    date: date().required('Required')
});


export {
    ArticleSchema,
    ArticleTypeSchema,
    RSSSchema
}